import React, { useState } from 'react'

function SessionLogger({ onAddSession }) {
  const [subject, setSubject] = useState('')
  const [hours, setHours] = useState('')
  const [minutes, setMinutes] = useState('')
  const [topics, setTopics] = useState('')
  const [difficulty, setDifficulty] = useState('medium')
  const [notes, setNotes] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!subject || !hours) {
      alert('Please fill in Subject and Hours')
      return
    }

    const totalHours = parseFloat(hours) + (parseFloat(minutes || 0) / 60)
    
    onAddSession({
      subject,
      hours: totalHours.toFixed(2),
      topics,
      difficulty,
      notes
    })

    setSubmitted(true)
    setSubject('')
    setHours('')
    setMinutes('')
    setTopics('')
    setDifficulty('medium')
    setNotes('')

    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <h1 className="text-4xl font-bold">Log Study Session</h1>

      {submitted && (
        <div className="bg-green-800 border border-green-600 p-4 rounded text-green-300 flex items-center gap-3">
          <span className="text-2xl">✅</span>
          <div>
            <p className="font-bold">Great job studying!</p>
            <p className="text-sm">Your session has been logged and your streak is growing!</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-lg border border-cyan-600 space-y-6">
        
        {/* Subject */}
        <div>
          <label className="block text-lg font-bold mb-2">Subject/Course *</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="e.g., Chemistry, Mathematics, Physics"
            className="w-full bg-gray-700 border border-cyan-600 p-3 rounded text-white placeholder-gray-500"
          />
        </div>

        {/* Hours and Minutes */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-lg font-bold mb-2">Hours *</label>
            <input
              type="number"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
              placeholder="0"
              step="0.5"
              min="0"
              className="w-full bg-gray-700 border border-cyan-600 p-3 rounded text-white placeholder-gray-500"
            />
          </div>
          <div>
            <label className="block text-lg font-bold mb-2">Minutes</label>
            <input
              type="number"
              value={minutes}
              onChange={(e) => setMinutes(e.target.value)}
              placeholder="0"
              step="5"
              min="0"
              max="59"
              className="w-full bg-gray-700 border border-cyan-600 p-3 rounded text-white placeholder-gray-500"
            />
          </div>
        </div>

        {/* Topics Covered */}
        <div>
          <label className="block text-lg font-bold mb-2">Topics Covered</label>
          <textarea
            value={topics}
            onChange={(e) => setTopics(e.target.value)}
            placeholder="e.g., Energy balance equations, thermodynamic definitions"
            className="w-full bg-gray-700 border border-cyan-600 p-3 rounded text-white placeholder-gray-500 h-24 resize-none"
          />
        </div>

        {/* Difficulty */}
        <div>
          <label className="block text-lg font-bold mb-2">Difficulty Level</label>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="w-full bg-gray-700 border border-cyan-600 p-3 rounded text-white"
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        {/* Notes */}
        <div>
          <label className="block text-lg font-bold mb-2">Notes</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Any additional notes about this session..."
            className="w-full bg-gray-700 border border-cyan-600 p-3 rounded text-white placeholder-gray-500 h-20 resize-none"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-cyan-600 hover:bg-cyan-700 p-4 rounded font-bold text-lg transition-colors"
        >
          ✅ Log Session
        </button>
      </form>

      {/* Tips Section */}
      <div className="bg-gray-800 p-6 rounded-lg border border-cyan-600">
        <h3 className="text-xl font-bold mb-4">💡 Tips</h3>
        <ul className="space-y-2 text-gray-300">
          <li>✓ Log your sessions immediately after studying for accuracy</li>
          <li>✓ Be specific about topics to track your progress</li>
          <li>✓ Consistent logging helps build your study streak</li>
          <li>✓ Your streak resets if you miss a day</li>
        </ul>
      </div>
    </div>
  )
}

export default SessionLogger
