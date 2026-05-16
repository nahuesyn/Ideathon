import { useState } from 'react'
import AuthPage from './pages/AuthPage'
import MainPage from './pages/MainPage'
import AIQuestionsPage from './pages/AIQuestionsPage'

export default function App() {
  const [page, setPage] = useState('auth')
  const [user, setUser] = useState(null)

  if (page === 'ai-questions') {
    return (
      <AIQuestionsPage
        user={user}
        onComplete={() => setPage('main')}
        onBack={() => setPage('main')}
      />
    )
  }
  if (page === 'main') {
    return (
      <MainPage
        user={user}
        onLogout={() => { setUser(null); setPage('auth') }}
        onStartAI={() => setPage('ai-questions')}
      />
    )
  }
  return (
    <AuthPage
      onLoginSuccess={(u) => { setUser(u); setPage('main') }}
    />
  )
}
