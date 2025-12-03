"use client"

import { useState, useEffect } from "react"

interface CheckoutModalProps {
  open: boolean
  onClose: () => void
  amount: { display: string; value: number } | null
  source?: string
  onPaymentConfirmed?: () => void
  skipForm?: boolean
  preFillData?: {
    name: string
    email?: string
    phone?: string
  }
}

export default function CheckoutModal({
  open,
  onClose,
  amount,
  source,
  onPaymentConfirmed,
  skipForm = false,
  preFillData,
}: CheckoutModalProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [nameError, setNameError] = useState("")
  const [showPaymentPending, setShowPaymentPending] = useState(false)
  const [pixData, setPixData] = useState<{
    qrCodeImage: string | null
    copyAndPaste: string | null
    payUrl: string | null
  } | null>(null)
  const [donationId, setDonationId] = useState<string | null>(null)
  const [error, setError] = useState("")

  useEffect(() => {
    if (open && skipForm && preFillData && amount) {
      console.log("[v0] Skip form mode - generating payment directly with pre-filled data")
      handleGeneratePayment(preFillData.name, preFillData.email, preFillData.phone)
    }
  }, [open, skipForm, preFillData, amount])

  useEffect(() => {
    if (showPaymentPending && donationId && !skipForm && source !== "upsell_thankyou") {
      const donorData = { name, email, phone }
      console.log("[v0] Storing donor data in localStorage:", donorData)
      localStorage.setItem("lastDonorData", JSON.stringify(donorData))
    }
  }, [showPaymentPending, donationId, name, email, phone, skipForm, source])

  if (!open || !amount) return null

  const handleGeneratePayment = async (donorName?: string, donorEmail?: string, donorPhone?: string) => {
    const finalName = donorName || name
    const finalEmail = donorEmail || email
    const finalPhone = donorPhone || phone

    if (!finalName.trim()) {
      setNameError("O nome é obrigatório para gerar o pagamento.")
      return
    }

    setNameError("")
    setError("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/donations/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: finalName.trim(),
          email: finalEmail.trim() || undefined,
          phone: finalPhone.replace(/\D/g, "") || undefined,
          amount: amount.value,
          source: source || "main",
        }),
      })

      const data = await response.json()

      if (!response.ok || !data.success) {
        const errorMessage = data.message || data.error || "Erro ao gerar pagamento"
        if (errorMessage.includes("Domínio não autorizado") || errorMessage.includes("Hostname não identificado")) {
          setError(
            "⚠️ Configuração pendente: O domínio ainda não foi autorizado no dashboard da UmbrellaPag. Consulte o arquivo CONFIGURAR_DOMINIO_UMBRELLAPAG.md para instruções detalhadas.",
          )
        } else {
          setError(errorMessage)
        }
        setIsLoading(false)
        return
      }

      console.log("[v0] Payment created successfully:", data)

      setDonationId(data.donationId)
      setPixData(data.pix)
      setShowPaymentPending(true)
    } catch (err: any) {
      console.error("[v0] Error generating payment:", err.message)
      setError(err.message || "Erro ao gerar pagamento. Tente novamente.")
    } finally {
      setIsLoading(false)
    }
  }

  const handlePhoneChange = (value: string) => {
    const numbers = value.replace(/\D/g, "")
    let formatted = numbers

    if (numbers.length <= 11) {
      if (numbers.length > 2) {
        formatted = `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`
      }
      if (numbers.length > 7) {
        formatted = `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`
      }
    }

    setPhone(formatted)
  }

  if (showPaymentPending && pixData && donationId) {
    return (
      <PaymentPendingScreen
        amount={amount}
        pixData={pixData}
        donationId={donationId}
        onClose={onClose}
        source={source}
        onPaymentConfirmed={onPaymentConfirmed}
      />
    )
  }

  if (skipForm && isLoading) {
    return (
      <div className="fixed inset-0 z-[20000] flex items-center justify-center px-4 bg-black/75 backdrop-blur-sm">
        <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl px-8 py-10 text-center">
          <div className="w-16 h-16 mx-auto mb-4 border-4 border-[#C41E3A] border-t-transparent rounded-full animate-spin"></div>
          <h3 className="text-[#C41E3A] text-[18px] md:text-[20px] font-bold mb-2">Gerando seu pagamento...</h3>
          <p className="text-[#6B7280] text-[14px] md:text-[15px]">
            Aguarde um instante enquanto preparamos o Pix para você.
          </p>
        </div>
      </div>
    )
  }

  if (skipForm) {
    return null
  }

  return (
    <div className="fixed inset-0 z-[20000] flex items-center justify-center px-4 bg-black/75 backdrop-blur-sm">
      <div className="relative w-full max-w-md md:max-w-lg bg-white rounded-2xl shadow-2xl px-5 py-6 md:px-7 md:py-7">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-[#F3F4F6] text-[#4B5563] text-xl hover:bg-[#E5E7EB] transition-colors"
          aria-label="Fechar"
          disabled={isLoading}
        >
          ×
        </button>

        <h3 className="text-[#C41E3A] text-[20px] md:text-[22px] font-extrabold mb-1 text-center">
          Finalize sua doação de R$ {amount.display}
        </h3>
        <p className="text-[#374151] text-[14px] md:text-[15px] text-center mb-4">
          Preencha seus dados para gerar o pagamento. É rápido e seguro.
        </p>

        {error && (
          <div className="mb-4 bg-[#FEE2E2] border border-[#DC2626] rounded-lg px-3 py-2">
            <p className="text-[#DC2626] text-[13px] md:text-[14px] font-medium">{error}</p>
          </div>
        )}

        <form
          className="space-y-3"
          onSubmit={(e) => {
            e.preventDefault()
            handleGeneratePayment()
          }}
        >
          <div>
            <label className="block text-[13px] md:text-[14px] font-medium text-[#374151] mb-1">
              Nome completo <span className="text-[#DC2626]">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value)
                setNameError("")
              }}
              className={`w-full h-[46px] md:h-[48px] px-3 md:px-4 rounded-lg border-2 ${
                nameError ? "border-[#DC2626]" : "border-[#E5E7EB]"
              } text-[14px] md:text-[15px] text-[#111827] focus:outline-none focus:border-[#C41E3A] transition-colors`}
              placeholder="Digite seu nome completo"
              disabled={isLoading}
            />
            {nameError && <p className="mt-1 text-[12px] text-[#DC2626]">{nameError}</p>}
          </div>

          <div>
            <label className="block text-[13px] md:text-[14px] font-medium text-[#374151] mb-1">
              E-mail (opcional)
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-[46px] md:h-[48px] px-3 md:px-4 rounded-lg border-2 border-[#E5E7EB] text-[14px] md:text-[15px] text-[#111827] focus:outline-none focus:border-[#C41E3A] transition-colors"
              placeholder="seu@email.com"
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="block text-[13px] md:text-[14px] font-medium text-[#374151] mb-1">
              Telefone / WhatsApp (opcional)
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => handlePhoneChange(e.target.value)}
              className="w-full h-[46px] md:h-[48px] px-3 md:px-4 rounded-lg border-2 border-[#E5E7EB] text-[14px] md:text-[15px] text-[#111827] focus:outline-none focus:border-[#C41E3A] transition-colors"
              placeholder="(11) 91234-5678"
              disabled={isLoading}
            />
          </div>

          <p className="text-[12px] md:text-[13px] text-[#6B7280] bg-[#F9FAFB] rounded-lg px-3 py-2">
            Seu nome é obrigatório para gerar o pagamento. E-mail e telefone são opcionais, mas ajudam a enviar a
            confirmação.
          </p>

          <button
            type="submit"
            disabled={isLoading}
            className="mt-3 w-full h-[48px] rounded-xl bg-gradient-to-r from-[#C41E3A] to-[#F59E0B] text-white font-bold text-[14px] md:text-[15px] tracking-wide shadow-md btn-cta btn-pulse cta-slide-in disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isLoading ? "GERANDO PAGAMENTO..." : "GERAR PAGAMENTO AGORA"}
          </button>

          <p className="text-[12px] md:text-[13px] text-[#C41E3A] font-semibold text-center">
            Finalize agora para garantir que o presente seja entregue antes do Natal.
          </p>

          <p className="mt-2 text-[11px] md:text-[12px] text-[#6B7280] text-center">
            Pagamento processado por parceiro seguro. Seus dados são protegidos e usados apenas para esta doação.
          </p>
        </form>
      </div>
    </div>
  )
}

