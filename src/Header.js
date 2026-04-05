import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from './context/ThemeContext';

export default function Header() {
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();

  const handleSectionClick = (section) => {
    navigate('/', { state: { scrollTo: section } });
  };

  return (
    <header className="site-header">
      <div className="site-logo">
        <span className="site-logo-main"> </span>
      </div>
      <nav className="site-nav">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/resume" className="nav-link">Resume</Link>
        <Link to="/certification" className="nav-link">Certifications</Link>
        <Link to="/conference" className="nav-link">Conference & Seminar</Link>
        <button onClick={() => handleSectionClick('experience')} className="nav-link" style={{border: 'none', background: 'none', cursor: 'pointer', padding: 0}}>Experiences</button>
        <button onClick={() => handleSectionClick('projects')} className="nav-link" style={{border: 'none', background: 'none', cursor: 'pointer', padding: 0}}>Projects</button>
        <button onClick={() => handleSectionClick('about')} className="nav-link" style={{border: 'none', background: 'none', cursor: 'pointer', padding: 0}}>About</button>
        <button onClick={() => handleSectionClick('contact')} className="nav-link" style={{border: 'none', background: 'none', cursor: 'pointer', padding: 0}}>Contact</button>
        <button
          onClick={toggleTheme}
          className="theme-toggle-btn"
          aria-label="Toggle dark mode"
          title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {isDark ? (
            <svg className="theme-icon" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <line x1="12" y1="21" x2="12" y2="23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <line x1="1" y1="12" x2="3" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <line x1="21" y1="12" x2="23" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          ) : (
            <svg className="theme-icon" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          )}
        </button>
      </nav>
    </header>
  );
}
