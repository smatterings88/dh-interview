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
        {/* What This Is */}
        <div className="offer-content">
          <h2 className="text-medium">This is Hug Society.</h2>
          <p className="mt-16">
            Hug Society exists for the moments the Daily Hug can't fully cover.
            <br /><br />
            Not because the Daily Hug isn't good —<br />
            but because support sometimes needs to show up more than once.
          </p>
          <p className="mt-16">
            It's not therapy.<br />
            It's not a community.
            <br /><br />
            It's just… steady support — morning, evening, and in between.
          </p>
        </div>

        {/* What You Get */}
        <div className="offer-content mt-32">
          <p className="text-medium">What you get</p>
          <ul className="feature-list">
            <li>Morning + Evening Hugs<br />
              <span className="text-secondary" style={{ fontSize: '18px' }}>Support at both ends of the day — not just when you wake up.</span>
            </li>
            <li>Alex, anytime you need to talk<br />
              <span className="text-secondary" style={{ fontSize: '18px' }}>A place to get thoughts out of your head without advice, fixing, or pressure.</span>
            </li>
            <li>A quiet place to land<br />
              <span className="text-secondary" style={{ fontSize: '18px' }}>Where you don't have to explain yourself first.</span>
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
          <div className="price" style={{ fontSize: '1.9rem', fontWeight: 600 }}>
            27¢ a day
          </div>
          <p className="mt-16">That's what Hug Society works out to over the year.</p>
          <p className="mt-16">A small, steady amount —</p>
          <p>for support that shows up more than once a day, when you actually need it.</p>
          <div className="price mt-24" style={{ fontSize: '1.45rem' }}>
            $97 for the full year
          </div>
          <p className="text-secondary mt-16" style={{ fontSize: '18px' }}>
            One decision. No monthly second-guessing.
          </p>
        </div>

        {/* Fast-Action Bonuses */}
        <div className="offer-content mt-32">
          <p className="text-medium">Join in the next 48 hours and you'll also receive:</p>
          <ul className="feature-list mt-16">
            <li><strong>30-Day Midday Thrive Hug</strong> ($49 value)<br />
              <span className="text-secondary" style={{ fontSize: '18px' }}>Your midday reset — delivered when energy dips and stress creeps in.</span>
            </li>
            <li><strong>Hug Music Pack</strong> ($29 value)<br />
              <span className="text-secondary" style={{ fontSize: '18px' }}>Seven calming soundscapes plus a guided meditation — something steady to come back to when your mind won't slow down.</span>
            </li>
          </ul>
          <p className="text-secondary mt-16" style={{ fontSize: '16px' }}>
            These are founder bonuses for acting during the launch window.
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
            style={{ cursor: 'pointer', textDecoration: 'underline', fontSize: '18px', color: 'var(--coral-primary)' }}
          >
            Not ready yet?
          </p>
          <p className="text-secondary text-center mt-16" style={{ fontSize: '16px' }}>
            You'll keep receiving the Daily Hug either way.
          </p>
        </div>

        {/* Year-End Line */}
        <div className="offer-content mt-32 text-center">
          <p className="text-secondary" style={{ fontSize: '18px' }}>
            That's okay. You'll keep receiving the Daily Hug either way.
          </p>
          <p className="text-secondary mt-16" style={{ fontSize: '18px' }}>
            Hug Society will be here — especially if you want more support as the year turns.
          </p>
        </div>
      </div>
    </div>
  );
}

