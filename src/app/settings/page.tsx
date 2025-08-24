"use client"

import { motion } from "framer-motion"
import { Moon, Sun, Volume2, Bell, Globe, Download, Shield, HelpCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/theme-provider"
import { useState } from "react"

const settingsGroups = [
  {
    title: "Appearance",
    settings: [
      {
        id: "theme",
        name: "Theme",
        description: "Choose your preferred theme",
        type: "theme",
        icon: Moon
      }
    ]
  },
  {
    title: "Audio & Notifications",
    settings: [
      {
        id: "audio",
        name: "Audio Feedback",
        description: "Enable pronunciation audio",
        type: "toggle",
        icon: Volume2,
        enabled: true
      },
      {
        id: "notifications",
        name: "Daily Reminders",
        description: "Get reminded to practice daily",
        type: "toggle",
        icon: Bell,
        enabled: true
      }
    ]
  },
  {
    title: "Language & Region",
    settings: [
      {
        id: "language",
        name: "App Language",
        description: "Choose your preferred language",
        type: "select",
        icon: Globe,
        value: "English",
        options: ["English", "Arabic", "Urdu"]
      }
    ]
  },
  {
    title: "Offline & Storage",
    settings: [
      {
        id: "offline",
        name: "Offline Content",
        description: "Download content for offline use",
        type: "action",
        icon: Download
      }
    ]
  },
  {
    title: "Privacy & Security",
    settings: [
      {
        id: "privacy",
        name: "Privacy Settings",
        description: "Manage your privacy preferences",
        type: "action",
        icon: Shield
      }
    ]
  },
  {
    title: "Support",
    settings: [
      {
        id: "help",
        name: "Help & Support",
        description: "Get help and contact support",
        type: "action",
        icon: HelpCircle
      }
    ]
  }
]

export default function SettingsPage() {
  const { theme, setTheme } = useTheme()
  const [settings, setSettings] = useState({
    audio: true,
    notifications: true,
    language: "English"
  })

  const toggleSetting = (settingId: string) => {
    setSettings(prev => ({
      ...prev,
      [settingId]: !prev[settingId as keyof typeof prev]
    }))
  }

  const renderSettingControl = (setting: any) => {
    switch (setting.type) {
      case "theme":
        return (
          <div className="flex items-center space-x-2">
            <Button
              variant={theme === "light" ? "default" : "outline"}
              size="sm"
              onClick={() => setTheme("light")}
              className="flex items-center space-x-1"
            >
              <Sun className="w-4 h-4" />
              <span>Light</span>
            </Button>
            <Button
              variant={theme === "dark" ? "default" : "outline"}
              size="sm"
              onClick={() => setTheme("dark")}
              className="flex items-center space-x-1"
            >
              <Moon className="w-4 h-4" />
              <span>Dark</span>
            </Button>
          </div>
        )
      
      case "toggle":
        return (
          <Button
            variant={settings[setting.id as keyof typeof settings] ? "default" : "outline"}
            size="sm"
            onClick={() => toggleSetting(setting.id)}
          >
            {settings[setting.id as keyof typeof settings] ? "Enabled" : "Disabled"}
          </Button>
        )
      
      case "select":
        return (
          <select 
            className="px-3 py-1 border rounded-md bg-background text-foreground"
            value={settings[setting.id as keyof typeof settings]}
            onChange={(e) => setSettings(prev => ({ ...prev, [setting.id]: e.target.value }))}
          >
            {setting.options.map((option: string) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        )
      
      case "action":
        return (
          <Button variant="outline" size="sm">
            Open
          </Button>
        )
      
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">
            Settings
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Customize your learning experience
          </p>
        </motion.div>

        {/* Settings Groups */}
        <div className="max-w-2xl mx-auto space-y-6">
          {settingsGroups.map((group, groupIndex) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: groupIndex * 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">{group.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {group.settings.map((setting, settingIndex) => (
                    <motion.div
                      key={setting.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: (groupIndex * 0.1) + (settingIndex * 0.05) }}
                      className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900 rounded-lg flex items-center justify-center">
                          <setting.icon className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-800 dark:text-gray-100">
                            {setting.name}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {setting.description}
                          </p>
                        </div>
                      </div>
                      <div className="flex-shrink-0">
                        {renderSettingControl(setting)}
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* App Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="max-w-2xl mx-auto mt-8"
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">About</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-2">
                <h3 className="font-medium text-gray-800 dark:text-gray-100">
                  Quran Learning App
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Version 1.0.0
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Learn Arabic, Urdu, and read the Quran with AI-powered guidance
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
