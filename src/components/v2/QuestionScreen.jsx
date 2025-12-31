import { useState, useEffect } from 'react';
import './V2Screen.css';

export default function V2QuestionScreen({ 
  prompt, 
  options, 
  onAnswer, 
  autoAdvanceDelay = 600 
}) {
  const [selected, setSelected] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Reset state when prompt changes
  useEffect(() => {
    setSelected(null);
    setIsTransitioning(false);
  }, [prompt]);

  const handleSelect = (value) => {
    if (isTransitioning) return;
    
    setSelected(value);
    setIsTransitioning(true);
    
    setTimeout(() => {
      onAnswer(value);
    }, autoAdvanceDelay);
  };

  return (
    <div className="screen-container">
      <div className="screen-content">
        <h2 className="text-medium">{prompt}</h2>
        <div className="question-options mt-24">
          {options.map((option) => (
            <button
              key={option.value}
              className={`option-button ${selected === option.value ? 'selected' : ''}`}
              onClick={() => handleSelect(option.value)}
              disabled={isTransitioning}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