function PaymentPendingScreen({
  amount,
  pixData,
  donationId,
  onClose,
  source,
  onPaymentConfirmed,
}: {
  amount: { display: string; value: number }
  pixData: {
    qrCodeImage: string | null
    copyAndPaste: string | null
    payUrl: string | null
  }
  donationId: string
  onClose: () => void
  source?: string
  onPaymentConfirmed?: () => void
}) {
  const [isChecking, setIsChecking] = useState(false)

  useEffect(() => {
    let pollInterval: NodeJS.Timeout

    const checkPaymentStatus = async () => {
      if (isChecking) return

      setIsChecking(true)
      try {
        const response = await fetch(`/api/donations/status/${donationId}`)
        const data = await response.json()

        console.log("[v0] Payment status check:", data)

        if (data.success && data.status === "PAID") {
          console.log("[v0] Payment confirmed!")
          clearInterval(pollInterval)

          if (source === "upsell_thankyou") {
            console.log("[v0] Upsell payment confirmed, triggering callback")
            if (onPaymentConfirmed) {
              onPaymentConfirmed()
            }
          } else {
            console.log("[v0] Main donation confirmed, redirecting to thank you page")
            window.location.href = "/obrigado"
          }
        } else if (data.status === "REFUSED" || data.status === "EXPIRED") {
          console.log("[v0] Payment failed:", data.status)
          clearInterval(pollInterval)
          alert("Seu pagamento não foi confirmado. Se quiser, tente gerar um novo Pix.")
          onClose()
        }
      } catch (error) {
        console.error("[v0] Error checking payment status:", error)
      } finally {
        setIsChecking(false)
      }
    }

    const startDelay = setTimeout(() => {
      checkPaymentStatus()
      pollInterval = setInterval(checkPaymentStatus, 10000)
    }, 5000)

    return () => {
      clearTimeout(startDelay)
      if (pollInterval) clearInterval(pollInterval)
    }
  }, [donationId, onClose, isChecking, source, onPaymentConfirmed])

  const handleCopyPixCode = () => {
    if (pixData.copyAndPaste) {
      navigator.clipboard.writeText(pixData.copyAndPaste)
      alert("Código Pix copiado! Cole no app do seu banco.")
    }
  }

  return (
    <div className="fixed inset-0 z-[20000] flex items-center justify-center px-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-md md:max-w-lg bg-white rounded-2xl shadow-2xl px-5 py-6 md:px-7 md:py-7 max-h-[90vh] overflow-y-auto">
        <div className="bg-[#FEE2E2] border-2 border-[#DC2626] rounded-xl px-4 py-4 mb-5">
          <h3 className="text-[#991B1B] text-[16px] md:text-[18px] font-extrabold mb-2 text-center">
            Não feche esta página antes de concluir o pagamento!
          </h3>
          <p className="text-[#7F1D1D] text-[13px] md:text-[14px] leading-relaxed text-center">
            Assim que o Pix for confirmado, seu presente entra na fila de entrega e você será redirecionado
            automaticamente.
          </p>
        </div>

        {pixData.qrCodeImage && (
          <div className="bg-white border-2 border-[#E5E7EB] rounded-xl p-4 mb-4 flex items-center justify-center">
            <img
              src={
                pixData.qrCodeImage.startsWith("data:")
                  ? pixData.qrCodeImage
                  : `data:image/png;base64,${pixData.qrCodeImage}`
              }
              alt="QR Code Pix"
              className="w-48 h-48 rounded-lg"
            />
          </div>
        )}

        {pixData.copyAndPaste && (
          <div className="mb-4">
            <label className="block text-[13px] md:text-[14px] font-medium text-[#374151] mb-1">
              Copie o código Pix abaixo ou aponte a câmera do seu banco para o QR Code:
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={pixData.copyAndPaste}
                readOnly
                className="flex-1 h-[46px] md:h-[48px] px-3 md:px-4 rounded-lg border-2 border-[#E5E7EB] text-[12px] md:text-[13px] text-[#111827] bg-[#F9FAFB]"
              />
              <button
                type="button"
                onClick={handleCopyPixCode}
                className="px-4 h-[46px] md:h-[48px] rounded-lg bg-[#10B981] text-white font-semibold text-[13px] md:text-[14px] hover:bg-[#059669] transition-colors"
              >
                Copiar
              </button>
            </div>
          </div>
        )}

        {pixData.payUrl && (
          <div className="mb-4">
            <a
              href={pixData.payUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full h-[46px] rounded-lg bg-[#3B82F6] text-white font-semibold text-[14px] flex items-center justify-center hover:bg-[#2563EB] transition-colors"
            >
              Abrir página de pagamento
            </a>
          </div>
        )}

        <SocialProofTicker />

        <div className="bg-[#F9FAFB] rounded-xl px-4 py-4 mt-4">
          <p className="text-[#374151] text-[13px] md:text-[14px] leading-relaxed mb-2">
            <strong>Como pagar:</strong>
          </p>
          <ol className="text-[#6B7280] text-[12px] md:text-[13px] leading-relaxed space-y-1 list-decimal list-inside">
            <li>Abra o app do seu banco</li>
            <li>Escolha pagar com Pix QR Code ou Pix Copia e Cola</li>
            <li>Escaneie o QR Code acima ou cole o código</li>
            <li>Confirme o pagamento de R$ {amount.display}</li>
          </ol>
          <p className="text-[#C41E3A] text-[12px] md:text-[13px] font-semibold mt-3 text-center">
            {source === "upsell_thankyou"
              ? "Assim que confirmar, você receberá uma confirmação visual."
              : "Assim que confirmar, você será redirecionado automaticamente."}
          </p>
        </div>
      </div>
    </div>
  )
}

function SocialProofTicker() {
  const [currentProof, setCurrentProof] = useState(0)

  const proofs = [
    "Enquanto você finaliza sua doação, +2 pessoas confirmaram o Pix e já estão mudando o Natal de alguém.",
    "Patrícia de Belo Horizonte confirmou há 1 min.",
    "Carlos de São Paulo doou R$ 49,90 há 2 min.",
    "Ana de Curitiba confirmou há 3 min.",
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentProof((prev) => (prev + 1) % proofs.length)
    }, 10000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-[#ECFDF5] border border-[#10B981] rounded-lg px-3 py-2 text-center">
      <p className="text-[#065F46] text-[12px] md:text-[13px] font-medium animate-pulse">{proofs[currentProof]}</p>
    </div>
  )
}
