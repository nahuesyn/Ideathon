import { useRef } from 'react'
import './MandalartEditorPage.css'
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

/* ─────────────────────────────────────────
   Hex layout constants (flat-top hexagons)
   S  = sub/mid hex size (center → vertex)
   SC = center hex size
   K  = petal distance multiplier (=3 → petals touch each other)
───────────────────────────────────────── */
const S   = 28
const SC  = 46
const K   = 3
const RT3 = Math.sqrt(3)

const HW = S * 2        // small hex width  = 56 px
const HH = S * RT3      // small hex height ≈ 48.5 px
const CW = SC * 2       // center hex width = 92 px
const CH = SC * RT3     // center hex height ≈ 79.7 px

// 6 neighbor offsets for flat-top hex grid
const OFF = [
  [0,          -S * RT3      ],  // 0: top
  [ S * 1.5,  -S * RT3 / 2  ],  // 1: upper-right
  [ S * 1.5,   S * RT3 / 2  ],  // 2: lower-right
  [0,           S * RT3      ],  // 3: bottom
  [-S * 1.5,   S * RT3 / 2  ],  // 4: lower-left
  [-S * 1.5,  -S * RT3 / 2  ],  // 5: upper-left
]

const CX = 240, CY = 255  // canvas center

/* Build all 43 hex descriptors (index order matches texts array) */
const HEXES = (() => {
  const list = []
  // 0: center (대목표)
  list.push({ x: CX, y: CY, type: 'center', group: -1 })
  OFF.forEach(([dx, dy], gi) => {
    const px = CX + dx * K
    const py = CY + dy * K
    // 1 + gi*7: mid goal (중목표)
    list.push({ x: px, y: py, type: 'mid', group: gi })
    // +1~6: sub goals (소목표)
    OFF.forEach(([sx, sy]) => {
      list.push({ x: px + sx, y: py + sy, type: 'sub', group: gi })
    })
  })
  return list  // length = 43
})()

const HEX_BG = { center: '#8B9EF5', mid: '#C0C8F5', sub: '#D8DCF0' }

export default function MandalartEditorPage({ user, onComplete, onBack }) {
  const name = user?.name || '사용자'
  const elRefs = useRef([])

  function handleSave() {
    const texts = elRefs.current.map(el => el?.innerText?.trim() ?? '')
    onComplete(texts)
  }

  return (
    <div className="mde-root">
      <header className="mde-header">
        <div className="mde-header-logo" onClick={onBack} style={{cursor:'pointer'}}>
          <img src={logoImg} className="mde-logo-img" alt="로고" />
          <span className="mde-logo-text">육각형 프로젝트</span>
        </div>
        <div className="mde-header-greeting">
          <h1>안녕하세요, {name} 님</h1>
          <p>오늘은 얼마나 성장했을까요?</p>
        </div>
        <div className="mde-header-user">
          <button className="mde-bell" aria-label="알림">
            <IconBell /><span className="mde-bell-dot" />
          </button>
          <div className="mde-avatar"><IconUser /></div>
          <div className="mde-user-info">
            <span className="mde-user-name">{name}</span>
            <span className="mde-user-sub">1달간의 리뷰하기 시작하면서요</span>
          </div>
        </div>
      </header>

      <main className="mde-content">
        <div className="mde-scroll">
          <div className="mde-canvas">
            {HEXES.map((hex, idx) => {
              const isC = hex.type === 'center'
              const isM = hex.type === 'mid'
              const w   = isC ? CW : HW
              const h   = isC ? CH : HH
              return (
                <div
                  key={idx}
                  className={`mde-hex mde-hex-${hex.type}`}
                  style={{
                    left: hex.x - w / 2,
                    top:  hex.y - h / 2,
                    width: w,
                    height: h,
                    background: HEX_BG[hex.type],
                    zIndex: isC ? 3 : isM ? 2 : 1,
                  }}
                >
                  <div
                    ref={el => { elRefs.current[idx] = el }}
                    contentEditable
                    suppressContentEditableWarning
                    className="mde-hex-text"
                    style={{ fontSize: isC ? 11 : isM ? 9 : 8 }}
                  />
                </div>
              )
            })}
          </div>
        </div>

        <p className="mde-hint">
          우선순위 배정 전이니 중목표와 소목표 블럭은 회색으로 표시됩니다.<br />
          각 칸을 클릭하여 텍스트를 편집하세요.
        </p>

        <div className="mde-btns">
          <button className="mde-btn-back" onClick={onBack}>이전으로</button>
          <button className="mde-btn-save" onClick={handleSave}>저장</button>
        </div>
      </main>
    </div>
  )
}
