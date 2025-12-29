import './Screen.css';

export default function EntryScreen({ onContinue }) {
  return (
    <div className="screen-container">
      <div className="screen-content">
        <h1>Answer a few quick questions so the Daily Hug lands a little closer to home.</h1>
        <p className="text-secondary">
          Takes about a minute. No typing. No pressure.
        </p>
        <button className="btn-primary mt-24" onClick={onContinue}>
          Let's do it
        </button>
      </div>
    </div>
  );
}

