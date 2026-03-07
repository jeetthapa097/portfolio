import React from 'react';
import Header from './Header';

const CERTIFICATES = [
  { name: 'CSWA Certificate', file: 'CSWA Certificate_C-59Y3TZXS87.pdf' },
  { name: 'CSWP', file: 'CSWP_C-TPBN35J7ES.pdf' },
  { name: 'CSWA-AM', file: 'CSWA-AM_C-9LAZJX6UQ8.pdf' },
  { name: 'CSWPA_DT', file: 'CSWPA_DT_C-Q4F3D5XKLW.pdf' },
  { name: 'OASIS Certification - Manufacturing of Semiconductor', file: 'OASIS_Certification_Manufacturing of Semiconductor.pdf', link: 'https://www.credly.com/badges/1dddd198-29b4-4809-91c7-1ed475609fc2/public_url' },
];

export default function CertificationPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#0f172a', color: '#e6eef8' }}>
      <Header />
      <div style={{ padding: '2rem', maxWidth: 1100, margin: '0 auto' }}>
        <h1 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Certifications</h1>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {CERTIFICATES.map((cert, index) => (
            <div key={index} style={{ border: '1px solid #374151', borderRadius: 8, padding: '1rem' }}>
              <h2 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>{cert.name}</h2>
              {cert.link && (
                <a href={cert.link} target="_blank" rel="noopener noreferrer" style={{ color: '#93c5fd', marginBottom: '0.5rem', display: 'block' }}>
                  E-verify on Credly
                </a>
              )}
              <div style={{ width: '100%', height: '60vh' }}>
                <iframe
                  title={cert.name}
                  src={`${process.env.PUBLIC_URL || ''}/${cert.file}`}
                  style={{ width: '100%', height: '100%', border: 'none' }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}