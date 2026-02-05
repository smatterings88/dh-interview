import { useState } from 'react';
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
export function BridgeScreen({ firstName, onContinue }) {
  const displayName = firstName || 'friend';

  return (
    <div className="screen-container">
      <div className="screen-content">
        <h2 className="text-medium">This is exactly what Hug Society is for.</h2>
        <div className="mt-24" style={{ fontSize: '1.05rem', lineHeight: '1.7' }}>
          <p>
            {displayName}, what you just described is the gap most people live with: Support… but not when it actually hits. Hug Society is the &quot;more than once a day&quot; layer—for the moments the Daily Hug can&apos;t fully cover on its own. No fixing. No pressure. Just steadier presence—morning, evening, and in-between.
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
export function VisualIdentityScreen({ portraitSrc, onContinue }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="screen-container">
      <div className="screen-content">
        {/* Visual anchor portrait. If the image is missing, we fall back to a neutral placeholder. */}
        <div className="mt-24" style={{ display: 'flex', justifyContent: 'center' }}>
          {!imgError && portraitSrc ? (
            <img
              src={portraitSrc}
              alt="Portrait"
              style={{
                width: 160,
                height: 160,
                borderRadius: 16,
                objectFit: 'cover',
                border: '1px solid rgba(0,0,0,0.08)'
              }}
              onError={() => setImgError(true)}
            />
          ) : (
            <div
              aria-label="Neutral identity icon"
              style={{
                width: 160,
                height: 160,
                borderRadius: 16,
                background: 'rgba(0,0,0,0.06)',
                border: '1px solid rgba(0,0,0,0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2.5rem',
                color: 'rgba(0,0,0,0.35)'
              }}
            >
              <span role="img" aria-label="neutral person">
                🙂
              </span>
            </div>
          )}
        </div>
        <div className="mt-24" style={{ fontSize: '1.05rem', lineHeight: '1.7' }}>
          <p>
            This is who you are. Someone who doesn&apos;t need fixing. Someone who just wants steadier support.
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
          Alex is built for moments like the ones you just described.
        </h3>
        <div className="mt-24" style={{ fontSize: '1.05rem', lineHeight: '1.7' }}>
          <p>
            Alex isn't a therapist. Alex doesn't diagnose or fix you. Alex sends you steady reminders—based on what you said actually helps.
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
        <div className="mt-24" style={{ fontSize: '1.05rem', lineHeight: '1.7' }}>
          <p>Full access for a year. $97/year (about 27¢ a day).</p>
          <p className="mt-8">
            30 days. If it&apos;s not a fit, just reply to any email and we&apos;ll take care of it. No awkward explanations. No hoops.
          </p>
        </div>
        <div className="mt-32">
          <button className="btn-primary" onClick={onSelectAnnual}>
            Join Hug Society — $97/year
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
          <button className="btn-primary" onClick={onSelectMonthly}>
            Start Monthly — $15/month
          </button>
          <button className="option-button" onClick={onSelectAnnual}>
            Join Hug Society — $97/year
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
