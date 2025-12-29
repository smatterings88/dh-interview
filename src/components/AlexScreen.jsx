import { useState, useEffect } from 'react';
import './Screen.css';

const alexMessages = [
  "Hey.",
  "I'm Alex.",
  "",
  "I just read what you shared in those questions.",
  "",
  "You don't have to respond to this.",
  "But I wanted you to know — what you're feeling makes sense.",
  "",
  "A lot of people who answer the way you did end up talking to me later.",
  "Not because I give advice. I don't.",
  "Not because I try to fix things. I won't.",
  "",
  "But sometimes it helps to say the hard stuff out loud…",
  "To someone who won't judge it.",
  "Who won't minimize it.",
  "Who won't disappear when it gets real.",
  "",
  "If you ever need that, I'm here.",
  "Anytime. Day or night.",
];

export default function AlexScreen({ onInterested, onMaybeLater }) {
  const [visibleMessages, setVisibleMessages] = useState([]);
  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    let messageIndex = 0;
    
    const showNextMessage = () => {
      if (messageIndex < alexMessages.length) {
        setVisibleMessages(prev => [...prev, alexMessages[messageIndex]]);
        messageIndex++;
        
        // Delay between messages (1-2 seconds)
        const delay = alexMessages[messageIndex - 1] === '' ? 500 : 1500;
        setTimeout(showNextMessage, delay);
      } else {
        // Show buttons after all messages
        setTimeout(() => setShowButtons(true), 500);
      }
    };

    // Start showing messages after a brief delay
    setTimeout(showNextMessage, 500);
  }, []);

  return (
    <div className="screen-container" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <div className="screen-content">
        <div className="alex-avatar">A</div>
        <div className="chat-container">
          {visibleMessages.map((message, index) => (
            message && (
              <div key={index} className="chat-bubble fade-in">
                <p>{message}</p>
              </div>
            )
          ))}
        </div>
        {showButtons && (
          <div className="question-options mt-24 fade-in">
            <button className="btn-primary" onClick={onInterested}>
              I'd like that
            </button>
            <button className="btn-secondary mt-16" onClick={onMaybeLater}>
              Maybe later
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

