import { useState } from 'react';
import './V2Screen.css';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function EmailPlanScreen({ firstName, onSubmit }) {
  const displayName = firstName || 'friend';
  const [email, setEmail] = useState('');
  const [plan, setPlan] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    setError('');
    
    if (!email.trim()) {
      setError('Please enter your email address');
      return;
    }

    if (!emailRegex.test(email.trim())) {
      setError('Please enter a valid email address');
      return;
    }

    if (!plan) {
      setError('Please select a plan');
      return;
    }

    onSubmit(email.trim(), plan);
  };

  return (
    <div className="screen-container">
      <div className="screen-content">
        <h2 className="text-medium">
          Alright, {displayName}. What's the best email to send your setup details?
        </h2>
        <div className="mt-24">
          <input
            type="email"
            className="email-input"
            placeholder="your.email@example.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError('');
            }}
            autoFocus
          />
        </div>
        <div className="mt-24">
          <p className="text-medium mb-16">Choose your plan:</p>
          <div className="question-options">
            <button
              className={`option-button ${plan === 'annual' ? 'selected' : ''}`}
              onClick={() => {
                setPlan('annual');
                setError('');
              }}
            >
              $97 / year (best value)
            </button>
            <button
              className={`option-button ${plan === 'monthly' ? 'selected' : ''}`}
              onClick={() => {
                setPlan('monthly');
                setError('');
              }}
            >
              $15 / month
            </button>
          </div>
        </div>
        {error && (
          <p style={{ color: '#E87C6A', fontSize: '0.9rem', marginTop: '16px' }}>
            {error}
          </p>
        )}
        <div className="mt-32">
          <button 
            className="btn-primary" 
            onClick={handleSubmit}
            disabled={!email.trim() || !plan}
          >
            Yes — join The Hug Society →
          </button>
        </div>
      </div>
    </div>
  );
}

