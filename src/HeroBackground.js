import React, { useEffect, useRef } from 'react';
import NET from 'vanta/dist/vanta.net.min';
import * as THREE from 'three';

/**
 * HeroBackground — animated Vanta.NET canvas.
 * Renders a slowly drifting molecular-lattice network in engineering steel-blue
 * over a deep-navy backdrop, evoking additive-manufacturing layer structures,
 * XRD lattice planes, and FEA mesh connectivity.
 */
const HeroBackground = () => {
  const containerRef = useRef(null);
  const effectRef = useRef(null);

  useEffect(() => {
    if (!effectRef.current && containerRef.current) {
      effectRef.current = NET({
        el: containerRef.current,
        THREE,
        mouseControls: true,
        touchControls: false,
        gyroControls: false,
        minHeight: 200,
        minWidth: 200,
        scale: 1.0,
        scaleMobile: 0.8,
        /* ── visual tuning ── */
        color: 0x4a9eff,        // steel-blue edges / nodes
        backgroundColor: 0x0d1b2a, // deep engineering navy
        points: 11,
        maxDistance: 24,
        spacing: 17,
        showDots: true,
      });
    }
    return () => {
      if (effectRef.current) {
        effectRef.current.destroy();
        effectRef.current = null;
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        borderRadius: 'inherit',
        overflow: 'hidden',
      }}
    >
      {/* Soft gradient so left-side text stays fully readable */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          background:
            'linear-gradient(110deg, rgba(13,27,42,0.82) 0%, rgba(13,27,42,0.55) 55%, rgba(13,27,42,0.30) 100%)',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
};

export default HeroBackground;
