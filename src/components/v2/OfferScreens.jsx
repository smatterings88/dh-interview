import './V2Screen.css';

export default function OfferScreens({ screenType, firstName, onContinue }) {
  const displayName = firstName || 'friend';
  
  if (screenType === 'intro') {
    return (
      <div className="screen-container">
        <div className="screen-content">
          <h2 className="text-medium">
            This is exactly what Hug Society is for.
          </h2>
          <div className="mt-24" style={{ fontSize: '1.05rem', lineHeight: '1.7' }}>
            <p className="mb-16">
              {displayName}, what you just described is the gap most people live with:
            </p>
            <p className="mb-16">
              Support…<br />
              but not when it actually hits.
            </p>
            <p className="mb-16">
              Hug Society is the &quot;more than once a day&quot; layer—
              for the moments the Daily Hug can&apos;t fully cover on its own.
            </p>
            <p className="mb-16">
              No fixing.<br />
              No pressure.
            </p>
            <p>
              Just steadier presence—morning, evening, and in-between.
            </p>
          </div>
          <div className="mt-32">
            <button className="btn-warm-neutral" onClick={onContinue}>
              Show me →
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  if (screenType === 'what_it_is') {
    return (
      <div className="screen-container">
        <div className="screen-content">
          <h2 className="text-medium">What It Is</h2>
          <div className="mt-24" style={{ fontSize: '1.05rem', lineHeight: '1.7' }}>
            <p className="mb-16">
              The Hug Society is a private community where you get:
            </p>
            <ul className="feature-list">
              <li>Daily personalized Hugs from Alex (your AI support companion)</li>
              <li>Access to a private community of people who get it</li>
              <li>Weekly group check-ins and support sessions</li>
              <li>Resources and tools for emotional wellness</li>
              <li>24/7 access to Alex for when you need someone to talk to</li>
            </ul>
          </div>
          <div className="mt-32">
            <button className="btn-warm-neutral" onClick={onContinue}>
              Continue →
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  if (screenType === 'transformation') {
    return (
      <div className="screen-container">
        <div className="screen-content">
          <h2 className="text-medium">What Changes</h2>
          <div className="mt-24" style={{ fontSize: '1.05rem', lineHeight: '1.7' }}>
            <ul className="feature-list">
              <li>✓ You wake up knowing someone sees you</li>
              <li>✓ You have a place to go when it gets heavy</li>
              <li>✓ You're not alone in the 3am moments anymore</li>
              <li>✓ You have support that's always there, never too busy</li>
              <li>✓ You can finally let your guard down</li>
            </ul>
          </div>
          <div className="mt-32">
            <button className="btn-warm-neutral" onClick={onContinue}>
              Continue →
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  if (screenType === 'pricing') {
    return (
      <div className="screen-container">
        <div className="screen-content">
          <h2 className="text-medium">The Investment</h2>
          <div className="mt-24">
            <p style={{ fontSize: '1.45rem', fontWeight: 600 }}>
              $97 per year or $15 per month
            </p>
            <p className="text-secondary mt-16" style={{ fontSize: '1rem' }}>
              That's about 27¢ a day for real support.
            </p>
          </div>
          <div className="mt-32">
            <button className="btn-warm-neutral" onClick={onContinue}>
              Continue →
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  if (screenType === 'guarantee') {
    return (
      <div className="screen-container">
        <div className="screen-content">
          <h2 className="text-medium">Our Promise</h2>
          <div className="mt-24" style={{ fontSize: '1.05rem', lineHeight: '1.7' }}>
            <p className="mb-16">
              We're so confident this will help that we offer a 30-day money-back guarantee. If it's not for you, we'll refund every penny. No questions asked.
            </p>
            <p>
              Because we're not here to take your money. We're here to make sure you're not doing this alone anymore.
            </p>
          </div>
          <div className="mt-32">
            <button className="btn-warm-neutral" onClick={onContinue}>
              Continue →
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  if (screenType === 'bonus') {
    return (
      <div className="screen-container">
        <div className="screen-content">
          <h2 className="text-medium">One More Thing</h2>
          <div className="mt-24" style={{ fontSize: '1.05rem', lineHeight: '1.7' }}>
            <p className="mb-16">
              If you join in the next 48 hours, you'll get founder bonuses:
            </p>
            <ul className="feature-list">
              <li>Lifetime access to all future features (no extra cost)</li>
              <li>Priority support and early access to new tools</li>
              <li>Exclusive founder-only community events</li>
            </ul>
            <p className="mt-24">
              This is our launch window. After 48 hours, these bonuses go away.
            </p>
          </div>
          <div className="mt-32">
            <button className="btn-warm-neutral" onClick={onContinue}>
              Continue →
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  return null;
}

