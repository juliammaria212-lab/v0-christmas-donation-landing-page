// Timer de header
function initHeaderTimer() {
  if (typeof window === "undefined") return

  const daysEl = document.getElementById("header-days")
  const hoursEl = document.getElementById("header-hours")
  const minutesEl = document.getElementById("header-minutes")
  const secondsEl = document.getElementById("header-seconds")

  if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return

  function getNextChristmas() {
    const now = new Date()
    let year = now.getFullYear()
    const christmas = new Date(year, 11, 25, 0, 0, 0)
    if (now > christmas) {
      year += 1
      return new Date(year, 11, 25, 0, 0, 0)
    }
    return christmas
  }

  const target = getNextChristmas().getTime()

  function updateTimer() {
    const now = Date.now()
    let diff = target - now
    if (diff < 0) diff = 0

    const d = Math.floor(diff / (1000 * 60 * 60 * 24))
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24)
    const m = Math.floor((diff / (1000 * 60)) % 60)
    const s = Math.floor((diff / 1000) % 60)

    daysEl.textContent = String(d).padStart(2, "0")
    hoursEl.textContent = String(h).padStart(2, "0")
    minutesEl.textContent = String(m).padStart(2, "0")
    secondsEl.textContent = String(s).padStart(2, "0")
  }

  updateTimer()
  setInterval(updateTimer, 1000)
}

// Contador de visualizações
function initViewsCounter() {
  if (typeof window === "undefined") return

  const el = document.getElementById("views-counter")
  if (!el) return

  let num = Math.floor(Math.random() * 41) + 380

  function render() {
    el.textContent = String(num)
    el.classList.add("views-bump")
    setTimeout(() => el.classList.remove("views-bump"), 400)
  }

  function update() {
    const direction = Math.random() < 0.6 ? 1 : -1
    const delta = Math.floor(Math.random() * 2) + 1
    num += direction * delta
    if (num < 200) num = 202
    if (num > 1000) num = 998
    render()
  }

  render()
  setInterval(update, 6000)
}

// Contador de presentes restantes
function initGiftsCounter() {
  if (typeof window === "undefined") return

  const el = document.getElementById("gifts-remaining")
  if (!el) return

  let remaining = 3222

  function render() {
    el.textContent = String(remaining)
    el.classList.add("gifts-animate")
    setTimeout(() => el.classList.remove("gifts-animate"), 420)
  }

  function tick() {
    if (remaining > 0) {
      remaining -= 1
      render()
    }
  }

  render()
  setInterval(tick, 45000)
}

// Barra de progresso
function initProgressBar() {
  if (typeof window === "undefined") return

  const fill = document.getElementById("progress-fill")
  if (!fill) return

  function animateBar() {
    fill.style.transition = "width 1.6s ease-out"
    fill.style.width = "67%"
  }

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateBar()
            observer.disconnect()
          }
        })
      },
      { threshold: 0.35 },
    )
    observer.observe(fill.parentElement)
  } else {
    setTimeout(animateBar, 600)
  }
}

// Contador de crianças ajudadas
function initChildrenCounter() {
  if (typeof window === "undefined") return

  const el = document.getElementById("children-counter")
  if (!el) return

  let value = 1452

  function render() {
    el.textContent = value.toLocaleString("pt-BR")
    el.classList.add("children-bump")
    setTimeout(() => el.classList.remove("children-bump"), 450)
  }

  render()
  setInterval(() => {
    value += Math.floor(Math.random() * 3)
    render()
  }, 7000)
}

// Microcopy dos cards
function initCardCounts() {
  if (typeof window === "undefined") return

  const cardCounts = {
    1990: Math.floor(Math.random() * 10) + 10,
    2990: Math.floor(Math.random() * 15) + 20,
    4990: Math.floor(Math.random() * 30) + 220,
    7990: Math.floor(Math.random() * 20) + 35,
    9700: Math.floor(Math.random() * 15) + 45,
    19700: Math.floor(Math.random() * 10) + 18,
  }

  function renderAll() {
    Object.keys(cardCounts).forEach((price) => {
      const id = `count-${price}`
      const el = document.getElementById(id)
      if (el) el.textContent = cardCounts[price]
    })
  }

  renderAll()

  setInterval(() => {
    Object.keys(cardCounts).forEach((price) => {
      if (Math.random() > 0.5) {
        cardCounts[price] += 1
        const id = `count-${price}`
        const el = document.getElementById(id)
        if (el) {
          el.textContent = cardCounts[price]
          el.classList.add("count-bump")
          setTimeout(() => el.classList.remove("count-bump"), 300)
        }
      }
    })
  }, 12000)
}

