import React, { useState } from 'react';
import './MenuPage.css';
import logo from '../../assets/logo.png';
import logoNavy from '../../assets/logo-navy.png';
import logoName from '../../assets/logo-name.png';
import UploadModal from '../../components/UploadModal';

// 메뉴 항목 리스트 정의
const menuItems = [
  '내 문서 목록',
  '요약된 문서 목록',
  '상담 목록',
  '이 밑으로 생각',
];

const MainPage: React.FC = () => {
  // 선택된 메뉴 상태 관리 (기본값: 첫 번째 항목)
  const [selectedMenu, setSelectedMenu] = useState(menuItems[0]);

  // 업로드 모달의 열림 여부 상태
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 로그아웃 버튼 클릭 시 동작
  const handleLogout = () => {
    console.log('로그아웃 되었습니다.');
    // 실제 로그아웃 로직은 여기서 처리
  };

  // 선택된 메뉴에 따라 중앙 콘텐츠 영역 렌더링
  const renderContent = () => {
    switch (selectedMenu) {
      case '내 문서 목록':
        return <p>여기에 업로드한 문서 목록이 표시됩니다.</p>;
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
      {/* 왼쪽 사이드바 */}
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
              onClick={() => setSelectedMenu(item)} // 클릭 시 메뉴 선택
            >
              <span className="menu-box" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </aside>

      {/* 오른쪽 메인 콘텐츠 */}
      <main className="main-content">
        {/* 상단 헤더 */}
        <header className="header">
          <div className="header-left">
            <img src={logo} alt="Logo" className="header-logo" />
            <img src={logoName} alt="Logo Name" className="header-name" />
          </div>
          {/* 로그아웃 버튼 */}
          <button className="logout" onClick={handleLogout}>
            로그아웃
          </button>
        </header>

        {/* 콘텐츠 렌더링 영역 */}
        <section className="content">{renderContent()}</section>
      </main>

      {/* 모달이 열릴 때 UploadModal 컴포넌트 표시 */}
      {isModalOpen && <UploadModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default MainPage;
