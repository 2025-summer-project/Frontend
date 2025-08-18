import { authFetch } from "./authFetch";

const UPLOAD_URL = "http://localhost:8000/upload/documents/";

interface UploadResponse {
  message: string;       // "업로드 성공"
  document_id: number;   // ex) 1
}

export async function uploadDocument(file: File): Promise<UploadResponse> {
  const access = localStorage.getItem("access");
  if (!access) throw new Error("로그인이 필요합니다.");

  const form = new FormData();
  form.append("file", file);

  const res = await authFetch(UPLOAD_URL, {
    method: "POST",  // ✅ 반드시 POST
    body: form,      // ✅ multipart/form-data (브라우저가 헤더 자동 셋업)
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(
      (data as any).detail || (data as any).error || (data as any).message || "업로드 실패"
    );
  }
  return data as UploadResponse;
}
