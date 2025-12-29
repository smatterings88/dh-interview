import { useState } from 'react';
import EntryScreen from './components/EntryScreen';
import QuestionScreen from './components/QuestionScreen';
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
import './App.css';

const SCREENS = {
  ENTRY: 'entry',
  QUESTION: 'question',
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

  const handleEntryContinue = () => {
    setCurrentScreen(SCREENS.QUESTION);
    setCurrentQuestionIndex(0); // Start with question 1 (Current State)
  };

  const handleQuestionAnswer = (value) => {
    const questionId = questions[currentQuestionIndex].id;
    const newAnswers = { ...answers, [questionId]: value };
    setAnswers(newAnswers);

    // Add tag for frequency question (used later for offer logic)
    if (questionId === 8) {
      setTags(prev => [...prev, value]);
    }

    // Determine next screen based on question index
    if (currentQuestionIndex === 0) {
      // After question 1, show Mirror A
      setTimeout(() => {
        setCurrentScreen(SCREENS.MIRROR_A);
      }, 800);
    } else if (currentQuestionIndex === 1) {
      // After question 2, continue to question 3
      setTimeout(() => {
        setCurrentQuestionIndex(2);
      }, 800);
    } else if (currentQuestionIndex === 2) {
      // After question 3, show Mirror B
      setTimeout(() => {
        setCurrentScreen(SCREENS.MIRROR_B);
      }, 800);
    } else if (currentQuestionIndex === 3) {
      // After question 4, continue to question 5
      setTimeout(() => {
        setCurrentQuestionIndex(4);
      }, 800);
    } else if (currentQuestionIndex === 4) {
      // After question 5, show Mirror C
      setTimeout(() => {
        setCurrentScreen(SCREENS.MIRROR_C);
      }, 800);
    } else if (currentQuestionIndex === 5) {
      // After question 6, show Mirror D
      setTimeout(() => {
        setCurrentScreen(SCREENS.MIRROR_D);
      }, 800);
    } else if (currentQuestionIndex === 6) {
      // After question 7, continue to question 8
      setTimeout(() => {
        setCurrentQuestionIndex(7);
      }, 800);
    } else if (currentQuestionIndex === 7) {
      // After question 8 (frequency), show micro-pause
      setTimeout(() => {
        setCurrentScreen(SCREENS.MICRO_PAUSE);
        setTags(prev => [...prev, 'interview-complete']);
      }, 800);
    }
  };

  const handleMirrorAComplete = () => {
    setCurrentScreen(SCREENS.QUESTION);
    setCurrentQuestionIndex(1); // Question 2 (Mental Load)
  };

  const handleMirrorBComplete = () => {
    setCurrentScreen(SCREENS.QUESTION);
    setCurrentQuestionIndex(3); // Question 4 (Emotional Aftereffect)
  };

  const handleMirrorCContinue = () => {
    setCurrentScreen(SCREENS.QUESTION);
    setCurrentQuestionIndex(5); // Question 6 (Energy & Rest)
  };

  const handleMirrorDComplete = () => {
    setCurrentScreen(SCREENS.QUESTION);
    setCurrentQuestionIndex(6); // Question 7 (Support Style)
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
    const frequency = answers[8];
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

  const handleOfferJoin = (type) => {
    if (type === 'annual') {
      setTags(prev => [...prev, 'hs-annual']);
    } else {
      setTags(prev => [...prev, 'hs-monthly']);
    }
    setCurrentScreen(SCREENS.BUYER_WELCOME);
  };

  const handleOfferDecline = () => {
    if (currentScreen === SCREENS.OFFER_ANNUAL) {
      // Show monthly downsell
      setCurrentScreen(SCREENS.OFFER_MONTHLY);
    } else {
      // Declined monthly too
      setTags(prev => [...prev, 'hs-declined']);
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

      case SCREENS.QUESTION:
        return (
          <QuestionScreen
            question={questions[currentQuestionIndex]}
            onAnswer={handleQuestionAnswer}
            autoAdvanceDelay={800}
          />
        );

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
            frequency={answers[8]}
            onJoin={handleOfferJoin}
            onDecline={handleOfferDecline}
          />
        );

      case SCREENS.OFFER_MONTHLY:
        return (
          <OfferScreen
            isAnnual={false}
            frequency={answers[8]}
            onJoin={handleOfferJoin}
            onDecline={handleOfferDecline}
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
          Screen: {currentScreen} | Q: {currentQuestionIndex + 1}/{questions.length} | Tags: {tags.length}
        </div>
      )}
    </div>
  );
}

export default App;
