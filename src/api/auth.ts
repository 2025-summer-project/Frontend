const API_BASE = "http://localhost:8000/auth";

interface AuthResponse {
  access: string;
  refresh: string;
  user_name?: string;
}

interface CheckDuplicateResponse {
  available: boolean;
  message?: string;
}

// 회원가입
export async function signup(user_id: string, user_name: string, password: string): Promise<AuthResponse> {
  const res = await fetch(`${API_BASE}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user_id, user_name, password }),
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "회원가입 실패");
  }
  return res.json();
}

// 아이디 중복확인
export async function checkDuplicate(user_id: string): Promise<CheckDuplicateResponse> {
  const res = await fetch(`${API_BASE}/id-check?user_id=${user_id}`);
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "중복확인 실패");
  }
  return res.json();
}

// 로그인 (백엔드 expects username, password)
export async function login(user_id: string, password: string): Promise<AuthResponse> {
  const res = await fetch(`${API_BASE}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user_id, password }),
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "로그인 실패");
  }
  const data = await res.json();
  localStorage.setItem("access", data.access);
  localStorage.setItem("refresh", data.refresh);
  localStorage.setItem("user_name", data.user_name || "");
  return data;
}

// 로그아웃 (백엔드 expects refresh token in body)
export async function logout(): Promise<void> {
  const refresh = localStorage.getItem("refresh");
  if (!refresh) return;
  try {
    const res = await fetch(`${API_BASE}/logout`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh }), // FIXED
    });
    if (!res.ok) {
      throw new Error("로그아웃 실패");
    }
  } finally {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("user_name");
  }
}

// 토큰 갱신
export async function refreshToken(): Promise<void> {
  const refresh = localStorage.getItem("refresh");
  if (!refresh) {
    throw new Error("Refresh token not found");
  }
  const res = await fetch(`${API_BASE}/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh }),
  });
  if (!res.ok) {
    throw new Error("토큰 갱신 실패");
  }
  const data = await res.json();
  localStorage.setItem("access", data.access);
}
