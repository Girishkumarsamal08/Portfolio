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
            x: number; y: number; size: number; opacity: number; speed: number;
            constructor() {
                this.x = Math.random() * canvas!.width
                this.y = Math.random() * canvas!.height
                this.size = Math.random() * 1.5
                this.opacity = Math.random()
                this.speed = 0.01 + Math.random() * 0.02
            }
            draw() {
                this.opacity += this.speed
                if (this.opacity > 1 || this.opacity < 0) this.speed *= -1
                ctx!.fillStyle = `rgba(255, 255, 255, ${this.opacity})`
                ctx!.beginPath()
                ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2)
                ctx!.fill()
            }
        }

        class Meteor {
            x: number; y: number; length: number; speed: number; opacity: number;
            constructor() {
                this.reset()
            }
            reset() {
                this.x = Math.random() * canvas!.width
                this.y = -20
                this.length = 50 + Math.random() * 100
                this.speed = 10 + Math.random() * 15
                this.opacity = 1
            }
            draw() {
                this.x -= this.speed
                this.y += this.speed
                this.opacity -= 0.02
                if (this.opacity <= 0) {
                    this.reset()
                    return
                }
                const gradient = ctx!.createLinearGradient(this.x, this.y, this.x + this.length, this.y - this.length)
                gradient.addColorStop(0, `rgba(255, 255, 255, ${this.opacity})`)
                gradient.addColorStop(1, "rgba(255, 255, 255, 0)")
                ctx!.strokeStyle = gradient
                ctx!.lineWidth = 2
                ctx!.beginPath()
                ctx!.moveTo(this.x, this.y)
                ctx!.lineTo(this.x + this.length, this.y - this.length)
                ctx!.stroke()
            }
        }

        const init = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
            stars = Array.from({ length: 150 }, () => new Star())
            meteors = []
        }

        const animate = () => {
            ctx.fillStyle = "black"
            ctx.fillRect(0, 0, canvas.width, canvas.height)
            stars.forEach(star => star.draw())
            if (Math.random() < 0.01) meteors.push(new Meteor())
            meteors.forEach((meteor, index) => {
                meteor.draw()
                if (meteor.opacity <= 0) meteors.splice(index, 1)
            })
            animationFrameId = requestAnimationFrame(animate)
        }

        init()
        animate()
        window.addEventListener("resize", init)

        return () => {
            cancelAnimationFrame(animationFrameId)
            window.removeEventListener("resize", init)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 w-full h-full -z-10 pointer-events-none"
        />
    )
}
