import { type NextRequest, NextResponse } from "next/server"
import { v4 as uuidv4 } from "uuid"
import { saveDonation } from "@/lib/donation-store"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, amount, source } = body

    if (!name || !name.trim()) {
      return NextResponse.json({ success: false, error: "Nome é obrigatório" }, { status: 400 })
    }

    if (!amount || amount < 10) {
      return NextResponse.json({ success: false, error: "Valor mínimo é R$ 10,00" }, { status: 400 })
    }

    const API_BASE = process.env.LIBERPAY_API_BASE
    const API_TOKEN = process.env.LIBERPAY_API_TOKEN
    const PRODUCT_ID = process.env.LIBERPAY_PRODUCT_ID
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

    if (!API_BASE || !API_TOKEN) {
      console.error("[v0] Missing API configuration")
      return NextResponse.json(
        {
          success: false,
          error: "Configuração da API não encontrada. Entre em contato com o suporte.",
        },
        { status: 500 },
      )
    }

    if (!PRODUCT_ID || PRODUCT_ID === "SEU_PRODUCT_ID_AQUI") {
      console.error("[v0] LIBERPAY_PRODUCT_ID not configured")
      return NextResponse.json(
        {
          success: false,
          message: "Configuração de produto de doação ainda não foi concluída. Tente novamente em instantes.",
        },
        { status: 500 },
      )
    }

    const internalDonationId = uuidv4()
    const amountInCents = Math.round(amount * 100)
    const webhookUrl = `${BASE_URL}/api/webhooks/payment`

    console.log("[v0] Creating donation:", {
      internalDonationId,
      amount,
      amountInCents,
      productId: PRODUCT_ID,
    })

    console.log("[v0] Step 1: Creating checkout order...")
    console.log("[v0] URL:", `${API_BASE}/public/checkout/create-order/${PRODUCT_ID}`)

    const orderResponse = await fetch(`${API_BASE}/public/checkout/create-order/${PRODUCT_ID}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        metadata: {
          internalDonationId,
          donorName: name.trim(),
          donorEmail: email?.trim() || "",
          donorPhone: phone?.replace(/\D/g, "") || "",
          source: source || "main",
          amount: amount.toString(),
        },
      }),
    })

    if (!orderResponse.ok) {
      const errorText = await orderResponse.text()
      console.error("[v0] Order creation failed. Status:", orderResponse.status)
      console.error("[v0] Response body:", errorText)

      let errorData
      try {
        errorData = JSON.parse(errorText)
      } catch {
        errorData = { message: errorText }
      }

      if (errorData.message === "Hostname não identificado") {
        return NextResponse.json(
          {
            success: false,
            error:
              "⚠️ Domínio não autorizado. Configure o domínio 'doeparaonatal.online' no dashboard da UmbrellaPag. Veja o arquivo CONFIGURAR_DOMINIO_UMBRELLAPAG.md para instruções detalhadas.",
          },
          { status: 400 },
        )
      }

      return NextResponse.json(
        { success: false, error: errorData.message || "Erro ao criar pedido. Tente novamente." },
        { status: 500 },
      )
    }

    const orderData = await orderResponse.json()
    console.log("[v0] Order created successfully:", JSON.stringify(orderData, null, 2))

    const orderId = orderData.id || orderData.data?.id || orderData.checkoutOrder?.id

    if (!orderId) {
      console.error("[v0] No order ID found in response:", orderData)
      return NextResponse.json({ success: false, error: "Erro ao obter ID do pedido." }, { status: 500 })
    }

    console.log("[v0] Order ID:", orderId)

    console.log("[v0] Step 2: Creating Pix payment for order...")
    console.log("[v0] URL:", `${API_BASE}/public/checkout/payment/${orderId}`)

    const paymentResponse = await fetch(`${API_BASE}/public/checkout/payment/${orderId}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: amountInCents,
        paymentMethod: "PIX",
        postbackUrl: webhookUrl,
        customer: {
          name: name.trim(),
          email: email?.trim() || undefined,
          phone: phone?.replace(/\D/g, "") || undefined,
        },
      }),
    })

    if (!paymentResponse.ok) {
      const errorText = await paymentResponse.text()
      console.error("[v0] Payment creation failed. Status:", paymentResponse.status)
      console.error("[v0] Response body:", errorText)

      let errorData
      try {
        errorData = JSON.parse(errorText)
      } catch {
        errorData = { message: errorText }
      }

      return NextResponse.json(
        { success: false, error: errorData.message || "Erro ao gerar pagamento Pix. Tente novamente." },
        { status: 500 },
      )
    }

    const paymentData = await paymentResponse.json()
    console.log("[v0] Payment created successfully:", JSON.stringify(paymentData, null, 2))

    const transactionId =
      paymentData.id || paymentData.transactionId || paymentData.data?.id || paymentData.data?.transactionId

    if (!transactionId) {
      console.error("[v0] No transaction ID found in response:", paymentData)
      return NextResponse.json({ success: false, error: "Erro ao obter ID da transação." }, { status: 500 })
    }

    console.log("[v0] Transaction ID:", transactionId)

    const pixData =
      paymentData.pix ||
      paymentData.data?.pix ||
      paymentData.paymentMethod?.pix ||
      paymentData.data?.paymentMethod?.pix ||
      {}

    const qrCodeImage =
      pixData.qrCode ||
      pixData.qrCodeImage ||
      pixData.qrCodeBase64 ||
      paymentData.qrCode ||
      paymentData.qrCodeImage ||
      null

    const copyAndPaste =
      pixData.copyAndPaste ||
      pixData.emvqrcps ||
      pixData.brcode ||
      pixData.code ||
      paymentData.copyAndPaste ||
      paymentData.emvqrcps ||
      null

    const payUrl = pixData.payUrl || pixData.url || paymentData.payUrl || paymentData.checkoutUrl || null

    console.log("[v0] Extracted Pix data:", {
      hasQrCode: !!qrCodeImage,
      hasCopyAndPaste: !!copyAndPaste,
      hasPayUrl: !!payUrl,
    })

    saveDonation({
      donationId: internalDonationId,
      name: name.trim(),
      email: email?.trim() || null,
      phone: phone?.replace(/\D/g, "") || null,
      amount,
      gatewayOrderId: orderId,
      gatewayTransactionId: transactionId,
      status: "PENDING",
      createdAt: new Date().toISOString(),
    })

    return NextResponse.json({
      success: true,
      donationId: internalDonationId,
      amount,
      pix: {
        qrCodeImage,
        copyAndPaste,
        payUrl,
      },
    })
  } catch (error: any) {
    console.error("[v0] Error in donation creation:", error)
    console.error("[v0] Error stack:", error.stack)
    return NextResponse.json(
      { success: false, error: "Não foi possível gerar o pagamento agora. Tente novamente em instantes." },
      { status: 500 },
    )
  }
}
