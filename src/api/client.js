const BASE = 'https://ideathon-plans.onrender.com'

async function request(path, options = {}) {
  let res
  try {
    res = await fetch(`${BASE}${path}`, {
      headers: { 'Content-Type': 'application/json' },
      ...options,
    })
  } catch (networkErr) {
    // CORS 또는 네트워크 오류
    console.error('[API] 네트워크 오류:', path, networkErr)
    throw new Error('서버에 연결할 수 없습니다. 잠시 후 다시 시도해주세요.')
  }

  const text = await res.text()
  console.log(`[API] ${options.method || 'GET'} ${path} → ${res.status}`, text)

  let data = {}
  try { data = JSON.parse(text) } catch (_) { /* HTML 에러 페이지 등 */ }

  if (!res.ok) {
    throw new Error(data.msg || data.detail || data.error || `오류 ${res.status}: 요청에 실패했습니다.`)
  }
  return data
}

/* ── 인증 ── */
export const authAPI = {
  login: (id, password) =>
    request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ id, password }),
    }),

  register: ({ id, password, name, email }) =>
    request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ id, password, name, email }),
    }),
}

/* ── 플래너 ── */
export const plannerAPI = {
  // 유저의 플래너 목록
  getUserPlanners: (userId) => request(`/user/${userId}/`),

  // 특정 플래너 전체 조회
  getPlanner: (plannerId) => request(`/planners/${plannerId}`),

  // AI 분석 요청 (12개 답변 전송 → 만다라트 생성)
  analyze: (userId, answers) =>
    request('/analyze/', {
      method: 'POST',
      body: JSON.stringify({ user_id: userId, answers }),
    }),

  // 분석용 질문 목록 (12개)
  getQuestions: () => request('/questions/'),

  // 중목표 카테고리 목록 (11개 고정)
  getCategories: () => request('/categories/'),

  // 대목표 수정
  updateMainGoal: (plannerId, mainGoal) =>
    request(`/planners/${plannerId}`, {
      method: 'PATCH',
      body: JSON.stringify({ main_goal: mainGoal }),
    }),

  // 중간 목표 수정 (배열)
  updateMidGoals: (plannerId, midGoalData) =>
    request(`/planners/${plannerId}/mid-goals`, {
      method: 'PATCH',
      body: JSON.stringify({ mid_goal_data: midGoalData }),
    }),

  // 소목표 수정 (배열)
  updateSubGoals: (midGoalId, subGoalData) =>
    request(`/mid-goals/${midGoalId}/sub-goals`, {
      method: 'PATCH',
      body: JSON.stringify({ 'sub-goal-data': subGoalData }),
    }),

  // 우선순위 설정
  setWeights: (plannerId, weightsData) =>
    request(`/planners/${plannerId}/weight`, {
      method: 'POST',
      body: JSON.stringify({ weights_data: weightsData }),
    }),

  // 우선순위 변경
  updateWeights: (plannerId, weightsData) =>
    request(`/planners/${plannerId}/weight`, {
      method: 'PATCH',
      body: JSON.stringify({ weights_data: weightsData }),
    }),

  // 플래너 삭제
  deletePlanner: (plannerId) =>
    request(`/planners/${plannerId}`, { method: 'DELETE' }),

  // 소목표 삭제
  deleteSubGoals: (midGoalId) =>
    request(`/mid-goals/${midGoalId}/sub-goals`, { method: 'DELETE' }),

  // 소목표 진행 상황 조회
  getSubGoalProgress: (subGoalId) =>
    request(`/sub-goals/${subGoalId}/progress`),
}
