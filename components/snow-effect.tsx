"use client"

import { useEffect, useRef } from "react"

export default function SnowEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    function resize() {
      if (!canvas) return
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resize()
    window.addEventListener("resize", resize)

    const flakes: Array<{
      x: number
      y: number
      r: number
      speed: number
      drift: number
      opacity: number
    }> = []

    const NUM_FLAKES = 60

    for (let i = 0; i < NUM_FLAKES; i++) {
      flakes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 2.5 + 1,
        speed: Math.random() * 0.8 + 0.4,
        drift: Math.random() * 0.6 - 0.3,
        opacity: Math.random() * 0.5 + 0.3,
      })
    }

    let animationFrame: number

    function draw() {
      if (!ctx || !canvas) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      flakes.forEach((flake) => {
        ctx.beginPath()
        ctx.arc(flake.x, flake.y, flake.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${flake.opacity})`
        ctx.fill()

        flake.y += flake.speed
        flake.x += flake.drift

        if (flake.y > canvas.height) {
          flake.y = -10
          flake.x = Math.random() * canvas.width
        }

        if (flake.x > canvas.width) flake.x = 0
        if (flake.x < 0) flake.x = canvas.width
      })

      animationFrame = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      window.removeEventListener("resize", resize)
      cancelAnimationFrame(animationFrame)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 9999,
      }}
    />
  )
}
