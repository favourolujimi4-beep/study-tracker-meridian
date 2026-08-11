import React, { useState, useEffect } from 'react'
import './App.css'
import Dashboard from './components/Dashboard'
import SessionLogger from './components/SessionLogger'
import WeeklyReflection from './components/WeeklyReflection'
import Settings from './components/Settings'
import Auth from './components/Auth'

function App() {
  const [currentUser, setCurrentUser] = useState(null)
  const [currentPage, setCurrentPage] = useState('dashboard')
  const [sessions, setSessions] = useState([])
  const [streaks, setStreaks] = useState({ current: 0, lastDate: null })
  const [rewards, setRewards] = useState([])
  const [reflections, setReflections] = useState([])
  const [settings, setSettings] = useState({
    font: 'Inter',
    theme: 'Cyber'
  })

  // Load data from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('studyTrackerUser')
    const savedSessions = localStorage.getItem('studySessions')
    const savedStreaks = localStorage.getItem('streaks')
    const savedRewards = localStorage.getItem('rewards')
    const savedReflections = localStorage.getItem('reflections')
    const savedSettings = localStorage.getItem('settings')

    if (savedUser) setCurrentUser(JSON.parse(savedUser))
    if (savedSessions) setSessions(JSON.parse(savedSessions))
    if (savedStreaks) setStreaks(JSON.parse(savedStreaks))
    if (savedRewards) setRewards(JSON.parse(savedRewards))
    if (savedReflections) setReflections(JSON.parse(savedReflections))
    if (savedSettings) setSettings(JSON.parse(savedSettings))
  }, [])

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('studySessions', JSON.stringify(sessions))
  }, [sessions])

  useEffect(() => {
    localStorage.setItem('streaks', JSON.stringify(streaks))
  }, [streaks])

  useEffect(() => {
    localStorage.setItem('rewards', JSON.stringify(rewards))
  }, [rewards])

  useEffect(() => {
    localStorage.setItem('reflections', JSON.stringify(reflections))
  }, [reflections])

  useEffect(() => {
    localStorage.setItem('settings', JSON.stringify(settings))
  }, [settings])

  const handleLogin = (email, password) => {
    const user = { id: Date.now(), email, password }
    setCurrentUser(user)
    localStorage.setItem('studyTrackerUser', JSON.stringify(user))
  }

  const handleLogout = () => {
    setCurrentUser(null)
    localStorage.removeItem('studyTrackerUser')
    setCurrentPage('dashboard')
  }

  const addSession = (sessionData) => {
    const newSession = {
      id: Date.now(),
      ...sessionData,
      date: new Date().toISOString()
    }
    setSessions([...sessions, newSession])
    
    // Update streak
    const today = new Date().toDateString()
    const lastStudyDate = streaks.lastDate ? new Date(streaks.lastDate).toDateString() : null
    
    let newStreak = streaks.current
    if (lastStudyDate !== today) {
      const yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - 1)
      if (lastStudyDate === yesterday.toDateString()) {
        newStreak = streaks.current + 1
      } else if (!lastStudyDate) {
        newStreak = 1
      } else {
        newStreak = 1
      }
    }
    
    setStreaks({ current: newStreak, lastDate: new Date().toISOString() })
    
    // Award badges
    if (newStreak === 7) {
      setRewards([...rewards, { id: Date.now(), badgeName: 'Week Warrior', type: '7-day' }])
    }
    if (newStreak === 30) {
      setRewards([...rewards, { id: Date.now(), badgeName: 'Month Master', type: '30-day' }])
    }
  }

  const addReflection = (reflectionText, goals) => {
    const newReflection = {
      id: Date.now(),
      text: reflectionText,
      goals: goals,
      date: new Date().toISOString(),
      week: Math.floor(Date.now() / (7 * 24 * 60 * 60 * 1000))
    }
    setReflections([...reflections, newReflection])
  }

  const updateSettings = (newSettings) => {
    setSettings({ ...settings, ...newSettings })
  }

  if (!currentUser) {
    return <Auth onLogin={handleLogin} />
  }

  const themeClasses = {
    'Cyber': 'bg-gray-900 text-cyan-400',
    'Emerald': 'bg-green-900 text-emerald-300',
    'Sapphire': 'bg-blue-900 text-blue-300',
    'Gold': 'bg-yellow-900 text-yellow-300',
    'Obsidian': 'bg-black text-gray-300'
  }

  const fontClasses = {
    'Inter': 'font-sans',
    'Garamond': 'font-serif',
    'Cyber': 'font-mono',
    'JetBrains': 'font-mono',
    'Playfair': 'font-serif'
  }

  return (
    <div className={`min-h-screen ${themeClasses[settings.theme]} ${fontClasses[settings.font]} transition-colors duration-300`}>
      {/* Navigation */}
      <nav className="border-b border-gray-700 p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">📚 Meridian</h1>
          <div className="flex gap-4 items-center">
            <button
              onClick={() => setCurrentPage('dashboard')}
              className={`px-4 py-2 rounded ${currentPage === 'dashboard' ? 'bg-cyan-600' : 'hover:bg-gray-800'}`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setCurrentPage('logger')}
              className={`px-4 py-2 rounded ${currentPage === 'logger' ? 'bg-cyan-600' : 'hover:bg-gray-800'}`}
            >
              Log Session
            </button>
            <button
              onClick={() => setCurrentPage('reflection')}
              className={`px-4 py-2 rounded ${currentPage === 'reflection' ? 'bg-cyan-600' : 'hover:bg-gray-800'}`}
            >
              Reflection
            </button>
            <button
              onClick={() => setCurrentPage('settings')}
              className={`px-4 py-2 rounded ${currentPage === 'settings' ? 'bg-cyan-600' : 'hover:bg-gray-800'}`}
            >
              Settings
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded bg-red-600 hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-8">
        {currentPage === 'dashboard' && (
          <Dashboard sessions={sessions} streaks={streaks} rewards={rewards} />
        )}
        {currentPage === 'logger' && (
          <SessionLogger onAddSession={addSession} />
        )}
        {currentPage === 'reflection' && (
          <WeeklyReflection onAddReflection={addReflection} reflections={reflections} />
        )}
        {currentPage === 'settings' && (
          <Settings settings={settings} onUpdateSettings={updateSettings} />
        )}
      </main>
    </div>
  )
}

export default App
