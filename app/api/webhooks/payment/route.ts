import { type NextRequest, NextResponse } from "next/server"
import { getDonationByTransactionId, updateDonationStatus } from "@/lib/donation-store"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    console.log("[v0] Webhook received:", JSON.stringify(body, null, 2))

    const transactionId = body.transactionId || body.id || body.data?.transactionId || body.data?.id
    const status = body.status || body.paymentStatus || body.data?.status

    if (!transactionId) {
      console.error("[v0] Webhook missing transactionId")
      return NextResponse.json({ received: true }, { status: 200 })
    }

    console.log("[v0] Processing webhook:", { transactionId, status })

    const donation = getDonationByTransactionId(transactionId)

    if (!donation) {
      console.log("[v0] Donation not found for transaction:", transactionId)
      return NextResponse.json({ received: true }, { status: 200 })
    }

    const statusUpper = status?.toUpperCase()
    const paidStatuses = ["PAID", "APPROVED", "CONFIRMED", "SUCCESSFUL", "COMPLETED"]
    const refusedStatuses = ["REFUSED", "CANCELLED", "FAILED", "REJECTED"]
    const expiredStatuses = ["EXPIRED", "TIMEOUT"]

    let newStatus: "PENDING" | "PAID" | "REFUSED" | "EXPIRED" = "PENDING"

    if (paidStatuses.includes(statusUpper)) {
      newStatus = "PAID"
      console.log("[v0] Payment confirmed! Donation:", donation.donationId)
    } else if (refusedStatuses.includes(statusUpper)) {
      newStatus = "REFUSED"
      console.log("[v0] Payment refused. Donation:", donation.donationId)
    } else if (expiredStatuses.includes(statusUpper)) {
      newStatus = "EXPIRED"
      console.log("[v0] Payment expired. Donation:", donation.donationId)
    } else {
      console.log("[v0] Unhandled payment status:", status)
    }

    if (newStatus !== "PENDING") {
      updateDonationStatus(donation.donationId, newStatus)
    }

    return NextResponse.json({ received: true })
  } catch (error: any) {
    console.error("[v0] Error processing webhook:", error)
    return NextResponse.json({ received: true, error: error.message })
  }
}
