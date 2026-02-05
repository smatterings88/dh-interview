import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import IntroScreen from './components/v2/IntroScreen';
import V2EmailScreen from './components/v2/EmailScreen';
import V2QuestionScreen from './components/v2/QuestionScreen';
import MultiSelectScreen from './components/v2/MultiSelectScreen';
import AcknowledgmentScreen from './components/v2/AcknowledgmentScreen';
import TextInputScreen from './components/v2/TextInputScreen';
import ForkScreen from './components/v2/ForkScreen';
import GracefulExitScreen from './components/v2/GracefulExitScreen';
import MirrorScreen from './components/v2/MirrorScreen';
import {
  NormalizationScreen,
  ReframeScreen,
  BridgeScreen,
  IdentityBridgeScreen,
  VisualIdentityScreen,
  AlexRevealScreen,
  DeliverablesScreen,
  ValueAnchorScreen,
  PrimaryOfferScreen,
  DownsellScreen,
  ValidationScreen,
  ExitScreen
} from './components/v2/ClosingSequence';
import { initialUserData, getAcknowledgment, saveUserData, loadUserData, detectTimeZone } from './utils/v2Data';
import { tagV2Contact, tagV2ContactMultiple, tagV2ForkDecision, tagV2PlanSelection, updateV2ContactFirstName, ensureV2Contact } from './utils/v2GhlApi';
import './App.css';

// Screen definitions for Part 1 (Screens 1-13)
const SCREEN_2_OPTIONS = [
  { value: 'struggling', label: 'Struggling — honestly, it\'s been rough' },
  { value: 'managing', label: 'Managing — holding it together, barely' },
  { value: 'thriving', label: 'Thriving — actually doing pretty well' },
  { value: 'complicated', label: 'Complicated — depends on the day… or hour' }
];

const SCREEN_4_OPTIONS = [
  { value: 'loneliness', label: 'Loneliness (even when I\'m not alone)' },
  { value: 'anxiety', label: 'Anxiety that never fully goes away' },
  { value: 'grief', label: 'Grief or loss I\'m still processing' },
  { value: 'stuck', label: 'Feeling stuck or lost in life' },
  { value: 'burnout', label: 'Burnout from constantly being \'strong\'' },
  { value: 'relationship', label: 'Relationship struggles or heartbreak' },
  { value: 'pretending', label: 'The weight of pretending I\'m fine' },
  { value: 'other', label: 'Something else I can\'t quite name' }
];

const SCREEN_6_OPTIONS = [
  { value: 'cant_remember', label: 'Honestly? I can\'t remember' },
  { value: 'months', label: 'It\'s been months' },
  { value: 'years', label: 'It\'s been years' },
  { value: 'not_enough', label: 'I have people, but it still doesn\'t feel like enough' },
  { value: 'dont_let', label: 'I don\'t let people see me like that' }
];

const SCREEN_8_OPTIONS = [
  { value: 'many_times', label: 'Yes, more times than I want to admit' },
  { value: 'right_now', label: 'I\'m there right now' },
  { value: 'know_feeling', label: 'Not exactly 3am, but I know that feeling' },
  { value: 'avoid', label: 'I try not to think about it' }
];

const SCREEN_10_OPTIONS = [
  { value: 'waking_exhausted', label: 'Waking up already exhausted' },
  { value: 'bed_hollow', label: 'Going to bed feeling hollow' },
  { value: 'crowded_invisible', label: 'Sitting in a crowded room feeling invisible' },
  { value: 'reach_out', label: 'Wanting to reach out but not knowing who to text' },
  { value: 'burden', label: 'Feeling like a burden when you do reach out' },
  { value: 'scrolling', label: 'Scrolling through your phone with no one to call' },
  { value: 'crying_car', label: 'Crying in your car before going inside' },
  { value: 'fine_face', label: 'Putting on the \'I\'m fine\' face every single day' }
];

const SCREEN_11A_OPTIONS = [
  { value: 'yes', label: 'Yes. That\'s me.' },
  { value: 'some', label: 'Some of that is me.' },
  { value: 'no', label: 'Not really.' },
  { value: 'unsure', label: 'I\'m not sure, but I\'m still here.' }
];

