import { useState } from 'react'
import './AuthPage.css'
import logoImg from '../assets/logo.png'

/* ── 눈 아이콘 ── */
function EyeIcon({ open }) {
  return open ? (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  ) : (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
      <line x1="1" y1="1" x2="23" y2="23"/>
    </svg>
  )
}

/* ── 공용 로고 헤더 ── */
function AuthHeader() {
  return (
    <div className="auth-logo">
      <img src={logoImg} className="auth-logo-icon" alt="육각형 프로젝트 로고" />
      <span className="auth-logo-text">육각형 프로젝트</span>
    </div>
  )
}

/* ════════════════════════════════
   화면 1: 로그인
════════════════════════════════ */
function LoginView({ onGoRegister, onGoPasswordSetup, onLoginSuccess, registerSuccessMsg }) {
  const [id, setId] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [saveId, setSaveId] = useState(false)
  const [error, setError] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (!id) { setError('아이디를 입력해주세요.'); return }
    if (!password) { setError('비밀번호를 입력해주세요.'); return }
    setError('')
    // TODO: 백엔드 배포 완료 후 authAPI.login(id, password) 연동
    onLoginSuccess({ user_id: 1, name: id })
  }

  return (
    <>
      <AuthHeader />
      <h2 className="auth-title">로그인</h2>

      {registerSuccessMsg && (
        <p className="auth-success-banner">{registerSuccessMsg}</p>
      )}

      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        <div className="auth-input-wrap">
          <input
            className="auth-input"
            type="text"
            placeholder="아이디"
            value={id}
            onChange={e => setId(e.target.value)}
            autoComplete="username"
          />
        </div>

        <div className="auth-input-wrap">
          <input
            className="auth-input has-toggle"
            type={showPw ? 'text' : 'password'}
            placeholder="비밀번호"
            value={password}
            onChange={e => setPassword(e.target.value)}
            autoComplete="current-password"
          />
          <button
            type="button"
            className="auth-toggle-btn"
            onClick={() => setShowPw(v => !v)}
            aria-label="비밀번호 보기"
          >
            <EyeIcon open={showPw} />
          </button>
        </div>

        {error && <p className="auth-error">{error}</p>}

        <div className="auth-checkbox-spacer-row">
          <div className="auth-checkbox-left">
            <input
              id="save-id"
              type="checkbox"
              checked={saveId}
              onChange={e => setSaveId(e.target.checked)}
            />
            <label htmlFor="save-id">아이디 저장</label>
          </div>
          <button type="button" className="auth-link" onClick={onGoPasswordSetup}>
            비밀번호 찾기
          </button>
        </div>

        <button className="auth-btn-primary" type="submit">로그인 하기</button>
      </form>

      <p className="auth-bottom-text">
        아직 회원이 아니신가요?{' '}
        <button className="auth-link" onClick={onGoRegister}>회원가입</button>
      </p>
    </>
  )
}

/* ════════════════════════════════
   화면 2: 회원가입
════════════════════════════════ */
function RegisterView({ onGoLogin, onRegistered }) {
  const [lastName, setLastName] = useState('')
  const [firstName, setFirstName] = useState('')
  const [userId, setUserId] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [agree, setAgree] = useState(false)
  const [error, setError] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (!lastName || !firstName) { setError('이름을 입력해주세요.'); return }
    if (!userId) { setError('아이디를 입력해주세요.'); return }
    if (!email) { setError('이메일을 입력해주세요.'); return }
    if (password.length < 8) { setError('비밀번호는 8자 이상이어야 합니다.'); return }
    if (!agree) { setError('이용약관에 동의해주세요.'); return }
    setError('')
    // TODO: 백엔드 배포 완료 후 authAPI.register(...) 연동
    onRegistered()
  }

  return (
    <>
      <AuthHeader />
      <h2 className="auth-title">회원가입</h2>
      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        <div className="auth-row">
          <input
            className="auth-input"
            type="text"
            placeholder="성"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
          />
          <input
            className="auth-input"
            type="text"
            placeholder="이름"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
          />
        </div>

        <div className="auth-input-wrap">
          <input
            className="auth-input"
            type="text"
            placeholder="아이디"
            value={userId}
            onChange={e => setUserId(e.target.value)}
            autoComplete="username"
          />
        </div>

        <div className="auth-input-wrap">
          <input
            className="auth-input"
            type="email"
            placeholder="이메일"
            value={email}
            onChange={e => setEmail(e.target.value)}
            autoComplete="email"
          />
        </div>

        <div className="auth-input-wrap">
          <input
            className="auth-input has-toggle"
            type={showPw ? 'text' : 'password'}
            placeholder="비밀번호 (8자 이상)"
            value={password}
            onChange={e => setPassword(e.target.value)}
            autoComplete="new-password"
          />
          <button
            type="button"
            className="auth-toggle-btn"
            onClick={() => setShowPw(v => !v)}
            aria-label="비밀번호 보기"
          >
            <EyeIcon open={showPw} />
          </button>
        </div>

        {error && <p className="auth-error">{error}</p>}

        <div className="auth-checkbox-row">
          <input
            id="agree"
            type="checkbox"
            checked={agree}
            onChange={e => setAgree(e.target.checked)}
          />
          <label htmlFor="agree">
            모든 <a href="#">이용약관</a>을 확인하고 전체 동의 합니다.
          </label>
        </div>

        <button className="auth-btn-primary" type="submit">회원가입 하기</button>
      </form>

      <p className="auth-bottom-text">
        이미 계정이 있으신가요?{' '}
        <button className="auth-link" onClick={onGoLogin}>로그인</button>
      </p>
    </>
  )
}

/* ════════════════════════════════
   화면 3: 새로운 비밀번호 설정 (비밀번호 찾기 플로우)
════════════════════════════════ */
function PasswordSetupView({ onComplete, onBack }) {
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [error, setError] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (password.length < 8) { setError('비밀번호는 8자 이상이어야 합니다.'); return }
    if (password !== confirm) { setError('비밀번호가 일치하지 않습니다.'); return }
    setError('')
    onComplete()
  }

  return (
    <>
      <AuthHeader />
      <h2 className="auth-title-left">새로운 비밀번호 설정</h2>
      <p className="auth-subtitle">
        새로운 비밀번호를 설정하세요. 이전에 사용하던 비밀번호와
        다른 비밀번호를 설정해야합니다.
      </p>
      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        <div className="auth-input-wrap">
          <input
            className="auth-input has-toggle"
            type={showPw ? 'text' : 'password'}
            placeholder="새 비밀번호"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button type="button" className="auth-toggle-btn" onClick={() => setShowPw(v => !v)} aria-label="비밀번호 보기">
            <EyeIcon open={showPw} />
          </button>
        </div>

        <div className="auth-input-wrap">
          <input
            className="auth-input has-toggle"
            type={showConfirm ? 'text' : 'password'}
            placeholder="비밀번호 확인"
            value={confirm}
            onChange={e => setConfirm(e.target.value)}
          />
          <button type="button" className="auth-toggle-btn" onClick={() => setShowConfirm(v => !v)} aria-label="비밀번호 보기">
            <EyeIcon open={showConfirm} />
          </button>
        </div>

        {confirm && confirm !== password && (
          <p className="auth-error">비밀번호가 일치하지 않습니다.</p>
        )}
        {error && <p className="auth-error">{error}</p>}

        <button className="auth-btn-primary" type="submit">비밀번호 재설정</button>
      </form>

      <p className="auth-bottom-text">
        <button className="auth-link" onClick={onBack}>뒤로 가기</button>
      </p>
    </>
  )
}

/* ════════════════════════════════
   화면 4: 완료
════════════════════════════════ */
function SuccessView({ onGoLogin }) {
  return (
    <>
      <button className="auth-close-btn" onClick={onGoLogin} aria-label="닫기">×</button>
      <div className="auth-success">
        <div className="auth-success-icon">
          <img src={logoImg} className="auth-logo-icon" alt="" />
        </div>
        <p className="auth-success-title">
          새 비밀번호가<br />성공적으로 변경되었습니다.
        </p>
        <p className="auth-success-desc">
          작은 실천으로 나의 &lsquo;진짜 성장&rsquo;을 경험해보세요!<br />
          무궁한 변화는 커다란 가능성을 만들어낼 수 있어요.
        </p>
        <button className="auth-btn-primary" onClick={onGoLogin}>
          로그인하러 가기
        </button>
      </div>
    </>
  )
}

/* ════════════════════════════════
   메인 AuthPage
════════════════════════════════ */
export default function AuthPage({ onLoginSuccess }) {
  const [view, setView] = useState('login')
  const [registerSuccessMsg, setRegisterSuccessMsg] = useState('')

  function handleRegistered() {
    setRegisterSuccessMsg('회원가입이 완료됐어요! 로그인해주세요.')
    setView('login')
  }

  return (
    <div className="auth-root">
      <div className="auth-card">
        {view === 'login' && (
          <LoginView
            onGoRegister={() => { setRegisterSuccessMsg(''); setView('register') }}
            onGoPasswordSetup={() => setView('password-setup')}
            onLoginSuccess={onLoginSuccess}
            registerSuccessMsg={registerSuccessMsg}
          />
        )}
        {view === 'register' && (
          <RegisterView
            onGoLogin={() => setView('login')}
            onRegistered={handleRegistered}
          />
        )}
        {view === 'password-setup' && (
          <PasswordSetupView
            onComplete={() => setView('success')}
            onBack={() => setView('login')}
          />
        )}
        {view === 'success' && (
          <SuccessView onGoLogin={() => setView('login')} />
        )}
      </div>
    </div>
  )
}
