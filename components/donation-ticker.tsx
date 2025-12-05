"use client"

import { useEffect } from "react"

export default function DonationTicker() {
  useEffect(() => {
    const container = document.getElementById("donation-ticker")
    if (!container) return

    const names = [
      "Ana",
      "João",
      "Carlos",
      "Mariana",
      "Paulo",
      "Luciana",
      "Bruno",
      "Fernanda",
      "Rafael",
      "Patrícia",
      "Pedro",
      "Juliana",
      "Ricardo",
      "Camila",
      "Roberto",
    ]
    const cities = [
      "São Paulo, SP",
      "Rio de Janeiro, RJ",
      "Belo Horizonte, MG",
      "Curitiba, PR",
      "Porto Alegre, RS",
      "Salvador, BA",
      "Recife, PE",
      "Fortaleza, CE",
      "Brasília, DF",
      "Manaus, AM",
    ]

    const fixedValues = ["R$ 19,90", "R$ 29,90", "R$ 49,90", "R$ 79,90", "R$ 97,00", "R$ 197,00"]
    const intermediateValues = ["R$ 25,00", "R$ 35,00", "R$ 55,00", "R$ 65,00", "R$ 85,00", "R$ 120,00"]
    const allValues = [...fixedValues, ...intermediateValues]

    function createItem() {
      const name = names[Math.floor(Math.random() * names.length)]
      const city = cities[Math.floor(Math.random() * cities.length)]
      const value = allValues[Math.floor(Math.random() * allValues.length)]
      const minutes = Math.floor(Math.random() * 9) + 1

      const el = document.createElement("div")
      el.className =
        "ticker-item bg-white border-l-4 border-[#DC2626] rounded-xl shadow-lg px-3 py-3 text-[13px] text-[#374151] flex items-start gap-2"
      el.innerHTML = `
        <span class="text-[#DC2626] text-lg">❤</span>
        <div>
          <p><strong>${name}</strong> de ${city} doou <strong class="text-[#F59E0B]">${value}</strong> há ${minutes} min.</p>
          <p class="text-[11px] text-[#6B7280] mt-1">Obrigado por fazer parte dessa corrente do bem.</p>
        </div>
      `

      container.appendChild(el)
      el.style.opacity = "0"
      el.style.transform = "translateX(-100%)"

      requestAnimationFrame(() => {
        el.style.transition = "opacity 0.4s ease-out, transform 0.4s ease-out"
        el.style.opacity = "1"
        el.style.transform = "translateX(0)"
      })

      setTimeout(() => {
        el.style.opacity = "0"
        el.style.transform = "translateX(-100%)"
        setTimeout(() => el.remove(), 400)
      }, 9000)
    }

    function loop() {
      createItem()
      const delay = Math.random() * 7000 + 3000
      setTimeout(loop, delay)
    }

    setTimeout(loop, 2000)
  }, [])

  return <div id="donation-ticker" className="fixed bottom-20 left-4 z-[9996] max-w-xs space-y-2 hidden md:block"></div>
}
