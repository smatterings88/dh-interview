import './Screen.css';

export default function MirrorC({ answers, onContinue }) {
  // Check if user selected brush off / don't believe / awkward
  // Question 7 (id: 7) = Self-Relationship
  const hasRejectingOptions = 
    answers[7] === 'deflect' || 
    answers[7] === 'unworthy' || 
    answers[7] === 'awkward';

  const firstCopy = hasRejectingOptions
    ? "You don't reject kindness out loud.\nYou just don't let it stay."
    : "You let yourself receive sometimes.\nThat didn't happen by accident.";

  const lines = firstCopy.split('\n');

  return (
    <div className="screen-container">
      <div className="screen-content text-center fade-in">
        {lines.map((line, index) => (
          <p key={index} className="text-medium" style={{ marginTop: index > 0 ? '16px' : '0' }}>
            {line}
          </p>
        ))}
        <p className="text-medium mt-24">Either way — this tells us something important.</p>
        <button className="btn-primary mt-24" onClick={onContinue}>
          Continue
        </button>
      </div>
    </div>
  );
}

