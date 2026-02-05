// V2-specific GHL API functions with dh_v2_* tag prefix

import { getOrCreateContact, addTagToContact, updateContactField } from './ghlApi';

// Ensure a V2 contact exists for a given email (lead capture)
export const ensureV2Contact = async (email) => {
  if (!email) return null;
  try {
    const contact = await getOrCreateContact(email);
    return contact || null;
  } catch (error) {
    console.error('Error ensuring V2 contact:', error);
    return null;
  }
};

// Tag a contact with V2 tag format
export const tagV2Contact = async (email, tagKey, value) => {
  if (!email) {
    console.warn('No email provided for V2 GHL tagging');
    return false;
  }

  try {
    const contact = await getOrCreateContact(email);
    if (!contact || !contact.id) {
      console.error('Failed to get or create contact for V2 tagging');
      return false;
    }

    // Create tag name with V2 prefix
    const tagName = `dh_v2_${tagKey}_${value}`;
    await addTagToContact(contact.id, tagName);
    console.log(`✅ GHL V2: Tagged contact ${contact.id} with "${tagName}"`);
    return true;
  } catch (error) {
    console.error('Error tagging V2 contact:', error);
    return false;
  }
};

// Tag multiple values (for multi-select questions)
export const tagV2ContactMultiple = async (email, tagKey, values) => {
  if (!email || !Array.isArray(values) || values.length === 0) {
    return false;
  }

  try {
    const contact = await getOrCreateContact(email);
    if (!contact || !contact.id) {
      return false;
    }

    // Tag each selected value
    for (const value of values) {
      const tagName = `dh_v2_${tagKey}_${value}`;
      await addTagToContact(contact.id, tagName);
    }
    console.log(`✅ GHL V2: Tagged contact ${contact.id} with ${values.length} tags for ${tagKey}`);
    return true;
  } catch (error) {
    console.error('Error tagging V2 contact multiple:', error);
    return false;
  }
};

// Update contact first name (only if not already set)
export const updateV2ContactFirstName = async (email, firstName) => {
  if (!email || !firstName) {
    return false;
  }

  try {
    const contact = await getOrCreateContact(email);
    if (!contact || !contact.id) {
      return false;
    }

    await updateContactField(contact.id, 'firstName', firstName.trim());
    return true;
  } catch (error) {
    console.error('Error updating V2 contact firstName:', error);
    return false;
  }
};

// Tag fork decision
export const tagV2ForkDecision = async (email, decision) => {
  if (!email) return false;

  const tagName = decision === 'deeper' 
    ? 'dh_v2_part2_entered'
    : 'dh_v2_part1_complete_only';

  try {
    const contact = await getOrCreateContact(email);
    if (!contact || !contact.id) {
      return false;
    }

    await addTagToContact(contact.id, tagName);
    console.log(`✅ GHL V2: Tagged fork decision "${tagName}"`);
    return true;
  } catch (error) {
    console.error('Error tagging V2 fork decision:', error);
    return false;
  }
};

// Tag plan selection
export const tagV2PlanSelection = async (email, plan) => {
  if (!email || !plan) return false;

  const tagName = plan === 'annual' 
    ? 'dh_v2_hs_annual'
    : 'dh_v2_hs_monthly';

  try {
    const contact = await getOrCreateContact(email);
    if (!contact || !contact.id) {
      return false;
    }

    await addTagToContact(contact.id, tagName);
    console.log(`✅ GHL V2: Tagged plan selection "${tagName}"`);
    return true;
  } catch (error) {
    console.error('Error tagging V2 plan selection:', error);
    return false;
  }
};

// Tag soft off-ramp decision (chose not to join after pricing)
export const tagV2Part2Declined = async (email) => {
  if (!email) return false;

  const tagName = 'dh_v2_part2_declined';

  try {
    const contact = await getOrCreateContact(email);
    if (!contact || !contact.id) {
      return false;
    }

    await addTagToContact(contact.id, tagName);
    console.log(`✅ GHL V2: Tagged soft off-ramp "${tagName}"`);
    return true;
  } catch (error) {
    console.error('Error tagging V2 part2_declined:', error);
    return false;
  }
};


