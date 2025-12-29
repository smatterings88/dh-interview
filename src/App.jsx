import { useState } from 'react';
import EntryScreen from './components/EntryScreen';
import QuestionScreen from './components/QuestionScreen';
import TransitionScreen from './components/TransitionScreen';
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
  TRANSITION_TO_EMOTIONAL: 'transition_to_emotional',
  TRANSITION: 'transition',
  MIRROR: 'mirror',
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
  };

  const handleQuestionAnswer = (value) => {
    const questionId = questions[currentQuestionIndex].id;
    const newAnswers = { ...answers, [questionId]: value };
    setAnswers(newAnswers);

    // Add tag for frequency question (used later for offer logic)
    if (questionId === 10) {
      setTags(prev => [...prev, value]);
    }

    // After gender question (index 1), show transition to emotional questions
    if (currentQuestionIndex === 1) {
      setTimeout(() => {
        setCurrentScreen(SCREENS.TRANSITION_TO_EMOTIONAL);
      }, 600);
    } else if (currentQuestionIndex < questions.length - 1) {
      // Move to next question
      setTimeout(() => {
        setCurrentQuestionIndex(prev => prev + 1);
      }, 300);
    } else {
      // All questions answered, go to transition
      setTimeout(() => {
        setCurrentScreen(SCREENS.TRANSITION);
        setTags(prev => [...prev, 'interview-complete']);
      }, 300);
    }
  };

  const handleTransitionToEmotionalComplete = () => {
    setCurrentScreen(SCREENS.QUESTION);
    setCurrentQuestionIndex(2); // Start with first emotional question (index 2)
  };

  const handleTransitionComplete = () => {
    setCurrentScreen(SCREENS.MIRROR);
  };

  const handleMirrorContinue = () => {
    setCurrentScreen(SCREENS.ALEX);
  };

  const handleAlexInterested = () => {
    setAlexResponse('interested');
    setTags(prev => [...prev, 'alex-interested']);
    // Determine which offer to show
    const frequency = answers[10];
    if (frequency === 'freq_twice' || frequency === 'freq_multi') {
      setCurrentScreen(SCREENS.OFFER_ANNUAL);
    } else {
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
            autoAdvanceDelay={currentQuestionIndex < 3 ? 600 : 800}
          />
        );

      case SCREENS.TRANSITION_TO_EMOTIONAL:
        return <TransitionScreen onComplete={handleTransitionToEmotionalComplete} copy="Thanks. Let's check in." />;

      case SCREENS.TRANSITION:
        return <TransitionScreen onComplete={handleTransitionComplete} />;

      case SCREENS.MIRROR:
        return <MirrorScreen answers={answers} onContinue={handleMirrorContinue} />;

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
          />
        );

      case SCREENS.OFFER_MONTHLY:
        return (
          <OfferScreen
            isAnnual={false}
            frequency={answers[10]}
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
