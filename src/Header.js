import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="site-header">
      <div className="site-logo">
        <span className="site-logo-main"> </span>
      </div>
      <nav className="site-nav">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/resume" className="nav-link">Resume</Link>
        <Link to="/certification" className="nav-link">Certification</Link>
        <a href="/#experience" className="nav-link">Experience</a>
        <a href="/#projects" className="nav-link">Projects</a>
        <a href="/#about" className="nav-link">About</a>
        <a href="/#contact" className="nav-link">Contact</a>
      </nav>
    </header>
  );
}
