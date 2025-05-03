import React, { useState, useEffect, useRef } from 'react';
import { getBotResponse } from '../services/botservices';
import "../styles/ChatBot.css"
import DOMPurify from 'dompurify';
import { GetProducts } from '../apicalls/products';

const ChatBot = () => {
  const [input, setInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [mode, setMode] = useState('formal');
  const [sessionId, setSessionId] = useState(null);
  const chatEndRef = useRef(null);

  // Generate session ID only once
  const generateSessionId = () => (
    Math.random().toString(36).substring(2) + Date.now().toString(36)
  );

  // On mount: Load history, mode, and session ID
  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem('smartchat_history')) || [];
    const savedMode = localStorage.getItem('smartchat_mode') || 'formal';
    const savedSessionId = localStorage.getItem('smartchat_session');

    setChatHistory(savedHistory.length > 0 ? savedHistory : [{
      sender: 'bot',
      text: 'Welcome to SmartChat! How can I assist you today?'
    }]);

    setMode(savedMode);
    setSessionId(savedSessionId || generateSessionId());
  }, []);

  // Sync chatHistory to localStorage
  useEffect(() => {
    localStorage.setItem('smartchat_history', JSON.stringify(chatHistory));
    scrollToBottom();
  }, [chatHistory]);

  // Sync mode to localStorage
  useEffect(() => {
    localStorage.setItem('smartchat_mode', mode);
  }, [mode]);

  // Sync sessionId to localStorage
  useEffect(() => {
    if (sessionId) {
      localStorage.setItem('smartchat_session', sessionId);
    }
  }, [sessionId]);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleMode = () => {
    const newMode = mode === 'formal' ? 'sassy' : 'formal';
    setMode(newMode);

    setChatHistory(prev => [
      ...prev,
      {
        sender: 'system',
        text: newMode === 'formal'
          ? "Switched to Formal Mode."
          : 'Switched to Sassy Mode.'
      }
    ]);
  };
  

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = { sender: 'user', text: input };
    setChatHistory(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    const lowerInput = input.toLowerCase().trim();
    let botReply = '';

        try {
          const response = await GetProducts({status:"approved"});  
          botReply = await getBotResponse(input, mode, sessionId, response.data);
        } catch (error) {
          console.error('Error fetching bot response:', error);
          botReply = 'I apologize, but I encountered an error processing your request. Please try again.';
        }
      
    

    // Simulate typing delay
    const typingDelay = 700 + Math.random() * 800;
    setTimeout(() => {
      setIsTyping(false);
      setChatHistory(prev => [...prev, { sender: 'bot', text: botReply }]);
    }, typingDelay);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  const clearChat = () => {
    setChatHistory([
      {
        sender: 'system',
        text: 'Chat history cleared.'
      }
    ]);
  };

  const getModeEmoji = () => (mode === 'formal' ? '😇' : '😈');
  const getModeLabel = () => (mode === 'formal' ? 'Formal' : 'Sassy');

  return (
    <div className={`chatbot-container ${mode}`}>
      <div className="chat-header d-flex justify-content-between align-items-center px-3">
        <span className="chat-title">
          SmartChat 💬
          {mode === 'sassy' && <small className="sass-tag ms-2">🔥 Spicy Mode</small>}
        </span>
        <div className="d-flex align-items-center">
          <button
            className="clear-btn me-2"
            onClick={clearChat}
            title="Clear chat history"
          >
            🗑️
          </button>
          <div className="mode-toggle d-flex align-items-center">
            <span className="emoji-label me-2">{getModeEmoji()} {getModeLabel()}</span>
            <label className="switch">
              <input type="checkbox" checked={mode === 'sassy'} onChange={toggleMode} />
              <span className="slider round"></span>
            </label>
          </div>
        </div>
      </div>

      <div className={`chat-messages ${mode}`}>
        {chatHistory.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.sender} ${mode === 'sassy' && msg.sender === 'bot' ? 'sassy-msg' : ''}`}
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(msg.text) }}
          />
        ))}
        {isTyping && (
          <div className="message bot typing">
            <div className="typing-indicator">
              <span></span><span></span><span></span>
            </div>
          </div>
        )}
        <div ref={chatEndRef}></div>
      </div>

      <div className="chat-input">
        <input
          type="text"
          className="form-control"
          placeholder='Ask a query...'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button
          className={`btn ${mode === 'formal' ? 'btn-primary' : 'btn-danger'}`}
          onClick={handleSend}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBot;