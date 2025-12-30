import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../index.css';

const BRIDGE_IMAGES = {
  male: 'https://storage.googleapis.com/msgsndr/zeMQ191aMbYPu8BG4ONP/media/69537fe5a61a7e5a85cbeda5.png',
  female: 'https://storage.googleapis.com/msgsndr/zeMQ191aMbYPu8BG4ONP/media/69538003a61a7ee550cbefa1.png',
  nonbinary: 'https://storage.googleapis.com/msgsndr/zeMQ191aMbYPu8BG4ONP/media/6953802fee1047353e4bb881.png'
};

export default function BridgeScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Get user data from location state or localStorage
    try {
      const data = location.state || JSON.parse(localStorage.getItem('dh_userData') || '{}');
      setUserData(data);
    } catch (error) {
      console.error('Error loading user data:', error);
      setUserData({});
    }
  }, [location]);

  if (!userData) {
    return (
      <div className="screen-container">
        <div className="screen-content text-center">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  const firstName = userData.firstName || '';
  const gender = userData.gender || 'nonbinary';
  const answers = userData.answers || {};
  const tags = userData.tags || [];

  // Check for frequency and alex interest
  const hasFreqTwiceOrMulti = tags.some(tag => 
    tag.includes('freq_twice') || tag.includes('freq_multi')
  ) || answers[10] === 'freq_twice' || answers[10] === 'freq_multi';
  
  const hasAlexInterested = tags.some(tag => 
    tag.includes('alex-interested')
  ) || tags.includes('alex-interested');

  // Get the correct image based on gender
  const bridgeImage = BRIDGE_IMAGES[gender] || BRIDGE_IMAGES.nonbinary;

  const handleContinue = () => {
    navigate('/offer', { state: userData });
  };

  return (
    <div className="screen-container">
      <div className="screen-content">
        {/* Line 1 - Always uses name */}
        <p>Thanks for sharing, {firstName}.</p>

        {/* Line 2 - Conditional based on interview responses */}
        {(hasFreqTwiceOrMulti) && (
          <p className="mt-16">
            You said you'd like more support during the day —<br />
            not just one moment in the morning.
          </p>
        )}

        {(hasAlexInterested && !hasFreqTwiceOrMulti) && (
          <p className="mt-16">
            You said it would help to have someone there when things feel heavy —<br />
            someone you can talk to without being judged or fixed.
          </p>
        )}

        {(!hasFreqTwiceOrMulti && !hasAlexInterested) && (
          <p className="mt-16">
            You shared that some days feel heavier than others —<br />
            and one touchpoint isn't always enough.
          </p>
        )}

        {/* Line 3 - Always the same */}
        <p className="mt-16">That makes sense.</p>

        {/* Gender-specific image */}
        <img 
          src={bridgeImage}
          alt=""
          className="bridge-image"
        />

        {/* Lines 4-5 - Always the same */}
        <p className="mt-16">
          Some days, one touchpoint isn't enough — especially when your mind keeps going, 
          or the day gets heavier as it goes on.
        </p>

        <p className="mt-16">So we built something for exactly that.</p>

        <div className="question-options mt-32">
          <button 
            onClick={handleContinue}
            className="btn-primary"
            style={{ 
              backgroundColor: 'var(--coral-primary)',
              borderRadius: '14px',
              padding: '16px 24px'
            }}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}

