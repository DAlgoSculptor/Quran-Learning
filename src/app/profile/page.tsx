"use client"

import { motion } from "framer-motion"
import { User, Trophy, Calendar, BookOpen, Target, Award } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { gamification, type UserStats, type Achievement } from "@/lib/gamification"

export default function ProfilePage() {
  const [userStats, setUserStats] = useState<UserStats | null>(null)
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [availableAchievements, setAvailableAchievements] = useState<Achievement[]>([])

  useEffect(() => {
    const stats = gamification.getUserStats()
    const unlocked = gamification.getUnlockedAchievements()
    const available = gamification.getAvailableAchievements().slice(0, 5) // Show next 5 achievements

    setUserStats(stats)
    setAchievements(unlocked)
    setAvailableAchievements(available)
  }, [])

  if (!userStats) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading Profile...</p>
        </div>
      </div>
    )
  }

  const recentActivity = [
    { date: "Today", activity: "Completed Arabic Lesson 12", xp: 50 },
    { date: "Yesterday", activity: "Practiced Urdu Writing", xp: 30 },
    { date: "2 days ago", activity: "Read Surah Al-Fatiha", xp: 40 },
  ]
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
      <div className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="w-24 h-24 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">
            Ahmed Hassan
          </h1>
          <p className="text-gray-600 dark:text-gray-300">Level {userStats.level} • {userStats.totalXP} XP</p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-lg">Current Streak</CardTitle>
                <div className="text-3xl font-bold text-emerald-600">{userStats.streak}</div>
                <CardDescription>days in a row</CardDescription>
              </CardHeader>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-lg">Total Lessons</CardTitle>
                <div className="text-3xl font-bold text-blue-600">{userStats.lessonsCompleted}</div>
                <CardDescription>completed</CardDescription>
              </CardHeader>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-lg">Next Level</CardTitle>
                <div className="text-3xl font-bold text-purple-600">{gamification.getXPToNextLevel()}</div>
                <CardDescription>XP needed</CardDescription>
              </CardHeader>
            </Card>
          </motion.div>
        </div>

        {/* Progress Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <Card>
            <CardHeader>
              <CardTitle>Learning Progress</CardTitle>
              <CardDescription>Your progress across different subjects</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Arabic</span>
                  <span className="text-sm text-gray-600">{userStats.arabicLettersLearned}/28</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-emerald-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(userStats.arabicLettersLearned / 28) * 100}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Urdu Letters</span>
                  <span className="text-sm text-gray-600">{userStats.urduLettersLearned}/38</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(userStats.urduLettersLearned / 38) * 100}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Surahs Read</span>
                  <span className="text-sm text-gray-600">{userStats.surahsRead}/114</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-purple-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(userStats.surahsRead / 114) * 100}%` }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-8"
        >
          <Card>
            <CardHeader>
              <CardTitle>Achievements</CardTitle>
              <CardDescription>Your learning milestones</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {/* Unlocked Achievements */}
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={achievement.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="text-center p-4 rounded-lg border-2 transition-all border-emerald-200 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-900/20"
                  >
                    <div className="text-2xl mb-2">{achievement.icon}</div>
                    <h4 className="font-medium text-sm mb-1 text-emerald-800 dark:text-emerald-200">{achievement.name}</h4>
                    <p className="text-xs text-emerald-600 dark:text-emerald-400">{achievement.description}</p>
                  </motion.div>
                ))}

                {/* Available Achievements */}
                {availableAchievements.slice(0, 5 - achievements.length).map((achievement, index) => (
                  <motion.div
                    key={achievement.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + (achievements.length + index) * 0.1 }}
                    className="text-center p-4 rounded-lg border-2 transition-all border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800/50 opacity-50"
                  >
                    <div className="text-2xl mb-2 grayscale">{achievement.icon}</div>
                    <h4 className="font-medium text-sm mb-1 text-gray-600 dark:text-gray-400">{achievement.name}</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-500">{achievement.description}</p>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your latest learning sessions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-800 dark:text-gray-100">{activity.activity}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{activity.date}</p>
                    </div>
                    <div className="text-emerald-600 font-medium">+{activity.xp} XP</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
