import './V2Screen.css';

export default function ConfirmationScreen({ firstName }) {
  const displayName = firstName || 'friend';
  
  const handleDone = () => {
    window.location.href = 'https://dailyhug.com';
  };

  return (
    <div className="screen-container">
      <div className="screen-content">
        <h1>You're in, {displayName}. 💛</h1>
        <div className="mt-24" style={{ fontSize: '1.05rem', lineHeight: '1.7' }}>
          <p className="mb-16">
            Your setup details are on their way to your email. You'll get your first Hug tomorrow morning.
          </p>
          <p>
            Welcome to The Hug Society. We're glad you're here.
          </p>
        </div>
        <div className="mt-32">
          <button className="btn-warm-neutral" onClick={handleDone}>
            Done →
          </button>
        </div>
      </div>
    </div>
  );
}

