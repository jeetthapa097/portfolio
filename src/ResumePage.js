

import React from 'react';
import Header from './Header';

export default function ResumePage() {
  return (
    <div style={{ minHeight: '100vh', background: '#0f172a', color: '#e6eef8' }}>
      <Header />
      <div style={{ padding: '2rem', maxWidth: 1100, margin: '0 auto' }}>
        <h1 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Resume</h1>
        <div style={{ marginBottom: '0.75rem' }}>
          <a
            href={`${process.env.PUBLIC_URL || ''}/Resume_Jeet.pdf`}
            download="Jeet_Resume.pdf"
            style={{
              display: 'inline-block',
              background: '#0ea5a4',
              color: '#042023',
              padding: '0.5rem 0.75rem',
              borderRadius: 6,
              textDecoration: 'none',
            }}
          >
            Download Resume (PDF)
          </a>
        </div>

        <div style={{ width: '100%', height: '80vh' }}>
          <iframe
            title="Resume"
            src={`${process.env.PUBLIC_URL || ''}/Resume_Jeet.pdf`}
            style={{ width: '100%', height: '100%', border: 'none' }}
          />
        </div>
      </div>
    </div>
  );
}
