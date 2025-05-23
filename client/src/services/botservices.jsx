// botservices.jsx
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'; // Define your API base URL

export const getBotResponse = async (message, mode, sessionId, availableProducts) => {
  try {
    // Ensure mode is valid
    const validMode = ['formal', 'sassy'].includes(mode) ? mode : 'formal';

    // Call the correct endpoint with proper parameters
    const response = await axios.post(`${API_BASE_URL}/bot/ask`, {
      message,
      personality: validMode,
      sessionId: sessionId,
      availableProducts
    });

    // Return the message from the API (not reply)
    return response.data.reply;
  } catch (error) {
    console.error('Error fetching bot response:', error);

    // Return appropriate error message based on mode
    return "I apologize, but I encountered an error processing your request. Please try again later."
  }
};