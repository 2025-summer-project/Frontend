import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import './index.css';
import './App.tsx';
import MainPage from './pages/main/MainPage'; 
import MenuPage from './pages/menu/MenuPage';
import ConsultPage from './pages/consult/ConsultPage'; 

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/consult" element={<ConsultPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