// Campo de valor personalizado
function initCustomAmountField() {
  if (typeof window === "undefined") return

  const input = document.getElementById("custom-amount")
  const btn = document.getElementById("custom-amount-btn")
  const error = document.getElementById("custom-amount-error")

  if (!input || !btn || !error) return

  function formatToBRL(value) {
    const number = Number(value) / 100
    return number.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    })
  }

  function parseToNumber() {
    const raw = input.value.replace(/\D/g, "")
    return raw ? Number(raw) / 100 : 0
  }

  function validate() {
    const amount = parseToNumber()
    if (amount < 10) {
      error.textContent = "Valor mínimo é R$ 10,00."
      error.classList.remove("hidden")
      btn.disabled = true
      return false
    }
    if (amount > 9999) {
      error.textContent = "Valor máximo recomendado é R$ 9.999,00."
      error.classList.remove("hidden")
      btn.disabled = true
      return false
    }
    error.classList.add("hidden")
    btn.disabled = false
    return true
  }

  input.addEventListener("input", (e) => {
    let v = e.target.value.replace(/\D/g, "")
    if (v.length > 6) v = v.slice(0, 6)

    if (!v) {
      e.target.value = ""
      btn.disabled = true
      error.classList.add("hidden")
      return
    }

    e.target.value = formatToBRL(v)
    validate()
  })

  btn.addEventListener("click", () => {
    if (!validate()) return
    const amount = parseToNumber()
    alert(`Processar doação de R$ ${amount.toFixed(2)}`)
  })
}

// Sticky CTA
function initStickyCta() {
  if (typeof window === "undefined") return

  const btn = document.getElementById("sticky-cta")
  if (!btn) return

  window.addEventListener("scroll", () => {
    const scrollPct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
    if (scrollPct > 30) {
      btn.style.opacity = "1"
      btn.style.transform = "translateY(0)"
    } else {
      btn.style.opacity = "0"
      btn.style.transform = "translateY(32px)"
    }
  })

  btn.addEventListener("click", () => {
    const target = document.getElementById("doacao")
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" })
  })
}

// Exit intent
function initExitIntent() {
  if (typeof window === "undefined") return

  const popup = document.getElementById("exit-popup")
  const closeBtn = document.getElementById("exit-close")
  const goBtn = document.getElementById("exit-go-donate")

  if (!popup || !closeBtn || !goBtn) return

  let shown = false

  function showPopup() {
    if (shown) return
    shown = true
    popup.classList.remove("hidden")
  }

  document.addEventListener("mouseleave", (e) => {
    if (e.clientY <= 0 && window.innerWidth >= 768) {
      showPopup()
    }
  })

  closeBtn.addEventListener("click", () => popup.classList.add("hidden"))
  goBtn.addEventListener("click", () => {
    popup.classList.add("hidden")
    const target = document.getElementById("doacao")
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" })
  })
}

// Fade in scroll observer
function initFadeInScroll() {
  if (typeof window === "undefined") return

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible")
          }
        })
      },
      { threshold: 0.15 },
    )

    document.querySelectorAll(".fade-in-scroll").forEach((el) => {
      observer.observe(el)
    })
  } else {
    document.querySelectorAll(".fade-in-scroll").forEach((el) => {
      el.classList.add("visible")
    })
  }
}

