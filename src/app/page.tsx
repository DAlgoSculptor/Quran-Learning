"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Book, BookOpen, Languages, Moon, Sun, Clock, Calendar, Target, Flame, Gift, Trophy, Globe, Headphones, Star, Heart, Zap, Award, TrendingUp, Volume2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Progress } from "@/components/ui/progress"
import { useTheme } from "@/components/theme-provider"
import { getIslamicGreeting } from "@/lib/utils"
import { useState, useEffect } from "react"

const islamicQuotes = [
  {
    arabic: "وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا",
    translation: "And whoever fears Allah - He will make for him a way out",
    reference: "Quran 65:2"
  },
  {
    arabic: "إِنَّ مَعَ الْعُسْرِ يُسْرًا",
    translation: "Indeed, with hardship comes ease",
    reference: "Quran 94:6"
  },
  {
    arabic: "وَاللَّهُ يُحِبُّ الْمُحْسِنِينَ",
    translation: "And Allah loves the doers of good",
    reference: "Quran 2:195"
  },
  {
    arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً",
    translation: "Our Lord, give us good in this world",
    reference: "Quran 2:201"
  }
]

const features = [
  {
    title: "Learn Arabic",
    description: "Interactive alphabet, pronunciation, writing practice with AI feedback",
    icon: Languages,
    href: "/learn/arabic",
    gradient: "from-emerald-500 to-teal-600",
    stats: "28 Letters • 1000+ Words"
  },
  {
    title: "Learn Urdu",
    description: "Letter learning, writing pad, daily words, and story lessons",
    icon: BookOpen,
    href: "/learn/urdu",
    gradient: "from-blue-500 to-indigo-600",
    stats: "38 Letters • 500+ Stories"
  },
  {
    title: "Read Quran",
    description: "Full Quran with translations, audio, tajweed, and AI tutor",
    icon: Book,
    href: "/quran",
    gradient: "from-purple-500 to-pink-600",
    stats: "114 Surahs • 6236 Verses"
  }
]

const achievements = [
  { icon: Flame, label: "7 Day Streak", value: "5", color: "text-orange-500" },
  { icon: Trophy, label: "Level", value: "12", color: "text-yellow-500" },
  { icon: Star, label: "XP Points", value: "2,450", color: "text-blue-500" },
  { icon: Target, label: "Goals Met", value: "8/10", color: "text-green-500" }
]

const dailyStats = [
  { label: "Minutes Learned", value: 45, max: 60, color: "bg-emerald-500" },
  { label: "Verses Read", value: 12, max: 20, color: "bg-blue-500" },
  { label: "Words Practiced", value: 28, max: 50, color: "bg-purple-500" }
]

// Simple Progress Component
const Progress = ({ value, max = 100, className = "" }: { value: number; max?: number; className?: string }) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100)
  return (
    <div className={`relative h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700 ${className}`}>
      <div
        className="h-full bg-gradient-to-r from-emerald-500 to-teal-600 transition-all duration-500 ease-out rounded-full"
        style={{ width: `${percentage}%` }}
      />
    </div>
  )
}

