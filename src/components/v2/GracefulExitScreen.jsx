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
          All good, {displayName}. 💛
        </h1>
        <p className="mt-16" style={{ fontSize: '1.05rem', lineHeight: '1.7' }}>
          Thanks for taking a moment to check in. You shared enough for us to start showing up in a way that actually fits. There’s nothing else you need to decide right now. Before you go, here’s today’s Hug — just for you.
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
            You don’t need to be certain. You don’t need to explain anything. The fact that you paused and checked in matters.
          </p>
          <p className="mt-8">
            Whatever today brings, you’re not carrying it alone anymore. We’ll be here tomorrow. 💛
          </p>
        </div>

        <div className="mt-32">
          <button className="btn-warm-neutral" onClick={handleDone}>
            See you tomorrow
          </button>
        </div>
      </div>
    </div>
  );
}

