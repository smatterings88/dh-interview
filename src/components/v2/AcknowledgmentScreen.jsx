import './V2Screen.css';

export default function AcknowledgmentScreen({ copy, onContinue }) {
  return (
    <div className="screen-container">
      <div className="screen-content">
        <p style={{ fontSize: '1.1rem', lineHeight: '1.7' }}>{copy}</p>
        <div className="mt-32">
          <button className="btn-warm-neutral" onClick={onContinue}>
            Continue →
          </button>
        </div>
      </div>
    </div>
  );
}

