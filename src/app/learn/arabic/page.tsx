"use client"

import { motion } from "framer-motion"
import { ArrowLeft, Volume2, PenTool, BookOpen, Target, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { useState } from "react"

const arabicLetters = [
  { letter: "ا", name: "Alif", pronunciation: "a" },
  { letter: "ب", name: "Ba", pronunciation: "b" },
  { letter: "ت", name: "Ta", pronunciation: "t" },
  { letter: "ث", name: "Tha", pronunciation: "th" },
  { letter: "ج", name: "Jim", pronunciation: "j" },
  { letter: "ح", name: "Ha", pronunciation: "h" },
  { letter: "خ", name: "Kha", pronunciation: "kh" },
  { letter: "د", name: "Dal", pronunciation: "d" },
]

const learningModes = [
  {
    title: "Alphabet Practice",
    description: "Learn Arabic letters with interactive flashcards",
    icon: BookOpen,
    href: "/learn/arabic/alphabet",
    color: "bg-blue-500"
  },
  {
    title: "Pronunciation",
    description: "Listen and practice Arabic pronunciation with AI feedback",
    icon: Volume2,
    href: "/learn/arabic/pronunciation",
    color: "bg-green-500"
  },
  {
    title: "Writing Practice",
    description: "Practice writing Arabic letters on digital canvas",
    icon: PenTool,
    href: "/learn/arabic/writing",
    color: "bg-purple-500"
  },
  {
    title: "Spaced Repetition",
    description: "Review letters and words with memory-optimized intervals",
    icon: Target,
    href: "/learn/arabic/spaced-repetition",
    color: "bg-orange-500"
  }
]

export default function LearnArabicPage() {
  const [playingLetter, setPlayingLetter] = useState<string | null>(null)

  const playPronunciation = (letter: string) => {
    setPlayingLetter(letter)
    // Simulate audio playback
    setTimeout(() => setPlayingLetter(null), 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center space-x-4">
          <Link href="/">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
              Learn Arabic
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Master the Arabic alphabet and pronunciation
            </p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Learning Modes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {learningModes.map((mode, index) => (
            <motion.div
              key={mode.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Card className="h-full hover:shadow-lg transition-all duration-300 cursor-pointer">
                <CardHeader className="text-center">
                  <div className={`w-12 h-12 mx-auto mb-3 rounded-xl ${mode.color} flex items-center justify-center`}>
                    <mode.icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">{mode.title}</CardTitle>
                  <CardDescription>{mode.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" onClick={() => window.location.href = mode.href}>
                    Start Learning
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Arabic Alphabet Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Arabic Alphabet</CardTitle>
              <CardDescription>
                Click on any letter to hear its pronunciation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
                {arabicLetters.map((letter, index) => (
                  <motion.div
                    key={letter.letter}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.05 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => playPronunciation(letter.letter)}
                    className={`aspect-square bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900 dark:to-teal-900 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:shadow-md transition-all duration-200 relative ${
                      playingLetter === letter.letter ? 'ring-2 ring-emerald-500 ring-offset-2' : ''
                    }`}
                  >
                    <span className="text-3xl font-bold arabic-text text-emerald-800 dark:text-emerald-200">
                      {letter.letter}
                    </span>
                    <span className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">
                      {letter.name}
                    </span>
                    {playingLetter === letter.letter && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-1 right-1"
                      >
                        <Play className="w-3 h-3 text-emerald-600" />
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  )
}