// Social proof popups
function initSocialProofPopups() {
  if (typeof window === "undefined") return

  const container = document.getElementById("social-proof-popups")
  if (!container) return

  // Brazilian full names (first + last name)
  const names = [
    "Camila Soares",
    "Patrícia Ramos",
    "José Alencar",
    "Marcos Vinícius",
    "Fernanda Oliveira",
    "Rafael Andrade",
    "Letícia Silva",
    "Bruno Carvalho",
    "Carla Menezes",
    "Paulo Henrique",
    "Viviane Costa",
    "Thiago Lima",
    "Larissa Martins",
    "André Santos",
    "Juliana Rocha",
    "Lucas Moreira",
    "Tatiana Freitas",
    "Rodrigo Pereira",
    "Caroline Nogueira",
    "Gustavo Ribeiro",
    "Amanda Silva",
    "Felipe Costa",
    "Mariana Alves",
    "Ricardo Barbosa",
    "Gabriela Ferreira",
    "Daniel Souza",
    "Renata Campos",
    "Vinícius Oliveira",
    "Beatriz Santos",
    "Eduardo Lima",
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
    "Goiânia, GO",
    "Belém, PA",
    "Campinas, SP",
    "Florianópolis, SC",
  ]

  const values = [
    // Fixed ticket values
    "19,90",
    "29,90",
    "49,90",
    "79,90",
    "97,00",
    "197,00",
    // Random intermediate values
    "15,00",
    "25,00",
    "32,00",
    "35,00",
    "45,00",
    "55,00",
    "68,00",
    "85,00",
    "95,00",
    "120,00",
    "145,00",
    "150,00",
    "295,00",
    "398,00",
    "598,00",
    "998,00",
  ]

  // Keep track of recently used names to avoid repetition
  const recentNames = []
  const MAX_RECENT = 5

  function getRandomName() {
    // Filter out recently used names
    const availableNames = names.filter((name) => !recentNames.includes(name))

    // If all names have been used recently, clear the history
    if (availableNames.length === 0) {
      recentNames.length = 0
      return names[Math.floor(Math.random() * names.length)]
    }

    const selectedName = availableNames[Math.floor(Math.random() * availableNames.length)]

    // Add to recent names and maintain max size
    recentNames.push(selectedName)
    if (recentNames.length > MAX_RECENT) {
      recentNames.shift()
    }

    return selectedName
  }

  function createPopup() {
    // CRITICAL: Check if there's already a popup visible - if so, don't create a new one
    if (container.children.length > 0) {
      return
    }

    const name = getRandomName()
    const city = cities[Math.floor(Math.random() * cities.length)]
    const value = values[Math.floor(Math.random() * values.length)]
    const minutes = Math.floor(Math.random() * 9) + 1

    const popup = document.createElement("div")
    popup.className =
      "social-popup bg-white border-l-[3px] border-[#C41E3A] rounded-xl px-3 py-2.5 shadow-[0_6px_18px_rgba(15,23,42,0.20)] text-[13px] md:text-[14px] text-[#374151] flex items-start gap-2"

    popup.innerHTML = `
      <span class="text-[#DC2626] text-lg flex-shrink-0">❤</span>
      <div class="flex-1 min-w-0">
        <p class="leading-snug">
          <strong class="font-semibold">${name}</strong> de ${city} acabou de fazer uma doação de
          <strong class="font-bold text-[#F59E0B]">R$ ${value}</strong> há ${minutes} min.
        </p>
        <p class="text-[11px] md:text-[12px] text-[#6B7280] mt-1 leading-tight">
          Obrigado por fazer parte dessa corrente do bem.
        </p>
      </div>
    `

    container.appendChild(popup)
    container.classList.remove("hidden")

    // Display for 7-8 seconds
    const displayTime = Math.floor(Math.random() * 1000) + 7000

    setTimeout(() => {
      // Add hide class for exit animation
      popup.classList.add("hide")

      // Remove from DOM after animation completes
      setTimeout(() => {
        popup.remove()
        // Schedule next popup only after this one is completely removed
        scheduleNextPopup()
      }, 400) // Match the animation duration
    }, displayTime)
  }

  function scheduleNextPopup() {
    // Random delay between 5-12 seconds
    const delay = Math.floor(Math.random() * 7000) + 5000
    setTimeout(createPopup, delay)
  }

  // Start first popup after 3 seconds
  setTimeout(() => {
    createPopup()
  }, 3000)
}

// Auto-init on DOM ready
if (typeof document !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAll)
  } else {
    initAll()
  }
}

function initAll() {
  setTimeout(() => {
    initHeaderTimer()
    initViewsCounter()
    initGiftsCounter()
    initProgressBar()
    initChildrenCounter()
    initCardCounts()
    initCustomAmountField()
    initStickyCta()
    initExitIntent()
    initFadeInScroll()
    initSocialProofPopups() // Initialize social proof popups
  }, 100)
}