const SCREEN_11A_TITLE = 'Before we personalize anything… one honest reflection.';
const SCREEN_11A_BODY =
  "Most people who find The Daily Hug aren’t in 'crisis.'\n" +
  "They’re just quietly carrying too much… for too long.\n\n" +
  'They function. They handle things. They show up.\n\n' +
  "But inside, there’s a part of them that feels unheld.";
const SCREEN_11A_QUESTION = 'Which one feels closest?';

const RESULTS_LABELS = {
  emotional_state: {
    struggling: 'Things have been rough lately',
    managing: "You're holding it together (barely)",
    thriving: "You're actually doing quite well",
    complicated: 'It depends — day to day'
  },
  primary_weight: {
    loneliness: 'The weight of loneliness',
    grief: 'The process of grief or loss',
    burnout: "Burnout from being the 'strong' one",
    pretending: "The burden of pretending you're fine"
  },
  hug_frequency: {
    once: 'A daily check-in',
    '2-3': 'Morning and evening support',
    many: 'Maximum available support'
  }
};

const SCREEN_12B_OPTIONS = [
  { value: '18-24', label: '18–24 (figuring it all out)' },
  { value: '25-34', label: '25–34 (building something)' },
  { value: '35-44', label: '35–44 (holding it together)' },
  { value: '45-54', label: '45–54 (navigating the shift)' },
  { value: '55-64', label: '55–64 (redefining what matters)' },
  { value: '65+', label: '65+ (earned wisdom, still learning)' },
  { value: 'prefer_not', label: 'Prefer not to say' }
];

const SCREEN_12C_OPTIONS = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'nonbinary', label: 'Non-binary' },
  { value: 'self_describe', label: 'Prefer to self-describe' },
  { value: 'prefer_not', label: 'Prefer not to say' }
];

const SCREEN_12D_OPTIONS = [
  { value: 'he_him', label: 'He / Him' },
  { value: 'she_her', label: 'She / Her' },
  { value: 'they_them', label: 'They / Them' },
  { value: 'other', label: 'Other' },
  { value: 'no_preference', label: 'No preference' }
];

// Part 2 Screen definitions
const SCREEN_15_OPTIONS = [
  { value: 'yes_change', label: 'Yes — that would change everything' },
  { value: 'think_so', label: 'I think so' },
  { value: 'listening', label: 'I\'m not sure, but I\'m listening' }
];

const SCREEN_17_OPTIONS = [
  { value: 'once', label: 'Once a day is enough' },
  { value: '2-3', label: '2–3 times (morning + evening)' },
  { value: '3-4', label: '3–4 times (I need more check-ins)' },
  { value: 'many', label: 'Several check-ins a day (I\'m going through it)' }
];

const SCREEN_19_OPTIONS = [
  { value: 'stories', label: 'Stories that make me feel less alone' },
  { value: 'practical', label: 'Practical wisdom I can actually use' },
  { value: 'permission', label: 'Permission to rest or let go' },
  { value: 'reminders', label: 'Gentle reminders that I matter' },
  { value: 'tough_love', label: 'Tough love when I need to hear it' },
  { value: 'poetic', label: 'Something poetic or reflective' },
  { value: 'surprise', label: 'Just surprise me' }
];

const SCREEN_21_OPTIONS = [
  { value: 'morning', label: 'Morning person (up with the sun)' },
  { value: 'night', label: 'Night owl (don\'t talk to me before 10am)' },
  { value: 'depends', label: 'Depends on the day' },
  { value: 'surviving', label: 'Neither — I\'m just surviving' }
];

