import './V2Screen.css';

export default function MirrorScreen({ firstName, summary, onContinue }) {
  const displayName = firstName || 'friend';
  
  return (
    <div className="screen-container">
      <div className="screen-content">
        <h2 className="text-medium">
          Alright, {displayName}. Here's what you told us:
        </h2>
        <div className="mt-24" style={{ fontSize: '1.05rem', lineHeight: '1.7' }}>
          {typeof summary === 'string' ? <p>{summary}</p> : summary}
        </div>
        <p className="mt-24" style={{ fontSize: '1.05rem' }}>
          Does that feel about right?
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

