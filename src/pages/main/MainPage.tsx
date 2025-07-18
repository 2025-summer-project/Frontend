import React from 'react';
import './MainPage.css';
import logo from '../../assets/logo.png';
import logoName from '../../assets/logo-name.png';
import check from '../../assets/check.png';
import chat from '../../assets/chat.png';
import pdf from '../../assets/pdf.png';
import search from '../../assets/search.png';
import banner from '../../assets/mainBack.png'

export default function MainPage() {
  return (
    <main className="main-container">
      <header className="top-bar">
        <div className="logo-group">
          <img src={logo} alt="logo" className="logo-img" />
          <img src={logoName} alt="logo name" className="logo-text" />
        </div>
        <button className="nav-button">로그인</button>
      </header>

      <div className="intro-banner">
        <div className="intro-left">
          <h2>계약 이제는 AI에게 맡기세요!</h2>
          <h2>똑똑한 법률 동반자 <strong>HighLaw</strong></h2>
          <button className="nav-button">시작하기</button>
        </div>
        <div className="intro-right">
          <img src={banner} alt="banner" className="intro-image" />
        </div>
      </div>


      <section className="feature-section">
        <div className="feature-item">
          <img src={check} alt="check" />
          <h3>간단한 계약서 요약</h3>
          <p>복잡한 계약서를 AI가 자동으로 분석, 보기 쉽게 요약해드립니다</p>
        </div>
        <div className="feature-item">
          <img src={chat} alt="chat" />
          <h3>AI 법률 챗봇 상담</h3>
          <p>궁금한 조항을 누구나 쉽게 이해할 수 있도록 안내합니다</p>
        </div>
        <div className="feature-item">
          <img src={pdf} alt="pdf" />
          <h3>PDF 저장 & 공유 기능</h3>
          <p>요약된 계약서를 PDF로 내려받고 공유해보세요</p>
        </div>
        <div className="feature-item">
          <img src={search} alt="search" />
          <h3>스마트 계약 탐색 soon</h3>
          <p>키워드 입력 시 관련 조항을 찾아주는 기능 준비 중입니다</p>
        </div>
      </section>
    </main>
  );
}
