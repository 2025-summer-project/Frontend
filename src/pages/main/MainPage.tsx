// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './MainPage.css';
// import logo from '../../assets/logo.png';
// import logoName from '../../assets/logo-name.png';
// import check from '../../assets/check.png';
// import chat from '../../assets/chat.png';
// import pdf from '../../assets/pdf.png';
// import search from '../../assets/search.png';
// import banner from '../../assets/mainBack.png';
// import LoginModal from '../../components/LoginModal';
// import RegisterModal from '../../components/RegisterModal';
// import type { User } from '../../type/User';

// export default function MainPage() {
//   const navigate = useNavigate();
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [users, setUsers] = useState<User[]>(() => {
//     const storedUsers = localStorage.getItem('users');
//     return storedUsers ? JSON.parse(storedUsers) : [];
//   });
//   const [showLogin, setShowLogin] = useState(false);
//   const [showRegister, setShowRegister] = useState(false);

//   // 새로고침 시 로그인 상태 유지
//   useEffect(() => {
//     const storedLogin = localStorage.getItem('isLoggedIn');
//     const storedUsers = localStorage.getItem('users');
//     if (storedLogin === 'true') setIsLoggedIn(true);
//     if (storedUsers) setUsers(JSON.parse(storedUsers));
//   }, []);

//   // users 상태 변경 시 localStorage에도 저장
//   useEffect(() => {
//     localStorage.setItem('users', JSON.stringify(users));
//   }, [users]);

//   const handleStartClick = () => {
//     if (isLoggedIn) navigate('/menu');
//     else setShowLogin(true);
//   };

//   const handleRegister = (newUser: User) => {
//     const exists = users.some(user => user.id === newUser.id);
//     if (exists) {
//       alert('이미 존재하는 아이디입니다.');
//       return;
//     }
//     setUsers(prev => [...prev, newUser]);
//     alert('회원가입이 완료되었습니다!');
//     setShowRegister(false);
//   };

//   const handleLogout = () => {
//     setIsLoggedIn(false);
//     localStorage.removeItem('isLoggedIn');
//   };

//   return (
//     <main className="main-container">
//       <header className="top-bar">
//         <div className="logo-group">
//           <img src={logo} alt="로고" className="logo-img" />
//           <img src={logoName} alt="로고텍스트" className="logo-text" />
//         </div>
//         {isLoggedIn ? (
//           <button className="nav-button" onClick={handleLogout}>
//             로그아웃
//           </button>
//         ) : (
//           <button className="nav-button" onClick={() => setShowLogin(true)}>
//             로그인
//           </button>
//         )}
//       </header>

//       {/* 로그인 모달 */}
//       {showLogin && (
//         <LoginModal
//           users={users}
//           onClose={() => setShowLogin(false)}
//           onClickRegister={() => {
//             setShowLogin(false);
//             setShowRegister(true);
//           }}
//           onLoginSuccess={() => {
//             setIsLoggedIn(true);
//             localStorage.setItem('isLoggedIn', 'true'); // 로그인 상태 저장
//             setShowLogin(false);
//           }}
//         />
//       )}

//       {/* 회원가입 모달 */}
//       {showRegister && (
//         <RegisterModal
//           onClose={() => setShowRegister(false)}
//           onRegister={handleRegister}
//         />
//       )}

//       <div className="intro-banner">
//         <div className="intro-left">
//           <h2>계약 이제는 AI에게 맡기세요!</h2>
//           <h2>
//             똑똑한 법률 동반자 <strong>HighLaw</strong>
//           </h2>
//           <button className="nav-button" onClick={handleStartClick}>
//             시작하기
//           </button>
//         </div>
//         <div className="intro-right">
//           <img src={banner} alt="banner" className="intro-image" />
//         </div>
//       </div>

//       <section className="feature-section">
//         <div className="feature-item">
//           <img src={check} alt="check" />
//           <h3>간단한 계약서 요약</h3>
//           <p>복잡한 계약서를 AI가 자동으로 분석, 보기 쉽게 요약해드립니다</p>
//         </div>
//         <div className="feature-item">
//           <img src={chat} alt="chat" />
//           <h3>AI 법률 챗봇 상담</h3>
//           <p>궁금한 조항을 누구나 쉽게 이해할 수 있도록 안내합니다</p>
//         </div>
//         <div className="feature-item">
//           <img src={pdf} alt="pdf" />
//           <h3>PDF 저장 & 공유 기능</h3>
//           <p>요약된 계약서를 PDF로 내려받고 공유해보세요</p>
//         </div>
//         <div className="feature-item">
//           <img src={search} alt="search" />
//           <h3>스마트 계약 탐색 soon</h3>
//           <p>키워드 입력 시 관련 조항을 찾아주는 기능 준비 중입니다</p>
//         </div>
//       </section>
//     </main>
//   );
// }
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
import type { User } from '../../type/User';

export default function MainPage() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [users, setUsers] = useState<User[]>(() => {
    const storedUsers = localStorage.getItem('users');
    return storedUsers ? JSON.parse(storedUsers) : [];
  });
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    const storedLogin = localStorage.getItem('isLoggedIn');
    const storedUsers = localStorage.getItem('users');
    if (storedLogin === 'true') setIsLoggedIn(true);
    if (storedUsers) setUsers(JSON.parse(storedUsers));
  }, []);

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  const handleStartClick = () => {
    if (isLoggedIn) navigate('/menu');
    else setShowLogin(true);
  };

  const handleRegister = (newUser: User) => {
    setUsers(prev => [...prev, newUser]);
    alert('회원가입이 완료되었습니다!');
    setShowRegister(false);
  };

  const handleCheckDuplicate = (id: string) => {
    return users.some(user => user.id === id);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
  };

  return (
    <main className="main-container">
      <header className="top-bar">
        <div className="logo-group">
          <img src={logo} alt="로고" className="logo-img" />
          <img src={logoName} alt="로고텍스트" className="logo-text" />
        </div>
        {isLoggedIn ? (
          <button className="nav-button" onClick={handleLogout}>
            로그아웃
          </button>
        ) : (
          <button className="nav-button" onClick={() => setShowLogin(true)}>
            로그인
          </button>
        )}
      </header>

      {showLogin && (
        <LoginModal
          users={users}
          onClose={() => setShowLogin(false)}
          onClickRegister={() => {
            setShowLogin(false);
            setShowRegister(true);
          }}
          onLoginSuccess={() => {
            setIsLoggedIn(true);
            localStorage.setItem('isLoggedIn', 'true');
            setShowLogin(false);
          }}
        />
      )}

      {showRegister && (
        <RegisterModal
          onClose={() => setShowRegister(false)}
          onRegister={handleRegister}
          onCheckDuplicate={handleCheckDuplicate}
        />
      )}

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
