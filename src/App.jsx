import { useState, useEffect } from 'react';
import EntryScreen from './components/EntryScreen';
import EmailScreen from './components/EmailScreen';
import QuestionScreen from './components/QuestionScreen';
import TransitionScreen from './components/TransitionScreen';
import MirrorA from './components/MirrorA';
import MirrorB from './components/MirrorB';
import MirrorC from './components/MirrorC';
import MirrorD from './components/MirrorD';
import MicroPause from './components/MicroPause';
import MirrorScreen from './components/MirrorScreen';
import AlexScreen from './components/AlexScreen';
import DailyHugConfirmation from './components/DailyHugConfirmation';
import OfferScreen from './components/OfferScreen';
import BuyerWelcome from './components/BuyerWelcome';
import NonBuyerClose from './components/NonBuyerClose';
import { questions } from './utils/questions';
import { acknowledgments } from './utils/acknowledgments';
import { processQuestionAnswer } from './utils/ghlApi';
import './App.css';

const SCREENS = {
  ENTRY: 'entry',
  EMAIL: 'email',
  QUESTION: 'question',
  TRANSITION_TO_EMOTIONAL: 'transition_to_emotional',
  MIRROR_A: 'mirror_a',
  MIRROR_B: 'mirror_b',
  MIRROR_C: 'mirror_c',
  MIRROR_D: 'mirror_d',
  MICRO_PAUSE: 'micro_pause',
  FINAL_MIRROR: 'final_mirror',
  ALEX: 'alex',
  DAILY_HUG_CONFIRM: 'daily_hug_confirm',
  OFFER_ANNUAL: 'offer_annual',
  OFFER_MONTHLY: 'offer_monthly',
  BUYER_WELCOME: 'buyer_welcome',
  NON_BUYER_CLOSE: 'non_buyer_close',
};

