import React, { useRef, useState } from 'react';
import './UploadModal.css';
import { uploadDocument } from '../api/upload'; // ✅ 업로드 API 추가

interface UploadModalProps {
  onClose: () => void;
  onUpload: (file: File) => void;
}

const UploadModal: React.FC<UploadModalProps> = ({ onClose, onUpload }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewLoading, setPreviewLoading] = useState(false); // 미리보기 로딩
  const [uploadLoading, setUploadLoading] = useState(false);   // 업로드 로딩
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    if (selectedFile.type !== 'application/pdf' && !selectedFile.name.toLowerCase().endsWith('.pdf')) {
      alert('PDF 파일만 업로드할 수 있어요!');
      e.target.value = '';
      return;
    }

    setFile(selectedFile);
    setError(null);
    setPreviewLoading(true);

    // 간단한 미리보기 생성
    const url = URL.createObjectURL(selectedFile);
    setTimeout(() => {
      setPreviewUrl(url);
      setPreviewLoading(false);
    }, 300);
  };

  const handleClickUpload = () => {
    if (uploadLoading) return; // 업로드 중엔 클릭 방지
    fileInputRef.current?.click();
  };

  const handleRemoveFile = () => {
    if (uploadLoading) return;
    setFile(null);
    setPreviewUrl(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleConfirmUpload = async () => {
    if (!file) {
      alert('업로드할 파일이 없습니다.');
      return;
    }
    try {
      setUploadLoading(true);
      setError(null);

      // ✅ 실제 업로드 호출 (로그인 필수: Authorization 헤더는 upload.ts에서 처리)
      const res = await uploadDocument(file); // { message, document_id }
      // 필요하면 여기서 res.document_id 활용 가능
      onUpload(file);
      alert(res.message || '업로드 완료!');
      onClose();
    } catch (e: any) {
      setError(e?.message || '업로드에 실패했어요.');
    } finally {
      setUploadLoading(false);
    }
  };

  return (
    <div
      className="upload-modal-overlay"
      onClick={() => { if (!uploadLoading) onClose(); }}  // 업로드 중엔 닫힘 방지
    >
      <div className="upload-modal" onClick={(e) => e.stopPropagation()}>
        <h2 className="upload-modal-title">계약서 업로드</h2>
        <div className="upload-modal-divider" />

        <div
          className="upload-modal-area"
          onClick={handleClickUpload}
          style={{ cursor: uploadLoading ? 'not-allowed' : 'pointer', opacity: uploadLoading ? 0.7 : 1 }}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            style={{ display: 'none' }}
            disabled={uploadLoading}
          />
          <div className="upload-icon-boxes">
            <div className="upload-dotted-box" />
            <div className="upload-filled-box" />
          </div>

          {previewLoading ? (
            <p>미리보기 준비 중…</p>
          ) : file ? (
            <div className="upload-file-info" onClick={(e) => e.stopPropagation()}>
              <span>✅ {file.name}</span>
              <button className="upload-remove-button" onClick={handleRemoveFile} disabled={uploadLoading}>
                삭제
              </button>
            </div>
          ) : (
            <p>파일을 드래그/클릭하여 등록하세요.</p>
          )}

          {error && <p className="upload-error" style={{ color: 'crimson', marginTop: 8 }}>{error}</p>}
        </div>

        {previewUrl && (
          <>
            <div className="upload-pdf-preview">
              <iframe src={previewUrl} width="100%" height="400px" title="PDF 미리보기" />
            </div>

            <button
              className="upload-confirm-button"
              onClick={handleConfirmUpload}
              disabled={uploadLoading}
            >
              {uploadLoading ? '업로드 중…' : '업로드'}
            </button>
          </>
        )}

        <p className="upload-modal-footer">주의 : 계약서를 업로드해야 서비스 이용 가능</p>
      </div>
    </div>
  );
};

export default UploadModal;
