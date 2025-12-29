// GoHighLevel API Integration
const API_BASE_URL = 'https://rest.gohighlevel.com/v1';
const API_KEY = import.meta.env.VITE_GHL_API_KEY;
const LOCATION_ID = import.meta.env.VITE_GHL_LOCATION_ID;

// Error handling class
class GHLApiError extends Error {
  constructor(message, status, code) {
    super(message);
    this.name = 'GHLApiError';
    this.status = status;
    this.code = code;
  }
}

// Handle API response
const handleApiResponse = async (response) => {
  if (!response.ok) {
    let errorMessage = `API request failed: ${response.status} ${response.statusText}`;
    let errorCode = `HTTP_${response.status}`;
    
    try {
      const errorData = await response.json();
      if (errorData.message) {
        errorMessage = errorData.message;
      }
      if (errorData.code) {
        errorCode = errorData.code;
      }
    } catch (parseError) {
      // Ignore JSON parse errors
    }
    
    throw new GHLApiError(errorMessage, response.status, errorCode);
  }
  
  return response.json();
};

// Get API headers
const getHeaders = () => ({
  'Authorization': `Bearer ${API_KEY}`,
  'Content-Type': 'application/json',
  'Version': '2021-07-28'
});

// Search for contact by email
export const searchContactByEmail = async (email) => {
  if (!API_KEY) {
    console.warn('GHL API key not configured');
    return null;
  }

  try {
    const url = `${API_BASE_URL}/contacts/?query=${encodeURIComponent(email)}`;
    
    const response = await fetch(url, {
      headers: getHeaders()
    });
    
    const data = await handleApiResponse(response);
    
    // Handle different response structures
    let contacts = [];
    if (data.contacts && Array.isArray(data.contacts)) {
      contacts = data.contacts;
    } else if (data.contact) {
      contacts = [data.contact];
    } else if (Array.isArray(data)) {
      contacts = data;
    }
    
    // Filter for exact email matches
    const exactMatches = contacts.filter(contact => 
      contact.email && contact.email.toLowerCase() === email.toLowerCase()
    );
    
    return exactMatches.length > 0 ? exactMatches[0] : null;
  } catch (error) {
    console.error('Error searching for contact:', error);
    return null;
  }
};

// Create a new contact
export const createContact = async (email) => {
  if (!API_KEY) {
    console.warn('GHL API key not configured');
    return null;
  }

  try {
    const url = `${API_BASE_URL}/contacts/`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({
        email: email,
        source: 'Daily Hug Interview'
      })
    });
    
    const data = await handleApiResponse(response);
    return data.contact || data;
  } catch (error) {
    console.error('Error creating contact:', error);
    return null;
  }
};

// Get or create contact
export const getOrCreateContact = async (email) => {
  if (!email) {
    console.warn('No email provided for GHL contact lookup');
    return null;
  }

  // First, try to find existing contact
  let contact = await searchContactByEmail(email);
  
  // If not found, create new contact
  if (!contact) {
    console.log(`Contact not found for ${email}, creating new contact...`);
    contact = await createContact(email);
  }
  
  return contact;
};

// Add tag to contact
export const addTagToContact = async (contactId, tagName) => {
  if (!API_KEY || !contactId) {
    console.warn('GHL API key or contact ID not available');
    return false;
  }

  try {
    // First, get the contact to see existing tags
    const url = `${API_BASE_URL}/contacts/${contactId}`;
    
    const response = await fetch(url, {
      headers: getHeaders()
    });
    
    const contact = await handleApiResponse(response);
    const currentContact = contact.contact || contact;
    
    // Get existing tags
    const existingTags = currentContact.tags || [];
    
    // Check if tag already exists
    if (existingTags.includes(tagName)) {
      console.log(`Tag "${tagName}" already exists on contact`);
      return true;
    }
    
    // Add new tag
    const updatedTags = [...existingTags, tagName];
    
    // Update contact with new tags
    const updateResponse = await fetch(url, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify({
        tags: updatedTags
      })
    });
    
    await handleApiResponse(updateResponse);
    console.log(`Tag "${tagName}" added to contact ${contactId}`);
    return true;
  } catch (error) {
    console.error('Error adding tag to contact:', error);
    return false;
  }
};

// Process question answer and tag contact
export const processQuestionAnswer = async (email, questionId, answerValue) => {
  if (!email) {
    console.warn('No email provided, skipping GHL integration');
    return;
  }

  try {
    // Get or create contact
    const contact = await getOrCreateContact(email);
    
    if (!contact || !contact.id) {
      console.error('Failed to get or create contact');
      return;
    }
    
    // Create tag name with prefix
    const tagName = `dh_checkin --> q${questionId}_${answerValue}`;
    
    // Add tag to contact
    await addTagToContact(contact.id, tagName);
    
    console.log(`✅ GHL: Tagged contact ${contact.id} with "${tagName}"`);
  } catch (error) {
    console.error('Error processing question answer in GHL:', error);
  }
};

