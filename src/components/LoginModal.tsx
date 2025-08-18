import React, { useState } from 'react';
import { login } from '../api/auth';
import './LoginModal.css';

type Props = {
  onClose: () => void;
  onClickRegister: () => void;
  onLoginSuccess: (userName: string) => void;
};

export default function LoginModal({ onClose, onClickRegister, onLoginSuccess }: Props) {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!id || !pw) {
      setError('아이디와 비밀번호를 입력해주세요');
      return;
    }
    setIsLoading(true);
    setError('');
    try {
      const data = await login(id, pw);
      onLoginSuccess(data.user_name || '');
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : '로그인 실패');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="modal-title">Login</h2>
        {error && <div className="error-message">{error}</div>}
        <input
          value={id}
          onChange={(e) => setId(e.target.value)}
          className="modal-input"
          placeholder="아이디"
          disabled={isLoading}
        />
        <input
          type="password"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          className="modal-input"
          placeholder="비밀번호"
          disabled={isLoading}
          onKeyPress={handleKeyPress}
        />
        <div className="button-group">
          <button
            className="modal-button signup-button"
            onClick={onClickRegister}
            disabled={isLoading}
          >
            회원가입
          </button>
          <button
            className="modal-button login-button"
            onClick={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? '처리 중...' : '로그인'}
          </button>
        </div>
        <button className="modal-close" onClick={onClose} disabled={isLoading}>
          X
        </button>
      </div>
    </div>
  );
}
