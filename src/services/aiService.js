import axios from 'axios';

const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';
const OPENAI_MODEL = 'gpt-3.5-turbo';

// Get API key from environment variables or localStorage
const getApiKey = () => {
  return process.env.REACT_APP_OPENAI_API_KEY || localStorage.getItem('openai_api_key');
};

// Set API key in localStorage
export const setApiKey = (apiKey) => {
  localStorage.setItem('openai_api_key', apiKey);
  return true;
};

// Remove API key from localStorage
export const removeApiKey = () => {
  localStorage.removeItem('openai_api_key');
  return true;
};

// Check if API key is configured
export const hasApiKey = () => {
  return !!getApiKey();
};

// Generate AI text using OpenAI GPT API
export const generateAIText = async (prompt) => {
  const apiKey = getApiKey();
  
  if (!apiKey) {
    throw new Error('OpenAI API key not configured. Please set your API key in the environment variables or through the application settings.');
  }

  try {
    const response = await axios.post(
      OPENAI_API_URL,
      {
        model: OPENAI_MODEL,
        messages: [
          {
            role: 'system',
            content: 'You are a helpful assistant that helps people write clear, concise, and professional descriptions for government assistance applications. Keep responses factual, respectful, and appropriate for official documentation.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 300,
        temperature: 0.7,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        timeout: 30000, // 30 second timeout
      }
    );

    if (response.data && response.data.choices && response.data.choices.length > 0) {
      return response.data.choices[0].message.content.trim();
    } else {
      throw new Error('Invalid response from OpenAI API');
    }
  } catch (error) {
    console.error('OpenAI API Error:', error);
    
    if (error.code === 'ECONNABORTED') {
      throw new Error('Request timed out. Please try again.');
    }
    
    if (error.response) {
      const status = error.response.status;
      const data = error.response.data;
      
      switch (status) {
        case 401:
          throw new Error('Invalid API key. Please check your OpenAI API key.');
        case 429:
          throw new Error('Rate limit exceeded. Please try again later.');
        case 500:
          throw new Error('OpenAI server error. Please try again later.');
        default:
          throw new Error(data?.error?.message || `API error (${status}). Please try again.`);
      }
    }
    
    if (error.request) {
      throw new Error('Network error. Please check your internet connection and try again.');
    }
    
    throw new Error('An unexpected error occurred. Please try again.');
  }
};

// Test API key validity
export const testApiKey = async (apiKey) => {
  try {
    const response = await axios.post(
      OPENAI_API_URL,
      {
        model: OPENAI_MODEL,
        messages: [
          {
            role: 'user',
            content: 'Hello'
          }
        ],
        max_tokens: 10,
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        timeout: 10000,
      }
    );

    return response.status === 200;
  } catch (error) {
    return false;
  }
};

const aiService = {
  generateAIText,
  setApiKey,
  removeApiKey,
  hasApiKey,
  testApiKey,
};

export default aiService;
