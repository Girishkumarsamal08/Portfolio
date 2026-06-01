"use client"

import React, { useEffect, useRef } from "react"

export default function NightSkyBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let stars: Star[] = []
    let meteors: Meteor[] = []

    class Star {
      x: number
      y: number
      size: number
      opacity: number
      twinkleSpeed: number

      constructor() {
        this.x = Math.random() * canvas!.width
        this.y = Math.random() * canvas!.height
        this.size = Math.random() * 1.5
        this.opacity = Math.random()
        this.twinkleSpeed = 0.005 + Math.random() * 0.015
      }

      update() {
        this.opacity += this.twinkleSpeed
        if (this.opacity > 1 || this.opacity < 0.2) {
          this.twinkleSpeed *= -1
        }
      }

      draw() {
        if (!ctx) return
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    class Meteor {
      x: number
      y: number
      length: number
      speed: number
      angle: number
      active: boolean

      constructor() {
        this.active = false
        this.reset()
      }

      reset() {
        this.x = Math.random() * canvas!.width
        this.y = -20
        this.length = 80 + Math.random() * 120
        this.speed = 10 + Math.random() * 15
        this.angle = 0.7 + Math.random() * 0.3
        this.active = false
      }

      launch() {
        this.x = Math.random() * canvas!.width
        this.y = 0
        this.active = true
      }

      update() {
        if (!this.active) return
        this.x += this.speed * Math.cos(this.angle)
        this.y += this.speed * Math.sin(this.angle)

        if (this.y > canvas!.height || this.x > canvas!.width) {
          this.active = false
        }
      }

      draw() {
        if (!this.active || !ctx) return
        const grad = ctx.createLinearGradient(
          this.x,
          this.y,
          this.x - this.length * Math.cos(this.angle),
          this.y - this.length * Math.sin(this.angle)
        )
        grad.addColorStop(0, "rgba(255, 255, 255, 0.8)")
        grad.addColorStop(1, "rgba(255, 255, 255, 0)")

        ctx.strokeStyle = grad
        ctx.lineWidth = 1.5
        ctx.beginPath()
        ctx.moveTo(this.x, this.y)
        ctx.lineTo(
          this.x - this.length * Math.cos(this.angle),
          this.y - this.length * Math.sin(this.angle)
        )
        ctx.stroke()
      }
    }

    const init = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      
      stars = []
      const starCount = Math.floor((canvas.width * canvas.height) / 4000)
      for (let i = 0; i < starCount; i++) {
        stars.push(new Star())
      }

      meteors = [new Meteor(), new Meteor()]
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      stars.forEach((star) => {
        star.update()
        star.draw()
      })

      meteors.forEach((meteor) => {
        if (!meteor.active && Math.random() < 0.002) {
          meteor.launch()
        }
        meteor.update()
        meteor.draw()
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    const handleResize = () => {
      init()
    }

    init()
    animate()

    window.addEventListener("resize", handleResize)

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-10 pointer-events-none bg-[#050505]"
      style={{ background: "radial-gradient(ellipse at bottom, #0d1d31 0%, #0c0d13 100%)" }}
    />
  )
}
