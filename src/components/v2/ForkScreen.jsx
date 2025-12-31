import './V2Screen.css';

export default function ForkScreen({ firstName, onGoDeeper, onGoodForNow }) {
  const displayName = firstName || 'friend';
  
  return (
    <div className="screen-container">
      <div className="screen-content">
        <h2 className="text-medium">
          Okay, {displayName}. You've shared a lot already. Some people like to pause here and just receive their Daily Hugs. Others want to go a little deeper and explore more intentional support. There's no wrong answer. What feels right for you right now?
        </h2>
        <div className="question-options mt-32">
          <button 
            className="option-button"
            onClick={onGoDeeper}
          >
            💛 I want to go deeper
          </button>
          <button 
            className="option-button"
            onClick={onGoodForNow}
          >
            🌿 I'm good for now
          </button>
        </div>
      </div>
    </div>
  );
}

