"use client"

import { motion } from "framer-motion"
import { ArrowLeft, Play, Pause, Bookmark, Settings, Volume2, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { useState, useEffect } from "react"
import { quranAPI, mockAyahs, type SurahWithTranslation } from "@/lib/quran-api"
import { useParams } from "next/navigation"

export default function SurahPage() {
  const params = useParams()
  const surahNumber = parseInt(params.surah as string)
  
  const [surahData, setSurahData] = useState<SurahWithTranslation | null>(null)
  const [loading, setLoading] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentAyah, setCurrentAyah] = useState<number | null>(null)
  const [showTranslation, setShowTranslation] = useState(true)
  const [fontSize, setFontSize] = useState(24)
  const [selectedTranslation, setSelectedTranslation] = useState('en.asad')

  useEffect(() => {
    const loadSurah = async () => {
      try {
        const data = await quranAPI.getSurahWithTranslation(surahNumber, selectedTranslation)
        if (data) {
          setSurahData(data)
        } else {
          // Use mock data for Surah Al-Fatiha
          if (surahNumber === 1) {
            setSurahData({
              surah: {
                number: 1,
                name: "الفاتحة",
                englishName: "Al-Fatiha",
                englishNameTranslation: "The Opening",
                numberOfAyahs: 7,
                revelationType: "Meccan",
                ayahs: mockAyahs[1].map(ayah => ({
                  number: ayah.number,
                  text: ayah.text,
                  numberInSurah: ayah.numberInSurah,
                  juz: 1,
                  manzil: 1,
                  page: 1,
                  ruku: 1,
                  hizbQuarter: 1,
                  sajda: false
                }))
              },
              translation: mockAyahs[1].map(ayah => ({
                number: ayah.number,
                text: ayah.translation,
                numberInSurah: ayah.numberInSurah
              }))
            })
          }
        }
      } catch (error) {
        console.error('Failed to load surah')
      } finally {
        setLoading(false)
      }
    }
    
    if (surahNumber) {
      loadSurah()
    }
  }, [surahNumber, selectedTranslation])

  const playAyah = (ayahNumber: number) => {
    if (currentAyah === ayahNumber && isPlaying) {
      setIsPlaying(false)
      setCurrentAyah(null)
    } else {
      setCurrentAyah(ayahNumber)
      setIsPlaying(true)
      // In a real app, you would play the specific ayah audio
      console.log(`Playing ayah ${ayahNumber}`)
    }
  }

  const toggleRepeat = () => {
    // Toggle repeat mode for current ayah
    console.log('Toggle repeat mode')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-emerald-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading Surah...</p>
        </div>
      </div>
    )
  }

  if (!surahData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-emerald-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-300">Surah not found</p>
          <Link href="/quran">
            <Button className="mt-4">Back to Quran</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-emerald-900">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/quran">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <div>
                <h1 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                  {surahData.surah.englishName}
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {surahData.surah.numberOfAyahs} verses • {surahData.surah.revelationType}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowTranslation(!showTranslation)}
                className="rounded-full"
              >
                <Settings className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleRepeat}
                className="rounded-full"
              >
                <RotateCcw className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Surah Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Surah Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <Card className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white border-0">
            <CardHeader>
              <CardTitle className="text-3xl arabic-text">{surahData.surah.name}</CardTitle>
              <CardDescription className="text-emerald-100 text-lg">
                {surahData.surah.englishNameTranslation}
              </CardDescription>
            </CardHeader>
          </Card>
        </motion.div>

        {/* Ayahs */}
        <div className="max-w-4xl mx-auto space-y-6">
          {surahData.surah.ayahs.map((ayah, index) => {
            const translation = surahData.translation.find(t => t.numberInSurah === ayah.numberInSurah)
            
            return (
              <motion.div
                key={ayah.numberInSurah}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`group ${currentAyah === ayah.numberInSurah ? 'ring-2 ring-emerald-500 ring-offset-2 ring-offset-background' : ''}`}
              >
                <Card className="hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    {/* Ayah Number */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center">
                        <span className="text-emerald-800 dark:text-emerald-200 font-bold text-sm">
                          {ayah.numberInSurah}
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => playAyah(ayah.numberInSurah)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        {currentAyah === ayah.numberInSurah && isPlaying ? 
                          <Pause className="w-4 h-4" /> : 
                          <Play className="w-4 h-4" />
                        }
                      </Button>
                    </div>

                    {/* Arabic Text */}
                    <div 
                      className="arabic-text text-right mb-4 leading-loose"
                      style={{ fontSize: `${fontSize}px` }}
                    >
                      {ayah.text}
                    </div>

                    {/* Translation */}
                    {showTranslation && translation && (
                      <div className="text-gray-700 dark:text-gray-300 leading-relaxed border-t pt-4">
                        {translation.text}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </main>

      {/* Audio Player (Sticky Bottom) */}
      {isPlaying && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg border-t border-gray-200 dark:border-gray-700 p-4"
        >
          <div className="container mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsPlaying(false)}
              >
                <Pause className="w-5 h-5" />
              </Button>
              <div>
                <p className="font-medium text-gray-800 dark:text-gray-100">
                  {surahData.surah.englishName} - Ayah {currentAyah}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Playing recitation
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon">
                <Volume2 className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Bookmark className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}
