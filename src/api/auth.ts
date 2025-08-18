const API_BASE = "http://localhost:8000/auth";

interface AuthResponse {
  access: string;
  refresh: string;
  user_name?: string;
  user_id?: string;
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
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error((data as any).message || "회원가입 실패");
  return data as AuthResponse;
}

// 아이디 중복확인
export async function checkDuplicate(user_id: string): Promise<CheckDuplicateResponse> {
  const res = await fetch(`${API_BASE}/id-check?user_id=${encodeURIComponent(user_id)}`);
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error((data as any).message || "중복확인 실패");
  return data as CheckDuplicateResponse;
}

// 로그인 (백엔드가 user_id, password를 기대하는 형태)
export async function login(user_id: string, password: string): Promise<AuthResponse> {
  const res = await fetch(`${API_BASE}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user_id, password }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error((data as any).message || "로그인 실패");

  // 토큰/유저 정보 저장
  localStorage.setItem("access", (data as any).access);
  localStorage.setItem("refresh", (data as any).refresh);
  localStorage.setItem("user_name", (data as any).user_name ?? "");
  localStorage.setItem("user_id", (data as any).user_id ?? "");

  return data as AuthResponse;
}

// 로그아웃 (백엔드 expects refresh token in body)
export async function logout(): Promise<void> {
  const refresh = localStorage.getItem("refresh");
  try {
    if (refresh) {
      const res = await fetch(`${API_BASE}/logout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh }),
      });
      if (!res.ok) throw new Error("로그아웃 실패");
    }
  } finally {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("user_name");
    localStorage.removeItem("user_id"); // ✅ 추가
  }
}

// 토큰 갱신
export async function refreshToken(): Promise<void> {
  const refresh = localStorage.getItem("refresh");
  if (!refresh) throw new Error("Refresh token not found");

  const res = await fetch(`${API_BASE}/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh }),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error((data as any).message || "토큰 갱신 실패");

  localStorage.setItem("access", (data as any).access);
}
