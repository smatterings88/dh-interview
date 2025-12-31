import { useState, useEffect } from 'react';
import './V2Screen.css';

export default function MultiSelectScreen({ 
  prompt, 
  options, 
  onAnswer,
  selectedValues = []
}) {
  const [selected, setSelected] = useState(selectedValues);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Reset state when prompt changes
  useEffect(() => {
    setSelected(selectedValues);
    setIsTransitioning(false);
  }, [prompt, selectedValues]);

  const toggleOption = (value) => {
    if (isTransitioning) return;
    
    setSelected(prev => 
      prev.includes(value) 
        ? prev.filter(v => v !== value)
        : [...prev, value]
    );
  };

  const handleContinue = () => {
    if (isTransitioning || selected.length === 0) return;
    
    setIsTransitioning(true);
    setTimeout(() => {
      onAnswer(selected);
    }, 400);
  };

  return (
    <div className="screen-container">
      <div className="screen-content">
        <h2 className="text-medium">{prompt}</h2>
        <div className="question-options mt-24">
          {options.map((option) => {
            const isSelected = selected.includes(option.value);
            return (
              <button
                key={option.value}
                className={`option-button ${isSelected ? 'selected' : ''}`}
                onClick={() => toggleOption(option.value)}
                disabled={isTransitioning}
              >
                {isSelected && <span style={{ marginRight: '8px' }}>✓</span>}
                {option.label}
              </button>
            );
          })}
        </div>
        <div className="mt-32">
          <button 
            className="btn-warm-neutral" 
            onClick={handleContinue}
            disabled={selected.length === 0 || isTransitioning}
          >
            Continue →
          </button>
        </div>
      </div>
    </div>
  );
}

