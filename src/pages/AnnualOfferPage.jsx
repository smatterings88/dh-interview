import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../index.css';

export default function AnnualOfferPage() {
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

  // Check tags - they might be in format "q10_freq_twice" or just "freq_twice"
  const hasFreqTwiceOrMulti = userData?.tags?.some(tag => 
    tag.includes('freq_twice') || tag.includes('freq_multi')
  ) || userData?.answers?.[10] === 'freq_twice' || userData?.answers?.[10] === 'freq_multi';
  
  const hasAlexInterested = userData?.tags?.some(tag => 
    tag.includes('alex-interested')
  ) || userData?.tags?.includes('alex-interested');
  
  const emotionalState = userData?.answers?.[3]; // First emotional question

  // Determine which transition to show
  const getTransition = () => {
    if (hasFreqTwiceOrMulti) {
      return {
        headline: "Based on what you just shared…",
        body: (
          <>
            <p>You said you'd like more support during the day —</p>
            <p>more than just one moment in the morning.</p>
            <p className="mt-16">That makes sense.</p>
            <p className="mt-16">Some days, one touchpoint isn't enough — especially when your mind keeps going, or the day gets heavier as it goes on.</p>
            <p className="mt-16">So we built something for exactly that.</p>
          </>
        )
      };
    } else if (hasAlexInterested) {
      return {
        headline: "Based on what you just shared…",
        body: (
          <>
            <p>You didn't say you need more messages.</p>
            <p>You said it would help to have someone there when things feel heavy —</p>
            <p>someone you can talk to without being judged, minimized, or fixed.</p>
            <p className="mt-16">That's what this is for.</p>
          </>
        )
      };
    } else {
      return {
        headline: "Based on what you just shared…",
        body: (
          <>
            <p>Some people want more check-ins.</p>
            <p>Some people just want to know support is there when the day turns.</p>
            <p className="mt-16">Either way — this is the next layer.</p>
          </>
        )
      };
    }
  };

  const transition = getTransition();

  if (!userData) {
    return (
      <div className="screen-container">
        <div className="screen-content text-center">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="screen-container">
      <div className="screen-content">
        {/* Transition Section */}
        <h2 className="text-medium">{transition.headline}</h2>
        <div className="offer-content mt-24">
          {transition.body}
        </div>

        {/* What This Is */}
        <div className="offer-content mt-32">
          <p className="text-medium">This is Hug Society</p>
          <p className="mt-16">Hug Society exists for the moments the Daily Hug can't fully cover.</p>
          <p className="mt-16">Not because the Daily Hug isn't good —</p>
          <p>but because support sometimes needs to show up more than once.</p>
          <p className="mt-16">It's not therapy.</p>
          <p>It's not a community.</p>
          <p>It's just… steady support — morning, evening, and in between.</p>
        </div>

        {/* What You Get */}
        <div className="offer-content mt-32">
          <p className="text-medium">What you get</p>
          <ul className="feature-list">
            <li>Morning + Evening Hugs<br />
              <span className="text-secondary" style={{ fontSize: '16px' }}>Support at both ends of the day — not just when you wake up.</span>
            </li>
            <li>Alex, anytime you need to talk<br />
              <span className="text-secondary" style={{ fontSize: '16px' }}>A place to get thoughts out of your head without advice, fixing, or pressure.</span>
            </li>
            <li>A quiet place to land<br />
              <span className="text-secondary" style={{ fontSize: '16px' }}>Where you don't have to explain yourself first.</span>
            </li>
          </ul>
        </div>

        {/* Emotional Settle */}
        <div className="offer-content mt-32">
          <p>You don't need more motivation.</p>
          <p>You don't need another system.</p>
          <p>You just don't need to carry everything alone.</p>
        </div>

        {/* Price Anchor */}
        <div className="offer-content mt-32">
          <div className="price" style={{ fontSize: '2rem', fontWeight: 600 }}>
            27¢ a day
          </div>
          <p className="mt-16">That's what Hug Society works out to over the year.</p>
          <p className="mt-16">A small, steady amount —</p>
          <p>for support that shows up more than once a day, when you actually need it.</p>
          <div className="price mt-24" style={{ fontSize: '1.5rem' }}>
            $97 for the full year
          </div>
          <p className="text-secondary mt-16" style={{ fontSize: '16px' }}>
            One decision. No monthly second-guessing.
          </p>
        </div>

        {/* Fast-Action Bonuses */}
        <div className="offer-content mt-32">
          <p className="text-medium">Join in the next 48 hours and you'll also receive:</p>
          <ul className="feature-list mt-16">
            <li><strong>30-Day Midday Thrive Hug</strong> (normally $49)<br />
              <span className="text-secondary" style={{ fontSize: '16px' }}>Your midday reset — delivered when energy dips and stress creeps in.</span>
            </li>
            <li><strong>Hug Music Pack</strong> (normally $29)<br />
              <span className="text-secondary" style={{ fontSize: '16px' }}>Seven calming soundscapes plus a guided meditation — something steady to come back to when your mind won't slow down.</span>
            </li>
          </ul>
          <p className="text-secondary mt-16" style={{ fontSize: '14px' }}>
            These extras are available during the 48-hour founder window.
          </p>
        </div>

        {/* CTA */}
        <div className="question-options mt-32">
          <button 
            className="btn-primary" 
            onClick={async () => {
              // Tag in GHL before redirecting
              if (userData?.userEmail) {
                try {
                  const { getOrCreateContact, addTagToContact } = await import('../utils/ghlApi');
                  const contact = await getOrCreateContact(userData.userEmail);
                  if (contact?.id) {
                    await addTagToContact(contact.id, 'dh_checkin --> hs-annual');
                  }
                } catch (error) {
                  console.error('Error tagging in GHL:', error);
                }
              }
              window.location.href = 'https://dailyhug.com/order';
            }}
          >
            Join Hug Society — $97/year
          </button>
          <p className="text-secondary text-center mt-16" style={{ fontSize: '14px' }}>
            You'll keep receiving the Daily Hug either way.
          </p>
          <p 
            className="text-secondary text-center mt-24" 
            onClick={async () => {
              // Tag declined annual in GHL before navigating
              if (userData?.userEmail) {
                try {
                  const { getOrCreateContact, addTagToContact } = await import('../utils/ghlApi');
                  const contact = await getOrCreateContact(userData.userEmail);
                  if (contact?.id) {
                    await addTagToContact(contact.id, 'dh_checkin --> hs-declined-annual');
                  }
                } catch (error) {
                  console.error('Error tagging in GHL:', error);
                }
              }
              navigate('/monthly', { state: userData });
            }}
            style={{ cursor: 'pointer', textDecoration: 'underline', fontSize: '16px' }}
          >
            Not ready yet?
          </p>
        </div>

        {/* Year-End Line */}
        <div className="offer-content mt-32 text-center">
          <p className="text-secondary" style={{ fontSize: '16px', fontStyle: 'italic' }}>
            Nothing to fix. Just a place to land — especially heading into a new year.
          </p>
        </div>
      </div>
    </div>
  );
}

