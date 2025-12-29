import './Screen.css';

export default function DailyHugConfirmation({ onContinue }) {
  return (
    <div className="screen-container">
      <div className="screen-content">
        <p>
          Starting tomorrow, the Daily Hug may land a little differently.
        </p>
        <p className="mt-16">
          Not because the message changed —
          but because you slowed down long enough to notice yourself.
        </p>
        <p className="mt-16">
          No pressure.
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


