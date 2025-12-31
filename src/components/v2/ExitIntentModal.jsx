import { useEffect } from 'react';
import './V2Screen.css';

export default function ExitIntentModal({ firstName, onSendOne, onDismiss }) {
  const displayName = firstName || 'friend';
  
  useEffect(() => {
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10000,
        padding: '20px'
      }}
      onClick={onDismiss}
    >
      <div 
        className="screen-container"
        style={{
          maxWidth: '500px',
          backgroundColor: 'var(--bg-primary)',
          borderRadius: '14px',
          padding: '32px 24px',
          position: 'relative'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-medium">
          Wait, {displayName}. We get it — maybe you're not ready yet.
        </h2>
        <p className="mt-16" style={{ fontSize: '1.05rem', lineHeight: '1.7' }}>
          But what if we sent you one Hug from Alex? No commitment. No Hug Society required. Just one message to see if it resonates.
        </p>
        <div className="question-options mt-24">
          <button className="option-button" onClick={onSendOne}>
            Yes — send me one
          </button>
          <button className="option-button" onClick={onDismiss}>
            No thanks
          </button>
        </div>
      </div>
    </div>
  );
}

