import { useState, useEffect } from 'react';
import './V2Screen.css';

export default function V2QuestionScreen({ 
  prompt,
  title,
  body,
  question,
  options, 
  onAnswer, 
  autoAdvanceDelay = 600 
}) {
  const [selected, setSelected] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const headerText = title || prompt;

  // Reset state when content changes
  useEffect(() => {
    setSelected(null);
    setIsTransitioning(false);
  }, [headerText, body, question]);

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
        <h2 className="text-medium">{headerText}</h2>

        {body ? (
          <div className="mt-16" style={{ fontSize: '1.05rem', lineHeight: '1.7' }}>
            {typeof body === 'string'
              ? body
                  .split('\n')
                  .map((line, idx) =>
                    line.trim() ? (
                      <p key={idx} className={idx === 0 ? undefined : 'mt-16'}>
                        {line}
                      </p>
                    ) : null
                  )
              : body}
          </div>
        ) : null}

        {question ? (
          <p className="mt-24" style={{ fontSize: '1.05rem', lineHeight: '1.7' }}>
            {question}
          </p>
        ) : null}

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

