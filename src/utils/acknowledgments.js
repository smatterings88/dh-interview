// Acknowledgment mapping for each answer
export const acknowledgments = {
  // Screen 1 - Current State
  'stretched': 'ack_stretched',
  'tired': 'ack_tired',
  'off': 'ack_off',
  'overwhelmed': 'ack_overwhelmed',
  'masking': 'ack_masking',
  
  // Screen 2 - Mental Load
  'calm_surface': 'ack_calm_surface',
  'busy': 'ack_busy',
  'racing': 'ack_racing',
  'replaying': 'ack_replaying',
  'scattered': 'ack_scattered',
  
  // Screen 3 - Social Energy
  'social_ok': 'ack_social_ok',
  'drained': 'ack_drained',
  'withdraw': 'ack_withdraw',
  'anxious': 'ack_anxious',
  'selective': 'ack_selective',
  
  // Screen 4 - Emotional Aftereffect
  'resilient': 'ack_resilient',
  'reflective': 'ack_reflective',
  'looping': 'ack_looping',
  'self_blame': 'ack_self_blame',
  'avoidant': 'ack_avoidant',
  
  // Screen 5 - Self-Relationship
  'receiving': 'ack_receiving',
  'deflect': 'ack_deflect',
  'awkward': 'ack_awkward',
  'unworthy': 'ack_unworthy',
  'contextual': 'ack_contextual',
  
  // Screen 6 - Energy & Rest
  'rest_ok': 'ack_rest_ok',
  'restless': 'ack_restless',
  'guilt_rest': 'ack_guilt_rest',
  'numb': 'ack_numb',
  'avoid_thoughts': 'ack_avoid_thoughts',
  
  // Screen 7 - Support Style
  'reassurance': 'ack_reassurance',
  'encouragement': 'ack_encouragement',
  'understood': 'ack_understood',
  'not_alone': 'ack_not_alone',
  'unsure': 'ack_unsure',
};

// Mirror result lines based on acknowledgments
export const getMirrorLines = (answers) => {
  const lines = [];
  const tags = new Set();
  
  // Collect all acknowledgment tags from answers
  Object.values(answers).forEach(answer => {
    if (answer && acknowledgments[answer]) {
      tags.add(acknowledgments[answer]);
    }
  });
  
  // Generate mirror lines based on strongest tags
  if (tags.has('ack_masking')) {
    lines.push("You've gotten really good at looking fine.");
    lines.push("Most people have no idea how much you're actually carrying.");
  }
  
  if (tags.has('ack_looping') || tags.has('ack_replaying')) {
    lines.push("Your mind doesn't just process things.");
    lines.push("It replays them. Over and over.");
  }
  
  if (tags.has('ack_unworthy')) {
    lines.push("You have a hard time believing kind things about yourself.");
    lines.push("Not because they aren't true — but because you don't trust them yet.");
  }
  
  if (tags.has('ack_guilt_rest')) {
    lines.push("Rest doesn't really feel like rest for you.");
    lines.push("It feels like something you have to justify.");
  }
  
  if (tags.has('ack_numb') || tags.has('ack_avoid_thoughts')) {
    lines.push("Quiet moments can feel harder than staying busy.");
    lines.push("So you fill them.");
  }
  
  // If no specific lines matched, use generic ones
  if (lines.length === 0) {
    if (tags.has('ack_overwhelmed')) {
      lines.push("It feels like too much is hitting at once.");
    } else if (tags.has('ack_tired')) {
      lines.push("You're running on willpower more than energy.");
    } else if (tags.has('ack_stretched')) {
      lines.push("You're holding things together, but it's taking effort.");
    } else {
      lines.push("You're doing better than you think.");
    }
  }
  
  // Return 2-3 lines max
  return lines.slice(0, 3);
};

// Final mirror result lines (choose 2-3 max based on answers)
// Question IDs: 1=Current State, 2=Mental Load, 4=Emotional Aftereffect, 5=Self-Relationship, 6=Energy & Rest
export const getFinalMirrorLines = (answers) => {
  const lines = [];
  
  // Check for masking (Question 1, id: 1)
  if (answers[1] === 'masking') {
    lines.push("You've gotten really good at looking fine.");
    lines.push("Most people don't see how much you're carrying.");
  }
  
  // Check for looping/replaying (Question 4, id: 4 OR Question 2, id: 2)
  if (answers[4] === 'looping' || answers[2] === 'replaying') {
    lines.push("Your mind doesn't just process things.");
    lines.push("It replays them.");
  }
  
  // Check for rest issues (Question 6, id: 6)
  if (answers[6] === 'guilt_rest' || answers[6] === 'numb' || answers[6] === 'avoid_thoughts') {
    lines.push("Rest doesn't always feel like rest.");
    lines.push("It feels like something you have to justify.");
  }
  
  // Check for unworthy (Question 5, id: 5)
  if (answers[5] === 'unworthy' || answers[5] === 'deflect') {
    lines.push("You have a hard time believing kind things about yourself.");
    lines.push("Not because they aren't true — but because you don't trust them yet.");
  }
  
  // Return 2-3 pairs max (4-6 lines of text)
  return lines.slice(0, 6);
};


