"use client"

import { motion } from "framer-motion"
import { ArrowLeft, Volume2, PenTool, RotateCcw, CheckCircle, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { useState, useEffect } from "react"

const arabicAlphabet = [
  { letter: "ا", name: "Alif", pronunciation: "a", position: "isolated", meaning: "First letter" },
  { letter: "ب", name: "Ba", pronunciation: "b", position: "isolated", meaning: "House" },
  { letter: "ت", name: "Ta", pronunciation: "t", position: "isolated", meaning: "Crown" },
  { letter: "ث", name: "Tha", pronunciation: "th", position: "isolated", meaning: "Three dots" },
  { letter: "ج", name: "Jim", pronunciation: "j", position: "isolated", meaning: "Camel" },
  { letter: "ح", name: "Ha", pronunciation: "h", position: "isolated", meaning: "Fence" },
  { letter: "خ", name: "Kha", pronunciation: "kh", position: "isolated", meaning: "Dot above" },
  { letter: "د", name: "Dal", pronunciation: "d", position: "isolated", meaning: "Door" },
  { letter: "ذ", name: "Dhal", pronunciation: "dh", position: "isolated", meaning: "Dot above Dal" },
  { letter: "ر", name: "Ra", pronunciation: "r", position: "isolated", meaning: "Head" },
  { letter: "ز", name: "Zay", pronunciation: "z", position: "isolated", meaning: "Dot above Ra" },
  { letter: "س", name: "Sin", pronunciation: "s", position: "isolated", meaning: "Teeth" },
  { letter: "ش", name: "Shin", pronunciation: "sh", position: "isolated", meaning: "Three dots above" },
  { letter: "ص", name: "Sad", pronunciation: "s", position: "isolated", meaning: "Emphatic S" },
  { letter: "ض", name: "Dad", pronunciation: "d", position: "isolated", meaning: "Emphatic D" },
  { letter: "ط", name: "Ta", pronunciation: "t", position: "isolated", meaning: "Emphatic T" },
  { letter: "ظ", name: "Za", pronunciation: "z", position: "isolated", meaning: "Emphatic Z" },
  { letter: "ع", name: "Ain", pronunciation: "'", position: "isolated", meaning: "Eye" },
  { letter: "غ", name: "Ghain", pronunciation: "gh", position: "isolated", meaning: "Dot above Ain" },
  { letter: "ف", name: "Fa", pronunciation: "f", position: "isolated", meaning: "Mouth" },
  { letter: "ق", name: "Qaf", pronunciation: "q", position: "isolated", meaning: "Two dots above" },
  { letter: "ك", name: "Kaf", pronunciation: "k", position: "isolated", meaning: "Hand" },
  { letter: "ل", name: "Lam", pronunciation: "l", position: "isolated", meaning: "Tongue" },
  { letter: "م", name: "Mim", pronunciation: "m", position: "isolated", meaning: "Water" },
  { letter: "ن", name: "Nun", pronunciation: "n", position: "isolated", meaning: "Fish" },
  { letter: "ه", name: "Ha", pronunciation: "h", position: "isolated", meaning: "Window" },
  { letter: "و", name: "Waw", pronunciation: "w", position: "isolated", meaning: "Hook" },
  { letter: "ي", name: "Ya", pronunciation: "y", position: "isolated", meaning: "Two dots below" },
]

export default function ArabicAlphabetPage() {
  const [selectedLetter, setSelectedLetter] = useState<typeof arabicAlphabet[0] | null>(null)
  const [learnedLetters, setLearnedLetters] = useState<Set<string>>(new Set())
  const [currentMode, setCurrentMode] = useState<'learn' | 'practice' | 'quiz'>('learn')
  const [quizIndex, setQuizIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)

  const markAsLearned = (letter: string) => {
    setLearnedLetters(prev => new Set([...prev, letter]))
  }

  const playPronunciation = (letter: string) => {
    // In a real app, this would play audio
    console.log(`Playing pronunciation for ${letter}`)
    
    // Simulate audio feedback
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(letter)
      utterance.lang = 'ar-SA'
      speechSynthesis.speak(utterance)
    }
  }

  const startQuiz = () => {
    setCurrentMode('quiz')
    setQuizIndex(0)
    setScore(0)
    setShowAnswer(false)
  }

  const nextQuizQuestion = () => {
    if (quizIndex < arabicAlphabet.length - 1) {
      setQuizIndex(prev => prev + 1)
      setShowAnswer(false)
    } else {
      // Quiz completed
      setCurrentMode('learn')
    }
  }

  const currentQuizLetter = arabicAlphabet[quizIndex]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/learn/arabic">
              <Button variant="ghost" size="icon" className="rounded-full">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                Arabic Alphabet
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Learn all 28 letters with pronunciation
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant={currentMode === 'learn' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setCurrentMode('learn')}
            >
              Learn
            </Button>
            <Button
              variant={currentMode === 'practice' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setCurrentMode('practice')}
            >
              Practice
            </Button>
            <Button
              variant={currentMode === 'quiz' ? 'default' : 'outline'}
              size="sm"
              onClick={startQuiz}
            >
              Quiz
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {currentMode === 'quiz' ? (
          /* Quiz Mode */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto"
          >
            <Card>
              <CardHeader className="text-center">
                <CardTitle>Quiz Mode</CardTitle>
                <CardDescription>
                  Question {quizIndex + 1} of {arabicAlphabet.length} • Score: {score}
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center space-y-6">
                <div className="text-8xl arabic-text text-emerald-600 mb-4">
                  {currentQuizLetter.letter}
                </div>
                
                {!showAnswer ? (
                  <div className="space-y-4">
                    <p className="text-lg">What is the name of this letter?</p>
                    <div className="grid grid-cols-2 gap-4">
                      {arabicAlphabet.slice(0, 4).map((option) => (
                        <Button
                          key={option.name}
                          variant="outline"
                          onClick={() => {
                            setShowAnswer(true)
                            if (option.name === currentQuizLetter.name) {
                              setScore(prev => prev + 1)
                            }
                          }}
                        >
                          {option.name}
                        </Button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="text-green-600 text-lg font-medium">
                      Correct Answer: {currentQuizLetter.name}
                    </div>
                    <p className="text-gray-600">
                      Pronunciation: {currentQuizLetter.pronunciation}
                    </p>
                    <Button onClick={nextQuizQuestion}>
                      {quizIndex < arabicAlphabet.length - 1 ? 'Next Question' : 'Finish Quiz'}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Alphabet Grid */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-4 md:grid-cols-7 gap-4"
              >
                {arabicAlphabet.map((letter, index) => (
                  <motion.div
                    key={letter.letter}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedLetter(letter)}
                    className={`aspect-square bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900 dark:to-teal-900 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:shadow-md transition-all duration-200 relative ${
                      selectedLetter?.letter === letter.letter ? 'ring-2 ring-emerald-500 ring-offset-2' : ''
                    }`}
                  >
                    <span className="text-2xl md:text-3xl font-bold arabic-text text-emerald-800 dark:text-emerald-200">
                      {letter.letter}
                    </span>
                    <span className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">
                      {letter.name}
                    </span>
                    
                    {learnedLetters.has(letter.letter) && (
                      <CheckCircle className="absolute -top-1 -right-1 w-4 h-4 text-green-500 bg-white rounded-full" />
                    )}
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Letter Detail Panel */}
            <div className="lg:col-span-1">
              {selectedLetter ? (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={selectedLetter.letter}
                >
                  <Card className="sticky top-8">
                    <CardHeader className="text-center">
                      <div className="text-8xl arabic-text text-emerald-600 mb-4">
                        {selectedLetter.letter}
                      </div>
                      <CardTitle className="text-2xl">{selectedLetter.name}</CardTitle>
                      <CardDescription>
                        Pronunciation: /{selectedLetter.pronunciation}/
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="text-center">
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                          {selectedLetter.meaning}
                        </p>
                        
                        <div className="flex justify-center space-x-2 mb-4">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => playPronunciation(selectedLetter.letter)}
                          >
                            <Volume2 className="w-4 h-4 mr-2" />
                            Play Sound
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => markAsLearned(selectedLetter.letter)}
                            disabled={learnedLetters.has(selectedLetter.letter)}
                          >
                            {learnedLetters.has(selectedLetter.letter) ? (
                              <CheckCircle className="w-4 h-4 mr-2" />
                            ) : (
                              <CheckCircle className="w-4 h-4 mr-2" />
                            )}
                            {learnedLetters.has(selectedLetter.letter) ? 'Learned' : 'Mark as Learned'}
                          </Button>
                        </div>

                        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                          <h4 className="font-medium mb-2">Writing Practice</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                            Trace the letter to practice writing
                          </p>
                          <div className="h-24 bg-white dark:bg-gray-700 rounded border-2 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center">
                            <span className="text-4xl arabic-text text-gray-300 dark:text-gray-600">
                              {selectedLetter.letter}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ) : (
                <Card className="sticky top-8">
                  <CardContent className="text-center py-12">
                    <p className="text-gray-500 dark:text-gray-400">
                      Click on a letter to learn more about it
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        )}

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8"
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Learning Progress</CardTitle>
              <CardDescription>
                {learnedLetters.size} of {arabicAlphabet.length} letters learned
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-emerald-600 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${(learnedLetters.size / arabicAlphabet.length) * 100}%` }}
                />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                {Math.round((learnedLetters.size / arabicAlphabet.length) * 100)}% Complete
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  )
}
