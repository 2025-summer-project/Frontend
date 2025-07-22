// import React from 'react';
// import './LoginModal.css'; // 로그인 모달 스타일 재사용

// type Props = {
//   onClose: () => void;
// };

// export default function RegisterModal({ onClose }: Props) {
//   return (
//     <div className="modal-overlay">
//       <div className="modal-content">
//         <label>이름 :</label>
//         <input type="text" className="modal-input" />
//         <label>아이디 :</label>
//         <input type="text" className="modal-input" />
//         <label>비밀번호 :</label>
//         <input type="password" className="modal-input" />
//         <div className="modal-buttons" style={{ justifyContent: 'center' }}>
//           <button className="modal-button">회원가입</button>
//         </div>
//         <button className="modal-close" onClick={onClose}>X</button>
//       </div>
//     </div>
//   );
// }

import React, { useState } from 'react';
import './LoginModal.css';

interface Props {
  onClose: () => void;
  onRegister: (user: { name: string; id: string; password: string }) => void;
}

export default function RegisterModal({ onClose, onRegister }: Props) {
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');

  const handleRegister = () => {
    if (!name || !id || !pw) {
      alert('모든 항목을 입력해주세요.');
      return;
    }
    onRegister({ name, id, password: pw });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <label>이름 :</label>
        <input value={name} onChange={e => setName(e.target.value)} className="modal-input" />
        <label>아이디 :</label>
        <input value={id} onChange={e => setId(e.target.value)} className="modal-input" />
        <label>비밀번호 :</label>
        <input type="password" value={pw} onChange={e => setPw(e.target.value)} className="modal-input" />
        <div className="modal-buttons" style={{ justifyContent: 'center' }}>
          <button className="modal-button" onClick={handleRegister}>회원가입</button>
        </div>
        <button className="modal-close" onClick={onClose}>X</button>
      </div>
    </div>
  );
}
