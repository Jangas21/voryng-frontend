'use client'

import { useEffect, useRef } from 'react'

interface Point {
  x: number
  y: number
  vx: number
  vy: number
  tx: number
  ty: number
}

export default function NetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const points = useRef<Point[]>([])
  const scrollProgress = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const TOTAL = 80
    const w = canvas.width
    const h = canvas.height

    // Puntos iniciales dispersos
    points.current = Array.from({ length: TOTAL }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2,
      tx: 0,
      ty: 0,
    }))

    // Forma de V similar a la original pero más "gorda" (más capas y densidad)
    const vShape: { x: number; y: number }[] = []
    const layers = 4 // cuantas capas verticales tiene la V (más = más "gorda")
    const steps = TOTAL / (2 * layers)
    const offsetX = w * 0.25
    const offsetY = h * 0.75
    const scale = h * 0.35

    for (let l = 0; l < layers; l++) {
        const layerOffset = (l / (layers - 1) - 0.5) * (h * 0.05) // grosor vertical
        for (let i = 0; i < steps; i++) {
            const t = i / (steps - 1)
            const leftX = offsetX - t * scale
            const rightX = offsetX + t * scale
            const y = offsetY - t * scale + layerOffset
            vShape.push({ x: leftX, y })
            vShape.push({ x: rightX, y })
        }
    }



    for (let i = 0; i < points.current.length; i++) {
      const v = vShape[i % vShape.length]
      points.current[i].tx = v.x
      points.current[i].ty = v.y
    }

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t
    const clamp = (n: number, a: number, b: number) => Math.max(a, Math.min(b, n))

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      const t = scrollProgress.current

      for (const p of points.current) {
        // Movimiento natural
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > w) p.vx *= -1
        if (p.y < 0 || p.y > h) p.vy *= -1

        // Atracción a la V
        // Controla la atracción/dispersión según dirección del scroll
        const lastT = scrollProgress.current
        const newT = t
        const isGoingDown = newT >= lastT

        // Si se sube, dispersar más rápido
        const approachSpeed = isGoingDown ? 0.07 : 0.15
        const intensity = t * approachSpeed

        p.x = lerp(p.x, p.tx, intensity)
        p.y = lerp(p.y, p.ty, intensity)

        // Guarda el último valor
        scrollProgress.current = newT
      }

      // Dibujar conexiones
      const maxDist = 100 + t * 150
      for (let i = 0; i < points.current.length; i++) {
        const p1 = points.current[i]
        for (let j = i + 1; j < points.current.length; j++) {
          const p2 = points.current[j]
          const dx = p1.x - p2.x
          const dy = p1.y - p2.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < maxDist) {
            const alpha = 1 - dist / maxDist
            ctx.strokeStyle = `rgba(0, 255, 255, ${alpha * 0.3})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.stroke()
          }
        }
      }

      // Puntos
      for (const p of points.current) {
        ctx.beginPath()
        ctx.arc(p.x, p.y, 1.6, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(0,255,255,0.55)'
        ctx.fill()
      }

      requestAnimationFrame(draw)
    }
    draw()

    const handleScroll = () => {
      const contact = document.getElementById('contact')
      if (!contact) return
      const rect = contact.getBoundingClientRect()
      const viewH = window.innerHeight

      // Progreso de aparición basado en visibilidad de la sección "Contacto"
      const visibleRatio = clamp((viewH - rect.top) / (rect.height + viewH * 0.5), 0, 1)
      scrollProgress.current = visibleRatio
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
    />
    
  )
}