export default function Home() {
  const { theme, setTheme } = useTheme()
  const [currentQuote, setCurrentQuote] = useState(0)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    const quoteTimer = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % islamicQuotes.length)
    }, 6000)

    return () => {
      clearInterval(timer)
      clearInterval(quoteTimer)
    }
  }, [])

  if (!mounted) return null

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    })
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-emerald-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-10 right-10 w-32 h-32 bg-emerald-200/20 dark:bg-emerald-500/10 rounded-full blur-xl"
        />
        <motion.div
          animate={{
            rotate: -360,
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-20 left-10 w-40 h-40 bg-teal-200/20 dark:bg-teal-500/10 rounded-full blur-xl"
        />
        <motion.div
          animate={{
            y: [-20, 20, -20]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/2 left-1/4 w-24 h-24 bg-blue-200/20 dark:bg-blue-500/10 rounded-full blur-lg"
        />
      </div>

      {/* Header */}
      <header className="container mx-auto px-4 py-6 flex justify-between items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center space-x-3"
        >
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-xl flex items-center justify-center shadow-lg"
          >
            <Book className="w-6 h-6 text-white" />
          </motion.div>
          <div>
            <span className="text-xl font-bold text-emerald-800 dark:text-emerald-200 block">
              Quran Learning
            </span>
            <span className="text-xs text-emerald-600 dark:text-emerald-400">
              {formatTime(currentTime)}
            </span>
          </div>
        </motion.div>

        <div className="flex items-center space-x-3">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="hidden md:flex items-center space-x-2 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-full px-4 py-2"
          >
            <Calendar className="w-4 h-4 text-emerald-600" />
            <span className="text-sm text-gray-600 dark:text-gray-300">
              {formatDate(currentTime)}
            </span>
          </motion.div>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="rounded-full bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm hover:bg-white/70 dark:hover:bg-gray-700/70"
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-8 relative z-10">
        {/* Islamic Quote Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuote}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 max-w-4xl mx-auto border border-emerald-200/50 dark:border-emerald-700/50 shadow-lg"
            >
              <div className="text-2xl md:text-3xl font-arabic text-emerald-800 dark:text-emerald-200 mb-3 leading-relaxed">
                {islamicQuotes[currentQuote].arabic}
              </div>
              <div className="text-lg text-gray-600 dark:text-gray-300 mb-2 italic">
                "{islamicQuotes[currentQuote].translation}"
              </div>
              <div className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">
                — {islamicQuotes[currentQuote].reference}
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Main Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-12"
        >
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 bg-clip-text text-transparent"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            {getIslamicGreeting()}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            Learn Arabic & Urdu, Read the Quran with AI-powered guidance,
            gamification, and offline support
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => window.location.href = '/learn'}
            >
              <BookOpen className="w-5 h-5 mr-2" />
              Start Learning
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="px-8 py-3 border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white transition-all duration-300"
              onClick={() => window.location.href = '/quran'}
            >
              <Book className="w-5 h-5 mr-2" />
              Read Quran
            </Button>
          </motion.div>
        </motion.div>

        {/* Achievement Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ scale: 1.05 }}
              className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20 dark:border-gray-700/20 shadow-lg"
            >
              <achievement.icon className={`w-8 h-8 mx-auto mb-2 ${achievement.color}`} />
              <div className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                {achievement.value}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                {achievement.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Daily Progress */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 mb-12 border border-white/20 dark:border-gray-700/20 shadow-lg"
        >
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-6 text-center flex items-center justify-center">
            <Target className="w-6 h-6 mr-2 text-emerald-600" />
            Today's Progress
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {dailyStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                className="space-y-2"
              >
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-300">{stat.label}</span>
                  <span className="font-medium text-gray-800 dark:text-gray-100">
                    {stat.value}/{stat.max}
                  </span>
                </div>
                <Progress
                  value={(stat.value / stat.max) * 100}
                  className="h-2"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Feature Cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="grid md:grid-cols-3 gap-8 mb-16"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 + 0.1 * index }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group"
            >
              <Card className="h-full bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 border border-white/20 dark:border-gray-700/20 overflow-hidden relative">
                {/* Animated background gradient */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                  initial={false}
                  animate={{
                    background: [
                      `linear-gradient(45deg, transparent, transparent)`,
                      `linear-gradient(45deg, rgba(16, 185, 129, 0.1), rgba(20, 184, 166, 0.1))`,
                      `linear-gradient(45deg, transparent, transparent)`
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />

                <CardHeader className="text-center pb-4 relative z-10">
                  <motion.div
                    className={`w-20 h-20 mx-auto mb-4 rounded-3xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300`}
                    whileHover={{
                      scale: 1.1,
                      rotate: [0, -5, 5, 0],
                      boxShadow: "0 20px 40px rgba(0,0,0,0.2)"
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <feature.icon className="w-10 h-10 text-white" />
                  </motion.div>

                  <CardTitle className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                    {feature.title}
                  </CardTitle>

                  <div className="text-sm text-emerald-600 dark:text-emerald-400 font-medium mb-3">
                    {feature.stats}
                  </div>

                  <CardDescription className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="pt-0 relative z-10">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      className={`w-full bg-gradient-to-r ${feature.gradient} hover:shadow-lg text-white font-medium py-3 transition-all duration-300`}
                      onClick={() => window.location.href = feature.href}
                    >
                      <span className="flex items-center justify-center">
                        Get Started
                        <motion.div
                          className="ml-2"
                          animate={{ x: [0, 4, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          →
                        </motion.div>
                      </span>
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="grid md:grid-cols-2 gap-8 mb-16"
        >
          {/* Quick Actions */}
          <Card className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 dark:from-emerald-500/5 dark:to-teal-500/5 backdrop-blur-sm border border-emerald-200/50 dark:border-emerald-700/50">
            <CardHeader>
              <CardTitle className="flex items-center text-emerald-800 dark:text-emerald-200">
                <Zap className="w-6 h-6 mr-2" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="ghost" className="w-full justify-start" onClick={() => window.location.href = '/profile'}>
                <Award className="w-4 h-4 mr-2" />
                View Achievements
              </Button>
              <Button variant="ghost" className="w-full justify-start" onClick={() => window.location.href = '/settings'}>
                <Volume2 className="w-4 h-4 mr-2" />
                Audio Settings
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Globe className="w-4 h-4 mr-2" />
                Community
              </Button>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 dark:from-blue-500/5 dark:to-purple-500/5 backdrop-blur-sm border border-blue-200/50 dark:border-blue-700/50">
            <CardHeader>
              <CardTitle className="flex items-center text-blue-800 dark:text-blue-200">
                <Clock className="w-6 h-6 mr-2" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                <span className="text-gray-600 dark:text-gray-300">Completed Arabic Lesson 5</span>
              </div>
              <div className="flex items-center text-sm">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                <span className="text-gray-600 dark:text-gray-300">Read Surah Al-Fatiha</span>
              </div>
              <div className="flex items-center text-sm">
                <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                <span className="text-gray-600 dark:text-gray-300">Earned 50 XP points</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>

      {/* Floating Action Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-14 h-14 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-full shadow-lg flex items-center justify-center text-white"
          onClick={() => window.location.href = '/learn'}
        >
          <Heart className="w-6 h-6" />
        </motion.button>
      </motion.div>
    </div>
  )
}
