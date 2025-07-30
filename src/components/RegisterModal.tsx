import React, { useState } from 'react';
import './RegisterModal.css';

interface Props {
  onClose: () => void;
  onRegister: (user: { name: string; id: string; password: string }) => void;
  onCheckDuplicate: (id: string) => boolean;
}

export default function RegisterModal({ onClose, onRegister, onCheckDuplicate }: Props) {
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [checked, setChecked] = useState(false);
  const [isDuplicate, setIsDuplicate] = useState(false);

  const handleCheck = () => {
    const result = onCheckDuplicate(id);
    setIsDuplicate(result);
    setChecked(true);
  };

  const handleRegister = () => {
    if (!name || !id || !pw) {
      alert('모든 항목을 입력해주세요.');
      return;
    }
    if (!checked) {
      alert('아이디 중복 확인을 해주세요.');
      return;
    }
    if (isDuplicate) {
      alert('중복된 아이디입니다.');
      return;
    }
    onRegister({ name, id, password: pw });
  };

  return (
    <div className="register-overlay">
      <div className="register-content">
        <h2 className="register-title">회원가입</h2>

        <input
          value={name}
          onChange={e => setName(e.target.value)}
          className="register-input"
          placeholder="이름"
        />

        <div className="register-input-wrapper">
          <input
            value={id}
            onChange={e => {
              setId(e.target.value);
              setChecked(false);
            }}
            className="register-input with-button"
            placeholder="아이디"
          />
          <button onClick={handleCheck} className="register-check-inside">
            중복확인
          </button>
        </div>

        {checked && (
          <p className={`register-check-text ${isDuplicate ? 'error' : 'valid'}`}>
            {isDuplicate ? '이미 존재하는 아이디입니다.' : '사용 가능한 아이디입니다.'}
          </p>
        )}

        <input
          type="password"
          value={pw}
          onChange={e => setPw(e.target.value)}
          className="register-input"
          placeholder="비밀번호"
        />

        <button className="register-submit-button" onClick={handleRegister}>
          회원가입
        </button>

        <button className="register-close" onClick={onClose}>
          X
        </button>
      </div>
    </div>
  );
}
