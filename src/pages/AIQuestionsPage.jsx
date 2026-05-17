import { useState } from 'react'
import './AIQuestionsPage.css'
import logoImg from '../assets/logo.png'

function IconBell() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
      <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
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

const QUESTIONS = [
  { id: 1,  text: '어떤 사람으로 성장하고 싶나요?',                       placeholder: '대목표를 입력해주세요.' },
  { id: 2,  text: '현재 가장 가까운 목표는 무엇인가요?',                    placeholder: '내용을 입력해주세요.' },
  { id: 3,  text: '희망하는 직무가 정해져 있나요?',                        placeholder: '희망 직무를 입력해주세요.' },
  { id: 4,  text: '목표 기업 리스트가 있나요?',                            placeholder: '목표 기업을 입력해주세요.' },
  { id: 5,  text: '희망 직무에 필요한 핵심역량을 알고 있나요?',              placeholder: '내용을 입력해주세요.' },
  { id: 6,  text: '현재 준비 중인 역량은 무엇인가요?',                      placeholder: '내용을 입력해주세요.' },
  { id: 7,  text: '이력서나 자기소개서에 쓸 수 있는 경험이 정리되어 있나요?', placeholder: '내용을 입력해주세요.' },
  { id: 8,  text: '현재 이력서가 준비되어 있나요?',                        placeholder: '내용을 입력해주세요.' },
  { id: 9,  text: '자기소개서 작성 상태는 어떤가요?',                       placeholder: '내용을 입력해주세요.' },
  { id: 10, text: '면접 준비는 어느 정도 되어 있나요?',                     placeholder: '내용을 입력해주세요.' },
  { id: 11, text: '현재 취업 준비 루틴이 있나요?',                         placeholder: '취업루틴이 있다면 작성해보세요.' },
  { id: 12, text: '지금 가장 해결하고 싶은 문제는 무엇인가요?',              placeholder: '내용을 입력해주세요.' },
]

const CATEGORIES = [
  { key: 'cert',      label: '자격증' },
  { key: 'network',   label: '대인관계/AI 활용 도구' },
  { key: 'portfolio', label: '포트폴리오' },
  { key: 'company',   label: '기업 분석' },
  { key: 'career',    label: '진로 코칭' },
  { key: 'health',    label: '체력/영양 관리' },
]

const TOTAL = 12
const PRIORITY_STEP = TOTAL + 1

export default function AIQuestionsPage({ user, onComplete, onBack, startAtPriority = false, onGoMain }) {
  const [step, setStep] = useState(startAtPriority ? PRIORITY_STEP : 1)
  const [answers, setAnswers] = useState(Array(TOTAL).fill(''))
  const [weights, setWeights] = useState(
    Object.fromEntries(CATEGORIES.map(c => [c.key, '']))
  )
  const [loading, setLoading] = useState(false)
  const name = user?.name || '사용자'

  function handleAnswer(val) {
    setAnswers(prev => { const a = [...prev]; a[step - 1] = val; return a })
  }

  function goNext() {
    if (step < TOTAL) setStep(s => s + 1)
    else setStep(PRIORITY_STEP)
  }

  function goPrev() {
    if (step === PRIORITY_STEP) setStep(TOTAL)
    else if (step > 1) setStep(s => s - 1)
    else onBack()
  }

  function handleWeightChange(key, raw) {
    const v = raw.replace(/[^0-9]/g, '').slice(0, 3)
    setWeights(prev => ({ ...prev, [key]: v }))
  }

  async function handleComplete() {
    // TODO: 백엔드 배포 완료 후 아래 두 줄 언커멘트
    // const payload = answers.map((answer, i) => ({ question_id: i + 1, answer }))
    // await plannerAPI.analyze(user.user_id, payload)
    setLoading(true)
    setTimeout(() => { setLoading(false); onComplete() }, 800)
  }

  return (
    <div className="aiq-root">
      <header className="aiq-header">
        <div className="aiq-header-logo" onClick={onGoMain} style={{cursor:'pointer'}}>
          <img src={logoImg} className="aiq-logo-img" alt="육각형 프로젝트 로고" />
          <span className="aiq-logo-text">육각형 프로젝트</span>
        </div>
        <div className="aiq-header-greeting">
          <h1>안녕하세요, {name} 님</h1>
          <p>오늘은 얼마나 성장했을까요?</p>
        </div>
        <div className="aiq-header-user">
          <button className="aiq-bell" aria-label="알림">
            <IconBell />
            <span className="aiq-bell-dot" />
          </button>
          <div className="aiq-avatar"><IconUser /></div>
          <div className="aiq-user-info">
            <span className="aiq-user-name">{name}</span>
            <span className="aiq-user-sub">1달간의 리뷰하기 시작하면서요</span>
          </div>
        </div>
      </header>

      <main className="aiq-content">
        {step <= TOTAL ? (
          <div className="aiq-step">
            <h2 className="aiq-page-title">AI 추천 육각형 프로젝트 자동설계</h2>
            <p className="aiq-question">{step}. {QUESTIONS[step - 1].text}</p>
            <div className="aiq-progress-row">
              <span className="aiq-badge">{step}/{TOTAL}</span>
              <div className="aiq-bar">
                <div className="aiq-bar-fill" style={{ width: `${(step / TOTAL) * 100}%` }} />
              </div>
            </div>
            <textarea
              className="aiq-textarea"
              placeholder={QUESTIONS[step - 1].placeholder}
              value={answers[step - 1]}
              onChange={e => handleAnswer(e.target.value)}
              rows={3}
            />
            <div className="aiq-btns">
              {step > 1 && (
                <button className="aiq-btn-prev" onClick={goPrev}>이전으로</button>
              )}
              <button className="aiq-btn-next" onClick={goNext}>
                {step === TOTAL ? '육각형 플랜 완성하기' : '다음으로'}
              </button>
            </div>
          </div>
        ) : (
          <div className="aiq-priority">
            <h2 className="aiq-page-title">우선순위 배정하기</h2>
            <p className="aiq-priority-sub">
              우선 순위정도를 퍼센트로 입력해보세요.<br />
              입력 내용에 따라 우선 순위가 자동으로 배정됩니다.
            </p>
            <div className="aiq-priority-grid">
              {CATEGORIES.map(cat => (
                <div key={cat.key} className="aiq-priority-item">
                  <span className="aiq-priority-label">{cat.label}</span>
                  <div className="aiq-priority-input-wrap">
                    <input
                      type="text"
                      className="aiq-priority-input"
                      value={weights[cat.key]}
                      onChange={e => handleWeightChange(cat.key, e.target.value)}
                      placeholder="0"
                    />
                    <span className="aiq-priority-pct">%</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="aiq-btns">
              <button className="aiq-btn-prev" onClick={goPrev}>이전으로</button>
              <button className="aiq-btn-complete" onClick={handleComplete} disabled={loading}>
                {loading ? '생성 중...' : '육각형 플랜 완성하기'}
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
