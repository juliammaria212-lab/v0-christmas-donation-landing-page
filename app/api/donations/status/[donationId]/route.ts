import { type NextRequest, NextResponse } from "next/server"
import { getDonation } from "@/lib/donation-store"

export async function GET(request: NextRequest, { params }: { params: { donationId: string } }) {
  try {
    const { donationId } = params

    if (!donationId) {
      return NextResponse.json({ success: false, message: "Donation ID is required" }, { status: 400 })
    }

    console.log("[v0] Checking status for donation:", donationId)

    const donation = getDonation(donationId)

    if (!donation) {
      return NextResponse.json({ success: false, message: "Doação não encontrada." }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      donationId: donation.donationId,
      status: donation.status,
    })
  } catch (error: any) {
    console.error("[v0] Error checking donation status:", error)
    return NextResponse.json({ success: false, message: "Erro ao verificar status." }, { status: 500 })
  }
}
