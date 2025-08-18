import React, { useState } from 'react';
import { signup, checkDuplicate } from '../api/auth';
import './RegisterModal.css';

interface Props {
  onClose: () => void;
  onRegisterSuccess: () => void;
}

export default function RegisterModal({ onClose, onRegisterSuccess }: Props) {
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [checked, setChecked] = useState(false);
  const [isDuplicate, setIsDuplicate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCheck = async () => {
    if (!id) {
      setError('아이디를 입력해주세요');
      return;
    }
    setIsLoading(true);
    setError('');
    try {
      const res = await checkDuplicate(id);
      setIsDuplicate(!res.available);
      setChecked(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : '중복 확인 실패');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async () => {
    if (!name || !id || !pw) {
      setError('모든 항목을 입력해주세요');
      return;
    }
    if (!checked) {
      setError('아이디 중복 확인을 해주세요');
      return;
    }
    if (isDuplicate) {
      setError('중복된 아이디입니다');
      return;
    }
    setIsLoading(true);
    setError('');
    try {
      await signup(id, name, pw);
      alert('회원가입이 완료되었습니다!');
      onRegisterSuccess();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : '회원가입 실패');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-overlay">
      <div className="register-content">
        <h2 className="register-title">회원가입</h2>
        {error && <div className="error-message">{error}</div>}
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="register-input"
          placeholder="이름"
          disabled={isLoading}
        />
        <div className="register-input-wrapper">
          <input
            value={id}
            onChange={(e) => {
              setId(e.target.value);
              setChecked(false);
            }}
            className="register-input with-button"
            placeholder="아이디"
            disabled={isLoading}
          />
          <button
            onClick={handleCheck}
            className="register-check-inside"
            disabled={isLoading}
          >
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
          onChange={(e) => setPw(e.target.value)}
          className="register-input"
          placeholder="비밀번호"
          disabled={isLoading}
        />
        <button
          className="register-submit-button"
          onClick={handleRegister}
          disabled={isLoading}
        >
          {isLoading ? '처리 중...' : '회원가입'}
        </button>
        <button className="register-close" onClick={onClose} disabled={isLoading}>
          X
        </button>
      </div>
    </div>
  );
}
