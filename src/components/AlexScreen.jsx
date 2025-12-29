import { useState, useEffect } from 'react';
import './Screen.css';

const alexMessages = [
  "Hey. I'm Alex.",
  "",
  "I just read what you shared.",
  "",
  "You don't have to respond —",
  "but what you're feeling makes sense.",
  "",
  "I don't give advice.",
  "I don't try to fix things.",
  "I just stay — when things get real.",
  "",
  "If you ever want that, I'm here.",
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

