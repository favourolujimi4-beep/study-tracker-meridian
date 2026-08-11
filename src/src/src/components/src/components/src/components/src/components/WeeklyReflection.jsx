import React, { useState } from 'react'

function WeeklyReflection({ onAddReflection, reflections }) {
  const [reflectionText, setReflectionText] = useState('')
  const [goals, setGoals] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!reflectionText.trim()) {
      alert('Please write a reflection')
      return
    }

    onAddReflection(reflectionText, goals)
    
    setReflectionText('')
    setGoals('')
    setSubmitted(true)

    setTimeout(() => setSubmitted(false), 3000)
  }

  const sortedReflections = [...reflections].reverse()

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <h1 className="text-4xl font-bold">Weekly Reflection</h1>

      {submitted && (
        <div className="bg-blue-800 border border-blue-600 p-4 rounded text-blue-300 flex items-center gap-3">
          <span className="text-2xl">✨</span>
          <div>
            <p className="font-bold">Reflection saved!</p>
            <p className="text-sm">Great mindfulness! Keep reflecting on your progress.</p>
          </div>
        </div>
      )}

      {/* Reflection Form */}
      <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-lg border border-cyan-600 space-y-6">
        
        <div>
          <label className="block text-lg font-bold mb-2">What went well this week? *</label>
          <textarea
            value={reflectionText}
            onChange={(e) => setReflectionText(e.target.value)}
            placeholder="Share your thoughts about your study week, what you learned, challenges you faced, and victories you achieved..."
            className="w-full bg-gray-700 border border-cyan-600 p-4 rounded text-white placeholder-gray-500 h-32 resize-none"
          />
        </div>

        <div>
          <label className="block text-lg font-bold mb-2">Goals for next week</label>
          <textarea
            value={goals}
            onChange={(e) => setGoals(e.target.value)}
            placeholder="Set specific, achievable goals for next week. e.g., Study 5 hours per day, Master energy balance, Complete 3 past papers..."
            className="w-full bg-gray-700 border border-cyan-600 p-4 rounded text-white placeholder-gray-500 h-24 resize-none"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-cyan-600 hover:bg-cyan-700 p-4 rounded font-bold text-lg transition-colors"
        >
          ✅ Save Reflection
        </button>
      </form>

      {/* Reflection History */}
      {sortedReflections.length > 0 && (
        <div className="bg-gray-800 p-8 rounded-lg border border-cyan-600 space-y-6">
          <h3 className="text-2xl font-bold">📖 Your Reflections</h3>
          
          <div className="space-y-6">
            {sortedReflections.map(reflection => (
              <div key={reflection.id} className="bg-gray-700 p-6 rounded border border-gray-600">
                <p className="text-xs text-gray-400 mb-3">
                  {new Date(reflection.date).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
                
                <div className="mb-4">
                  <p className="text-sm text-gray-400 mb-2 font-semibold">What went well:</p>
                  <p className="text-white whitespace-pre-wrap">{reflection.text}</p>
                </div>

                {reflection.goals && (
                  <div>
                    <p className="text-sm text-gray-400 mb-2 font-semibold">Goals for next week:</p>
                    <p className="text-white whitespace-pre-wrap">{reflection.goals}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Reflection Guide */}
      <div className="bg-gray-800 p-6 rounded-lg border border-cyan-600">
        <h3 className="text-xl font-bold mb-4">💭 Reflection Guide</h3>
        <ul className="space-y-2 text-gray-300">
          <li>🎯 Be honest about what worked and what didn't</li>
          <li>📚 Reflect on your learning quality, not just hours studied</li>
          <li>💪 Celebrate small wins and improvements</li>
          <li>🔄 Use past reflections to identify patterns</li>
          <li>🚀 Make your goals SMART (Specific, Measurable, Achievable, Relevant, Time-bound)</li>
        </ul>
      </div>
    </div>
  )
}

export default WeeklyReflection
