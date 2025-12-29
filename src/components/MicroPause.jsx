import { useEffect, useState } from 'react';
import './Screen.css';

export default function MicroPause({ onComplete }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Fade in
    setTimeout(() => setIsVisible(true), 50);
    
    // Hold for 2 seconds, then fade out
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        onComplete();
      }, 300); // Wait for fade out
    }, 2000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="screen-container">
      <div className={`screen-content text-center ${isVisible ? 'fade-in' : 'fade-out'}`}>
        <p className="text-medium">We're taking a second with what you shared.</p>
      </div>
    </div>
  );
}

