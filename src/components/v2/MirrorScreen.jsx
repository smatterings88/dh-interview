import './V2Screen.css';

export default function MirrorScreen({ firstName, summary, onContinue }) {
  const displayName = firstName || 'friend';

  return (
    <div className="screen-container">
      <div className="screen-content">
        <h2 className="text-medium">
          Here's what you told us, {displayName}.
        </h2>
        <p className="mt-16" style={{ fontSize: '1.05rem', lineHeight: '1.7' }}>
          We’re not judging it. We’re not fixing it. We’re just reflecting it back — so support can land properly.
        </p>
        <div className="mt-24" style={{ fontSize: '1.05rem', lineHeight: '1.7' }}>
          {typeof summary === 'string' ? <p>{summary}</p> : summary}
        </div>
        <p className="mt-24" style={{ fontSize: '1.05rem', color: '#666' }}>
          Nothing added. Nothing interpreted.
        </p>
        <div className="mt-32">
          <button className="btn-warm-neutral" onClick={onContinue}>
            Continue →
          </button>
        </div>
      </div>
    </div>
  );
}

