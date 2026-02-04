// V2 Interview Data Structure and Utilities

export const initialUserData = {
  // Part 1
  emotional_state: '',
  primary_weight: '',
  last_seen: '',
  three_am_moments: '',
  relatable_moments: [],
  identity_lock: '',
  first_name: '',
  age_range: '',
  gender: '',
  gender_custom: '',
  pronouns: '',
  pronouns_custom: '',
  time_zone: '',
  part2_entered: false,
  
  // Part 2
  support_desire: '',
  hug_frequency: '',
  hug_styles: [],
  chronotype: '',
  email: '',
  plan_selected: '',
  
  // Meta
  interview_version: 'v2',
  started_at: new Date().toISOString(),
  completed_at: null
};

// Dynamic acknowledgments map
export const acknowledgments = {
  emotional_state: {
    struggling: "We see you. And we're glad you're here.",
    managing: "Yeah. 'Fine' is exhausting, isn't it?",
    thriving: "Love that for you. (And we can still make good days even better.)",
    complicated: "Aren't we all. Some days up. Some days way down. We get it."
  },
  primary_weight: {
    loneliness: "That's one of the hardest ones. Because you can be surrounded by people… and still feel completely invisible.",
    anxiety: "The thing about anxiety is it never fully leaves. It just… hovers. Waiting for 3am to remind you it's still there.",
    grief: "Grief doesn't have a timeline. No matter what people tell you. It moves at its own pace.",
    stuck: "It's like being frozen mid-step. Knowing you need to move… but having no idea which direction to go.",
    burnout: "You've been strong for so long… that you forgot what it feels like to not carry everything.",
    relationship: "Few things hurt more than feeling alone… in something that's supposed to make you feel less alone.",
    pretending: "The mask gets heavy, doesn't it?",
    other: "Sometimes the hardest stuff to carry… is the stuff we can't even name."
  },
  last_seen: {
    cant_remember: "Yeah. That tracks.",
    months: "That's a long time to go without being truly held.",
    years: "That's a long time to go without being truly held.",
    not_enough: "Having people around… and feeling seen… are two very different things.",
    dont_let: "It's safer that way, right? (Until it's not.)"
  },
  three_am_moments: {
    many_times: "The worst part is how long those hours feel. How loud your own thoughts get.",
    right_now: "We're here with you. Right now.",
    know_feeling: "It doesn't have to be 3am to feel that alone.",
    avoid: "Avoiding it doesn't make it go away. It just shows up uninvited."
  },
  hug_frequency: {
    once: "Clean and grounding. One solid reminder can go a long way.",
    '2-3': "Morning to set the tone. Evening to help you land. That makes sense.",
    '3-4': "Yeah. Sometimes once isn't enough. You need touchpoints throughout the day.",
    many: "We hear you. And we've got you."
  },
  chronotype: {
    morning: "Respect. We'll make sure your mornings start right.",
    night: "We see you, night creature.",
    depends: "Fair. Life doesn't run on a schedule.",
    surviving: "Yeah. We feel that."
  }
};

// Get acknowledgment text for a given question and answer
export const getAcknowledgment = (questionKey, answerValue) => {
  const questionAcks = acknowledgments[questionKey];
  if (!questionAcks) return null;
  return questionAcks[answerValue] || null;
};

// Time zone detection
export const detectTimeZone = () => {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch (e) {
    return null;
  }
};

// Save user data to localStorage
export const saveUserData = (userData) => {
  try {
    localStorage.setItem('dh_v2_userData', JSON.stringify(userData));
  } catch (error) {
    console.error('Error saving user data:', error);
  }
};

// Load user data from localStorage
export const loadUserData = () => {
  try {
    const saved = localStorage.getItem('dh_v2_userData');
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (error) {
    console.error('Error loading user data:', error);
  }
  return null;
};

