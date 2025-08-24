"use client"

import { motion } from "framer-motion"
import { WifiOff, RefreshCw, Book } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

const offlineFeatures = [
  {
    title: "Read Downloaded Surahs",
    description: "Access previously downloaded Quran chapters",
    icon: Book,
    href: "/quran"
  },
  {
    title: "Practice Arabic Letters",
    description: "Continue learning the Arabic alphabet",
    icon: "🔤",
    href: "/learn/arabic/alphabet"
  },
  {
    title: "Review Progress",
    description: "Check your learning achievements",
    icon: "📊",
    href: "/profile"
  }
]

export default function OfflinePage() {
  const handleRetry = () => {
    if (typeof window !== 'undefined') {
      window.location.reload()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700">
      <div className="container mx-auto px-4 py-16">
        {/* Offline Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
            <WifiOff className="w-12 h-12 text-gray-500 dark:text-gray-400" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">
            You're Offline
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
            No internet connection detected. Don't worry - you can still access many features of the Quran Learning App.
          </p>
          
          <Button 
            onClick={handleRetry}
            className="bg-emerald-600 hover:bg-emerald-700 text-white"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </Button>
        </motion.div>

        {/* Available Offline Features */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 text-center mb-8">
            Available Offline
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {offlineFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Link href={feature.href}>
                  <Card className="h-full hover:shadow-lg transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-emerald-200 dark:hover:border-emerald-800">
                    <CardHeader className="text-center">
                      <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        {typeof feature.icon === 'string' ? (
                          <span className="text-2xl">{feature.icon}</span>
                        ) : (
                          <feature.icon className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
                        )}
                      </div>
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                      <CardDescription>{feature.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button variant="outline" className="w-full">
                        Access Now
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Offline Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="max-w-2xl mx-auto mt-16"
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-center">💡 Offline Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0" />
                <p className="text-gray-700 dark:text-gray-300">
                  Download Surahs while online to read them anytime, anywhere
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0" />
                <p className="text-gray-700 dark:text-gray-300">
                  Your learning progress is saved locally and will sync when you're back online
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0" />
                <p className="text-gray-700 dark:text-gray-300">
                  Practice Arabic and Urdu letters without an internet connection
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0" />
                <p className="text-gray-700 dark:text-gray-300">
                  Audio recitations are cached for offline listening
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Connection Status */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-12"
        >
          <div className="inline-flex items-center space-x-2 bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-2">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Offline Mode
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
