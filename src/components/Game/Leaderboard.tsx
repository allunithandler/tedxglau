"use client"

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface Score {
    name: string
    score: number
    date: string
}

interface LeaderboardProps {
    currentScore?: number
    onPlayAgain: () => void
}

const Leaderboard = ({ currentScore, onPlayAgain }: LeaderboardProps) => {
    const [scores, setScores] = useState<Score[]>([])
    const [playerName, setPlayerName] = useState('')
    const [submitted, setSubmitted] = useState(false)

    useEffect(() => {
        const savedScores = localStorage.getItem('ideaSparkScores')
        if (savedScores) {
            setScores(JSON.parse(savedScores))
        }
    }, [])

    const saveScore = () => {
        if (!playerName.trim() || !currentScore) return

        const newScore: Score = {
            name: playerName,
            score: currentScore,
            date: new Date().toLocaleDateString()
        }

        const updatedScores = [...scores, newScore]
            .sort((a, b) => b.score - a.score)
            .slice(0, 10) // Keep top 10

        setScores(updatedScores)
        localStorage.setItem('ideaSparkScores', JSON.stringify(updatedScores))
        setSubmitted(true)
    }

    return (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 max-w-md w-full shadow-2xl"
            >
                <h2 className="text-3xl font-bold text-center mb-6 text-white">
                    <span className="text-[#E62B1E]">Idea</span> Spark
                </h2>

                {currentScore !== undefined && !submitted ? (
                    <div className="mb-8 text-center">
                        <p className="text-neutral-400 text-sm uppercase tracking-wider">Your Score</p>
                        <p className="text-5xl font-bold text-white my-2">{currentScore}</p>

                        <div className="mt-6 flex gap-2">
                            <input
                                type="text"
                                placeholder="Enter your name"
                                value={playerName}
                                onChange={(e) => setPlayerName(e.target.value)}
                                className="flex-1 bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#E62B1E]"
                                maxLength={15}
                            />
                            <button
                                onClick={saveScore}
                                disabled={!playerName.trim()}
                                className="bg-[#E62B1E] text-white px-4 py-2 rounded-lg font-bold disabled:opacity-50 hover:bg-red-700 transition-colors"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="mb-8">
                        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                            🏆 Top Thinkers
                        </h3>
                        <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                            {scores.length === 0 ? (
                                <p className="text-neutral-500 text-center py-4">No scores yet. Be the first!</p>
                            ) : (
                                scores.map((s, i) => (
                                    <div key={i} className="flex justify-between items-center bg-neutral-800/50 p-3 rounded-lg border border-neutral-800">
                                        <div className="flex items-center gap-3">
                                            <span className={`
                                                w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold
                                                ${i === 0 ? 'bg-yellow-500 text-black' :
                                                    i === 1 ? 'bg-gray-400 text-black' :
                                                        i === 2 ? 'bg-orange-700 text-white' : 'bg-neutral-700 text-neutral-400'}
                                            `}>
                                                {i + 1}
                                            </span>
                                            <span className="text-white font-medium">{s.name}</span>
                                        </div>
                                        <span className="text-[#E62B1E] font-bold">{s.score}</span>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                )}

                <button
                    onClick={onPlayAgain}
                    className="w-full bg-white text-black font-bold py-3 rounded-xl hover:bg-neutral-200 transition-colors"
                >
                    {currentScore !== undefined ? 'Play Again' : 'Start Game'}
                </button>
            </motion.div>
        </div>
    )
}

export default Leaderboard
