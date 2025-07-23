// import React from 'react';
// import './LoginModal.css';

// type LoginModalProps = {
//     onClose: () => void;
//     onClickRegister: () => void;
//   };
  
//   export default function LoginModal({ onClose, onClickRegister }: LoginModalProps) {
//     return (
//       <div className="modal-overlay">
//         <div className="modal-content">
//           <label>아이디 :</label>
//           <input type="text" className="modal-input" />
//           <label>비밀번호 :</label>
//           <input type="password" className="modal-input" />
//           <div className="modal-buttons">
//             <button className="modal-button" onClick={onClickRegister}>회원가입</button>
//             <button className="modal-button">로그인</button>
//           </div>
//           <button className="modal-close" onClick={onClose}>X</button>
//         </div>
//       </div>
//     );
//   }
  
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
        <label>아이디 :</label>
        <input value={id} onChange={e => setId(e.target.value)} className="modal-input" />
        <label>비밀번호 :</label>
        <input type="password" value={pw} onChange={e => setPw(e.target.value)} className="modal-input" />
        <div className="modal-buttons">
          <button className="modal-button" onClick={onClickRegister}>회원가입</button>
          <button className="modal-button" onClick={handleLogin}>로그인</button>
        </div>
        <button className="modal-close" onClick={onClose}>X</button>
      </div>
    </div>
  );
}
