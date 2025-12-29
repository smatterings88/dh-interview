import { useState, useEffect } from 'react';
import './Screen.css';

export default function NonBuyerClose() {
  const [showPS, setShowPS] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPS(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="screen-container">
      <div className="screen-content">
        <p>Got it. We'll take it from here.</p>
        <p className="mt-16">
          Your first Daily Hug lands tomorrow morning.
        </p>
        <p className="mt-16">
          You did good just being honest with us.
        </p>
        {showPS && (
          <div className="ps-text">
            <p className="text-secondary">
              P.S. If you change your mind in the next 48 hours,
              the founder rate is still available.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}