function App() {
  const [currentScreen, setCurrentScreen] = useState(SCREENS.ENTRY);
  const [answers, setAnswers] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [tags, setTags] = useState([]);
  const [alexResponse, setAlexResponse] = useState(null);
  const [userEmail, setUserEmail] = useState('');

  // Read "vip" query parameter on mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const vipEmail = urlParams.get('vip');
    
    if (vipEmail) {
      setUserEmail(vipEmail);
      console.log('Email from query string (vip parameter):', vipEmail);
    }
  }, []);

  const handleEntryContinue = () => {
    // If no email from query param, show email screen first
    if (!userEmail) {
      setCurrentScreen(SCREENS.EMAIL);
    } else {
      setCurrentScreen(SCREENS.QUESTION);
      setCurrentQuestionIndex(0); // Start with question 1 (Age)
    }
  };

  const handleEmailSubmit = (email) => {
    setUserEmail(email);
    console.log('Email from user input:', email);
    setCurrentScreen(SCREENS.QUESTION);
    setCurrentQuestionIndex(0); // Start with question 1 (Age)
  };

  const handleQuestionAnswer = async (value) => {
    const questionId = questions[currentQuestionIndex].id;
    const newAnswers = { ...answers, [questionId]: value };
    setAnswers(newAnswers);

    // Add tag for each question answer
    // Format: q{questionId}_{answerValue}
    const questionTag = `q${questionId}_${value}`;
    setTags(prev => [...prev, questionTag]);
    
    // Also add acknowledgment tag if it exists
    if (acknowledgments[value]) {
      setTags(prev => [...prev, acknowledgments[value]]);
    }

    // Integrate with GHL - tag contact after each answer
    if (userEmail) {
      processQuestionAnswer(userEmail, questionId, value);
    }

    // Determine next screen based on question index
    if (currentQuestionIndex === 0) {
      // After age question, continue to gender
      setTimeout(() => {
        setCurrentQuestionIndex(1);
      }, 600);
    } else if (currentQuestionIndex === 1) {
      // After gender question, show transition to emotional questions
      setTimeout(() => {
        setCurrentScreen(SCREENS.TRANSITION_TO_EMOTIONAL);
      }, 600);
    } else if (currentQuestionIndex === 2) {
      // After question 3 (Current State), show Mirror A
      setTimeout(() => {
        setCurrentScreen(SCREENS.MIRROR_A);
      }, 800);
    } else if (currentQuestionIndex === 3) {
      // After question 4 (Mental Load), continue to question 5
      setTimeout(() => {
        setCurrentQuestionIndex(4);
      }, 800);
    } else if (currentQuestionIndex === 4) {
      // After question 5 (Social Energy), show Mirror B
      setTimeout(() => {
        setCurrentScreen(SCREENS.MIRROR_B);
      }, 800);
    } else if (currentQuestionIndex === 5) {
      // After question 6 (Emotional Aftereffect), continue to question 7
      setTimeout(() => {
        setCurrentQuestionIndex(6);
      }, 800);
    } else if (currentQuestionIndex === 6) {
      // After question 7 (Self-Relationship), show Mirror C
      setTimeout(() => {
        setCurrentScreen(SCREENS.MIRROR_C);
      }, 800);
    } else if (currentQuestionIndex === 7) {
      // After question 8 (Energy & Rest), show Mirror D
      setTimeout(() => {
        setCurrentScreen(SCREENS.MIRROR_D);
      }, 800);
    } else if (currentQuestionIndex === 8) {
      // After question 9 (Support Style), continue to question 10
      setTimeout(() => {
        setCurrentQuestionIndex(9);
      }, 800);
    } else if (currentQuestionIndex === 9) {
      // After question 10 (Frequency), show micro-pause
      setTimeout(async () => {
        setCurrentScreen(SCREENS.MICRO_PAUSE);
        setTags(prev => [...prev, 'interview-complete']);
        
        // Tag interview complete in GHL
        if (userEmail) {
          const { getOrCreateContact, addTagToContact } = await import('./utils/ghlApi');
          const contact = await getOrCreateContact(userEmail);
          if (contact?.id) {
            await addTagToContact(contact.id, 'dh_checkin --> interview-complete');
          }
        }
      }, 800);
    }
  };

  const handleTransitionToEmotionalComplete = () => {
    setCurrentScreen(SCREENS.QUESTION);
    setCurrentQuestionIndex(2); // Question 3 (Current State - first emotional question)
  };

  const handleMirrorAComplete = () => {
    setCurrentScreen(SCREENS.QUESTION);
    setCurrentQuestionIndex(3); // Question 4 (Mental Load)
  };

  const handleMirrorBComplete = () => {
    setCurrentScreen(SCREENS.QUESTION);
    setCurrentQuestionIndex(5); // Question 6 (Emotional Aftereffect)
  };

  const handleMirrorCContinue = () => {
    setCurrentScreen(SCREENS.QUESTION);
    setCurrentQuestionIndex(7); // Question 8 (Energy & Rest)
  };

  const handleMirrorDComplete = () => {
    setCurrentScreen(SCREENS.QUESTION);
    setCurrentQuestionIndex(8); // Question 9 (Support Style)
  };

  const handleMicroPauseComplete = () => {
    setCurrentScreen(SCREENS.FINAL_MIRROR);
  };

  const handleFinalMirrorContinue = () => {
    setCurrentScreen(SCREENS.ALEX);
  };

  const handleAlexInterested = () => {
    setAlexResponse('interested');
    setTags(prev => [...prev, 'alex-interested']);
    // Show offer if frequency is more than once a day
    const frequency = answers[10];
    if (frequency === 'freq_twice' || frequency === 'freq_multi') {
      setCurrentScreen(SCREENS.OFFER_ANNUAL);
    } else {
      // Still show offer but with different messaging
      setCurrentScreen(SCREENS.OFFER_ANNUAL);
    }
  };

  const handleAlexMaybeLater = () => {
    setAlexResponse('maybe_later');
    setTags(prev => [...prev, 'alex-hesitant']);
    setCurrentScreen(SCREENS.DAILY_HUG_CONFIRM);
  };

  const handleDailyHugConfirm = () => {
    setCurrentScreen(SCREENS.NON_BUYER_CLOSE);
  };

  const handleOfferJoin = async (type) => {
    const tag = type === 'annual' ? 'hs-annual' : 'hs-monthly';
    setTags(prev => [...prev, tag]);
    
    // Tag in GHL
    if (userEmail) {
      const { getOrCreateContact, addTagToContact } = await import('./utils/ghlApi');
      const contact = await getOrCreateContact(userEmail);
      if (contact?.id) {
        await addTagToContact(contact.id, `dh_checkin --> ${tag}`);
      }
    }
    
    setCurrentScreen(SCREENS.BUYER_WELCOME);
  };

  const handleOfferDecline = async () => {
    if (currentScreen === SCREENS.OFFER_ANNUAL) {
      // Show monthly downsell
      setCurrentScreen(SCREENS.OFFER_MONTHLY);
    } else {
      // Declined monthly too
      setTags(prev => [...prev, 'hs-declined']);
      
      // Tag in GHL
      if (userEmail) {
        const { getOrCreateContact, addTagToContact } = await import('./utils/ghlApi');
        const contact = await getOrCreateContact(userEmail);
        if (contact?.id) {
          await addTagToContact(contact.id, 'dh_checkin --> hs-declined');
        }
      }
      
      setCurrentScreen(SCREENS.NON_BUYER_CLOSE);
    }
  };

  const handleBuyerWelcome = (action) => {
    // For now, just stay on this screen
    // In production, this would navigate to Alex chat or home
  };

  // Render current screen
  const renderScreen = () => {
    switch (currentScreen) {
      case SCREENS.ENTRY:
        return <EntryScreen onContinue={handleEntryContinue} />;

      case SCREENS.EMAIL:
        return <EmailScreen onEmailSubmit={handleEmailSubmit} />;

      case SCREENS.QUESTION:
        return (
          <QuestionScreen
            question={questions[currentQuestionIndex]}
            onAnswer={handleQuestionAnswer}
            autoAdvanceDelay={800}
          />
        );

      case SCREENS.TRANSITION_TO_EMOTIONAL:
        return <TransitionScreen onComplete={handleTransitionToEmotionalComplete} copy="Thanks. Let's check in." />;

      case SCREENS.MIRROR_A:
        return <MirrorA onComplete={handleMirrorAComplete} />;

      case SCREENS.MIRROR_B:
        return <MirrorB answers={answers} onComplete={handleMirrorBComplete} />;

      case SCREENS.MIRROR_C:
        return <MirrorC answers={answers} onContinue={handleMirrorCContinue} />;

      case SCREENS.MIRROR_D:
        return <MirrorD answers={answers} onComplete={handleMirrorDComplete} />;

      case SCREENS.MICRO_PAUSE:
        return <MicroPause onComplete={handleMicroPauseComplete} />;

      case SCREENS.FINAL_MIRROR:
        return <MirrorScreen answers={answers} onContinue={handleFinalMirrorContinue} />;

      case SCREENS.ALEX:
        return (
          <AlexScreen
            onInterested={handleAlexInterested}
            onMaybeLater={handleAlexMaybeLater}
          />
        );

      case SCREENS.DAILY_HUG_CONFIRM:
        return <DailyHugConfirmation onContinue={handleDailyHugConfirm} />;

      case SCREENS.OFFER_ANNUAL:
        return (
          <OfferScreen
            isAnnual={true}
            frequency={answers[10]}
            onJoin={handleOfferJoin}
            onDecline={handleOfferDecline}
            answers={answers}
          />
        );

      case SCREENS.OFFER_MONTHLY:
        return (
          <OfferScreen
            isAnnual={false}
            frequency={answers[10]}
            onJoin={handleOfferJoin}
            onDecline={handleOfferDecline}
            answers={answers}
          />
        );

      case SCREENS.BUYER_WELCOME:
        return (
          <BuyerWelcome
            onMeetAlex={() => handleBuyerWelcome('meet')}
            onLater={() => handleBuyerWelcome('later')}
          />
        );

      case SCREENS.NON_BUYER_CLOSE:
        return <NonBuyerClose />;

      default:
        return <EntryScreen onContinue={handleEntryContinue} />;
    }
  };

  return (
    <div className="App">
      {renderScreen()}
      {/* Debug info - remove in production */}
      {process.env.NODE_ENV === 'development' && (
        <div style={{
          position: 'fixed',
          bottom: 10,
          right: 10,
          fontSize: '10px',
          color: '#999',
          background: '#fff',
          padding: '4px 8px',
          borderRadius: '4px',
          zIndex: 9999
        }}>
          Screen: {currentScreen} | Q: {currentQuestionIndex + 1}/{questions.length} | Tags: {tags.length} | Email: {userEmail || 'none'}
        </div>
      )}
    </div>
  );
}

export default App;
