import { useEffect } from 'react';
import './Screen.css';

export default function MirrorD({ answers, onComplete }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2500); // 2.5 second hold

    return () => clearTimeout(timer);
  }, [onComplete]);

  // Check if user selected guilt / phone / avoidance
  // Question 6 (id: 6) = Energy & Rest
  const hasRestIssues = 
    answers[6] === 'guilt_rest' || 
    answers[6] === 'numb' || 
    answers[6] === 'avoid_thoughts';

  const copy = hasRestIssues
    ? "Quiet can feel louder than noise.\nSo you keep moving."
    : "You've learned how to rest — even when the world doesn't slow down.";

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

