// Timer de header
;(function initHeaderTimer() {
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
})()

// Contador de visualizações
;(function initViewsCounter() {
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
})()

// Contador de presentes restantes
;(function initGiftsCounter() {
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
})()

// Barra de progresso
;(function initProgressBar() {
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
})()

// Contador de crianças ajudadas
;(function initChildrenCounter() {
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
})()

// Microcopy dos cards
;(function initCardCounts() {
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
})()

// Campo de valor personalizado
;(function initCustomAmountField() {
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
})()

// Sticky CTA
;(function initStickyCta() {
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
})()

// Exit intent
;(function initExitIntent() {
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
})()

// Fade in scroll observer
;(function initFadeInScroll() {
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
})()

// Auto-init on DOM ready
if (typeof window !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      setTimeout(() => {
        window.initHeaderTimer()
        window.initViewsCounter()
        window.initGiftsCounter()
        window.initProgressBar()
        window.initChildrenCounter()
        window.initCardCounts()
        window.initCustomAmountField()
        window.initStickyCta()
        window.initExitIntent()
        window.initFadeInScroll()
      }, 100)
    })
  }
}
