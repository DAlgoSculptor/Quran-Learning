export interface Achievement {
  id: string
  name: string
  description: string
  icon: string
  xpReward: number
  condition: (stats: UserStats) => boolean
  category: 'learning' | 'streak' | 'completion' | 'social'
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
}

export interface UserStats {
  totalXP: number
  level: number
  streak: number
  maxStreak: number
  lessonsCompleted: number
  arabicLettersLearned: number
  urduLettersLearned: number
  surahsRead: number
  ayahsMemorized: number
  pronunciationScore: number
  writingScore: number
  quizScore: number
  daysActive: number
  totalStudyTime: number // in minutes
}

export interface DailyChallenge {
  id: string
  title: string
  description: string
  type: 'arabic' | 'urdu' | 'quran' | 'general'
  target: number
  progress: number
  xpReward: number
  completed: boolean
  expiresAt: Date
}

export const ACHIEVEMENTS: Achievement[] = [
  // Learning Achievements
  {
    id: 'first_lesson',
    name: 'First Steps',
    description: 'Complete your first lesson',
    icon: '🎯',
    xpReward: 50,
    condition: (stats) => stats.lessonsCompleted >= 1,
    category: 'learning',
    rarity: 'common'
  },
  {
    id: 'arabic_beginner',
    name: 'Arabic Explorer',
    description: 'Learn 10 Arabic letters',
    icon: '🔤',
    xpReward: 100,
    condition: (stats) => stats.arabicLettersLearned >= 10,
    category: 'learning',
    rarity: 'common'
  },
  {
    id: 'arabic_master',
    name: 'Arabic Master',
    description: 'Learn all 28 Arabic letters',
    icon: '📚',
    xpReward: 500,
    condition: (stats) => stats.arabicLettersLearned >= 28,
    category: 'learning',
    rarity: 'epic'
  },
  {
    id: 'urdu_beginner',
    name: 'Urdu Explorer',
    description: 'Learn 10 Urdu letters',
    icon: '✍️',
    xpReward: 100,
    condition: (stats) => stats.urduLettersLearned >= 10,
    category: 'learning',
    rarity: 'common'
  },
  {
    id: 'quran_reader',
    name: 'Quran Reader',
    description: 'Read 5 complete Surahs',
    icon: '📖',
    xpReward: 200,
    condition: (stats) => stats.surahsRead >= 5,
    category: 'learning',
    rarity: 'rare'
  },

  // Streak Achievements
  {
    id: 'week_warrior',
    name: 'Week Warrior',
    description: 'Maintain a 7-day streak',
    icon: '🔥',
    xpReward: 150,
    condition: (stats) => stats.streak >= 7,
    category: 'streak',
    rarity: 'common'
  },
  {
    id: 'month_master',
    name: 'Month Master',
    description: 'Maintain a 30-day streak',
    icon: '💪',
    xpReward: 1000,
    condition: (stats) => stats.streak >= 30,
    category: 'streak',
    rarity: 'epic'
  },
  {
    id: 'dedication',
    name: 'Dedication',
    description: 'Maintain a 100-day streak',
    icon: '👑',
    xpReward: 5000,
    condition: (stats) => stats.streak >= 100,
    category: 'streak',
    rarity: 'legendary'
  },

  // Completion Achievements
  {
    id: 'scholar',
    name: 'Scholar',
    description: 'Complete 100 lessons',
    icon: '🎓',
    xpReward: 1000,
    condition: (stats) => stats.lessonsCompleted >= 100,
    category: 'completion',
    rarity: 'rare'
  },
  {
    id: 'hafiz_beginner',
    name: 'Memory Champion',
    description: 'Memorize 10 Ayahs',
    icon: '🧠',
    xpReward: 500,
    condition: (stats) => stats.ayahsMemorized >= 10,
    category: 'completion',
    rarity: 'rare'
  },
  {
    id: 'pronunciation_expert',
    name: 'Pronunciation Expert',
    description: 'Achieve 90% pronunciation accuracy',
    icon: '🎤',
    xpReward: 300,
    condition: (stats) => stats.pronunciationScore >= 90,
    category: 'learning',
    rarity: 'rare'
  }
]

export class GamificationSystem {
  private static instance: GamificationSystem
  private userStats: UserStats
  private unlockedAchievements: Set<string>

  constructor() {
    this.userStats = this.loadUserStats()
    this.unlockedAchievements = new Set(this.loadUnlockedAchievements())
  }

  static getInstance(): GamificationSystem {
    if (!GamificationSystem.instance) {
      GamificationSystem.instance = new GamificationSystem()
    }
    return GamificationSystem.instance
  }

  private loadUserStats(): UserStats {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('quran-app-user-stats')
      if (saved) {
        return JSON.parse(saved)
      }
    }
    
