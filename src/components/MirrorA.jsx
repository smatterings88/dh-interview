import './Screen.css';

export default function MirrorA({ onComplete }) {
  return (
    <div className="screen-container">
      <div className="screen-content text-center fade-in">
        <p className="text-medium">Thanks for being honest.</p>
        <p className="text-medium mt-16">Most people rush past how they're actually doing.</p>
        <p className="text-medium mt-16">You didn't.</p>
        <button className="btn-primary mt-24" onClick={onComplete}>
          Continue
        </button>
      </div>
    </div>
  );
}

