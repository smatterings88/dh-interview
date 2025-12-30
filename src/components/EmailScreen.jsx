import { useState } from 'react';
import './Screen.css';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function EmailScreen({ onEmailSubmit }) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setError('Please enter your email address');
      return;
    }

    if (!emailRegex.test(email.trim())) {
      setError('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    setError('');
    
    // Small delay for UX
    setTimeout(() => {
      onEmailSubmit(email.trim());
    }, 300);
  };

  return (
    <div className="screen-container">
      <div className="screen-content">
        <h2 className="text-medium">What is your email address?</h2>
        <form onSubmit={handleSubmit} className="mt-24">
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError('');
            }}
            placeholder="your.email@example.com"
            className="email-input"
            disabled={isSubmitting}
            autoFocus
          />
          {error && (
            <p className="text-secondary mt-16" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              {error}
            </p>
          )}
          <button 
            type="submit" 
            className="btn-primary mt-24"
            disabled={isSubmitting}
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}




