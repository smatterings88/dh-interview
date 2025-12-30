import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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

function InterviewFlow() {
  const navigate = useNavigate();
  const [currentScreen, setCurrentScreen] = useState(SCREENS.ENTRY);
  const [answers, setAnswers] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [tags, setTags] = useState([]);
  const [alexResponse, setAlexResponse] = useState(null);
  const [userEmail, setUserEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [gender, setGender] = useState('');

  // Read "vip" query parameter and check for firstName/gender on mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const vipEmail = urlParams.get('vip');
    
    // Load user data from localStorage
    let storedData = {};
    try {
      storedData = JSON.parse(localStorage.getItem('dh_userData') || '{}');
    } catch (error) {
      console.error('Error loading user data:', error);
    }
    
    // If email from query param, save it to localStorage and state
    if (vipEmail) {
      setUserEmail(vipEmail);
      console.log('Email from query string (vip parameter):', vipEmail);
      // Save email to localStorage if not already there
      if (!storedData.userEmail) {
        storedData.userEmail = vipEmail;
        localStorage.setItem('dh_userData', JSON.stringify(storedData));
      }
    }
    
    // Check for firstName/gender
    if (storedData.firstName && storedData.gender) {
      setFirstName(storedData.firstName);
      setGender(storedData.gender);
      // Also load email if present
      if (storedData.userEmail) {
        setUserEmail(storedData.userEmail);
      }
    } else {
      // Redirect to name collection if firstName/gender not found
      // Only redirect if we're not already on the name-collection route
      if (window.location.pathname !== '/name-collection') {
        navigate('/name-collection', { replace: true });
      }
      return;
    }
  }, [navigate]);

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
    
    // Save email to localStorage
    try {
      const existingData = JSON.parse(localStorage.getItem('dh_userData') || '{}');
      existingData.userEmail = email;
      localStorage.setItem('dh_userData', JSON.stringify(existingData));
    } catch (error) {
      console.error('Error saving email to localStorage:', error);
    }
    
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
        const newTags = [...tags, 'interview-complete'];
        setTags(newTags);
        
        // Save user data to localStorage with updated answers
        const finalAnswers = { ...answers, [questionId]: value };
        const userData = {
          answers: finalAnswers,
          tags: newTags,
          userEmail,
          frequency: value,
          firstName: firstName,
          gender: gender
        };
        localStorage.setItem('dh_userData', JSON.stringify(userData));
        setAnswers(finalAnswers);
        
        setCurrentScreen(SCREENS.MICRO_PAUSE);
        
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

  const handleAlexInterested = async () => {
    setAlexResponse('interested');
    const newTags = [...tags, 'alex-interested'];
    setTags(newTags);
    
    // Tag in GHL
    if (userEmail) {
      const { getOrCreateContact, addTagToContact } = await import('./utils/ghlApi');
      const contact = await getOrCreateContact(userEmail);
      if (contact?.id) {
        await addTagToContact(contact.id, 'dh_checkin --> alex-interested');
      }
    }
    
    // Check if user should see offer page (freq_twice, freq_multi, or alex-interested)
    const frequency = answers[10];
    const shouldShowOffer = frequency === 'freq_twice' || frequency === 'freq_multi' || true; // Always show offer if alex-interested
    
    if (shouldShowOffer) {
      // Save user data and navigate to bridge screen (which then goes to offer)
      const userData = {
        answers,
        tags: newTags,
        userEmail,
        frequency: frequency,
        firstName: firstName,
        gender: gender
      };
      localStorage.setItem('dh_userData', JSON.stringify(userData));
      navigate('/bridge', { state: userData });
    } else {
      // Fallback - shouldn't happen
      setCurrentScreen(SCREENS.DAILY_HUG_CONFIRM);
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

      // Offer screens are now handled by routing - these cases shouldn't be reached
      case SCREENS.OFFER_ANNUAL:
      case SCREENS.OFFER_MONTHLY:
        // Fallback - shouldn't happen with routing
        return null;

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
          fontSize: '12px',
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

export default InterviewFlow;
