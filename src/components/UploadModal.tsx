import React, { useRef, useState } from 'react';
import './UploadModal.css';

interface UploadModalProps {
  onClose: () => void;
  onUpload: (file: File) => void;
}

const UploadModal: React.FC<UploadModalProps> = ({ onClose, onUpload }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    if (selectedFile.type !== 'application/pdf') {
      alert('PDF 파일만 업로드할 수 있어요!');
      e.target.value = '';
      return;
    }

    setFile(selectedFile);
    setLoading(true);

    setTimeout(() => {
      const url = URL.createObjectURL(selectedFile);
      setPreviewUrl(url);
      setLoading(false);
    }, 1000);
  };

  const handleClickUpload = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveFile = () => {
    setFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleConfirmUpload = () => {
    if (file) {
      onUpload(file);
      onClose();
    } else {
      alert('업로드할 파일이 없습니다.');
    }
  };

  return (
    <div className="upload-modal-overlay" onClick={onClose}>
      <div className="upload-modal" onClick={(e) => e.stopPropagation()}>
        <h2 className="upload-modal-title">계약서 업로드</h2>
        <div className="upload-modal-divider" />

        <div className="upload-modal-area" onClick={handleClickUpload}>
          <input
            ref={fileInputRef}
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
          <div className="upload-icon-boxes">
            <div className="upload-dotted-box" />
            <div className="upload-filled-box" />
          </div>
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

        {previewUrl && (
          <>
            <div className="upload-pdf-preview">
              <iframe src={previewUrl} width="100%" height="400px" title="PDF 미리보기" />
            </div>

            <button className="upload-confirm-button" onClick={handleConfirmUpload}>
              업로드
            </button>
          </>
        )}

        <p className="upload-modal-footer">주의 : 계약서를 업로드해야 서비스 이용 가능</p>
      </div>
    </div>
  );
};

export default UploadModal;
