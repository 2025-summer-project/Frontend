import React, { useState } from 'react';
import type { User } from '../type/User';
import './LoginModal.css';

type Props = {
  onClose: () => void;
  onClickRegister: () => void;
  onLoginSuccess: () => void;
  users: User[];
};

export default function LoginModal({ onClose, onClickRegister, onLoginSuccess, users }: Props) {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');

  const handleLogin = () => {
    const found = users.find(u => u.id === id && u.password === pw);
    if (found) {
      onLoginSuccess();
    } else {
      alert('아이디 또는 비밀번호가 일치하지 않습니다.');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
      <h2 className="modal-title">Login</h2> 
        <input
          value={id}
          onChange={e => setId(e.target.value)}
          className="modal-input"
          placeholder="아이디"
        />
        <input
          type="password"
          value={pw}
          onChange={e => setPw(e.target.value)}
          className="modal-input"
          placeholder="비밀번호"
        />
        
        <button className="modal-button signup-button" onClick={onClickRegister}>
          회원가입
        </button>
        <button className="modal-button login-button" onClick={handleLogin}>
          로그인
        </button>

        <button className="modal-close" onClick={onClose}>X</button>
      </div>
    </div>
  );
}
