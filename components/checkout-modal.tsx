"use client"

import { useState } from "react"

interface CheckoutModalProps {
  open: boolean
  onClose: () => void
  amount: { display: string; value: number } | null
}

export default function CheckoutModal({ open, onClose, amount }: CheckoutModalProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [nameError, setNameError] = useState("")
  const [showPaymentPending, setShowPaymentPending] = useState(false)
  const [pixCode, setPixCode] = useState("")

  if (!open || !amount) return null

  const handleGeneratePayment = async () => {
    if (!name.trim()) {
      setNameError("O nome é obrigatório para gerar o pagamento.")
      return
    }

    setNameError("")
    setIsLoading(true)

    await new Promise((resolve) => setTimeout(resolve, 1000))

    const mockPixCode = "00020126580014br.gov.bcb.pix0136" + Math.random().toString(36).substring(2, 15)
    setPixCode(mockPixCode)

    setIsLoading(false)
    setShowPaymentPending(true)
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

  const handleCopyPixCode = () => {
    navigator.clipboard.writeText(pixCode)
    alert("Código Pix copiado! Cole no app do seu banco.")
  }

  if (showPaymentPending) {
    return <PaymentPendingScreen amount={amount} pixCode={pixCode} onCopyCode={handleCopyPixCode} />
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
  pixCode,
  onCopyCode,
}: {
  amount: { display: string; value: number }
  pixCode: string
  onCopyCode: () => void
}) {
  return (
    <div className="fixed inset-0 z-[20000] flex items-center justify-center px-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-md md:max-w-lg bg-white rounded-2xl shadow-2xl px-5 py-6 md:px-7 md:py-7 max-h-[90vh] overflow-y-auto">
        <div className="bg-[#FEE2E2] border-2 border-[#DC2626] rounded-xl px-4 py-4 mb-5">
          <h3 className="text-[#991B1B] text-[16px] md:text-[18px] font-extrabold mb-2 text-center">
            Aguarde! Falta só a confirmação do seu pagamento...
          </h3>
          <p className="text-[#7F1D1D] text-[13px] md:text-[14px] leading-relaxed mb-2 text-center">
            <strong>Não feche esta página agora!</strong> É importante concluir o pagamento para garantir que o presente
            chegue até a criança.
          </p>
          <p className="text-[#7F1D1D] text-[13px] md:text-[14px] leading-relaxed text-center">
            Copie o código Pix ou aponte sua câmera para o QR Code abaixo. O presente está quase nas mãos dela!
          </p>
        </div>

        <div className="text-center mb-5">
          <p className="text-[#6B7280] text-[13px] md:text-[14px] mb-1">Valor da doação</p>
          <p className="text-[#C41E3A] text-[32px] md:text-[38px] font-extrabold">R$ {amount.display}</p>
        </div>

        <div className="bg-white border-2 border-[#E5E7EB] rounded-xl p-4 mb-4 flex items-center justify-center">
          <div className="w-48 h-48 bg-[#F3F4F6] rounded-lg flex items-center justify-center">
            <p className="text-[#9CA3AF] text-[12px] text-center px-4">
              QR Code Pix
              <br />
              (simulação)
            </p>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-[13px] md:text-[14px] font-medium text-[#374151] mb-1">
            Código Pix Copia e Cola
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={pixCode}
              readOnly
              className="flex-1 h-[46px] md:h-[48px] px-3 md:px-4 rounded-lg border-2 border-[#E5E7EB] text-[12px] md:text-[13px] text-[#111827] bg-[#F9FAFB]"
            />
            <button
              type="button"
              onClick={onCopyCode}
              className="px-4 h-[46px] md:h-[48px] rounded-lg bg-[#10B981] text-white font-semibold text-[13px] md:text-[14px] hover:bg-[#059669] transition-colors"
            >
              Copiar
            </button>
          </div>
        </div>

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
            Assim que confirmar, você será redirecionado automaticamente.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            window.location.href = "/obrigado"
          }}
          className="mt-4 w-full h-[44px] rounded-lg bg-[#6B7280] text-white font-semibold text-[13px] opacity-50 hover:opacity-70 transition-opacity"
        >
          [TESTE] Simular pagamento confirmado
        </button>
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

  useState(() => {
    const interval = setInterval(() => {
      setCurrentProof((prev) => (prev + 1) % proofs.length)
    }, 10000)
    return () => clearInterval(interval)
  })

  return (
    <div className="bg-[#ECFDF5] border border-[#10B981] rounded-lg px-3 py-2 text-center">
      <p className="text-[#065F46] text-[12px] md:text-[13px] font-medium animate-pulse">{proofs[currentProof]}</p>
    </div>
  )
}
