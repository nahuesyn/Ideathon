import { useState } from 'react'
import AuthPage from './pages/AuthPage'
import MainPage from './pages/MainPage'

export default function App() {
  const [page, setPage] = useState('auth')
  const [user, setUser] = useState(null)

  if (page === 'main') {
    return (
      <MainPage
        user={user}
        onLogout={() => { setUser(null); setPage('auth') }}
      />
    )
  }
  return (
    <AuthPage
      onLoginSuccess={(u) => { setUser(u); setPage('main') }}
    />
  )
}
