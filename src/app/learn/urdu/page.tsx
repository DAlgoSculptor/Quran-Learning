"use client"

import { motion } from "framer-motion"
import { ArrowLeft, Volume2, PenTool, BookOpen, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

const urduLetters = [
  { letter: "ا", name: "Alif", pronunciation: "a" },
  { letter: "ب", name: "Be", pronunciation: "b" },
  { letter: "پ", name: "Pe", pronunciation: "p" },
  { letter: "ت", name: "Te", pronunciation: "t" },
  { letter: "ٹ", name: "Ṭe", pronunciation: "ṭ" },
  { letter: "ث", name: "Se", pronunciation: "s" },
  { letter: "ج", name: "Jeem", pronunciation: "j" },
  { letter: "چ", name: "Che", pronunciation: "ch" },
]

const learningModes = [
  {
    title: "Urdu Alphabet",
    description: "Learn Urdu letters with interactive practice",
    icon: BookOpen,
    href: "/learn/urdu/alphabet",
    color: "bg-pink-500"
  },
  {
    title: "Writing Practice",
    description: "Practice writing Urdu letters and words",
    icon: PenTool,
    href: "/learn/urdu/writing",
    color: "bg-indigo-500"
  },
  {
    title: "Daily Word",
    description: "Learn a new Urdu word every day",
    icon: Calendar,
    href: "/learn/urdu/daily-word",
    color: "bg-green-500"
  },
  {
    title: "Story Lessons",
    description: "Learn through interactive Urdu stories",
    icon: Volume2,
    href: "/learn/urdu/stories",
    color: "bg-orange-500"
  }
]

const todaysWord = {
  urdu: "محبت",
  english: "Love",
  pronunciation: "Mohabbat",
  example: "والدین کی محبت بے مثال ہے",
  exampleTranslation: "Parents' love is incomparable"
}

export default function LearnUrduPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-pink-900">
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
              Learn Urdu
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Master the Urdu language with interactive lessons
            </p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Today's Word */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Card className="bg-gradient-to-r from-pink-500 to-purple-600 text-white border-0">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Today's Word
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-4xl font-bold arabic-text mb-2">{todaysWord.urdu}</div>
                <div className="text-xl mb-1">{todaysWord.english}</div>
                <div className="text-lg opacity-90 mb-4">({todaysWord.pronunciation})</div>
                <div className="bg-white/20 rounded-lg p-4">
                  <div className="arabic-text text-lg mb-1">{todaysWord.example}</div>
                  <div className="text-sm opacity-90">{todaysWord.exampleTranslation}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Learning Modes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {learningModes.map((mode, index) => (
            <motion.div
              key={mode.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
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

        {/* Urdu Alphabet Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Urdu Alphabet</CardTitle>
              <CardDescription>
                Click on any letter to hear its pronunciation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
                {urduLetters.map((letter, index) => (
                  <motion.div
                    key={letter.letter}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 + index * 0.05 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="aspect-square bg-gradient-to-br from-pink-100 to-purple-100 dark:from-pink-900 dark:to-purple-900 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:shadow-md transition-all duration-200"
                  >
                    <span className="text-3xl font-bold arabic-text text-pink-800 dark:text-pink-200">
                      {letter.letter}
                    </span>
                    <span className="text-xs text-pink-600 dark:text-pink-400 mt-1">
                      {letter.name}
                    </span>
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
