import { useEffect } from 'react';
import './Screen.css';

export default function MirrorB({ answers, onComplete }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 3000); // 3 second hold

    return () => clearTimeout(timer);
  }, [onComplete]);

  // Check if user selected draining/looping/disappearing options
  // Question 2 (id: 2) = Mental Load (replaying, racing)
  // Question 3 (id: 3) = Social Energy (drained, withdraw)
  // Question 4 (id: 4) = Emotional Aftereffect (looping)
  const hasDrainingOptions = 
    answers[2] === 'replaying' || 
    answers[2] === 'racing' ||
    answers[3] === 'drained' || 
    answers[3] === 'withdraw' || 
    answers[4] === 'looping';

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
      </div>
    </div>
  );
}

