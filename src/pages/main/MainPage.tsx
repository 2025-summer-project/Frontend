import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../api/auth';
import './MainPage.css';
import logo from '../../assets/logo.png';
import logoName from '../../assets/logo-name.png';
import check from '../../assets/check.png';
import chat from '../../assets/chat.png';
import pdf from '../../assets/pdf.png';
import search from '../../assets/search.png';
import banner from '../../assets/mainBack.png';
import LoginModal from '../../components/LoginModal';
import RegisterModal from '../../components/RegisterModal';

export default function MainPage() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    // 👉 새로고침 시에도 로그인 유지하려면 아래 코드 유지
    // 👉 새로고침 시 무조건 로그아웃 상태로 보이고 싶으면 이 부분 제거!
    const access = localStorage.getItem('access');
    const name = localStorage.getItem('user_name');
    if (access) {
      setIsLoggedIn(true);
      setUserName(name || '');
    }
  }, []);

  // "시작하기" 버튼
  const handleStartClick = () => {
    isLoggedIn ? navigate('/menu') : setShowLogin(true);
  };

  // 로그인 성공 처리
  const handleLoginSuccess = (name: string) => {
    setIsLoggedIn(true);
    setUserName(name);
    localStorage.setItem('access', 'token'); // 실제 토큰 저장
    localStorage.setItem('user_name', name);
  };

  // 로그아웃 처리
  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error('로그아웃 에러', err);
    } finally {
      // localStorage 정리
      localStorage.removeItem('access');
      localStorage.removeItem('user_name');

      // 상태값 초기화
      setIsLoggedIn(false);
      setUserName('');

      // 메인 페이지로 이동
      navigate('/');
    }
  };

  return (
    <main className="main-container">
      <header className="top-bar">
        <div className="logo-group">
          <img src={logo} alt="로고" className="logo-img" />
          <img src={logoName} alt="로고텍스트" className="logo-text" />
        </div>

        <div className="auth-section">
          {isLoggedIn ? (
            <button className="nav-button" onClick={handleLogout}>
              로그아웃
            </button>
          ) : (
            <button className="nav-button" onClick={() => setShowLogin(true)}>
              로그인
            </button>
          )}
        </div>
      </header>

      {/* 로그인 모달 */}
      {showLogin && (
        <LoginModal
          onClose={() => setShowLogin(false)}
          onClickRegister={() => {
            setShowLogin(false);
            setShowRegister(true);
          }}
          onLoginSuccess={handleLoginSuccess}
        />
      )}

      {/* 회원가입 모달 */}
      {showRegister && (
        <RegisterModal
          onClose={() => setShowRegister(false)}
          onRegisterSuccess={() => {
            setShowRegister(false);
            setShowLogin(true);
          }}
        />
      )}

      {/* 배너 */}
      <div className="intro-banner">
        <div className="intro-left">
          <h2>계약 이제는 AI에게 맡기세요!</h2>
          <h2>
            똑똑한 법률 동반자 <strong>HighLaw</strong>
          </h2>
          <button className="nav-button" onClick={handleStartClick}>
            시작하기
          </button>
        </div>
        <div className="intro-right">
          <img src={banner} alt="banner" className="intro-image" />
        </div>
      </div>

      {/* 기능 섹션 */}
      <section className="feature-section">
        {[
          { icon: check, title: '간단한 계약서 요약', desc: '복잡한 계약서를 AI가 분석해 요약' },
          { icon: chat, title: 'AI 법률 챗봇 상담', desc: '궁금한 조항을 쉽게 이해할 수 있도록 안내' },
          { icon: pdf, title: 'PDF 저장 & 공유 기능', desc: '요약된 계약서를 PDF로 다운로드' },
          { icon: search, title: '스마트 계약 탐색 soon', desc: '키워드로 관련 조항 찾기 기능' },
        ].map((item, index) => (
          <div key={index} className="feature-item">
            <img src={item.icon} alt={item.title} />
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
