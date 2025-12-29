import './Screen.css';

export default function BuyerWelcome({ onMeetAlex, onLater }) {
  return (
    <div className="screen-container">
      <div className="screen-content">
        <h2>You're in.</h2>
        <p className="mt-16">
          Tonight, your first evening Hug arrives.
        </p>
        <p className="mt-16">
          Tomorrow morning, your first morning Hug.
        </p>
        <p className="mt-16">
          And whenever things start looping — Alex is here.
        </p>
        <div className="question-options mt-24">
          <button className="btn-primary" onClick={onMeetAlex}>
            Meet Alex now
          </button>
          <button className="btn-secondary mt-16" onClick={onLater}>
            I'll come back later
          </button>
        </div>
      </div>
    </div>
  );
}


