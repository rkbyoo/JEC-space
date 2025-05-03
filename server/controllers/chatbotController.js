require('dotenv').config();

let conversationHistory = [];  // Global or session-based (for demo)

function formatProduct(product, index) {
  return `
Product ${index + 1}:
- Name: ${product.name}
- Description: ${product.description}
- Price: ₹${product.price}
- Category: ${product.category}
- Age: ${product.age} months
- Bill Available: ${product.billAvailable ? 'Yes' : 'No'}
- Accessories Available: ${product.accessoriesAvailable ? 'Yes' : 'No'}
- Warranty Available: ${product.warrantyAvailable ? 'Yes' : 'No'}
- Box Available: ${product.boxAvailable ? 'Yes' : 'No'}
- Offers Shown: ${product.showOffersOnProduct ? 'Yes' : 'No'}
- Images: ${product.images.length ? product.images.join(', ') : 'No images provided'}
- Seller Name: ${product.seller.name}
- Seller Email: ${product.seller.email}
- Product Status: ${product.status}
- Created At: ${product.createdAt}
- Updated At: ${product.updatedAt}
`.trim();
}

const chatWithBot = async (req, res) => {
  const userQuestion = req.body.message;
  const availableProducts = req.body.availableProducts || [];

  const output = availableProducts.map(formatProduct).join('\n\n');
  console.log("User asked:", userQuestion);

  if (!process.env.OPENROUTER_API_KEY) {
    return res.status(500).json({ 
      reply: "System error: Missing API key",
      error: "OPENROUTER_API_KEY not found" 
    });
  }

  try {
    const axios = (await import('axios')).default;

    // Append new user message to the conversation
    conversationHistory.push({ role: "user", content: userQuestion });

    // Add context if this is the first message
    if (conversationHistory.length === 1 && availableProducts.length > 0) {
      conversationHistory.unshift({
        role: "system",
        content: `You are a helpful assistant for campus market Place website.Politely deny answers to irrelevant questions. Use the following product list as context:\n\n${output}`
      });
    }

    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: "openai/gpt-3.5-turbo",
        messages: conversationHistory
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const answer = response.data.choices[0].message.content;
    conversationHistory.push({ role: "assistant", content: answer });

    res.json({ reply: answer });

  } catch (error) {
    console.error('API Error:', {
      status: error.response?.status,
      error: error.message,
      data: error.response?.data
    });

    const errorMessage = error.response?.status === 503
      ? "The model is loading. Please try again shortly."
      : "Technical difficulties. Please try again later.";

    res.status(error.response?.status || 500).json({ 
      reply: errorMessage,
      technicalError: error.response?.data?.error || error.message 
    });
  }
};

module.exports = { chatWithBot };
