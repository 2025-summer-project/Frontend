import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ConsultPage.css';
import logo from '../../assets/logo.png';
import logoName from '../../assets/logo-name.png';
import elephant from '../../assets/elephant.png';

function formatDate(date: Date) {
  return `${date.getFullYear()}.${(date.getMonth() + 1)
    .toString()
    .padStart(2, '0')}.${date.getDate().toString().padStart(2, '0')} (${['일', '월', '화', '수', '목', '금', '토'][date.getDay()]})`;
}

export default function ConsultPage() {
  const navigate = useNavigate();

  const [messages, setMessages] = useState<
    { type: 'ai' | 'user'; content: string; time: string }[]
  >([]);
  const [input, setInput] = useState('');
  const [today, setToday] = useState('');

  useEffect(() => {
    const todayStr = formatDate(new Date());
    const now = new Date();
    const timeStr = now.toTimeString().slice(0, 5);
    setToday(todayStr);
    setMessages([
      {
        type: 'ai',
        content: '뭐 도와줄까?',
        time: timeStr,
      },
    ]);
  }, []);

  const handleSend = () => {
    if (input.trim() === '') return;
    const now = new Date();
    const timeStr = now.toTimeString().slice(0, 5);
    setMessages((prev) => [
      ...prev,
      { type: 'user', content: input, time: timeStr },
    ]);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSend();
  };

  const handleLogout = () => {
    // 로그인 상태 관련 정보 초기화
    localStorage.removeItem('isLoggedIn');
    navigate('/');
  };

  const handleExitChat = () => {
    navigate('/menu');
  };

  return (
    <div className="main-container">
      <header className="top-bar">
        <div className="logo-group">
          <img src={logo} alt="로고" className="logo-img" />
          <img src={logoName} alt="로고텍스트" className="logo-text" />
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="nav-button" onClick={handleExitChat}>
            채팅방 나가기
          </button>
          <button className="nav-button" onClick={handleLogout}>
            로그아웃
          </button>
        </div>
      </header>
      <div className="consult-container">
        <div className="contract-frame">
          <div className="contract-placeholder">계약서</div>
        </div>
        <div className="chat-container">
          <div className="chat-box">
            <div className="chat-date">{today}</div>
            {messages.map((msg, idx) =>
              msg.type === 'ai' ? (
                <div className="chat-message left" key={idx}>
                  <img src={elephant} alt="AI" className="profile-img" />
                  <div className="bubble-time-wrapper ai">
                    <div className="ai-bubble">{msg.content}</div>
                    <span className="chat-time">{msg.time}</span>
                  </div>
                </div>
              ) : (
                <div className="chat-message right" key={idx}>
                  <div className="bubble-time-wrapper user">
                    <div className="user-bubble">{msg.content}</div>
                    <span className="chat-time">{msg.time}</span>
                  </div>
                </div>
              )
            )}
          </div>
          <div className="chat-input">
            <input
              type="text"
              placeholder="메시지를 입력하세요"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button onClick={handleSend}>전송</button>
          </div>
        </div>
      </div>
    </div>
  );
}
