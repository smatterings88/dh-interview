import './Screen.css';

export default function MirrorB({ answers, onComplete }) {
  // Check if user selected draining/looping/disappearing options
  // Question 4 (id: 4) = Mental Load (replaying, racing)
  // Question 5 (id: 5) = Social Energy (drained, withdraw)
  // Question 6 (id: 6) = Emotional Aftereffect (looping)
  const hasDrainingOptions = 
    answers[4] === 'replaying' || 
    answers[4] === 'racing' ||
    answers[5] === 'drained' || 
    answers[5] === 'withdraw' || 
    answers[6] === 'looping';

  const copy = hasDrainingOptions
    ? "It's not just what's happening.\nIt's how long you've been carrying it."
    : "You're more aware of your energy than most people.\nThat matters.";

  const lines = copy.split('\n');

  return (
    <div className="screen-container">
      <div className="screen-content text-center fade-in">
        {lines.map((line, index) => (
          <p key={index} className="text-medium" style={{ marginTop: index > 0 ? '16px' : '0' }}>
            {line}
          </p>
        ))}
        <button className="btn-primary mt-24" onClick={onComplete}>
          Continue
        </button>
      </div>
    </div>
  );
}

