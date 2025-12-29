import './Screen.css';

export default function OfferScreen({ 
  isAnnual = true, 
  frequency, 
  onJoin, 
  onDecline 
}) {
  if (isAnnual) {
    return (
      <div className="screen-container" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="screen-content">
          <h2>You asked for more support.</h2>
          {(frequency === 'freq_twice' || frequency === 'freq_multi') && (
            <div className="offer-content">
              <p>
                You said you'd like reminders more than once a day.
              </p>
              <p>
                The Daily Hug comes once.
              </p>
              <p>
                Hug Society shows up morning and evening —
                and Alex is there whenever your thoughts start looping.
              </p>
            </div>
          )}
          <div className="offer-content">
            <p className="text-medium">What you get</p>
            <ul className="feature-list">
              <li>Morning + Evening Hugs</li>
              <li>Alex, anytime</li>
              <li>A place you don't have to explain yourself</li>
            </ul>
            <p className="mt-24">
              It's not therapy.
            </p>
            <p>
              It's not a community.
            </p>
            <p>
              It's just… steady support when you need it most.
            </p>
            <div className="price">
              27¢ a day
            </div>
            <div className="price">
              $97 for the year
            </div>
            <p className="text-secondary text-small mt-16">
              As a thank-you for taking the interview, this founder rate is available for the next 48 hours.
            </p>
          </div>
          <div className="question-options mt-24">
            <button 
              className="btn-primary" 
              onClick={async () => {
                // Tag in GHL first
                await onJoin('annual');
                // Then redirect to checkout
                window.location.href = 'https://dailyhug.com/order';
              }}
            >
              Join Hug Society — $97/year
            </button>
            <button className="btn-secondary mt-16" onClick={onDecline}>
              Just the Daily Hug for now
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    // Monthly downsell
    return (
      <div className="screen-container" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="screen-content">
          <h2>Not ready for the yearly plan?</h2>
          <div className="offer-content">
            <p>That's okay.</p>
            <p className="mt-16">
              If you want to try Hug Society without committing for the year,
              you can start monthly.
            </p>
            <p className="mt-16">
              This works best when it's given a little time to settle in —
              so the monthly option has a 3-month minimum.
            </p>
            <p className="text-medium mt-24">You'll get:</p>
            <ul className="feature-list">
              <li>Morning + Evening Hugs</li>
              <li>Full access to Alex</li>
              <li>The same experience as the yearly plan</li>
            </ul>
            <div className="price mt-24">
              $15 / month
            </div>
            <p className="text-secondary text-small">
              (3-month minimum)
            </p>
          </div>
          <div className="question-options mt-24">
            <button 
              className="btn-primary" 
              onClick={async () => {
                // Tag in GHL first
                await onJoin('monthly');
                // Then redirect to checkout
                window.location.href = 'https://dailyhug.com/order-monthly';
              }}
            >
              Try Hug Society — $15/month
            </button>
            <button className="btn-secondary mt-16" onClick={onDecline}>
              Stick with the Daily Hug
            </button>
          </div>
        </div>
      </div>
    );
  }
}

