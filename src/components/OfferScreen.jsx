import './Screen.css';

const buildCheckoutUrlWithEmail = (baseUrl) => {
  try {
    // Prefer V1 user data, then V2 user data
    const v1 = JSON.parse(localStorage.getItem('dh_userData') || 'null');
    const v2 = JSON.parse(localStorage.getItem('dh_v2_userData') || 'null');
    const email = v1?.userEmail || v2?.email;
    if (!email) return baseUrl;

    const url = new URL(baseUrl);
    url.searchParams.set('email', email);
    return url.toString();
  } catch {
    return baseUrl;
  }
};

// Get offer copy based on emotional state
const getOfferCopy = (emotionalState) => {
  switch (emotionalState) {
    case 'stretched':
      return {
        headline: "You're holding a lot — and doing it well.",
        body: (
          <>
            <p>Nothing here says you're falling apart.</p>
            <p>It just says you're carrying more than usual.</p>
            <p className="mt-16">The Daily Hug meets you once a day —</p>
            <p>a moment to reset and steady yourself.</p>
            <p className="mt-16">Some people like knowing there's a second touchpoint too —</p>
            <p>a quiet reminder in the evening</p>
            <p>and someone to check in with if the day runs long.</p>
            <p className="mt-16">That's what Hug Society is.</p>
            <p className="mt-16">Not more intensity.</p>
            <p>Just more availability.</p>
          </>
        ),
        transition: "If having support show up twice a day —\nand knowing Alex is there whenever your thoughts start looping —\nwould help you stretch without snapping…"
      };
    
    case 'tired':
      return {
        headline: "You don't have to push through everything alone.",
        body: (
          <>
            <p>Pushing through works —</p>
            <p>until it doesn't.</p>
            <p className="mt-16">The Daily Hug gives you a pause each morning.</p>
            <p className="mt-16">Hug Society adds a place to set things down again at night</p>
            <p>and someone to steady the spiral when your mind won't shut off.</p>
            <p className="mt-16">It's not about needing help.</p>
            <p>It's about not carrying the whole load by yourself.</p>
          </>
        ),
        transition: "If having support in the in-between hours would help you breathe easier…"
      };
    
    case 'off':
      return {
        headline: "That \"off\" feeling matters.",
        body: (
          <>
            <p>Not everything has a name.</p>
            <p>But it still deserves care.</p>
            <p className="mt-16">The Daily Hug meets you once a day with steadiness.</p>
            <p className="mt-16">Hug Society gives you a place to check in again later —</p>
            <p>and a presence you don't have to explain yourself to.</p>
            <p className="mt-16">No fixing.</p>
            <p>No digging.</p>
            <p>Just support that stays close while things settle.</p>
          </>
        ),
        transition: "If it would help to have something steady nearby while you find your footing…"
      };
    
    case 'overwhelmed':
      return {
        headline: "You don't have to carry this by yourself.",
        body: (
          <>
            <p>When things feel like too much,</p>
            <p>once a day support can help —</p>
            <p>but it's often not enough.</p>
            <p className="mt-16">Hug Society shows up in the morning and the evening.</p>
            <p>And Alex is there whenever the thoughts start piling up.</p>
            <p className="mt-16">Not to analyze you.</p>
            <p>Not to fix you.</p>
            <p>Just to be present until things soften.</p>
          </>
        ),
        transition: "If more consistent support would make this feel survivable…"
      };
    
    case 'masking':
      return {
        headline: "You shouldn't have to keep performing \"fine.\"",
        body: (
          <>
            <p>A lot of people look okay</p>
            <p>while carrying things no one sees.</p>
            <p className="mt-16">The Daily Hug offers one moment a day</p>
            <p>where you don't have to perform.</p>
            <p className="mt-16">Hug Society gives you another —</p>
            <p>and a place to land when the mask gets heavy.</p>
            <p className="mt-16">No explanations required.</p>
            <p>No expectations.</p>
          </>
        ),
        transition: "If having somewhere to be real — quietly — would help…"
      };
    
    default:
      return {
        headline: "You asked for more support.",
        body: (
          <>
            <p>You said you'd like reminders more than once a day.</p>
            <p className="mt-16">The Daily Hug comes once.</p>
            <p className="mt-16">Hug Society shows up morning and evening —</p>
            <p>and Alex is there whenever your thoughts start looping.</p>
          </>
        ),
        transition: ""
      };
  }
};

export default function OfferScreen({ 
  isAnnual = true, 
  frequency, 
  onJoin, 
  onDecline,
  answers
}) {
  // Get emotional state from first emotional question (id: 3)
  const emotionalState = answers?.[3];
  const offerCopy = getOfferCopy(emotionalState);

  if (isAnnual) {
    return (
      <div className="screen-container" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="screen-content">
          <h2>{offerCopy.headline}</h2>
          <div className="offer-content mt-24">
            {offerCopy.body}
            
            {offerCopy.transition && (
              <p className="mt-24" style={{ whiteSpace: 'pre-line' }}>
                {offerCopy.transition}
              </p>
            )}
            
            <p className="text-medium mt-32">Here's what that looks like in practice:</p>
            <ul className="feature-list">
              <li>A gentle Hug in the morning</li>
              <li>A steady check-in again in the evening</li>
              <li>Alex — available whenever your thoughts need somewhere safe to land</li>
              <li>A place where you don't have to explain yourself first</li>
            </ul>
            
            <p className="mt-32">It's not therapy.</p>
            <p>It's not a community you have to perform in.</p>
            <p className="mt-16">It's just… steady presence.</p>
            <p>The kind that helps you get through the day</p>
            <p>without carrying everything alone.</p>
            
            <div className="price mt-32">
              27¢ a day
            </div>
            <div className="price">
              $97 for the year
            </div>
            <p className="text-secondary text-small mt-16">
              As a thank-you for taking the check-in,
              this founder rate is available for the next 48 hours.
            </p>
          </div>
          <div className="question-options mt-24">
            <button 
              className="btn-primary" 
              onClick={async () => {
                // Tag in GHL first
                await onJoin('annual');
                // Then redirect to checkout
                window.location.href = buildCheckoutUrlWithEmail('https://dailyhug.com/order');
              }}
            >
              Let Hug Society support me — $97/year
            </button>
            <button className="btn-secondary mt-16" onClick={onDecline}>
              I'll stay with the Daily Hug for now
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
                window.location.href = buildCheckoutUrlWithEmail('https://dailyhug.com/order-monthly');
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
