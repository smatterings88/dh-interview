import './Screen.css';

export default function DailyHugConfirmation({ onContinue }) {
  return (
    <div className="screen-container">
      <div className="screen-content">
        <p>
          Starting tomorrow, the Daily Hug may land a little differently.
        </p>
        <p className="mt-16">
          Not because the messages changed —
          but because you took a moment to be honest with yourself.
        </p>
        <p className="mt-16">
          No pressure.
        </p>
        <p className="mt-16">
          No fixing.
        </p>
        <p className="mt-16">
          Just something steady to start the day.
        </p>
        <button className="btn-primary mt-24" onClick={onContinue}>
          Sounds good
        </button>
      </div>
    </div>
  );
}


