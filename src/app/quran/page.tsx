"use client"

import { motion } from "framer-motion"
import { ArrowLeft, Play, Pause, Search, Bookmark, Settings, Volume2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { useState, useEffect } from "react"
import { quranAPI, mockSurahs, type Surah } from "@/lib/quran-api"

// This will be populated from API or mock data

const recentlyRead = [
  { surah: "Al-Fatiha", verse: "1-7", progress: 100 },
  { surah: "Al-Baqarah", verse: "1-25", progress: 45 },
  { surah: "Ali 'Imran", verse: "1-10", progress: 20 },
]

export default function QuranPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isPlaying, setIsPlaying] = useState(false)
  const [playingSurah, setPlayingSurah] = useState<number | null>(null)
  const [surahs, setSurahs] = useState<Surah[]>(mockSurahs)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadSurahs = async () => {
      try {
        const data = await quranAPI.getAllSurahs()
        if (data.length > 0) {
          setSurahs(data)
        }
      } catch (error) {
        console.error('Failed to load surahs, using mock data')
      } finally {
        setLoading(false)
      }
    }

    loadSurahs()
  }, [])

  const filteredSurahs = surahs.filter(surah =>
    surah.englishName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    surah.name.includes(searchQuery)
  )

  const playRecitation = (surahNumber: number) => {
    if (playingSurah === surahNumber) {
      setPlayingSurah(null)
      setIsPlaying(false)
    } else {
      setPlayingSurah(surahNumber)
      setIsPlaying(true)
      // In a real app, you would play the audio here
      const audioUrl = quranAPI.getRecitationURL(surahNumber)
      console.log('Playing:', audioUrl)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-emerald-900">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button variant="ghost" size="icon" className="rounded-full">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                Holy Quran
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Read, listen, and understand the Quran
              </p>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Settings className="w-5 h-5" />
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search Surahs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </motion.div>

        {/* Recently Read */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Bookmark className="w-5 h-5" />
                Continue Reading
              </CardTitle>
              <CardDescription>Pick up where you left off</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentlyRead.map((item, index) => (
                  <motion.div
                    key={item.surah}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    className="flex items-center justify-between p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg hover:bg-emerald-100 dark:hover:bg-emerald-900/30 transition-colors cursor-pointer"
                  >
                    <div>
                      <div className="font-medium text-emerald-800 dark:text-emerald-200">
                        {item.surah}
                      </div>
                      <div className="text-sm text-emerald-600 dark:text-emerald-400">
                        Verses {item.verse}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-sm text-emerald-600 dark:text-emerald-400">
                        {item.progress}%
                      </div>
                      <Button size="sm" variant="ghost">
                        <Play className="w-4 h-4" />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Surah List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">All Surahs</CardTitle>
              <CardDescription>Choose a Surah to begin reading</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {filteredSurahs.map((surah, index) => (
                  <motion.div
                    key={surah.number}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.05 }}
                    className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900 rounded-lg flex items-center justify-center">
                        <span className="text-emerald-800 dark:text-emerald-200 font-bold text-sm">
                          {surah.number}
                        </span>
                      </div>
                      <div>
                        <div className="font-medium text-gray-800 dark:text-gray-100">
                          {surah.englishName}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {surah.numberOfAyahs} verses • {surah.revelationType}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="arabic-text text-xl text-emerald-800 dark:text-emerald-200">
                        {surah.name}
                      </span>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => playRecitation(surah.number)}
                      >
                        {playingSurah === surah.number && isPlaying ?
                          <Pause className="w-4 h-4" /> :
                          <Play className="w-4 h-4" />
                        }
                      </Button>
                    </div>
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
