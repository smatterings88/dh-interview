import './V2Screen.css';

export default function GracefulExitScreen({ firstName }) {
  const displayName = firstName || 'friend';
  
  const handleDone = () => {
    window.location.href = 'https://dailyhug.com';
  };

  return (
    <div className="screen-container">
      <div className="screen-content">
        <h2 className="text-medium">
          We hear you, {displayName}. No pressure. Ever.
        </h2>
        <p className="mt-16">
          Your Daily Hug will arrive tomorrow morning. (You can pick your exact time in the welcome email.) And if you ever want more support… we'll be here.
        </p>
        <p className="mt-16">
          You're not doing this alone anymore. 💛
        </p>
        <div className="mt-32">
          <button className="btn-warm-neutral" onClick={handleDone}>
            Done →
          </button>
        </div>
      </div>
    </div>
  );
}

