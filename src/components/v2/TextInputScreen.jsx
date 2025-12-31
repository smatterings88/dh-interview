import { useState } from 'react';
import './V2Screen.css';

export default function TextInputScreen({ 
  prompt, 
  placeholder = '',
  onAnswer,
  required = false,
  helperText = ''
}) {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (required && !value.trim()) {
      setError('This field is required');
      return;
    }
    
    setError('');
    onAnswer(value.trim() || '');
  };

  return (
    <div className="screen-container">
      <div className="screen-content">
        <h2 className="text-medium">{prompt}</h2>
        {helperText && (
          <p className="text-secondary mt-16" style={{ fontSize: '0.95rem' }}>
            {helperText}
          </p>
        )}
        <div className="mt-24">
          <input
            type="text"
            className="email-input"
            placeholder={placeholder}
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              setError('');
            }}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSubmit();
              }
            }}
            autoFocus
          />
          {error && (
            <p style={{ color: '#E87C6A', fontSize: '0.9rem', marginTop: '8px' }}>
              {error}
            </p>
          )}
        </div>
        <div className="mt-32">
          <button 
            className="btn-warm-neutral" 
            onClick={handleSubmit}
            disabled={required && !value.trim()}
          >
            Continue →
          </button>
        </div>
      </div>
    </div>
  );
}

