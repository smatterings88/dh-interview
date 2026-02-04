import './V2Screen.css';

export default function MirrorScreen({ firstName, summary, subhead, onContinue }) {
  const displayName = firstName || 'friend';
  
  return (
    <div className="screen-container">
      <div className="screen-content">
        <h2 className="text-medium">
          Here's what you told us, {displayName}.
        </h2>
        {subhead && (
          <p className="mt-16" style={{ fontSize: '1.05rem', lineHeight: '1.7' }}>
            {subhead}
          </p>
        )}
        <div className="mt-24" style={{ fontSize: '1.05rem', lineHeight: '1.7' }}>
          {typeof summary === 'string' ? <p>{summary}</p> : summary}
        </div>
        <p className="mt-24" style={{ fontSize: '1.05rem' }}>
          Does this feel accurate?
        </p>
        <div className="question-options mt-24">
          <button className="option-button" onClick={onContinue}>
            Yes
          </button>
          <button className="option-button" onClick={onContinue}>
            Close enough
          </button>
        </div>
      </div>
    </div>
  );
}

