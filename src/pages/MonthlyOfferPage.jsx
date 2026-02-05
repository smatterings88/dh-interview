import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../index.css';

export default function MonthlyOfferPage() {
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
        {/* Transition */}
        <h2 className="text-medium">That makes sense. Let's make this easier.</h2>
        <div className="offer-content mt-24">
          <p>Not everyone wants to decide for a full year right now.</p>
          <p className="mt-16">If you want to try Hug Society without committing long-term,</p>
          <p>there's a monthly option.</p>
          <p className="mt-16">Same experience.</p>
          <p>Same support.</p>
          <p>Just a smaller step.</p>
        </div>

        {/* What You'll Get */}
        <div className="offer-content mt-32">
          <p className="text-medium">What you'll get</p>
          <ul className="feature-list">
            <li>Morning + Evening Hugs<br />
              <span className="text-secondary" style={{ fontSize: '18px' }}>Support at both ends of the day — not just once in the morning.</span>
            </li>
            <li>Alex, anytime you need to talk<br />
              <span className="text-secondary" style={{ fontSize: '18px' }}>A place to get thoughts out of your head without advice or fixing.</span>
            </li>
            <li>A quiet place to land<br />
              <span className="text-secondary" style={{ fontSize: '18px' }}>When the day gets heavy and you don't want to carry it alone.</span>
            </li>
          </ul>
        </div>

        {/* Price */}
        <div className="offer-content mt-32">
          <div className="price" style={{ fontSize: '1.9rem', fontWeight: 600 }}>
            $15 per month
          </div>
          <p className="mt-16">Hug Society isn't designed to "work" in a few days.</p>
          <p className="mt-16">It works when your nervous system has time to feel the rhythm of being supported —</p>
          <p>morning, evening, and in between.</p>
          <p className="mt-16">That's why the monthly option has a 3-month minimum.</p>
          <p className="text-secondary mt-16" style={{ fontSize: '18px' }}>
            (Same experience as the yearly plan. Just paid monthly.)
          </p>
        </div>

        {/* Expectation Setting */}
        <div className="offer-content mt-32">
          <p>You're not locked into a year.</p>
          <p>You're just giving yourself a real window</p>
          <p>to feel what this support is like —</p>
          <p>instead of deciding after a few days.</p>
          <p className="mt-16">Some people start monthly.</p>
          <p className="mt-16">Then, once they feel what steady support actually does,</p>
          <p>they choose to stay longer.</p>
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
                    await addTagToContact(contact.id, 'dh_checkin --> hs-monthly');
                  }
                } catch (error) {
                  console.error('Error tagging in GHL:', error);
                }
              }
              try {
                const url = new URL('https://dailyhug.com/order-monthly');
                if (userData?.userEmail) {
                  url.searchParams.set('email', userData.userEmail);
                }
                window.location.href = url.toString();
              } catch {
                const emailParam = userData?.userEmail ? `?email=${encodeURIComponent(userData.userEmail)}` : '';
                window.location.href = `https://dailyhug.com/order-monthly${emailParam}`;
              }
            }}
          >
            Start Hug Society — $15/month
          </button>
          <p className="text-secondary text-center mt-16" style={{ fontSize: '16px' }}>
            3-month minimum • Same experience as yearly
          </p>
        </div>

        {/* Safety Strip */}
        <div className="offer-content mt-32 text-center">
          <p className="text-secondary" style={{ fontSize: '16px' }}>
            Secure checkout • Cancel after the minimum • No spam. No upsells inside Alex.
          </p>
        </div>
      </div>
    </div>
  );
}

