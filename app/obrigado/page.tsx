"use client"

import { useEffect, useState } from "react"
import CheckoutModal from "@/components/checkout-modal"

export default function ThankYouPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedAmount] = useState({ display: "29,90", value: 29.9 })
  const [upsellPaid, setUpsellPaid] = useState(false)
  const [showConfirmationAnimation, setShowConfirmationAnimation] = useState(false)
  const [lastDonorData, setLastDonorData] = useState<{
    name: string
    email?: string
    phone?: string
  } | null>(null)

  useEffect(() => {
    window.scrollTo(0, 0)

    const storedData = localStorage.getItem("lastDonorData")
    if (storedData) {
      try {
        const parsed = JSON.parse(storedData)
        console.log("[v0] Loaded donor data from localStorage:", parsed)
        setLastDonorData(parsed)
      } catch (error) {
        console.error("[v0] Error parsing stored donor data:", error)
      }
    } else {
      console.log("[v0] No donor data found in localStorage")
    }
  }, [])

  const handleUpsellClick = () => {
    if (!lastDonorData?.name) {
      console.log("[v0] No donor data available, showing alert")
      alert("Não conseguimos recuperar seus dados da doação anterior. Por favor, preencha o formulário novamente.")
      setIsModalOpen(true)
      return
    }

    console.log("[v0] Opening upsell modal with pre-filled data:", lastDonorData)
    setIsModalOpen(true)
  }

  const handleUpsellPaymentConfirmed = () => {
    console.log("[v0] Upsell payment confirmed, showing animation")

    // Close modal
    setIsModalOpen(false)

    // Show confirmation animation
    setShowConfirmationAnimation(true)

    // Hide animation after 3 seconds and mark upsell as paid
    setTimeout(() => {
      setShowConfirmationAnimation(false)
      setUpsellPaid(true)

      // Scroll to top of thank you section
      window.scrollTo({ top: 0, behavior: "smooth" })
    }, 3000)
  }

  return (
    <>
      {showConfirmationAnimation && (
        <div className="fixed inset-0 z-[25000] flex items-center justify-center px-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl px-8 py-10 text-center max-w-md animate-scale-in">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-[#10B981] to-[#059669] flex items-center justify-center">
              <span className="text-5xl text-white">✓</span>
            </div>
            <h3 className="text-[#10B981] text-[22px] md:text-[26px] font-extrabold mb-3">Doação extra confirmada!</h3>
            <p className="text-[#374151] text-[15px] md:text-[17px] leading-relaxed">
              Obrigado por aumentar ainda mais o seu impacto. Você está fazendo a diferença!
            </p>
          </div>
        </div>
      )}

      <main className="min-h-screen bg-gradient-to-b from-[#F9FAFB] to-white px-4 py-12">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-[#10B981] to-[#059669] flex items-center justify-center animate-bounce-slow">
            <span className="text-4xl md:text-5xl text-white">✓</span>
          </div>

          <h1 className="text-[#C41E3A] text-[26px] md:text-[32px] font-extrabold mb-4 leading-tight">
            Obrigado por transformar o Natal de uma criança!
          </h1>

          <p className="text-[#374151] text-[15px] md:text-[17px] leading-relaxed mb-8 max-w-2xl mx-auto">
            Sua generosidade traz alegria para quem nunca teve chance de sonhar. Ajude-nos a ir ainda mais longe!
          </p>

          <div className="max-w-[420px] mx-auto mb-8 bg-[#FFF7ED] border-l-4 border-[#F59E0B] rounded-xl px-5 py-5 md:px-6 md:py-6 shadow-lg">
            {upsellPaid ? (
              <>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D1FAE5] border border-[#10B981] mb-3">
                  <span className="text-[12px] md:text-[13px] font-semibold text-[#065F46]">
                    ✅ DOAÇÃO EXTRA CONFIRMADA
                  </span>
                </div>
                <h3 className="text-[#10B981] text-[18px] md:text-[20px] font-extrabold mb-2">
                  Você já fez uma doação extra neste Natal!
                </h3>
                <p className="text-[#374151] text-[14px] md:text-[15px] leading-relaxed">
                  Obrigado por sua generosidade adicional. Seu impacto foi multiplicado!
                </p>
              </>
            ) : (
              <>
                <h3 className="text-[#C41E3A] text-[18px] md:text-[20px] font-extrabold mb-2">
                  Quer aumentar ainda mais seu impacto?
                </h3>
                <p className="text-[#374151] text-[14px] md:text-[15px] leading-relaxed mb-4">
                  Com mais R$ 29,90 você garante a logística e ajuda a presentear ainda mais crianças.
                </p>
                <button
                  type="button"
                  onClick={handleUpsellClick}
                  className="w-full max-w-[280px] h-[46px] md:h-[48px] rounded-lg bg-gradient-to-r from-[#F59E0B] to-[#C41E3A] text-white font-bold text-[14px] md:text-[15px] shadow-md btn-cta btn-pulse"
                >
                  Doar mais R$ 29,90 para logística
                </button>
              </>
            )}
          </div>

          {/* Payment confirmation steps */}
          <div className="bg-white border border-[#E5E7EB] rounded-2xl px-6 py-6 md:px-8 md:py-8 shadow-lg mb-8">
            <h2 className="text-[#111827] text-[18px] md:text-[20px] font-bold mb-4">O que acontece agora?</h2>
            <div className="space-y-4 text-left">
              <div className="flex items-start gap-3">
                <span className="text-2xl">📱</span>
                <div>
                  <p className="text-[#111827] text-[15px] md:text-[16px] font-semibold">1. Confirmação do pagamento</p>
                  <p className="text-[#6B7280] text-[14px] md:text-[15px]">
                    Você receberá um e-mail e/ou WhatsApp confirmando o recebimento da sua doação.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">🎁</span>
                <div>
                  <p className="text-[#111827] text-[15px] md:text-[16px] font-semibold">2. Compra do presente</p>
                  <p className="text-[#6B7280] text-[14px] md:text-[15px]">
                    Seu valor é convertido em um presente real, selecionado com cuidado pela equipe.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">🚚</span>
                <div>
                  <p className="text-[#111827] text-[15px] md:text-[16px] font-semibold">3. Logística e entrega</p>
                  <p className="text-[#6B7280] text-[14px] md:text-[15px]">
                    O presente é enviado diretamente para a criança, antes do Natal.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">📸</span>
                <div>
                  <p className="text-[#111827] text-[15px] md:text-[16px] font-semibold">4. Transparência total</p>
                  <p className="text-[#6B7280] text-[14px] md:text-[15px]">
                    Quando possível, você recebe fotos e atualizações sobre a entrega.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <p className="text-[#9CA3AF] text-[14px] md:text-[15px] italic leading-relaxed mt-8">
            "A solidariedade conecta vidas. Neste Natal, você fez parte de algo maior."
          </p>

          <div className="mt-8">
            <a href="/" className="text-[#C41E3A] text-[14px] md:text-[15px] font-semibold hover:underline">
              ← Voltar para a página inicial
            </a>
          </div>
        </div>
      </main>

      <CheckoutModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        amount={selectedAmount}
        source="upsell_thankyou"
        onPaymentConfirmed={handleUpsellPaymentConfirmed}
        skipForm={!!lastDonorData}
        preFillData={lastDonorData || undefined}
      />
    </>
  )
}