function V2InterviewFlow() {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentScreen, setCurrentScreen] = useState(1);
  const [userData, setUserData] = useState(initialUserData);
  const [userEmail, setUserEmail] = useState('');
  const [closingFadeClass, setClosingFadeClass] = useState('');

  // Load email from query param or localStorage on mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const vipEmail = urlParams.get('vip');
    
    // Load saved user data
    const saved = loadUserData();
    if (saved) {
      setUserData(saved);
      if (saved.email) {
        setUserEmail(saved.email);
      }
    }
    
    // Check for email in query param
    if (vipEmail) {
      setUserEmail(vipEmail);
      const updated = { ...(saved || initialUserData), email: vipEmail };
      setUserData(updated);
      saveUserData(updated);
    } else if (saved?.email) {
      setUserEmail(saved.email);
    }
  }, []);

  // Save user data after each update
  useEffect(() => {
    saveUserData(userData);
  }, [userData]);

  const buildCheckoutUrl = (baseUrl) => {
    const email = userEmail || userData.email;
    if (!email) return baseUrl;
    try {
      const url = new URL(baseUrl);
      url.searchParams.set('email', email);
      return url.toString();
    } catch {
      return `${baseUrl}?email=${encodeURIComponent(email)}`;
    }
  };

  const getPortraitSrc = () => {
    if (userData.age_range === '65+') return '/portraits/portrait_elder.jpg';
    if (userData.gender === 'male') return '/portraits/portrait_m.jpg';
    if (userData.gender === 'female') return '/portraits/portrait_f.jpg';
    return '/portraits/portrait_neutral.jpg';
  };

  const handleAnswer = async (questionKey, value) => {
    const newData = { ...userData, [questionKey]: value };
    setUserData(newData);
    
    // Tag in GHL if email is available
    if (userEmail) {
      await tagV2Contact(userEmail, questionKey, value);
    }
    
    // Move to next screen
    setCurrentScreen(prev => prev + 1);
  };

  const handleScreen1Continue = () => {
    // Check if email exists (from state or userData), if not show email screen
    if (!userEmail && !userData.email) {
      setCurrentScreen(1.5); // Email collection screen
    } else {
      // Ensure userEmail is set if it's in userData
      if (!userEmail && userData.email) {
        setUserEmail(userData.email);
      }
      setCurrentScreen(2);
    }
  };

  const handleEmailSubmit = async (email) => {
    setUserEmail(email);
    const updated = { ...userData, email: email };
    setUserData(updated);
    saveUserData(updated);
    // Continue to screen 2 after email is collected
    await ensureV2Contact(email);
    setCurrentScreen(2);
  };

  const handleScreen2Answer = (value) => {
    handleAnswer('emotional_state', value);
  };

  const handleScreen3Continue = () => {
    setCurrentScreen(4);
  };

  const handleScreen4Answer = (value) => {
    handleAnswer('primary_weight', value);
  };

  const handleScreen5Continue = () => {
    setCurrentScreen(6);
  };

  const handleScreen6Answer = (value) => {
    handleAnswer('last_seen', value);
  };

  const handleScreen7Continue = () => {
    setCurrentScreen(8);
  };

  const handleScreen8Answer = (value) => {
    handleAnswer('three_am_moments', value);
  };

  const handleScreen9Continue = () => {
    setCurrentScreen(10);
  };

  const handleScreen10Answer = (values) => {
    const newData = { ...userData, relatable_moments: values };
    setUserData(newData);
    
    // Tag multiple values in GHL
    if (userEmail) {
      tagV2ContactMultiple(userEmail, 'relatable', values);
    }
    
    setCurrentScreen(11);
  };

  const handleScreen11Continue = () => {
    setCurrentScreen(11.25); // 11A - The Diagnosis
  };

  const handleScreen11AAnswer = async (value) => {
    const newData = { ...userData, identity_lock: value };
    setUserData(newData);
    
    if (userEmail) {
      await tagV2Contact(userEmail, 'identity_lock', value);
    }
    
    setCurrentScreen(11.5); // 11B - Personalization Bridge
  };

  const handleScreen11BContinue = () => {
    setCurrentScreen(12);
  };

  const handleScreen12Answer = async (firstName) => {
    const newData = { ...userData, first_name: firstName || 'friend' };
    setUserData(newData);
    
    // Update GHL contact firstName if email available
    if (userEmail && firstName) {
      await updateV2ContactFirstName(userEmail, firstName);
    }
    
    setCurrentScreen(12.5); // 12B - Age Range
  };

  const handleScreen12BAnswer = (value) => {
    const newData = { ...userData, age_range: value };
    setUserData(newData);
    
    // Tag in GHL
    if (userEmail) {
      tagV2Contact(userEmail, 'age', value);
    }
    
    setCurrentScreen(12.6); // 12C - Gender Identity
  };

  const handleScreen12CAnswer = (value) => {
    if (value === 'self_describe') {
      setCurrentScreen(12.25); // Custom gender input
    } else {
      const newData = { ...userData, gender: value };
      setUserData(newData);
      
      // Tag in GHL
      if (userEmail) {
        tagV2Contact(userEmail, 'gender', value);
      }
      
      setCurrentScreen(12.7); // 12D - Pronouns
    }
  };

  const handleScreen12C25Answer = (customGender) => {
    const newData = { ...userData, gender: 'self_describe', gender_custom: customGender };
    setUserData(newData);
    saveUserData(newData);
    
    // Tag in GHL
    if (userEmail) {
      tagV2Contact(userEmail, 'gender', 'self_describe');
    }
    
    setCurrentScreen(12.7); // 12D - Pronouns
  };

  const handleScreen12DAnswer = (value) => {
    if (value === 'other') {
      setCurrentScreen(12.75); // Custom pronouns input
    } else {
      const newData = { ...userData, pronouns: value };
      setUserData(newData);
      
      // Tag in GHL
      if (userEmail) {
        tagV2Contact(userEmail, 'pronouns', value);
      }
      
      // Check time zone
      const tz = detectTimeZone();
      if (tz) {
        const newDataWithTz = { ...newData, time_zone: tz };
        setUserData(newDataWithTz);
        saveUserData(newDataWithTz);
        setCurrentScreen(13); // Fork
      } else {
        setCurrentScreen(12.8); // Time zone input
      }
    }
  };

  const handleScreen12D75Answer = (customPronouns) => {
    const newData = { ...userData, pronouns: 'other', pronouns_custom: customPronouns };
    setUserData(newData);
    saveUserData(newData);
    
    // Tag in GHL
    if (userEmail) {
      tagV2Contact(userEmail, 'pronouns', 'other');
    }
    
    // Check time zone
    const tz = detectTimeZone();
    if (tz) {
      const newDataWithTz = { ...newData, time_zone: tz };
      setUserData(newDataWithTz);
      saveUserData(newDataWithTz);
      setCurrentScreen(13); // Fork
    } else {
      setCurrentScreen(12.8); // Time zone input
    }
  };


  const handleScreen12EAnswer = (timeZone) => {
    const newData = { ...userData, time_zone: timeZone || 'skip' };
    setUserData(newData);
    saveUserData(newData);
    setCurrentScreen(13); // Fork
  };

  const handleScreen13GoDeeper = async () => {
    const newData = { ...userData, part2_entered: true };
    setUserData(newData);
    saveUserData(newData);
    
    // Tag fork decision
    if (userEmail) {
      await tagV2ForkDecision(userEmail, 'deeper');
    }
    
    setCurrentScreen(14); // Part 2 - Transition
  };

  const handleScreen13GoodForNow = async () => {
    const newData = { ...userData, completed_at: new Date().toISOString() };
    setUserData(newData);
    saveUserData(newData);
    
    // Tag fork decision and off-ramp identity
    if (userEmail) {
      await tagV2ForkDecision(userEmail, 'good_for_now');
      await tagV2Contact(userEmail, 'daily_hug_subscriber', 'true');
      await tagV2Contact(userEmail, 'chose_depth', 'false');
    }
    
    setCurrentScreen(14.5); // 14B - Graceful Exit
  };

  // Part 2 Handlers
  const handleScreen14Continue = () => {
    setCurrentScreen(15);
  };

  const handleScreen15Answer = (value) => {
    handleAnswer('support_desire', value);
  };

  const handleScreen16Continue = () => {
    setCurrentScreen(17);
  };

  const handleScreen17Answer = (value) => {
    handleAnswer('hug_frequency', value);
  };

  const handleScreen18Continue = () => {
    setCurrentScreen(19);
  };

  const handleScreen19Answer = (values) => {
    const newData = { ...userData, hug_styles: values };
    setUserData(newData);
    
    // Tag multiple values in GHL
    if (userEmail) {
      tagV2ContactMultiple(userEmail, 'style', values);
    }
    
    setCurrentScreen(20);
  };

  const handleScreen20Continue = () => {
    setCurrentScreen(21);
  };

  const handleScreen21Answer = (value) => {
    handleAnswer('chronotype', value);
  };

  const handleScreen22Continue = () => {
    setCurrentScreen(23);
  };

  // C1-C13 Closing Sequence Handlers
  // 500ms fade “breathing room” from C1 -> C2
  const handleScreen23Continue = () => {
    setClosingFadeClass('fade-out');
    setTimeout(() => {
      setCurrentScreen(24); // C2
      // Keep opacity at 0 on mount, then fade in
      setClosingFadeClass('fade-out');
      requestAnimationFrame(() => {
        setClosingFadeClass('fade-in');
      });
      setTimeout(() => setClosingFadeClass(''), 500);
    }, 500);
  };

  const handleC2Continue = () => {
    setCurrentScreen(25); // C3
  };

  const handleC3Continue = () => {
    setCurrentScreen(26); // C4
  };

  const handleC4Continue = () => {
    setCurrentScreen(27); // C5
  };

  const handleC5Continue = () => {
    setCurrentScreen(28); // C6
  };

  const handleC6Continue = () => {
    setCurrentScreen(29); // C7
  };

  const handleC7Continue = () => {
    setCurrentScreen(30); // C8
  };

  const handleC8Continue = () => {
    setCurrentScreen(31); // C9
  };

  const handleC9Continue = () => {
    setCurrentScreen(32); // C10
  };

  const handleC10SelectAnnual = async () => {
    const newData = { 
      ...userData, 
      plan_selected: 'annual',
      completed_at: new Date().toISOString()
    };
    setUserData(newData);
    saveUserData(newData);
    
    // Tag annual plan selection in GHL
    if (userEmail) {
      await tagV2PlanSelection(userEmail, 'annual');
    }
    
    // Redirect to checkout (include email as a query param when available)
    window.location.href = buildCheckoutUrl('https://dailyhug.com/order');
  };

  const handleC11SelectMonthly = async () => {
    const newData = { 
      ...userData, 
      plan_selected: 'monthly',
      completed_at: new Date().toISOString()
    };
    setUserData(newData);
    saveUserData(newData);
    
    // Tag monthly plan selection in GHL
    if (userEmail) {
      await tagV2PlanSelection(userEmail, 'monthly');
    }
    
    // Redirect to checkout (include email as a query param when available)
    window.location.href = buildCheckoutUrl('https://dailyhug.com/order-monthly');
  };

  const handleC11SelectAnnual = async () => {
    const newData = { 
      ...userData, 
      plan_selected: 'annual',
      completed_at: new Date().toISOString()
    };
    setUserData(newData);
    saveUserData(newData);
    
    // Tag annual plan selection in GHL
    if (userEmail) {
      await tagV2PlanSelection(userEmail, 'annual');
    }
    
    // Redirect to checkout (include email as a query param when available)
    window.location.href = buildCheckoutUrl('https://dailyhug.com/order');
  };

  const handleC12Continue = () => {
    // 500ms fade “soft landing” into Exit Screen (C13)
    setClosingFadeClass('fade-out');
    setTimeout(() => {
      setCurrentScreen(35);
      setClosingFadeClass('fade-out');
      requestAnimationFrame(() => {
        setClosingFadeClass('fade-in');
      });
      setTimeout(() => setClosingFadeClass(''), 500);
    }, 500);
  };

  // Gift Exit: on exit intent during Part 2, route to Screen 14.5 (Graceful Exit)
  useEffect(() => {
    if (currentScreen >= 14 && currentScreen <= 35 && currentScreen !== 14.5) {
      const handleMouseLeave = (e) => {
        if (e.clientY <= 0) {
          setCurrentScreen(14.5);
        }
      };

      document.addEventListener('mouseleave', handleMouseLeave);
      return () => {
        document.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, [currentScreen]);

  const renderScreen = () => {
    switch (currentScreen) {
      case 1:
        return <IntroScreen onContinue={handleScreen1Continue} />;
      
      case 1.5:
        return <V2EmailScreen onEmailSubmit={handleEmailSubmit} />;
      
      case 2:
        return (
          <V2QuestionScreen
            prompt="Hi. Let's start somewhere honest. Where are you at right now?"
            options={SCREEN_2_OPTIONS}
            onAnswer={handleScreen2Answer}
          />
        );
      
      case 3:
        const ack3 = getAcknowledgment('emotional_state', userData.emotional_state);
        return (
          <AcknowledgmentScreen
            copy={ack3 || "Thanks for sharing."}
            onContinue={handleScreen3Continue}
          />
        );
      
      case 4:
        return (
          <V2QuestionScreen
            prompt="Here's what we really want to know: What's the heaviest thing you're carrying right now?"
            options={SCREEN_4_OPTIONS}
            onAnswer={handleScreen4Answer}
          />
        );
      
      case 5:
        const ack5 = getAcknowledgment('primary_weight', userData.primary_weight);
        return (
          <AcknowledgmentScreen
            copy={ack5 || "Thanks for sharing."}
            onContinue={handleScreen5Continue}
          />
        );
      
      case 6:
        return (
          <V2QuestionScreen
            prompt="Real talk: When's the last time you felt truly seen? Not 'checked on.' Not 'how are you'd' by someone who didn't really want to know. But actually seen. Heard. Held."
            options={SCREEN_6_OPTIONS}
            onAnswer={handleScreen6Answer}
          />
        );
      
      case 7:
        const ack7 = getAcknowledgment('last_seen', userData.last_seen);
        return (
          <AcknowledgmentScreen
            copy={ack7 || "Thanks for sharing."}
            onContinue={handleScreen7Continue}
          />
        );
      
      case 8:
        return (
          <V2QuestionScreen
            prompt="You know what no one talks about? The 3am moments. When everyone else is asleep. When you can't text anyone. When you're stuck in your own head with no one to pull you out. Have you been there?"
            options={SCREEN_8_OPTIONS}
            onAnswer={handleScreen8Answer}
          />
        );
      
      case 9:
        const ack9 = getAcknowledgment('three_am_moments', userData.three_am_moments);
        return (
          <AcknowledgmentScreen
            copy={ack9 || "Thanks for sharing."}
            onContinue={handleScreen9Continue}
          />
        );
      
      case 10:
        return (
          <MultiSelectScreen
            prompt="Some moments hit harder than others. Which of these land for you? (Pick any that apply.)"
            options={SCREEN_10_OPTIONS}
            onAnswer={handleScreen10Answer}
            selectedValues={userData.relatable_moments || []}
          />
        );
      
      case 11:
        return (
          <AcknowledgmentScreen
            copy="Yeah. Those moments are brutal. And the worst part? Most people have no idea you're even going through them. Because you've gotten really good at hiding it."
            onContinue={handleScreen11Continue}
          />
        );
      
      case 11.25:
        return (
          <V2QuestionScreen
            title={SCREEN_11A_TITLE}
            body={SCREEN_11A_BODY}
            question={SCREEN_11A_QUESTION}
            options={SCREEN_11A_OPTIONS}
            onAnswer={handleScreen11AAnswer}
          />
        );

      case 11.5:
        return (
          <AcknowledgmentScreen
            copy="Okay. You've shared a lot already. And we appreciate the trust. Just a few quick questions so we can personalize things properly. Nothing invasive. Just enough to make sure your Hugs actually land right."
            onContinue={handleScreen11BContinue}
          />
        );
      
      case 12:
        return (
          <TextInputScreen
            prompt="Before we go any further… What should we call you? (First name is perfect.)"
            placeholder="Your first name"
            onAnswer={handleScreen12Answer}
            required={false}
          />
        );
      
      case 12.5:
        const displayName = userData.first_name || 'friend';
        return (
          <V2QuestionScreen
            prompt={`Quick one, ${displayName}: We're not asking for your exact age. (We're not the DMV.) But knowing your general season of life helps us personalize your Hugs. Which range feels right?`}
            options={SCREEN_12B_OPTIONS}
            onAnswer={handleScreen12BAnswer}
          />
        );
      
      case 12.6:
        return (
          <V2QuestionScreen
            prompt="One more: How do you identify? We're asking so Alex can speak to you in a way that feels right — not to put you in a box."
            options={SCREEN_12C_OPTIONS}
            onAnswer={handleScreen12CAnswer}
          />
        );
      
      case 12.25:
        return (
          <TextInputScreen
            prompt="How would you like to describe yourself?"
            placeholder="Your identity"
            onAnswer={handleScreen12C25Answer}
            required={true}
          />
        );
      
      case 12.7:
        return (
          <V2QuestionScreen
            prompt="And just so Alex gets it right… What pronouns should we use? (Totally optional.)"
            options={SCREEN_12D_OPTIONS}
            onAnswer={handleScreen12DAnswer}
          />
        );
      
      case 12.75:
        return (
          <TextInputScreen
            prompt="What pronouns should we use?"
            placeholder="Your pronouns"
            onAnswer={handleScreen12D75Answer}
            required={true}
          />
        );
      
      case 12.8:
        return (
          <TextInputScreen
            prompt="Quick thing — we couldn't auto-detect your time zone. Where are you in the world? This helps us send your Hugs at the right time."
            placeholder="e.g., America/New_York or Skip"
            onAnswer={handleScreen12EAnswer}
            required={false}
            helperText="You can type 'Skip' if you prefer"
          />
        );
      
      case 13:
        return (
          <ForkScreen
            firstName={userData.first_name}
            onGoDeeper={handleScreen13GoDeeper}
            onGoodForNow={handleScreen13GoodForNow}
          />
        );
      
      case 14.5:
        return (
          <GracefulExitScreen
            firstName={userData.first_name}
          />
        );
      
      // Part 2 Screens
      case 14:
        return (
          <AcknowledgmentScreen
            copy={`Alright, ${userData.first_name || 'friend'}. Let's keep going.`}
            onContinue={handleScreen14Continue}
          />
        );
      
      case 15:
        return (
          <V2QuestionScreen
            prompt="Here's the thing about support: Most of us don't have enough of it. Or the support we do have shows up inconsistently. When they're available. Not when we need it. What if that changed? What if you had support that was: • Reliably there • Never too busy • Never judging you • Never making you feel like a burden. Would that matter to you?"
            options={SCREEN_15_OPTIONS}
            onAnswer={handleScreen15Answer}
          />
        );
      
      case 16:
        return (
          <AcknowledgmentScreen
            copy="Yeah. Most people don't realize how much steady support matters… Until they actually have it. It changes everything."
            onContinue={handleScreen16Continue}
          />
        );
      
      case 17:
        return (
          <V2QuestionScreen
            prompt="Alright — honest question: How often do you need a reminder that you're not alone, you matter, and someone sees you?"
            options={SCREEN_17_OPTIONS}
            onAnswer={handleScreen17Answer}
          />
        );
      
      case 18:
        const ack18 = getAcknowledgment('hug_frequency', userData.hug_frequency);
        return (
          <AcknowledgmentScreen
            copy={ack18 || "Thanks for sharing."}
            onContinue={handleScreen18Continue}
          />
        );
      
      case 19:
        return (
          <MultiSelectScreen
            prompt="Everyone receives support differently. What kinds of Hugs resonate most with you? (Pick any that apply.)"
            options={SCREEN_19_OPTIONS}
            onAnswer={handleScreen19Answer}
            selectedValues={userData.hug_styles || []}
          />
        );
      
      case 20:
        return (
          <AcknowledgmentScreen
            copy="Got it. We're building a picture of what you actually need — not what we think you need."
            onContinue={handleScreen20Continue}
          />
        );
      
      case 21:
        return (
          <V2QuestionScreen
            prompt="Quick one: Are you more of a morning person or a night owl?"
            options={SCREEN_21_OPTIONS}
            onAnswer={handleScreen21Answer}
          />
        );
      
      case 22:
        const ack22 = getAcknowledgment('chronotype', userData.chronotype);
        return (
          <AcknowledgmentScreen
            copy={ack22 || "Thanks for sharing."}
            onContinue={handleScreen22Continue}
          />
        );
      
      case 23:
        // C1: The Mirror Logic (Reflection Screen)
        const findOptionLabel = (options, value) =>
          options.find((opt) => opt.value === value)?.label || null;

        const emotionalStateLabel =
          RESULTS_LABELS.emotional_state[userData.emotional_state] ||
          findOptionLabel(SCREEN_2_OPTIONS, userData.emotional_state) ||
          '—';

        const primaryWeightLabel =
          RESULTS_LABELS.primary_weight[userData.primary_weight] ||
          findOptionLabel(SCREEN_4_OPTIONS, userData.primary_weight) ||
          '—';

        const frequencyLabel =
          RESULTS_LABELS.hug_frequency[userData.hug_frequency] ||
          findOptionLabel(SCREEN_17_OPTIONS, userData.hug_frequency) ||
          '—';

        const hugStylesLabels = (userData.hug_styles || [])
          .map((val) => findOptionLabel(SCREEN_19_OPTIONS, val))
          .filter(Boolean)
          .join(', ') || '—';

        const summary = (
          <ul className="feature-list" style={{ listStyle: 'none', padding: 0 }}>
            <li>Right now: {emotionalStateLabel}</li>
            <li>What weighs most: {primaryWeightLabel}</li>
            <li>What helps you most: {hugStylesLabels}</li>
            <li>How often support feels right: {frequencyLabel}</li>
          </ul>
        );
        
        return (
          <MirrorScreen
            firstName={userData.first_name}
            summary={summary}
            onContinue={handleScreen23Continue}
          />
        );
      
      case 24:
        // C2: Gentle Normalization
        return <NormalizationScreen onContinue={handleC2Continue} />;
      
      case 25:
        // C3: The Reframe
        return <ReframeScreen onContinue={handleC3Continue} />;
      
      case 26:
        // C4: The Bridge
        return <BridgeScreen firstName={userData.first_name} onContinue={handleC4Continue} />;
      
      case 27:
        // C5: Identity Bridge
        return <IdentityBridgeScreen onContinue={handleC5Continue} />;
      
      case 28:
        // C6: Visual Identity
        return <VisualIdentityScreen portraitSrc={getPortraitSrc()} onContinue={handleC6Continue} />;
      
      case 29:
        // C7: Alex Reveal
        return <AlexRevealScreen onContinue={handleC7Continue} />;
      
      case 30:
        // C8: Concrete Deliverables
        return <DeliverablesScreen onContinue={handleC8Continue} />;
      
      case 31:
        // C9: Value Anchor
        return <ValueAnchorScreen onContinue={handleC9Continue} />;
      
      case 32:
        // C10: Primary Offer (Annual)
        return <PrimaryOfferScreen onSelectAnnual={handleC10SelectAnnual} />;
      
      case 33:
        // C11: Downsell (Monthly)
        return (
          <DownsellScreen
            onSelectMonthly={handleC11SelectMonthly}
            onSelectAnnual={handleC11SelectAnnual}
          />
        );
      
      case 34:
        // C12: Validation
        return <ValidationScreen onContinue={handleC12Continue} />;
      
      case 35:
        // C13: Exit
        return <ExitScreen />;
      
      default:
        return <IntroScreen onContinue={handleScreen1Continue} />;
    }
  };

  return (
    <div
      className={`App ${closingFadeClass ? `fade-container ${closingFadeClass}` : ''}`}
    >
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
          V2 Screen: {currentScreen} | Email: {userEmail || 'none'}
        </div>
      )}
    </div>
  );
}

export default V2InterviewFlow;

