// MenuPage.tsx
import React, { useState } from 'react';
import './MenuPage.css';
import logo from '../../assets/logo.png';
import logoNavy from '../../assets/logo-navy.png';
import logoName from '../../assets/logo-name.png';
import UploadModal from '../../components/UploadModal';

// 메뉴 항목
const menuItems = [
  '내 문서 목록',
  '요약된 문서 목록',
  '상담 목록',
  '이 밑으로 생각',
];

const MainPage: React.FC = () => {
  const [selectedMenu, setSelectedMenu] = useState(menuItems[0]); // 선택된 메뉴
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림 여부
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]); // 업로드된 파일 목록

  // 로그아웃 처리
  const handleLogout = () => {
    console.log('로그아웃 되었습니다.');
  };

  // 파일 업로드 시 리스트에 추가
  const handleUpload = (file: File) => {
    setUploadedFiles((prev) => [...prev, file]);
  };

  // 파일 다운로드 처리
  const handleDownloadFile = (file: File) => {
    const url = URL.createObjectURL(file);
    const a = document.createElement('a');
    a.href = url;
    a.download = file.name;
    a.click();
  };

  // 외부 뷰어로 열기 (새 창)
  const handleOpenInNewTab = (file: File) => {
    const url = URL.createObjectURL(file);
    window.open(url, '_blank');
  };

  // 선택된 메뉴에 따른 렌더링
  const renderContent = () => {
    switch (selectedMenu) {
      case '내 문서 목록':
        return (
          <div style={{ textAlign: 'left', maxWidth: '800px', margin: '0 auto' }}>
            <h3>업로드한 문서 목록</h3>
            {uploadedFiles.length === 0 ? (
              <p>아직 업로드한 문서가 없어요.</p>
            ) : (
              <ul style={{ paddingLeft: '0px' }}>
                {uploadedFiles.map((file, idx) => (
                  <li
                    key={idx}
                    style={{
                      listStyle: 'none',
                      marginBottom: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '12px 16px',
                      border: '1px solid #ccc',
                      borderRadius: '8px',
                      background: 'transparent'
                    }}
                  >
                    <span style={{ fontWeight: 500 }}>📄 {file.name}</span>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        onClick={() => handleOpenInNewTab(file)}
                        className="doc-button view"
                      >
                        보기
                      </button>
                      <button
                        onClick={() => handleDownloadFile(file)}
                        className="doc-button download"
                      >
                        다운로드
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      case '요약된 문서 목록':
        return <p>문서 요약본이 이곳에 표시됩니다.</p>;
      case '상담 목록':
        return <p>상담 기록 목록을 확인할 수 있습니다.</p>;
      case '이 밑으로 생각':
        return <p>자유로운 생각 정리 공간이에요 😊</p>;
      default:
        return <p>항목을 선택해 주세요.</p>;
    }
  };

  return (
    <div className="container">
      {/* 사이드바 */}
      <aside className="sidebar">
        <img src={logoNavy} alt="Logo Navy" className="sidebar-logo" />

        {/* 계약서 업로드 버튼 */}
        <button className="upload-button" onClick={() => setIsModalOpen(true)}>
          계약서 업로드
        </button>

        {/* 메뉴 리스트 */}
        <div className="menu">
          {menuItems.map((item) => (
            <div
              key={item}
              className={`menu-item ${selectedMenu === item ? 'selected' : ''}`}
              onClick={() => setSelectedMenu(item)}
            >
              <span className="menu-box" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </aside>

      {/* 메인 콘텐츠 */}
      <main className="main-content">
        <header className="header">
          <div className="header-left">
            <img src={logo} alt="Logo" className="header-logo" />
            <img src={logoName} alt="Logo Name" className="header-name" />
          </div>
          <button className="logout" onClick={handleLogout}>로그아웃</button>
        </header>

        <section className="content">{renderContent()}</section>
      </main>

      {/* 업로드 모달 */}
      {isModalOpen && (
        <UploadModal
          onClose={() => setIsModalOpen(false)}
          onUpload={handleUpload}
        />
      )}
    </div>
  );
};

export default MainPage;
