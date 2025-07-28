import React, { useState } from 'react';
import './MenuPage.css';
import logo from '../../assets/logo.png';
import logoNavy from '../../assets/logo-navy.png';
import logoName from '../../assets/logo-name.png';
import UploadModal from '../../components/UploadModal';

const menuItems = [
  '내 문서 목록',
  '요약된 문서 목록',
  '상담 목록',
  '이 밑으로 생각',
];

const MainPage: React.FC = () => {
  const [selectedMenu, setSelectedMenu] = useState(menuItems[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogout = () => {
    console.log('로그아웃 되었습니다.');
  };

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
      <aside className="sidebar">
        <img src={logoNavy} alt="Logo Navy" className="sidebar-logo" />
        <button className="upload-button" onClick={() => setIsModalOpen(true)}>
          계약서 업로드
        </button>
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

      {isModalOpen && <UploadModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default MainPage;
