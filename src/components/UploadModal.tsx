import React, { useRef, useState } from 'react';
import './UploadModal.css';

// 부모 컴포넌트에서 onClose prop으로 모달 닫기 기능 전달받음
interface UploadModalProps {
  onClose: () => void;
}

const UploadModal: React.FC<UploadModalProps> = ({ onClose }) => {
  // 숨겨진 <input type="file">를 참조하기 위한 ref
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 선택된 파일 상태
  const [file, setFile] = useState<File | null>(null);

  // PDF 미리보기용 blob URL
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // 가짜 로딩 처리 상태
  const [loading, setLoading] = useState(false);

  // 파일 선택 시 실행되는 함수
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    // PDF 파일이 아니면 업로드 거부
    if (selectedFile.type !== 'application/pdf') {
      alert('PDF 파일만 업로드할 수 있어요!');
      e.target.value = '';
      return;
    }

    // 정상 PDF면 파일 저장 + 미리보기 URL 생성
    setFile(selectedFile);
    setLoading(true);

    // 1초 후 미리보기 URL 생성
    setTimeout(() => {
      const url = URL.createObjectURL(selectedFile);
      setPreviewUrl(url);
      setLoading(false);
    }, 1000);
  };

  // 클릭 시 파일 선택 창 열기
  const handleClickUpload = () => {
    fileInputRef.current?.click();
  };

  // 파일 삭제 (상태 초기화)
  const handleRemoveFile = () => {
    setFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    // 오버레이 클릭 시 모달 닫힘
    <div className="upload-modal-overlay" onClick={onClose}>
      {/* 모달 내부 클릭 시 닫힘 방지 */}
      <div className="upload-modal" onClick={(e) => e.stopPropagation()}>
        {/* 제목 */}
        <h2 className="upload-modal-title">계약서 업로드</h2>

        {/* 구분선 */}
        <div className="upload-modal-divider" />

        {/* 업로드 영역 (클릭 가능) */}
        <div className="upload-modal-area" onClick={handleClickUpload}>
          {/* 숨겨진 input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />

          {/* 도형 아이콘 박스 */}
          <div className="upload-icon-boxes">
            <div className="upload-dotted-box" />
            <div className="upload-filled-box" />
          </div>

          {/* 상태에 따라 안내 문구 표시 */}
          {loading ? (
            <p>업로드 중입니다...</p>
          ) : file ? (
            <div className="upload-file-info">
              <span>✅ {file.name}</span>
              <button className="upload-remove-button" onClick={handleRemoveFile}>
                삭제
              </button>
            </div>
          ) : (
            <p>파일을 드래그/클릭하여 등록하세요.</p>
          )}
        </div>

        {/* PDF 미리보기 */}
        {previewUrl && (
          <div className="upload-pdf-preview">
            <iframe src={previewUrl} width="100%" height="400px" title="PDF 미리보기" />
          </div>
        )}

        {/* 하단 안내 문구 */}
        <p className="upload-modal-footer">주의 : 계약서를 업로드해야 서비스 이용 가능</p>
      </div>
    </div>
  );
};

export default UploadModal;
