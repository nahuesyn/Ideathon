import { useState } from 'react'
import AuthPage from './pages/AuthPage'
import MainPage from './pages/MainPage'
import AIQuestionsPage from './pages/AIQuestionsPage'
import MandalartEditorPage from './pages/MandalartEditorPage'

export default function App() {
  const [page, setPage] = useState('auth')
  const [user, setUser] = useState(null)
  const [mandalartTexts, setMandalartTexts] = useState(null)
  const [hasPlanners, setHasPlanners] = useState(false)

  if (page === 'ai-questions') {
    return (
      <AIQuestionsPage
        user={user}
        onComplete={() => { setHasPlanners(true); setPage('main') }}
        onBack={() => setPage('main')}
        onGoMain={() => setPage('main')}
      />
    )
  }
  if (page === 'direct-editor') {
    return (
      <MandalartEditorPage
        user={user}
        onComplete={(texts) => { setMandalartTexts(texts); setPage('direct-priority') }}
        onBack={() => setPage('main')}
      />
    )
  }
  if (page === 'direct-priority') {
    return (
      <AIQuestionsPage
        user={user}
        startAtPriority
        onComplete={() => { setHasPlanners(true); setPage('main') }}
        onBack={() => setPage('direct-editor')}
      />
    )
  }
  if (page === 'main') {
    return (
      <MainPage
        user={user}
        hasPlanners={hasPlanners}
        onLogout={() => { setUser(null); setPage('auth') }}
        onStartAI={() => setPage('ai-questions')}
        onStartDirect={() => setPage('direct-editor')}
      />
    )
  }
  return (
    <AuthPage
      onLoginSuccess={(u) => { setUser(u); setPage('main') }}
    />
  )
}
