import './V2Screen.css';

// C2: Gentle Normalization
export function NormalizationScreen({ onContinue }) {
  return (
    <div className="screen-container">
      <div className="screen-content">
        <h2 className="text-medium">That makes sense.</h2>
        <div className="mt-24" style={{ fontSize: '1.05rem', lineHeight: '1.7' }}>
          <p>
            You don't need to be in crisis to want support. Sometimes people want it to stay steady. Sometimes to feel less alone. Sometimes just to hear, "You're doing better than you think." Whatever brought you here — it counts.
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

// C3: The Reframe
export function ReframeScreen({ onContinue }) {
  return (
    <div className="screen-container">
      <div className="screen-content">
        <h2 className="text-medium">Nothing about this means something is 'wrong' with you.</h2>
        <div className="mt-24" style={{ fontSize: '1.05rem', lineHeight: '1.7' }}>
          <p>
            It just means you're human... Some days take more effort. Some stretches of life ask for a little more support than others. That doesn't need fixing. It just deserves to be met.
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

// C4: The Bridge
export function BridgeScreen({ onContinue }) {
  return (
    <div className="screen-container">
      <div className="screen-content">
        <h2 className="text-medium">When things feel like this, what actually helps?</h2>
        <div className="mt-24" style={{ fontSize: '1.05rem', lineHeight: '1.7' }}>
          <p>
            Not platitudes. Not being told to "just think positive."... What helps is support that matches you. That shows up without pressure.
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

// C5: Identity Bridge
export function IdentityBridgeScreen({ onContinue }) {
  return (
    <div className="screen-container">
      <div className="screen-content">
        <div className="mt-24" style={{ fontSize: '1.05rem', lineHeight: '1.7' }}>
          <p>
            You're not looking for more content. You're looking for something steady... Before we show you what that looks like… there's someone we want you to meet.
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

// C6: Visual Identity
export function VisualIdentityScreen({ onContinue }) {
  return (
    <div className="screen-container">
      <div className="screen-content">
        <div className="mt-24" style={{ fontSize: '1.05rem', lineHeight: '1.7' }}>
          <p>
            Someone who doesn't need fixing. Someone who just wants to feel supported.
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

// C7: Alex Reveal
export function AlexRevealScreen({ onContinue }) {
  return (
    <div className="screen-container">
      <div className="screen-content">
        <h2 className="text-medium">This is Alex.</h2>
        <h3 className="mt-16" style={{ fontSize: '1.1rem', fontWeight: 500 }}>
          Alex is your HugBot — a gentle AI companion built to support you emotionally.
        </h3>
        <div className="mt-24" style={{ fontSize: '1.05rem', lineHeight: '1.7' }}>
          <p>
            Alex isn't a therapist. Alex doesn't diagnose or fix you. Alex sends you steady reminders — based on what you said matters most.
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

// C8: Concrete Deliverables
export function DeliverablesScreen({ onContinue }) {
  return (
    <div className="screen-container">
      <div className="screen-content">
        <div className="mt-24" style={{ fontSize: '1.05rem', lineHeight: '1.7' }}>
          <ul className="feature-list">
            <li>Personalized Hugs</li>
            <li>Morning/Evening options</li>
            <li>Flexible frequency</li>
            <li>Guided journaling tools</li>
          </ul>
          <p className="mt-24" style={{ fontStyle: 'italic', color: '#666' }}>
            No overwhelm. No pressure. Just steady support.
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

// C9: Value Anchor
export function ValueAnchorScreen({ onContinue }) {
  return (
    <div className="screen-container">
      <div className="screen-content">
        <h2 className="text-medium">This isn't content. It's continuity.</h2>
        <div className="mt-24" style={{ fontSize: '1.05rem', lineHeight: '1.7' }}>
          <p>
            It's knowing something steady shows up... Just to remind you — consistently — that you matter.
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

// C10: Primary Offer (Annual)
export function PrimaryOfferScreen({ onSelectAnnual }) {
  return (
    <div className="screen-container">
      <div className="screen-content">
        <h2 className="text-medium">Join Hug Society.</h2>
        <div className="mt-24">
          <p style={{ fontSize: '1.45rem', fontWeight: 600 }}>
            $97 / year
          </p>
          <p className="text-secondary mt-8" style={{ fontSize: '1rem' }}>
            (That's about 27¢ a day.)
          </p>
        </div>
        <div className="mt-32">
          <button className="btn-primary" onClick={onSelectAnnual}>
            Join Hug Society →
          </button>
        </div>
      </div>
    </div>
  );
}

// C11: Downsell (Monthly)
export function DownsellScreen({ onSelectMonthly, onSelectAnnual }) {
  return (
    <div className="screen-container">
      <div className="screen-content">
        <h2 className="text-medium">If a year feels like too much right now — that's okay.</h2>
        <div className="mt-24" style={{ fontSize: '1.05rem', lineHeight: '1.7' }}>
          <p className="mb-16">
            You can start monthly instead. $15 per month. (That's $180/year if you stay — cancel anytime.) Or lock in the full year now at $97 and save $83.
          </p>
        </div>
        <div className="question-options mt-32">
          <button className="option-button" onClick={onSelectMonthly}>
            $15 / month
          </button>
          <button className="btn-primary" onClick={onSelectAnnual}>
            $97 / year (save $83)
          </button>
        </div>
      </div>
    </div>
  );
}

// C12: Validation
export function ValidationScreen({ onContinue }) {
  return (
    <div className="screen-container">
      <div className="screen-content">
        <div className="mt-24" style={{ fontSize: '1.05rem', lineHeight: '1.7' }}>
          <p>
            Whichever you choose… there's no 'right' decision here. Some people want consistency. Some want flexibility. Both are valid.
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

// C13: Exit
export function ExitScreen() {
  const handleDone = () => {
    window.location.href = 'https://dailyhug.com';
  };

  return (
    <div className="screen-container">
      <div className="screen-content">
        <h2 className="text-medium">You're welcome here.</h2>
        <div className="mt-24" style={{ fontSize: '1.05rem', lineHeight: '1.7' }}>
          <p>
            Today. Next month. Or whenever you're ready. We'll meet you where you are.
          </p>
        </div>
        <div className="mt-32">
          <button className="btn-warm-neutral" onClick={handleDone}>
            Done →
          </button>
        </div>
      </div>
    </div>
  );
}
