// In-memory donation storage
// TODO: Replace with database implementation in production
export interface Donation {
  donationId: string
  name: string
  email: string | null
  phone: string | null
  amount: number
  gatewayOrderId: string
  gatewayTransactionId: string
  status: "PENDING" | "PAID" | "REFUSED" | "EXPIRED"
  createdAt: string
}

// In-memory store (will be reset on server restart)
const donationStore: Map<string, Donation> = new Map()

export function saveDonation(donation: Donation): void {
  donationStore.set(donation.donationId, donation)
  console.log(`[v0] Donation saved to store: ${donation.donationId}`)
}

export function getDonation(donationId: string): Donation | undefined {
  return donationStore.get(donationId)
}

export function getDonationByOrderId(orderId: string): Donation | undefined {
  for (const donation of donationStore.values()) {
    if (donation.gatewayOrderId === orderId) {
      return donation
    }
  }
  return undefined
}

export function getDonationByTransactionId(transactionId: string): Donation | undefined {
  for (const donation of donationStore.values()) {
    if (donation.gatewayTransactionId === transactionId) {
      return donation
    }
  }
  return undefined
}

export function updateDonationStatus(donationId: string, status: "PENDING" | "PAID" | "REFUSED" | "EXPIRED"): boolean {
  const donation = donationStore.get(donationId)
  if (!donation) return false

  donation.status = status
  donationStore.set(donationId, donation)
  console.log(`[v0] Donation status updated: ${donationId} -> ${status}`)
  return true
}

export function getAllDonations(): Donation[] {
  return Array.from(donationStore.values())
}
