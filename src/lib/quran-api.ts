import axios from 'axios'

const QURAN_API_BASE = 'https://api.alquran.cloud/v1'

export interface Surah {
  number: number
  name: string
  englishName: string
  englishNameTranslation: string
  numberOfAyahs: number
  revelationType: string
}

export interface Ayah {
  number: number
  text: string
  numberInSurah: number
  juz: number
  manzil: number
  page: number
  ruku: number
  hizbQuarter: number
  sajda: boolean
}

export interface SurahDetail {
  number: number
  name: string
  englishName: string
  englishNameTranslation: string
  numberOfAyahs: number
  revelationType: string
  ayahs: Ayah[]
}

export interface Translation {
  number: number
  text: string
  numberInSurah: number
}

export interface SurahWithTranslation {
  surah: SurahDetail
  translation: Translation[]
}

class QuranAPI {
  private baseURL = QURAN_API_BASE

  async getAllSurahs(): Promise<Surah[]> {
    try {
      const response = await axios.get(`${this.baseURL}/surah`)
      return response.data.data
    } catch (error) {
      console.error('Error fetching surahs:', error)
      return []
    }
  }

  async getSurah(surahNumber: number): Promise<SurahDetail | null> {
    try {
      const response = await axios.get(`${this.baseURL}/surah/${surahNumber}`)
      return response.data.data
    } catch (error) {
      console.error(`Error fetching surah ${surahNumber}:`, error)
      return null
    }
  }

  async getSurahWithTranslation(
    surahNumber: number, 
    translationEdition: string = 'en.asad'
  ): Promise<SurahWithTranslation | null> {
    try {
      const [arabicResponse, translationResponse] = await Promise.all([
        axios.get(`${this.baseURL}/surah/${surahNumber}`),
        axios.get(`${this.baseURL}/surah/${surahNumber}/${translationEdition}`)
      ])

      return {
        surah: arabicResponse.data.data,
        translation: translationResponse.data.data.ayahs
      }
    } catch (error) {
      console.error(`Error fetching surah ${surahNumber} with translation:`, error)
      return null
    }
  }

  async getAyah(ayahNumber: number): Promise<Ayah | null> {
    try {
      const response = await axios.get(`${this.baseURL}/ayah/${ayahNumber}`)
      return response.data.data
    } catch (error) {
      console.error(`Error fetching ayah ${ayahNumber}:`, error)
      return null
    }
  }

  async searchQuran(query: string, surah?: number): Promise<any[]> {
    try {
      let url = `${this.baseURL}/search/${encodeURIComponent(query)}/all/en`
      if (surah) {
        url += `/${surah}`
      }
      const response = await axios.get(url)
      return response.data.data.matches || []
    } catch (error) {
      console.error('Error searching Quran:', error)
      return []
    }
  }

  async getRandomAyah(): Promise<Ayah | null> {
    try {
      // Get a random ayah number (1-6236 total ayahs in Quran)
      const randomAyahNumber = Math.floor(Math.random() * 6236) + 1
      return await this.getAyah(randomAyahNumber)
    } catch (error) {
      console.error('Error fetching random ayah:', error)
      return null
    }
  }

  // Get available translations
  getAvailableTranslations() {
    return [
      { code: 'en.asad', name: 'English - Muhammad Asad', language: 'English' },
      { code: 'en.pickthall', name: 'English - Pickthall', language: 'English' },
      { code: 'en.yusufali', name: 'English - Yusuf Ali', language: 'English' },
      { code: 'ur.jalandhry', name: 'Urdu - Jalandhry', language: 'Urdu' },
      { code: 'ur.kanzuliman', name: 'Urdu - Kanz ul Iman', language: 'Urdu' },
      { code: 'hi.hindi', name: 'Hindi - Hindi', language: 'Hindi' },
    ]
  }

  // Get audio recitation URLs
  getRecitationURL(surahNumber: number, reciter: string = 'ar.alafasy'): string {
    // Format surah number with leading zeros
    const formattedSurah = surahNumber.toString().padStart(3, '0')
    return `https://cdn.islamic.network/quran/audio-surah/${reciter}/${formattedSurah}.mp3`
  }

  // Get available reciters
  getAvailableReciters() {
    return [
      { code: 'ar.alafasy', name: 'Mishary Rashid Alafasy', language: 'Arabic' },
      { code: 'ar.husary', name: 'Mahmoud Khalil Al-Husary', language: 'Arabic' },
      { code: 'ar.minshawi', name: 'Mohamed Siddiq El-Minshawi', language: 'Arabic' },
      { code: 'ar.sudais', name: 'Abdul Rahman Al-Sudais', language: 'Arabic' },
    ]
  }
}

export const quranAPI = new QuranAPI()

// Mock data for development/offline use
export const mockSurahs: Surah[] = [
  {
    number: 1,
    name: "الفاتحة",
    englishName: "Al-Fatiha",
    englishNameTranslation: "The Opening",
    numberOfAyahs: 7,
    revelationType: "Meccan"
  },
  {
    number: 2,
    name: "البقرة",
    englishName: "Al-Baqarah",
    englishNameTranslation: "The Cow",
    numberOfAyahs: 286,
    revelationType: "Medinan"
  },
  {
    number: 3,
    name: "آل عمران",
    englishName: "Ali 'Imran",
    englishNameTranslation: "Family of Imran",
    numberOfAyahs: 200,
    revelationType: "Medinan"
  },
  {
    number: 4,
    name: "النساء",
    englishName: "An-Nisa",
    englishNameTranslation: "The Women",
    numberOfAyahs: 176,
    revelationType: "Medinan"
  },
  {
    number: 5,
    name: "المائدة",
    englishName: "Al-Ma'idah",
    englishNameTranslation: "The Table Spread",
    numberOfAyahs: 120,
    revelationType: "Medinan"
  }
]

export const mockAyahs = {
  1: [
    { number: 1, text: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ", numberInSurah: 1, translation: "In the name of Allah, the Entirely Merciful, the Especially Merciful." },
    { number: 2, text: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ", numberInSurah: 2, translation: "All praise is due to Allah, Lord of the worlds." },
    { number: 3, text: "الرَّحْمَٰنِ الرَّحِيمِ", numberInSurah: 3, translation: "The Entirely Merciful, the Especially Merciful," },
    { number: 4, text: "مَالِكِ يَوْمِ الدِّينِ", numberInSurah: 4, translation: "Sovereign of the Day of Recompense." },
    { number: 5, text: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ", numberInSurah: 5, translation: "It is You we worship and You we ask for help." },
    { number: 6, text: "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ", numberInSurah: 6, translation: "Guide us to the straight path -" },
    { number: 7, text: "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ", numberInSurah: 7, translation: "The path of those upon whom You have bestowed favor, not of those who have evoked [Your] anger or of those who are astray." }
  ]
}
