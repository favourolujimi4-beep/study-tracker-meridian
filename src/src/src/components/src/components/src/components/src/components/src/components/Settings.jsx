import React from 'react'

function Settings({ settings, onUpdateSettings }) {
  const fonts = ['Inter', 'Garamond', 'Cyber', 'JetBrains', 'Playfair']
  const themes = ['Cyber', 'Emerald', 'Sapphire', 'Gold', 'Obsidian']

  const themeDescriptions = {
    'Cyber': '🤖 High-tech, electric cyan vibes',
    'Emerald': '🌿 Natural, calming green tones',
    'Sapphire': '💎 Cool, professional blue theme',
    'Gold': '✨ Warm, premium gold accents',
    'Obsidian': '🌑 Dark, minimalist black theme'
  }

  const fontDescriptions = {
    'Inter': 'Clean, modern, highly readable',
    'Garamond': 'Classic, elegant serif font',
    'Cyber': 'Monospace, technical feel',
    'JetBrains': 'Coding-focused, developer-friendly',
    'Playfair': 'Luxurious, editorial serif'
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <h1 className="text-4xl font-bold">Settings</h1>

      {/* Font Selection */}
      <div className="bg-gray-800 p-8 rounded-lg border border-cyan-600 space-y-6">
        <h2 className="text-2xl font-bold">🔤 Choose Your Font</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {fonts.map(font => (
            <button
              key={font}
              onClick={() => onUpdateSettings({ font })}
              className={`p-6 rounded border-2 transition-all text-left ${
                settings.font === font
                  ? 'border-cyan-400 bg-cyan-900 bg-opacity-30'
                  : 'border-gray-600 hover:border-cyan-400'
              }`}
            >
              <p className="text-lg font-bold mb-2">{font}</p>
              <p className="text-sm text-gray-400">{fontDescriptions[font]}</p>
              {settings.font === font && (
                <div className="mt-3 text-cyan-400 font-bold">✓ Selected</div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Theme Selection */}
      <div className="bg-gray-800 p-8 rounded-lg border border-cyan-600 space-y-6">
        <h2 className="text-2xl font-bold">🎨 Choose Your Theme</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {themes.map(theme => (
            <button
              key={theme}
              onClick={() => onUpdateSettings({ theme })}
              className={`p-6 rounded border-2 transition-all text-left ${
                settings.theme === theme
                  ? 'border-cyan-400 bg-cyan-900 bg-opacity-30'
                  : 'border-gray-600 hover:border-cyan-400'
              }`}
            >
              <p className="text-lg font-bold mb-2">{theme}</p>
              <p className="text-sm text-gray-400">{themeDescriptions[theme]}</p>
              {settings.theme === theme && (
                <div className="mt-3 text-cyan-400 font-bold">✓ Selected</div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Current Settings */}
      <div className="bg-gray-800 p-8 rounded-lg border border-cyan-600">
        <h2 className="text-2xl font-bold mb-6">📋 Current Settings</h2>
        <div className="space-y-4">
          <div className="flex justify-between items-center pb-4 border-b border-gray-600">
            <span className="text-gray-400">Font:</span>
            <span className="font-bold text-cyan-400">{settings.font}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Theme:</span>
            <span className="font-bold text-cyan-400">{settings.theme}</span>
          </div>
        </div>
      </div>

      {/* Tips */}
      <div className="bg-gray-800 p-6 rounded-lg border border-cyan-600">
        <h3 className="text-xl font-bold mb-4">💡 Personalization Tips</h3>
        <ul className="space-y-2 text-gray-300">
          <li>🎯 Choose a font that's comfortable for extended reading</li>
          <li>👁️ Pick a theme that reduces eye strain during long study sessions</li>
          <li>⚙️ Your preferences are saved automatically</li>
          <li>🔄 Change settings anytime to find what works best for you</li>
        </ul>
      </div>
    </div>
  )
}

export default Settings
