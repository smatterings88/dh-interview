import { useEffect } from 'react';
import './Screen.css';

export default function TransitionScreen({ onComplete, copy }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2750); // 2-3 second hold (2.75s average)

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="screen-container">
      <div className="screen-content text-center">
        {copy ? (
          <>
            <p className="text-medium">Thanks.</p>
            <p className="text-medium mt-16">Let's check in.</p>
          </>
        ) : (
          <>
            <p className="text-medium">Give us a second.</p>
            <p className="text-medium mt-16">We're paying attention.</p>
          </>
        )}
      </div>
    </div>
  );
}

