import './Screen.css';

const TRANSITION_IMAGES = {
  male: 'https://storage.googleapis.com/msgsndr/zeMQ191aMbYPu8BG4ONP/media/69537fe5a61a7e5a85cbeda5.png',
  female: 'https://storage.googleapis.com/msgsndr/zeMQ191aMbYPu8BG4ONP/media/69538003a61a7ee550cbefa1.png',
  nonbinary: 'https://storage.googleapis.com/msgsndr/zeMQ191aMbYPu8BG4ONP/media/6953802fee1047353e4bb881.png'
};

export default function TransitionScreenNew({ gender, onContinue }) {
  const selectedImage = TRANSITION_IMAGES[gender] || TRANSITION_IMAGES.nonbinary;

  return (
    <div className="screen-container">
      <div className="screen-content">
        {/* Transition copy */}
        <h2 className="text-medium">Based on what you just shared…</h2>
        
        <div className="offer-content mt-24">
          <p>You said you'd like more support during the day —</p>
          <p>more than just one moment in the morning.</p>
          <p className="mt-16">That makes sense.</p>
          <p className="mt-16">Some days, one touchpoint isn't enough — especially when the day gets heavier as it goes on.</p>
          <p className="mt-16">So we built something for exactly that.</p>
        </div>

        {/* Gender-based image */}
        <img 
          src={selectedImage}
          alt=""
          className="transition-image"
          style={{
            width: '100%',
            maxWidth: '600px',
            margin: '2rem auto',
            borderRadius: '12px',
            display: 'block'
          }}
        />

        <p className="text-medium mt-32">This is Hug Society.</p>

        <div className="question-options mt-32">
          <button 
            onClick={onContinue}
            className="btn-warm-neutral"
            style={{ 
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