    return {
      totalXP: 0,
      level: 1,
      streak: 0,
      maxStreak: 0,
      lessonsCompleted: 0,
      arabicLettersLearned: 0,
      urduLettersLearned: 0,
      surahsRead: 0,
      ayahsMemorized: 0,
      pronunciationScore: 0,
      writingScore: 0,
      quizScore: 0,
      daysActive: 0,
      totalStudyTime: 0
    }
  }

  private loadUnlockedAchievements(): string[] {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('quran-app-achievements')
      if (saved) {
        return JSON.parse(saved)
      }
    }
    return []
  }

  private saveUserStats(): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('quran-app-user-stats', JSON.stringify(this.userStats))
    }
  }

  private saveUnlockedAchievements(): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('quran-app-achievements', JSON.stringify([...this.unlockedAchievements]))
    }
  }

  getUserStats(): UserStats {
    return { ...this.userStats }
  }

  addXP(amount: number, reason: string = ''): { newLevel: boolean; levelUp: number | null } {
    const oldLevel = this.userStats.level
    this.userStats.totalXP += amount
    
    // Calculate new level (every 1000 XP = 1 level)
    const newLevel = Math.floor(this.userStats.totalXP / 1000) + 1
    const levelUp = newLevel > oldLevel ? newLevel : null
    
    this.userStats.level = newLevel
    this.saveUserStats()
    
    return {
      newLevel: levelUp !== null,
      levelUp
    }
  }

  updateStreak(active: boolean): void {
    if (active) {
      this.userStats.streak += 1
      this.userStats.maxStreak = Math.max(this.userStats.maxStreak, this.userStats.streak)
    } else {
      this.userStats.streak = 0
    }
    this.saveUserStats()
  }

  completeLesson(type: 'arabic' | 'urdu' | 'quran', xpReward: number = 50): Achievement[] {
    this.userStats.lessonsCompleted += 1
    this.addXP(xpReward, 'Lesson completed')
    this.saveUserStats()
    
    return this.checkAchievements()
  }

  learnLetter(language: 'arabic' | 'urdu'): Achievement[] {
    if (language === 'arabic') {
      this.userStats.arabicLettersLearned += 1
    } else {
      this.userStats.urduLettersLearned += 1
    }
    
    this.addXP(25, `${language} letter learned`)
    this.saveUserStats()
    
    return this.checkAchievements()
  }

  readSurah(): Achievement[] {
    this.userStats.surahsRead += 1
    this.addXP(100, 'Surah read')
    this.saveUserStats()
    
    return this.checkAchievements()
  }

  memorizeAyah(): Achievement[] {
    this.userStats.ayahsMemorized += 1
    this.addXP(200, 'Ayah memorized')
    this.saveUserStats()
    
    return this.checkAchievements()
  }

  updateScore(type: 'pronunciation' | 'writing' | 'quiz', score: number): Achievement[] {
    this.userStats[`${type}Score`] = Math.max(this.userStats[`${type}Score`], score)
    this.saveUserStats()
    
    return this.checkAchievements()
  }

  checkAchievements(): Achievement[] {
    const newAchievements: Achievement[] = []
    
    for (const achievement of ACHIEVEMENTS) {
      if (!this.unlockedAchievements.has(achievement.id) && achievement.condition(this.userStats)) {
        this.unlockedAchievements.add(achievement.id)
        newAchievements.push(achievement)
        this.addXP(achievement.xpReward, `Achievement: ${achievement.name}`)
      }
    }
    
    if (newAchievements.length > 0) {
      this.saveUnlockedAchievements()
    }
    
    return newAchievements
  }

  getUnlockedAchievements(): Achievement[] {
    return ACHIEVEMENTS.filter(achievement => this.unlockedAchievements.has(achievement.id))
  }

  getAvailableAchievements(): Achievement[] {
    return ACHIEVEMENTS.filter(achievement => !this.unlockedAchievements.has(achievement.id))
  }

  generateDailyChallenges(): DailyChallenge[] {
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)
    tomorrow.setHours(0, 0, 0, 0)

    return [
      {
        id: 'daily_arabic',
        title: 'Arabic Practice',
        description: 'Learn 3 Arabic letters',
        type: 'arabic',
        target: 3,
        progress: 0,
        xpReward: 100,
        completed: false,
        expiresAt: tomorrow
      },
      {
        id: 'daily_quran',
        title: 'Quran Reading',
        description: 'Read 5 Ayahs',
        type: 'quran',
        target: 5,
        progress: 0,
        xpReward: 150,
        completed: false,
        expiresAt: tomorrow
      },
      {
        id: 'daily_streak',
        title: 'Keep the Streak',
        description: 'Complete any lesson today',
        type: 'general',
        target: 1,
        progress: 0,
        xpReward: 75,
        completed: false,
        expiresAt: tomorrow
      }
    ]
  }

  getXPToNextLevel(): number {
    const currentLevelXP = (this.userStats.level - 1) * 1000
    const nextLevelXP = this.userStats.level * 1000
    return nextLevelXP - this.userStats.totalXP
  }

  getLevelProgress(): number {
    const currentLevelXP = (this.userStats.level - 1) * 1000
    const nextLevelXP = this.userStats.level * 1000
    const progressXP = this.userStats.totalXP - currentLevelXP
    return (progressXP / (nextLevelXP - currentLevelXP)) * 100
  }
}

export const gamification = GamificationSystem.getInstance()
