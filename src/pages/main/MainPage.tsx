import React from 'react';
import './MainPage.css';
import logo from '../../assets/logo.png';
import logoName from '../../assets/logo-name.png';
import check from '../../assets/check.png';
import chat from '../../assets/chat.png';
import pdf from '../../assets/pdf.png';
import search from '../../assets/search.png';

export default function MainPage() {
  return (
    <div className="main-container">
      <header className="top-bar-wrapper">
        <div className="container">
          <div className="top-bar">
            <div className="top-left-wrapper">
              <img src={logo} className="top-left-image" alt="logo" />
              <img src={logoName} className="top-left-text" alt="logo name" />
            </div>
            <nav className="nav-bar">
              <button className="nav-button">로그인</button>
            </nav>
          </div>
        </div>
      </header>

      <main>
        <div className="feature-wrapper">
            <div className="container"> 
              <div className="feature-card">
                  <div className="feature-item">
                  <img src={check}/>
                  <h3>간단한 계약서 요약</h3>
                  <p>복잡한 계약서를 AI가 자동으로 분석, 보기 쉽게 요약해드립니다</p>
                  </div>
                  <div className="feature-item">
                  <img src={chat}/>
                  <h3>AI 법률 챗봇 상담</h3>
                  <p>궁금한 조항을 누구나 쉽게 이해할 수 있도록 안내합니다</p>
                  </div>
                  <div className="feature-item">
                  <img src={pdf}/>
                  <h3>PDF 저장 & 공유 기능</h3>
                  <p>요약된 계약서를 PDF로 내려받고 공유해보세요</p>
                  </div>
                  <div className="feature-item">
                  <img src={search}/>
                  <h3>스마트 계약 탐색 soon</h3>
                  <p>키워드 입력 시 관련 조항을 찾아주는 기능 준비 중입니다</p>
                  </div>
              </div>
            </div>
        </div>
        </main>

    </div>
  );
}
