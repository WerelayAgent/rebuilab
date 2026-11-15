import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';

export const App: React.FC = () => {
  const [pupilOffset, setPupilOffset] = useState({ x: 4, y: 2 });
  const [isBlinking, setIsBlinking] = useState(false);
  const mascotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!mascotRef.current) return;
      const rect = mascotRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX);
      const maxDistance = 6;
      setPupilOffset({
        x: Math.cos(angle) * maxDistance,
        y: Math.sin(angle) * maxDistance,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Blinking animation every 4 seconds
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 180);
    }, 4200);
    return () => clearInterval(blinkInterval);
  }, []);

  const handleClickMascot = () => {
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.5 },
      colors: ['#ffd23f', '#ffffff', '#111111'],
    });
  };

  return (
    <div style={{ textAlign: 'center' }}>
      {/* 4-block yellow mascot with interactive eye tracking */}
      <div
        ref={mascotRef}
        onClick={handleClickMascot}
        style={{
          display: 'inline-block',
          cursor: 'pointer',
          transition: 'transform 0.15s ease',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 216 216"
          width="88"
          height="88"
          style={{ display: 'block', margin: '0 auto' }}
        >
          {/* 4 Yellow Squares */}
          <rect width="100" height="100" rx="24" fill="#ffd23f" />
          <rect x="108" width="100" height="100" rx="24" fill="#ffd23f" />
          <rect y="108" width="100" height="100" rx="24" fill="#ffd23f" />
          <rect x="108" y="108" width="100" height="100" rx="24" fill="#ffd23f" />

          {/* Eyes Group with Blink */}
          <g
            style={{
              transformOrigin: '108px 58px',
              transform: isBlinking ? 'scaleY(0.1)' : 'scaleY(1)',
              transition: 'transform 0.1s ease',
            }}
          >
            {/* White Sclera */}
            <circle cx="62" cy="58" r="20" fill="#fff" />
            <circle cx="154" cy="58" r="20" fill="#fff" />

            {/* Black Pupils tracking mouse */}
            <circle
              cx={62 + pupilOffset.x}
              cy={58 + pupilOffset.y}
              r="10"
              fill="#111"
            />
            <circle
              cx={154 + pupilOffset.x}
              cy={58 + pupilOffset.y}
              r="10"
              fill="#111"
            />
          </g>
        </svg>
      </div>

      {/* Exact Brand Title */}
      <div
        style={{
          fontSize: '52px',
          letterSpacing: '-.04em',
          marginTop: '14px',
          fontWeight: 800,
          color: '#f3f3f1',
          fontFamily: 'Geist, system-ui, sans-serif',
          userSelect: 'none',
        }}
      >
        REBUILAB
      </div>

      {/* Exact Subtitle */}
      <div
        style={{
          opacity: 0.6,
          fontWeight: 500,
          fontSize: '16px',
          marginTop: '6px',
          color: '#f3f3f1',
          fontFamily: 'Geist, system-ui, sans-serif',
          userSelect: 'none',
        }}
      >
        Launch a coin. Rebuild anything. Soon.
      </div>
    </div>
  );
};

export default App;
