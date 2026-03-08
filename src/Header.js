import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();

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
        <button onClick={() => handleSectionClick('experience')} className="nav-link" style={{border: 'none', background: 'none', cursor: 'pointer', padding: 0}}>Experiences</button>
        <button onClick={() => handleSectionClick('projects')} className="nav-link" style={{border: 'none', background: 'none', cursor: 'pointer', padding: 0}}>Projects</button>
        <button onClick={() => handleSectionClick('about')} className="nav-link" style={{border: 'none', background: 'none', cursor: 'pointer', padding: 0}}>About</button>
        <button onClick={() => handleSectionClick('contact')} className="nav-link" style={{border: 'none', background: 'none', cursor: 'pointer', padding: 0}}>Contact</button>
      </nav>
    </header>
  );
}
