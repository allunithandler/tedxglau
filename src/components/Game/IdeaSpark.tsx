"use client"

import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { X, Zap } from 'lucide-react'
import Leaderboard from './Leaderboard'

interface GameProps {
    onClose: () => void
}

interface Particle {
    x: number
    y: number
    vx: number
    vy: number
    life: number
    color: string
    size: number
}

const IdeaSpark = ({ onClose }: GameProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [gameState, setGameState] = useState<'start' | 'playing' | 'gameover'>('start')
    const [score, setScore] = useState(0)
    const requestRef = useRef<number>()
    const scoreRef = useRef(0)

    // Game Constants
    const GRAVITY = 0.5
    const SPEED = 4
    const OBSTACLE_SPAWN_RATE = 1800

    // Game State Refs
    const playerRef = useRef({
        x: 100,
        y: 225,
        dy: 0,
        radius: 18,
        trail: [] as { x: number, y: number, alpha: number }[]
    })
    const obstaclesRef = useRef<{ x: number, y: number, width: number, height: number, type: 'noise' | 'idea', rotation?: number }[]>([])
    const particlesRef = useRef<Particle[]>([])
    const lastSpawnTime = useRef(0)
    const gravityDirection = useRef(1)
    const backgroundOffset = useRef(0)

    const createParticles = (x: number, y: number, color: string, count: number = 15) => {
        for (let i = 0; i < count; i++) {
            const angle = (Math.PI * 2 * i) / count
            const speed = Math.random() * 3 + 2
            particlesRef.current.push({
                x,
                y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                life: 1,
                color,
                size: Math.random() * 4 + 2
            })
        }
    }

    const spawnObstacle = (canvasWidth: number, canvasHeight: number) => {
        const type = Math.random() > 0.7 ? 'idea' : 'noise'
        const height = type === 'idea' ? 35 : Math.random() * 120 + 60
        const y = Math.random() > 0.5 ? canvasHeight - height : 0
        const finalY = type === 'idea' ? Math.random() * (canvasHeight - 80) + 40 : y

        obstaclesRef.current.push({
            x: canvasWidth,
            y: finalY,
            width: type === 'idea' ? 35 : 35,
            height: type === 'idea' ? 35 : height,
            type,
            rotation: type === 'idea' ? 0 : undefined
        })
    }

    const update = (time: number) => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        // Animated Background
        backgroundOffset.current += 0.5
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
        gradient.addColorStop(0, '#0a0a0a')
        gradient.addColorStop(0.5, '#1a0a0a')
        gradient.addColorStop(1, '#0a0a0a')
        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        // Draw grid pattern
        ctx.strokeStyle = 'rgba(230, 43, 30, 0.05)'
        ctx.lineWidth = 1
        for (let i = 0; i < canvas.width; i += 40) {
            ctx.beginPath()
            ctx.moveTo(i - (backgroundOffset.current % 40), 0)
            ctx.lineTo(i - (backgroundOffset.current % 40), canvas.height)
            ctx.stroke()
        }

        const player = playerRef.current

        if (gameState === 'playing') {
            // Physics
            player.dy += GRAVITY * gravityDirection.current
            player.y += player.dy

            // Boundaries with bounce effect
            if (player.y + player.radius > canvas.height) {
                player.y = canvas.height - player.radius
                player.dy = -player.dy * 0.3
                createParticles(player.x, player.y + player.radius, 'rgba(255,255,255,0.5)', 8)
            }
            if (player.y - player.radius < 0) {
                player.y = player.radius
                player.dy = -player.dy * 0.3
                createParticles(player.x, player.y - player.radius, 'rgba(255,255,255,0.5)', 8)
            }

            // Trail effect
            player.trail.unshift({ x: player.x, y: player.y, alpha: 1 })
            if (player.trail.length > 15) player.trail.pop()
            player.trail.forEach((t, i) => {
                t.alpha -= 0.07
            })

            // Spawn Obstacles
            if (time - lastSpawnTime.current > OBSTACLE_SPAWN_RATE) {
                spawnObstacle(canvas.width, canvas.height)
                lastSpawnTime.current = time
            }

            // Update Obstacles
            obstaclesRef.current.forEach((obs, index) => {
                obs.x -= SPEED
                if (obs.type === 'idea' && obs.rotation !== undefined) {
                    obs.rotation += 0.05
                }

                // Collision Detection
                const dx = player.x - (obs.x + obs.width / 2)
                const dy = player.y - (obs.y + obs.height / 2)
                const distance = Math.sqrt(dx * dx + dy * dy)

                if (distance < player.radius + obs.width / 2) {
                    if (obs.type === 'noise') {
                        createParticles(obs.x + obs.width / 2, obs.y + obs.height / 2, '#E62B1E', 25)
                        setGameState('gameover')
                    } else {
                        createParticles(obs.x + obs.width / 2, obs.y + obs.height / 2, '#FFD700', 20)
                        scoreRef.current += 10
                        setScore(scoreRef.current)
                        obstaclesRef.current.splice(index, 1)
                    }
                }

                // Remove off-screen
                if (obs.x + obs.width < 0) {
                    obstaclesRef.current.splice(index, 1)
                    if (obs.type === 'noise') {
                        scoreRef.current += 1
                        setScore(scoreRef.current)
                    }
                }
            })

            // Update Particles
            particlesRef.current.forEach((p, i) => {
                p.x += p.vx
                p.y += p.vy
                p.vy += 0.2
                p.life -= 0.02
                if (p.life <= 0) particlesRef.current.splice(i, 1)
            })
        }

        // Render Trail
        player.trail.forEach((t, i) => {
            if (t.alpha > 0) {
                ctx.beginPath()
                ctx.arc(t.x, t.y, player.radius * (0.8 - i * 0.05), 0, Math.PI * 2)
                ctx.fillStyle = `rgba(255, 255, 255, ${t.alpha * 0.3})`
                ctx.fill()
            }
        })

        // Render Player with glow
        ctx.save()
        ctx.shadowBlur = 25
        ctx.shadowColor = gravityDirection.current === 1 ? '#00ffff' : '#ff00ff'
        ctx.beginPath()
        ctx.arc(player.x, player.y, player.radius, 0, Math.PI * 2)
        const playerGradient = ctx.createRadialGradient(player.x, player.y, 0, player.x, player.y, player.radius)
        playerGradient.addColorStop(0, 'white')
        playerGradient.addColorStop(1, gravityDirection.current === 1 ? '#00ffff' : '#ff00ff')
        ctx.fillStyle = playerGradient
        ctx.fill()
        ctx.restore()

        // Render Obstacles
        obstaclesRef.current.forEach(obs => {
            ctx.save()
            if (obs.type === 'idea') {
                // Glowing lightbulb
                ctx.shadowBlur = 20
                ctx.shadowColor = '#FFD700'
                ctx.translate(obs.x + obs.width / 2, obs.y + obs.height / 2)
                if (obs.rotation) ctx.rotate(obs.rotation)
                ctx.beginPath()
                ctx.arc(0, 0, obs.width / 2, 0, Math.PI * 2)
                const ideaGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, obs.width / 2)
                ideaGradient.addColorStop(0, '#FFFF00')
                ideaGradient.addColorStop(1, '#FFD700')
                ctx.fillStyle = ideaGradient
                ctx.fill()
                // Add sparkle
                ctx.fillStyle = 'white'
                ctx.fillRect(-2, -2, 4, 4)
            } else {
                // Danger blocks with warning stripes
                ctx.shadowBlur = 10
                ctx.shadowColor = '#E62B1E'
                const noiseGradient = ctx.createLinearGradient(obs.x, obs.y, obs.x + obs.width, obs.y + obs.height)
                noiseGradient.addColorStop(0, '#E62B1E')
                noiseGradient.addColorStop(0.5, '#ff4444')
                noiseGradient.addColorStop(1, '#E62B1E')
                ctx.fillStyle = noiseGradient
                ctx.fillRect(obs.x, obs.y, obs.width, obs.height)

                // Warning stripes
                ctx.strokeStyle = 'rgba(0,0,0,0.3)'
                ctx.lineWidth = 2
                for (let i = 0; i < obs.height; i += 10) {
                    ctx.beginPath()
                    ctx.moveTo(obs.x, obs.y + i)
                    ctx.lineTo(obs.x + obs.width, obs.y + i)
                    ctx.stroke()
                }
            }
            ctx.restore()
        })

        // Render Particles
        particlesRef.current.forEach(p => {
            ctx.beginPath()
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
            ctx.fillStyle = p.color.replace(')', `, ${p.life})`)
            ctx.fill()
        })

        if (gameState === 'playing') {
            requestRef.current = requestAnimationFrame(() => update(performance.now()))
        }
    }

    useEffect(() => {
        if (gameState === 'playing') {
            requestRef.current = requestAnimationFrame(() => update(performance.now()))
        }
        return () => {
            if (requestRef.current) cancelAnimationFrame(requestRef.current)
        }
    }, [gameState])

    const handleInput = () => {
        if (gameState === 'start') {
            setGameState('playing')
            scoreRef.current = 0
            setScore(0)
            obstaclesRef.current = []
            particlesRef.current = []
            playerRef.current.y = 225
            playerRef.current.dy = 0
            playerRef.current.trail = []
            lastSpawnTime.current = performance.now()
        } else if (gameState === 'playing') {
            gravityDirection.current *= -1
            playerRef.current.dy = 0
            createParticles(playerRef.current.x, playerRef.current.y, gravityDirection.current === 1 ? '#00ffff' : '#ff00ff', 12)
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95 backdrop-blur-lg"
        >
            <button
                onClick={onClose}
                className="absolute top-4 right-4 text-white hover:text-[#E62B1E] transition-all hover:scale-110 z-50 bg-black/50 p-2 rounded-full"
            >
                <X size={28} />
            </button>

            <div className="relative w-full max-w-4xl aspect-video bg-gradient-to-br from-neutral-900 to-black border-2 border-[#E62B1E]/30 rounded-2xl overflow-hidden shadow-2xl shadow-[#E62B1E]/20">
                <canvas
                    ref={canvasRef}
                    width={800}
                    height={450}
                    className="w-full h-full cursor-pointer"
                    onClick={handleInput}
                />

                {gameState === 'start' && (
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm"
                    >
                        <motion.div
                            animate={{ rotate: [0, 5, -5, 0] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                        >
                            <Zap size={64} className="text-[#FFD700] mb-4" />
                        </motion.div>
                        <h2 className="text-5xl font-bold text-white mb-2 bg-gradient-to-r from-white to-[#FFD700] bg-clip-text text-transparent">Idea Spark</h2>
                        <p className="text-neutral-400 mb-8 text-center px-4">
                            <span className="text-cyan-400">Click</span> to switch gravity • Collect <span className="text-yellow-400">Ideas</span> • Avoid <span className="text-red-400">Noise</span>
                        </p>
                        <motion.button
                            onClick={handleInput}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-gradient-to-r from-[#E62B1E] to-[#ff6b4a] text-white px-10 py-4 rounded-full font-bold text-lg shadow-lg shadow-[#E62B1E]/50 hover:shadow-[#E62B1E]/70 transition-all"
                        >
                            Start Game
                        </motion.button>
                    </motion.div>
                )}

                <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm px-4 py-2 rounded-full border border-[#FFD700]/30">
                    <span className="text-[#FFD700] font-bold text-xl">⚡ {score}</span>
                </div>

                {gameState === 'gameover' && (
                    <Leaderboard
                        currentScore={score}
                        onPlayAgain={() => setGameState('start')}
                    />
                )}
            </div>
        </motion.div>
    )
}

export default IdeaSpark
