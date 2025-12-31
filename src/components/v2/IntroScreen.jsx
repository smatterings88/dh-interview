import './V2Screen.css';

export default function IntroScreen({ onContinue }) {
  return (
    <div className="screen-container">
      <div className="screen-content">
        <h1>You're in. 💛</h1>
        <p className="mt-16">
          Before your first Daily Hug arrives tomorrow morning… One quick thing. A few simple questions so your Hugs can land a little closer to where you actually are. Takes about 60 seconds. Nothing to type. No wrong answers.
        </p>
        <div className="mt-32">
          <button className="btn-warm-neutral" onClick={onContinue}>
            Let's go →
          </button>
        </div>
      </div>
    </div>
  );
}

