import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Screen.css';

export default function NameCollectionScreen({ onNameSubmit }) {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [gender, setGender] = useState('');
  const [error, setError] = useState('');

  // Check if firstName/gender already exist in localStorage
  useEffect(() => {
    try {
      const storedData = JSON.parse(localStorage.getItem('dh_userData') || '{}');
      if (storedData.firstName && storedData.gender) {
        // Already have name/gender, navigate to interview
        navigate('/');
      }
    } catch (error) {
      // Ignore errors, continue with form
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!firstName.trim()) {
      setError('First name is required.');
      return;
    }

    if (!gender) {
      setError('Please select how you identify.');
      return;
    }

    // Load existing userData if any, then merge
    let existingData = {};
    try {
      existingData = JSON.parse(localStorage.getItem('dh_userData') || '{}');
    } catch (error) {
      // Ignore
    }

    const trimmedFirstName = firstName.trim();

    // Save to localStorage (merge with existing data)
    const userData = {
      ...existingData,
      firstName: trimmedFirstName,
      gender: gender
    };
    localStorage.setItem('dh_userData', JSON.stringify(userData));

    // Update firstName in GHL if email is available
    const userEmail = existingData.userEmail;
    if (userEmail) {
      try {
        const { updateContactFirstName } = await import('../utils/ghlApi');
        await updateContactFirstName(userEmail, trimmedFirstName);
      } catch (error) {
        console.error('Error updating firstName in GHL:', error);
        // Don't block navigation if GHL update fails
      }
    }

    // Call callback if provided, otherwise navigate
    if (onNameSubmit) {
      onNameSubmit(trimmedFirstName, gender);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="screen-container">
      <div className="screen-content">
        <h1>Before we begin — what should we call you?</h1>
        
        <form onSubmit={handleSubmit} style={{ marginTop: '32px' }}>
          <label htmlFor="firstName" style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>
            First name
          </label>
          <input 
            type="text"
            id="firstName"
            name="firstName"
            required
            placeholder=""
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="email-input"
            style={{ marginBottom: '8px' }}
          />
          <p className="helper-text text-secondary" style={{ fontSize: '14px', marginBottom: '24px' }}>
            So we can speak to you like a real person.
          </p>
          
          <label htmlFor="gender" style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>
            I identify as
          </label>
          <select 
            id="gender"
            name="gender"
            required
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            style={{ 
              width: '100%',
              padding: '16px 20px',
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '18px',
              fontWeight: 400,
              border: '1px solid var(--text-primary)',
              borderRadius: '14px',
              backgroundColor: 'transparent',
              color: 'var(--text-primary)',
              marginBottom: '24px',
              cursor: 'pointer',
              appearance: 'none',
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%232B2B2B' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 16px center',
              paddingRight: '40px'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = 'var(--coral-primary)';
              e.target.style.outline = 'none';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'var(--text-primary)';
            }}
          >
            <option value="">Select...</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="nonbinary">Non-binary</option>
          </select>
          
          {error && (
            <p className="text-secondary" style={{ color: 'var(--coral-primary)', marginBottom: '16px', fontSize: '14px' }}>
              {error}
            </p>
          )}
          
          <button 
            type="submit" 
            className="btn-primary"
            style={{ 
              backgroundColor: 'var(--coral-primary)',
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

