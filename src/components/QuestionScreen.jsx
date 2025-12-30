import { useState, useEffect } from 'react';
import './Screen.css';

export default function QuestionScreen({ question, onAnswer, autoAdvanceDelay = 800 }) {
  const [selected, setSelected] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Reset state when question changes
  useEffect(() => {
    setSelected(null);
    setIsTransitioning(false);
  }, [question.id]);

  const handleSelect = (value) => {
    if (isTransitioning) return;
    
    setSelected(value);
    setIsTransitioning(true);
    
    setTimeout(() => {
      onAnswer(value);
    }, autoAdvanceDelay);
  };

  // Check if this is the first emotional question (id: 3)
  const isFirstEmotionalQuestion = question.id === 3;

  return (
    <div className="screen-container">
      <div className="screen-content">
        <h2 className="text-medium">{question.headline}</h2>
        {question.subtext && (
          <p className="text-secondary mt-16">{question.subtext}</p>
        )}
        {question.question && (
          <p className="question-text mt-16">{question.question}</p>
        )}
        {isFirstEmotionalQuestion && (
          <p className="text-secondary mt-12" style={{ fontSize: '1rem', fontStyle: 'italic' }}>
            There's no right answer. Just choose what fits.
          </p>
        )}
        <div className="question-options">
          {question.options.map((option) => (
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


