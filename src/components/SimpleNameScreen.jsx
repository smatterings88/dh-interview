import { useState } from 'react';
import './Screen.css';

export default function SimpleNameScreen({ onContinue }) {
  const [firstName, setFirstName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Save firstName (or use "friend" as default)
    const nameToUse = firstName.trim() || 'friend';
    
    // Save to localStorage
    try {
      const existingData = JSON.parse(localStorage.getItem('dh_userData') || '{}');
      existingData.firstName = nameToUse;
      localStorage.setItem('dh_userData', JSON.stringify(existingData));
    } catch (error) {
      console.error('Error saving name:', error);
    }
    
    // Continue regardless of whether name was entered
    onContinue(nameToUse);
  };

  return (
    <div className="screen-container">
      <div className="screen-content">
        <h2 className="text-medium">Before we go on — what should we call you?</h2>
        
        <form onSubmit={handleSubmit} style={{ marginTop: '32px' }}>
          <label htmlFor="firstName" style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>
            First name
          </label>
          <input 
            type="text"
            id="firstName"
            name="firstName"
            placeholder=""
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="email-input"
            style={{ marginBottom: '8px' }}
          />
          <p className="helper-text text-secondary" style={{ fontSize: '16px', marginBottom: '24px' }}>
            So the Daily Hug can feel like it's actually for you.
          </p>
          
          <button 
            type="submit" 
            className="btn-warm-neutral"
            style={{ 
              borderRadius: '14px',
              padding: '16px 24px',
              marginTop: '8px'
            }}
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}


