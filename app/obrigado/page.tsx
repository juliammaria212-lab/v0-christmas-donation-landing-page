"use client"

import { useEffect, useState } from "react"

export default function ThankYouPage() {
  const [showUpsellModal, setShowUpsellModal] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleUpsellClick = () => {
    setShowUpsellModal(true)
  }

  return (
    <>
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

      {showUpsellModal && <UpsellModal onClose={() => setShowUpsellModal(false)} />}
    </>
  )
}

function UpsellModal({ onClose }: { onClose: () => void }) {
  const [name, setName] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleUpsellDonation = async () => {
    if (!name.trim()) {
      alert("Por favor, digite seu nome.")
      return
    }

    setIsLoading(true)

    await new Promise((resolve) => setTimeout(resolve, 1000))

    alert("Redirecionando para pagamento de R$ 29,90...")
    window.location.href = "/"
  }

  return (
    <div className="fixed inset-0 z-[20000] flex items-center justify-center px-4 bg-black/75 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl px-5 py-6 md:px-7 md:py-7">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-[#F3F4F6] text-[#4B5563] text-xl hover:bg-[#E5E7EB] transition-colors"
          aria-label="Fechar"
        >
          ×
        </button>

        <h3 className="text-[#C41E3A] text-[18px] md:text-[20px] font-extrabold mb-2 text-center">
          Doar mais R$ 29,90 para logística
        </h3>
        <p className="text-[#374151] text-[14px] md:text-[15px] text-center mb-4">
          Com essa doação extra, você ajuda a cobrir os custos de transporte e garante que mais presentes cheguem no
          prazo.
        </p>

        <div className="space-y-3">
          <div>
            <label className="block text-[13px] md:text-[14px] font-medium text-[#374151] mb-1">
              Confirme seu nome
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-[46px] md:h-[48px] px-3 md:px-4 rounded-lg border-2 border-[#E5E7EB] text-[14px] md:text-[15px] text-[#111827] focus:outline-none focus:border-[#C41E3A] transition-colors"
              placeholder="Digite seu nome"
            />
          </div>

          <button
            type="button"
            onClick={handleUpsellDonation}
            disabled={isLoading}
            className="w-full h-[48px] rounded-xl bg-gradient-to-r from-[#F59E0B] to-[#C41E3A] text-white font-bold text-[14px] md:text-[15px] tracking-wide shadow-md btn-cta btn-pulse disabled:opacity-50 disabled:animate-none"
          >
            {isLoading ? "GERANDO..." : "CONTINUAR PARA O PAGAMENTO"}
          </button>

          <button
            type="button"
            onClick={onClose}
            className="w-full text-[#6B7280] text-[13px] md:text-[14px] hover:text-[#374151] transition-colors"
          >
            Não, obrigado
          </button>
        </div>
      </div>
    </div>
  )
}
