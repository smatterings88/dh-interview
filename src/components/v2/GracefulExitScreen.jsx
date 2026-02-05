import './V2Screen.css';

export default function GracefulExitScreen({ firstName }) {
  const displayName = firstName || 'friend';

  const handleDone = () => {
    window.location.href = 'https://dailyhug.com';
  };

  return (
    <div className="screen-container">
      <div className="screen-content">
        <h1>
          You’re all set, {displayName}. 💛
        </h1>
        <p className="mt-16" style={{ fontSize: '1.05rem', lineHeight: '1.7' }}>
          Thanks for taking a moment to check in. We’ve got what we need to start showing up for you in a way that actually fits. You don’t need to decide anything else right now. Before you go, here’s a Hug — just for you.
        </p>

        <div
          className="mt-24"
          style={{
            padding: '20px 24px',
            borderRadius: '14px',
            backgroundColor: 'var(--bg-secondary)',
            border: '1px solid rgba(0,0,0,0.08)',
            fontSize: '1.05rem',
            lineHeight: '1.7'
          }}
        >
          <p>
            Hey {displayName},
          </p>
          <p className="mt-8">
            You don’t need to have everything figured out. You don’t need to feel a certain way to &quot;deserve&quot; support. The fact that you paused, checked in, and told the truth — even briefly — counts.
          </p>
          <p className="mt-8">
            Whatever today looks like for you, you’re not doing it alone anymore. We’ll be back tomorrow. 💛
          </p>
        </div>

        <div className="mt-32">
          <button className="btn-warm-neutral" onClick={handleDone}>
            👉 See you tomorrow
          </button>
        </div>
      </div>
    </div>
  );
}

