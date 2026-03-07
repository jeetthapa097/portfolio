import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ResumePage from './ResumePage';
import CertificationPage from './CertificationPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/resume" element={<ResumePage />} />
        <Route path="/certification" element={<CertificationPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
