"use client"

import { motion } from "framer-motion"
import { Languages, BookOpen, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

const learningOptions = [
  {
    title: "Learn Arabic",
    description: "Master the Arabic alphabet, pronunciation, and writing with interactive lessons and AI feedback",
    icon: Languages,
    href: "/learn/arabic",
    gradient: "from-emerald-500 to-teal-600",
    features: ["28 Arabic Letters", "Pronunciation Guide", "Writing Practice", "AI Feedback"],
    color: "emerald"
  },
  {
    title: "Learn Urdu",
    description: "Discover the beauty of Urdu language with alphabet learning, daily words, and story lessons",
    icon: BookOpen,
    href: "/learn/urdu",
    gradient: "from-blue-500 to-indigo-600",
    features: ["Urdu Alphabet", "Daily Words", "Story Lessons", "Writing Practice"],
    color: "blue"
  }
]

export default function LearnPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
      {/* Header */}
      <header className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
            Choose Your Learning Path
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Start your journey with Arabic or Urdu. Both languages will enhance your understanding of Islamic texts and culture.
          </p>
        </motion.div>
      </header>

      {/* Learning Options */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {learningOptions.map((option, index) => (
            <motion.div
              key={option.title}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -10 }}
              className="group"
            >
              <Card className="h-full hover:shadow-2xl transition-all duration-500 border-0 overflow-hidden relative">
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${option.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-500`} />
                
                <CardHeader className="relative z-10 text-center pb-6">
                  <div className={`w-20 h-20 mx-auto mb-6 rounded-3xl bg-gradient-to-r ${option.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-lg`}>
                    <option.icon className="w-10 h-10 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-3">
                    {option.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-300 text-base leading-relaxed">
                    {option.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="relative z-10 space-y-6">
                  {/* Features List */}
                  <div className="space-y-3">
                    {option.features.map((feature, featureIndex) => (
                      <motion.div
                        key={feature}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8 + featureIndex * 0.1 }}
                        className="flex items-center space-x-3"
                      >
                        <div className={`w-2 h-2 rounded-full bg-${option.color}-500`} />
                        <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Action Button */}
                  <Link href={option.href}>
                    <Button 
                      className={`w-full bg-gradient-to-r ${option.gradient} hover:shadow-lg text-white font-medium py-3 group-hover:scale-105 transition-all duration-300`}
                    >
                      Start Learning
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="text-center mt-16"
        >
          <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
              Why Learn Both Languages?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Arabic is the language of the Quran and Islamic prayers, while Urdu is rich in Islamic literature and poetry. 
              Learning both will deepen your connection to Islamic culture and enhance your spiritual journey.
            </p>
          </div>
        </motion.div>
      </main>
    </div>
  )
}
