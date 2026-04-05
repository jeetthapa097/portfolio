import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ResumePage from './ResumePage';
import CertificationPage from './CertificationPage';
import ConferencePage from './ConferencePage';
import { ThemeProvider } from './context/ThemeContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <BrowserRouter basename={process.env.NODE_ENV === 'production' ? '/portfolio' : '/'}>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/resume" element={<ResumePage />} />
          <Route path="/certification" element={<CertificationPage />} />
          <Route path="/conference" element={<ConferencePage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
