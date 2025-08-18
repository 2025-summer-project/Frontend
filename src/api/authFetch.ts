import { refreshToken } from "./auth";

export async function authFetch(input: RequestInfo, init: RequestInit = {}) {
  const headers = new Headers(init.headers || {});
  const access = localStorage.getItem("access");
  if (access) headers.set("Authorization", `Bearer ${access}`);

  let res = await fetch(input, { ...init, headers });

  if (res.status === 401) {
    try {
      await refreshToken(); // access 재발급
      const newAccess = localStorage.getItem("access");
      if (newAccess) headers.set("Authorization", `Bearer ${newAccess}`);
      res = await fetch(input, { ...init, headers });
    } catch {
      // refresh 실패 시 그대로 반환
    }
  }
  return res;
}