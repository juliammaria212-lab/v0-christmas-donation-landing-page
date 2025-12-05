"use client"

import { useEffect } from "react"

const faqData = [
  {
    question: "Como funciona a entrega dos presentes?",
    answer:
      "Após a confirmação do pagamento, sua doação é direcionada para a compra do presente e a logística de envio. Os presentes são enviados diretamente para as crianças cadastradas, e você pode receber atualizações sobre o andamento.",
  },
  {
    question: "Meu pagamento é seguro?",
    answer:
      "Sim! Utilizamos gateways de pagamento certificados e criptografia SSL em todas as transações. Seus dados bancários nunca são armazenados em nossos servidores.",
  },
  {
    question: "Para onde vai exatamente meu dinheiro?",
    answer:
      "100% do valor doado é convertido em presentes físicos (brinquedos, roupas, materiais escolares) e logística de entrega. Temos parceria com fornecedores que nos dão preços especiais, garantindo que cada real seja maximizado.",
  },
  {
    question: "Vou receber comprovante da doação?",
    answer:
      "Sim! Você receberá um comprovante por e-mail imediatamente após a confirmação do pagamento. Além disso, enviamos atualizações sobre a entrega do presente quando disponível.",
  },
  {
    question: "Posso cancelar minha doação?",
    answer:
      "Doações confirmadas não podem ser canceladas, pois os presentes são comprados imediatamente. Em caso de dúvidas antes de doar, entre em contato conosco pelo WhatsApp.",
  },
]

export default function FaqAccordion() {
  useEffect(() => {
    const items = document.querySelectorAll(".faq-item")

    items.forEach((item) => {
      const btn = item.querySelector("button[data-faq]")
      const answer = item.querySelector(".faq-answer") as HTMLElement
      const icon = item.querySelector(".faq-icon")

      if (!btn || !answer || !icon) return

      btn.addEventListener("click", () => {
        const isOpen = answer.style.maxHeight && answer.style.maxHeight !== "0px"

        // Close all
        items.forEach((i) => {
          const a = i.querySelector(".faq-answer") as HTMLElement
          const ic = i.querySelector(".faq-icon")
          if (a && ic) {
            a.style.maxHeight = "0px"
            ic.textContent = "+"
          }
        })

        // Open this one if it was closed
        if (!isOpen) {
          answer.style.maxHeight = answer.scrollHeight + "px"
          icon.textContent = "−"
        }
      })
    })
  }, [])

  return (
    <section className="px-4 md:px-8 py-10 bg-white">
      <div className="max-w-3xl mx-auto fade-in-scroll">
        <h3 className="text-[#C41E3A] text-[20px] md:text-[24px] font-extrabold text-center mb-4">
          Perguntas Frequentes
        </h3>
        <div className="divide-y divide-[#E5E7EB] rounded-xl border border-[#E5E7EB] bg-[#F9FAFB]">
          {faqData.map((item, index) => (
            <div key={index} className="faq-item">
              <button
                type="button"
                className="w-full flex items-center justify-between px-4 md:px-5 py-3 md:py-4 text-left text-[#111827] text-[15px] md:text-[16px] font-semibold hover:bg-[#F3F4F6] transition-colors"
                data-faq={index}
              >
                <span>{item.question}</span>
                <span className="faq-icon text-[#9CA3AF] text-xl">+</span>
              </button>
              <div className="faq-answer max-h-0 overflow-hidden px-4 md:px-5 text-[14px] md:text-[15px] text-[#374151] bg-white transition-[max-height] duration-300 ease-out">
                <div className="py-3">{item.answer}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
