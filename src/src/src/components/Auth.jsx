import React, { useState } from 'react'

function Auth({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignup, setIsSignup] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email && password) {
      onLogin(email, password)
    } else {
      alert('Please fill in all fields')
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-cyan-400 flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-lg border border-cyan-600 w-full max-w-md">
        <h1 className="text-3xl font-bold mb-8 text-center">📚 Meridian</h1>
        <h2 className="text-2xl font-bold mb-6">{isSignup ? 'Sign Up' : 'Login'}</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-700 border border-cyan-600 p-3 rounded text-white"
              placeholder="your@email.com"
            />
          </div>
          
          <div>
            <label className="block mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-700 border border-cyan-600 p-3 rounded text-white"
              placeholder="Your password"
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-cyan-600 hover:bg-cyan-700 p-3 rounded font-bold mt-6"
          >
            {isSignup ? 'Sign Up' : 'Login'}
          </button>
        </form>
        
        <p className="text-center mt-6">
          {isSignup ? 'Already have an account?' : "Don't have an account?"}
          <button
            onClick={() => setIsSignup(!isSignup)}
            className="text-cyan-400 hover:text-cyan-300 ml-2 underline"
          >
            {isSignup ? 'Login' : 'Sign Up'}
          </button>
        </p>
      </div>
    </div>
  )
}

export default Auth
