import { getFinalMirrorLines } from '../utils/acknowledgments';
import './Screen.css';

export default function MirrorScreen({ answers, onContinue }) {
  const lines = getFinalMirrorLines(answers);

  return (
    <div className="screen-container" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <div className="screen-content">
        <div className="mirror-result">
          {lines.map((line, index) => (
            <p key={index}>{line}</p>
          ))}
          <p className="mt-24">Nothing about this is broken.</p>
          <p>But you don't have to do it alone.</p>
        </div>
        <button className="btn-primary mt-24" onClick={onContinue}>
          Continue
        </button>
      </div>
    </div>
  );
}

