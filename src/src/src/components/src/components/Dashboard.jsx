import React from 'react'

function Dashboard({ sessions, streaks, rewards }) {
  const totalHours = sessions.reduce((sum, session) => sum + parseFloat(session.hours || 0), 0)
  
  const subjectStats = {}
  sessions.forEach(session => {
    if (!subjectStats[session.subject]) {
      subjectStats[session.subject] = 0
    }
    subjectStats[session.subject] += parseFloat(session.hours || 0)
  })

  const thisWeekSessions = sessions.filter(session => {
    const sessionDate = new Date(session.date)
    const weekAgo = new Date()
    weekAgo.setDate(weekAgo.getDate() - 7)
    return sessionDate >= weekAgo
  })

  const studyDaysByDate = {}
  sessions.forEach(session => {
    const date = new Date(session.date).toDateString()
    studyDaysByDate[date] = (studyDaysByDate[date] || 0) + 1
  })

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">Dashboard</h1>

      {/* Streak Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-800 p-6 rounded-lg border border-cyan-600">
          <div className="text-6xl mb-4">🔥</div>
          <h3 className="text-xl font-bold mb-2">Current Streak</h3>
          <p className="text-4xl font-bold text-cyan-400">{streaks.current}</p>
          <p className="text-sm text-gray-400 mt-2">Days in a row</p>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg border border-cyan-600">
          <div className="text-6xl mb-4">📊</div>
          <h3 className="text-xl font-bold mb-2">Total Hours</h3>
          <p className="text-4xl font-bold text-cyan-400">{totalHours.toFixed(1)}</p>
          <p className="text-sm text-gray-400 mt-2">All time</p>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg border border-cyan-600">
          <div className="text-6xl mb-4">🏆</div>
          <h3 className="text-xl font-bold mb-2">Badges Earned</h3>
          <p className="text-4xl font-bold text-cyan-400">{rewards.length}</p>
          <p className="text-sm text-gray-400 mt-2">Achievements</p>
        </div>
      </div>

      {/* Rewards/Badges */}
      {rewards.length > 0 && (
        <div className="bg-gray-800 p-6 rounded-lg border border-cyan-600">
          <h3 className="text-2xl font-bold mb-4">🌟 Your Badges</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {rewards.map(reward => (
              <div key={reward.id} className="bg-gray-700 p-4 rounded text-center border border-yellow-600">
                <div className="text-4xl mb-2">🏅</div>
                <p className="font-bold">{reward.badgeName}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Subject Stats */}
      {Object.keys(subjectStats).length > 0 && (
        <div className="bg-gray-800 p-6 rounded-lg border border-cyan-600">
          <h3 className="text-2xl font-bold mb-4">📚 Hours by Subject</h3>
          <div className="space-y-3">
            {Object.entries(subjectStats).map(([subject, hours]) => (
              <div key={subject} className="flex justify-between items-center">
                <span className="font-semibold">{subject}</span>
                <div className="flex items-center gap-3">
                  <div className="bg-gray-700 rounded-full h-2 w-32">
                    <div
                      className="bg-cyan-600 h-2 rounded-full"
                      style={{ width: `${Math.min((hours / totalHours) * 100, 100)}%` }}
                    ></div>
                  </div>
                  <span className="text-cyan-400 font-bold">{hours.toFixed(1)}h</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Weekly Summary */}
      <div className="bg-gray-800 p-6 rounded-lg border border-cyan-600">
        <h3 className="text-2xl font-bold mb-4">📅 This Week</h3>
        <p className="text-cyan-400 mb-4">{thisWeekSessions.length} study sessions</p>
        {thisWeekSessions.length === 0 && (
          <p className="text-gray-400">No sessions this week. Start studying to build your streak!</p>
        )}
      </div>

      {/* Recent Sessions */}
      {sessions.length > 0 && (
        <div className="bg-gray-800 p-6 rounded-lg border border-cyan-600">
          <h3 className="text-2xl font-bold mb-4">📝 Recent Sessions</h3>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {sessions.slice().reverse().slice(0, 10).map(session => (
              <div key={session.id} className="bg-gray-700 p-4 rounded border border-gray-600">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-bold text-cyan-400">{session.subject}</p>
                    <p className="text-sm text-gray-400">{session.topics}</p>
                  </div>
                  <span className="text-cyan-400 font-bold">{session.hours}h</span>
                </div>
                <p className="text-xs text-gray-500 mt-2">{new Date(session.date).toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard
