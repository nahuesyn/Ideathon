import { useState } from 'react'
import './MainPage.css'
import logoImg from '../assets/logo.png'

function IconBell() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
      <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
    </svg>
  )
}

function IconPencil() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
    </svg>
  )
}

function IconGrid() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
      <rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
    </svg>
  )
}

function IconCalendar() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
      <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/>
      <line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  )
}

function IconCheck() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  )
}

function IconUser() {
  return (
    <svg width="28" height="28" viewBox="0 0 36 36" fill="none">
      <circle cx="18" cy="13" r="7" fill="#b0b8e8"/>
      <path d="M4 34c0-7.732 6.268-14 14-14s14 6.268 14 14" fill="#b0b8e8"/>
    </svg>
  )
}

/* ── 빈 상태 일러스트 ── */
function EmptyIllust() {
  return (
    <svg width="80" height="100" viewBox="0 0 80 100" fill="none" className="main-empty-illust">
      <rect x="15" y="5" width="50" height="40" rx="14" fill="#D8DCF0" />
      <rect x="15" y="55" width="50" height="40" rx="14" fill="#D8DCF0" />
    </svg>
  )
}

/* ════════════════════════════════
   미니 캘린더
════════════════════════════════ */
const DAY_LABELS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']
const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December']

function getCalendarDays(year, month) {
  // Returns array of {day, dayOfWeek} or null for empty cells
  // Week starts on Monday (0=Mon … 6=Sun)
  const firstDow = new Date(year, month, 1).getDay() // 0=Sun
  const startOffset = (firstDow + 6) % 7             // shift so Mon=0
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const cells = []
  for (let i = 0; i < startOffset; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) {
    const dow = (startOffset + d - 1) % 7  // 0=Mon … 6=Sun
    cells.push({ day: d, dow })
  }
  return cells
}

function getWeekRange(year, month, today) {
  // Returns [weekStart, weekEnd] as day numbers for today's week
  const dow = (new Date(year, month, today).getDay() + 6) % 7 // Mon=0
  const start = today - dow
  const end = start + 6
  return [start, end]
}

function MiniCalendar() {
  const now = new Date()
  const [viewYear, setViewYear] = useState(now.getFullYear())
  const [viewMonth, setViewMonth] = useState(now.getMonth())

  const todayYear = now.getFullYear()
  const todayMonth = now.getMonth()
  const todayDay = now.getDate()

  const isCurrentMonth = viewYear === todayYear && viewMonth === todayMonth
  const [weekStart, weekEnd] = isCurrentMonth
    ? getWeekRange(viewYear, viewMonth, todayDay)
    : [null, null]

  const cells = getCalendarDays(viewYear, viewMonth)

  function prevMonth() {
    if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11) }
    else setViewMonth(m => m - 1)
  }
  function nextMonth() {
    if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0) }
    else setViewMonth(m => m + 1)
  }

  function cellClass(cell) {
    if (!cell) return 'sidebar-cal-date empty'
    const { day, dow } = cell
    const isToday = isCurrentMonth && day === todayDay
    const inWeek = weekStart !== null && day >= weekStart && day <= weekEnd
    const isWeekStart = day === weekStart
    const isWeekEnd = day === weekEnd || day === new Date(viewYear, viewMonth + 1, 0).getDate()
    const isSat = dow === 5
    const isSun = dow === 6

    let cls = 'sidebar-cal-date'
    if (isToday) cls += ' today'
    else if (inWeek) {
      cls += ' in-week'
      if (isWeekStart) cls += ' week-start'
      if (isWeekEnd) cls += ' week-end'
    }
    if (!isToday && isSat) cls += ' sat-date'
    if (!isToday && isSun) cls += ' sun-date'
    return cls
  }

  return (
    <div className="sidebar-calendar">
      <div className="sidebar-cal-header">
        <button className="sidebar-cal-nav" onClick={prevMonth}>‹</button>
        <span className="sidebar-cal-title">{MONTH_NAMES[viewMonth].slice(0, 3)}, {viewYear}</span>
        <button className="sidebar-cal-nav" onClick={nextMonth}>›</button>
      </div>
      <div className="sidebar-cal-grid">
        {DAY_LABELS.map((lbl, i) => (
          <span key={lbl} className={`sidebar-cal-day-label${i === 5 ? ' sat' : i === 6 ? ' sun' : ''}`}>
            {lbl}
          </span>
        ))}
        {cells.map((cell, idx) => (
          <span key={idx} className={cellClass(cell)}>
            {cell ? cell.day : ''}
          </span>
        ))}
      </div>
    </div>
  )
}

/* ════════════════════════════════
   메인 페이지
════════════════════════════════ */
export default function MainPage({ user, onLogout }) {
  const [activeNav, setActiveNav] = useState('mandalart')
  const [contentView, setContentView] = useState('empty') // 'empty' | 'create-options' | 'has-planners'
  // TODO: 백엔드 배포 완료 후 useEffect로 plannerAPI.getUserPlanners 연동
  const name = user?.name || '사용자'

  return (
    <div className="main-root">
      {/* ── 헤더 ── */}
      <header className="main-header">
        <div className="main-header-logo">
          <img src={logoImg} className="main-header-logo-img" alt="육각형 프로젝트 로고" />
          <span className="main-header-logo-text">육각형 프로젝트</span>
        </div>
        <div className="main-header-greeting">
          <h1>안녕하세요, {name} 님</h1>
          <p>오늘은 얼마나 성장했을까요?</p>
        </div>
        <div className="main-header-user">
          <button className="main-header-bell" aria-label="알림">
            <IconBell />
            <span className="main-header-bell-dot" />
          </button>
          <div className="main-header-avatar">
            <IconUser />
          </div>
          <div className="main-header-user-info">
            <span className="main-header-user-name">{name}</span>
            <span className="main-header-user-sub">1달간의 리뷰하기 시작하면서요</span>
          </div>
        </div>
      </header>

      {/* ── 사이드바 ── */}
      <aside className="main-sidebar">
        {/* 프로필 */}
        <div className="sidebar-profile">
          <div className="sidebar-avatar">
            <IconUser />
          </div>
          <div className="sidebar-profile-name">
            <span>{name}</span>
            <button aria-label="프로필 편집"><IconPencil /></button>
          </div>
          <p className="sidebar-profile-status">육각형 앱을 한번 들여다 시작</p>
        </div>

        <div className="sidebar-divider" />

        {/* 캘린더 */}
        <MiniCalendar />

        {/* 이벤트 뱃지 */}
        <div className="sidebar-event-badge">
          <strong>한국사능력검정시험</strong>
          5/23(토) 10:00
        </div>

        <div className="sidebar-divider" style={{ marginTop: 12 }} />

        {/* 네비게이션 */}
        <nav className="sidebar-nav">
          <button
            className={`sidebar-nav-item${activeNav === 'mandalart' ? ' active' : ''}`}
            onClick={() => setActiveNav('mandalart')}
          >
            <span className="sidebar-nav-icon"><IconGrid /></span>
            만다라트 연간 계획
          </button>
          <button
            className={`sidebar-nav-item${activeNav === 'schedule' ? ' active' : ''}`}
            onClick={() => setActiveNav('schedule')}
          >
            <span className="sidebar-nav-icon"><IconCalendar /></span>
            주요 일정
          </button>
          <button
            className={`sidebar-nav-item${activeNav === 'checklist' ? ' active' : ''}`}
            onClick={() => setActiveNav('checklist')}
          >
            <span className="sidebar-nav-icon"><IconCheck /></span>
            체크리스트
          </button>
        </nav>
      </aside>

      {/* ── 메인 콘텐츠 ── */}
      <main className="main-content">
        {contentView === 'empty' && (
          <div className="main-empty">
            <EmptyIllust />
            <p className="main-empty-text">아직 생성된 육각형 프로젝트가 없어요!</p>
            <button
              className="main-empty-btn"
              onClick={() => setContentView('create-options')}
            >
              육각형 프로젝트 만들기
            </button>
          </div>
        )}

        {contentView === 'create-options' && (
          <div className="main-create-options">
            <p className="main-create-title">육각형 프로젝트를 어떤 방식으로 만들까요?</p>
            <div className="main-create-btns">
              <button className="main-create-btn">AI 추천받기</button>
              <button className="main-create-btn">직접 입력하기</button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
