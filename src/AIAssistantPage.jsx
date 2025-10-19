import React from "react";
import { motion } from "framer-motion";
import { Send, Dumbbell, LogIn, Search, Menu, X, User } from "lucide-react";
import { useTheme } from "./ThemeContext";
import { useBMI } from "./BMIContext";

export default function AIAssistantPage() {
  const { colors } = useTheme();
  const { bmiData } = useBMI();
  const themeColors = colors.light;
  const [isMobileOpen, setIsMobileOpen] = React.useState(false);
  const [isShrunk, setIsShrunk] = React.useState(false);
  const lastYRef = React.useRef(0);
  const isLoggedIn = React.useMemo(() => {
    try { const u = JSON.parse(localStorage.getItem('fitzer.user') || '{}'); return Boolean(u && u.username); } catch { return false; }
  }, []);

  React.useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || 0;
      const goingDown = y > lastYRef.current;
      setIsShrunk(goingDown && y > 10);
      lastYRef.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const [messages, setMessages] = React.useState([
    {
      sender: "bot",
      text: "Hi, I'm GigaChat, your personal AI trainer. Ask me about workouts, diet, or BMI advice.\n\nQUICK LINKS:\nDiet Plans: Budget-friendly meal plans with vegan/non-vegan options\nExercise: Personalized workout recommendations\nBMI Calculator: Track your fitness progress",
    },
  ]);
  const [input, setInput] = React.useState("");
  const chatEndRef = React.useRef(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const scrollToBottom = React.useCallback(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  React.useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const addMessage = (msg) => setMessages((prev) => [...prev, msg]);

  // Function to clean AI response formatting
  const cleanAIResponse = (text) => {
    return text
      .replace(/•\s*/g, '') // Remove bullet points
      .replace(/\*\s*/g, '') // Remove asterisks
      .replace(/^\s*-\s*/gm, '') // Remove dashes at start of lines
      .replace(/^\s*→\s*/gm, '') // Remove arrows
      .replace(/^\s*>\s*/gm, '') // Remove greater than symbols
      .replace(/^\s*\d+\.\s*/gm, '') // Remove numbered lists
      .replace(/\n\s*\n/g, '\n') // Remove extra blank lines
      .replace(/^\s+|\s+$/gm, '') // Remove leading/trailing whitespace from each line
      .trim();
  };



  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    addMessage({ sender: 'user', text: trimmed });
    setInput("");

    // Use the provided Groq API key
    const apiKey = "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";

    try {
      setIsLoading(true);
      
      // Create BMI context for AI
      const bmiContext = bmiData.bmi > 0 ? `
User Profile:
- BMI: ${bmiData.bmi} (${bmiData.bmiCategory})
- Age: ${bmiData.age} years
- Gender: ${bmiData.gender || 'Not specified'}
- Sleep Hours: ${bmiData.sleepHours} hours
- Body Fat: ${bmiData.bodyFatPercentage}%
- Genetic Conditions: ${bmiData.geneticCondition || 'None specified'}

` : '';

      const systemPrompt = `You are GigaChat, an expert fitness and nutrition assistant. You provide practical, actionable advice on:

Workout routines and exercise techniques
Nutrition and diet planning (with budget-friendly options)
BMI calculations and health assessments
Fitness goals and progress tracking
Weight management strategies
Muscle building and strength training
Cardiovascular fitness
Recovery and rest
Budget-friendly meal planning
Vegan and non-vegan diet options

${bmiContext}IMPORTANT FORMATTING RULES:
- NEVER use bullet points (•), asterisks (*), or dashes (-) in your responses
- Format all information as clean, line-by-line text
- Use simple line breaks to separate different points
- Consider the user's BMI category, dietary preferences (vegan/non-vegan), and budget constraints
- Make recommendations practical and budget-friendly with Indian Rupee (₹) pricing
- Always suggest visiting the Diet Plans page for personalized meal plans
- Include budget ranges: Low (₹300/day), Medium (₹600/day), High (₹1000/day)
- For vegan diets, emphasize plant-based proteins and key nutrients
- For budget questions, provide specific cost-effective meal suggestions

Always give specific, helpful responses. If asked about medical conditions, injuries, or medications, recommend consulting a healthcare professional. Keep responses concise but informative.`;
      
      // Build conversation history properly - only include the last 10 messages to avoid token limits
      const recentMessages = messages.slice(-10);
      const conversationHistory = recentMessages.map(m => ({
        role: m.sender === 'bot' ? 'assistant' : 'user',
        content: m.text
      }));
      
      const resp = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'llama-3.1-8b-instant',
          messages: [
            {
              role: 'system',
              content: systemPrompt
            },
            ...conversationHistory,
            {
              role: 'user',
              content: trimmed
            }
          ],
          temperature: 0.7,
          max_tokens: 500,
          stream: false
        })
      });

      console.log('Response status:', resp.status);
      console.log('Response headers:', resp.headers);
      
      if (!resp.ok) {
        const errorText = await resp.text();
        console.error('API Error Response:', errorText);
        console.error('Response Status:', resp.status);
        console.error('Response Status Text:', resp.statusText);
        throw new Error(`API Error: ${resp.status} - ${errorText}`);
      }

      const data = await resp.json();
      console.log('API Response:', data); // Debug log
      
      if (data.choices && data.choices.length > 0) {
        const rawBotText = data.choices[0].message?.content?.trim() || "Sorry, I couldn't process your request.";
        const cleanedBotText = cleanAIResponse(rawBotText);
        addMessage({ sender: 'bot', text: cleanedBotText });
      } else {
        throw new Error('Invalid response format from API');
      }
    } catch (e) {
      console.error('Full error details:', e);
      console.error('Error message:', e.message);
      console.error('Error stack:', e.stack);
      
      let errorMessage = "I'm having trouble connecting right now. ";
      
      if (e.message.includes('401') || e.message.includes('Unauthorized')) {
        errorMessage += "There's an authentication issue with the AI service.";
      } else if (e.message.includes('429') || e.message.includes('rate limit')) {
        errorMessage += "I'm getting too many requests. Please wait a moment and try again.";
      } else if (e.message.includes('network') || e.message.includes('fetch') || e.message.includes('Failed to fetch')) {
        errorMessage += "Please check your internet connection and try again.";
      } else if (e.message.includes('CORS')) {
        errorMessage += "There's a CORS issue. Please check browser console for details.";
      } else {
        errorMessage += `Debug info: ${e.message}`;
      }
      
      addMessage({ sender: 'bot', text: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  return (
        <div className={`min-h-screen ${themeColors.bg} ${themeColors.text} ${themeColors.selection}`}>
      <header className={`sticky top-0 z-50 backdrop-blur ${themeColors.backdrop} border-b ${themeColors.border}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 h-16 flex items-center justify-between">
          <motion.a 
            href="#/" 
            className="flex items-center gap-3"
            animate={{ scale: isShrunk ? 0.9 : 1 }}
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(99, 102, 241, 0.4)" }}
            transition={{ duration: 0.2 }}
          >
            <motion.span 
              className="h-9 w-9 grid place-items-center rounded-2xl bg-indigo-100 ring-1 ring-indigo-200"
              animate={{ scale: isShrunk ? 0.95 : 1 }}
              whileHover={{ backgroundColor: "rgba(99, 102, 241, 0.2)", ringColor: "rgba(99, 102, 241, 0.5)", boxShadow: "0 0 15px rgba(99, 102, 241, 0.6)" }}
              transition={{ duration: 0.2 }}
            >
              <Dumbbell className="h-5 w-5 text-indigo-600" />
            </motion.span>
            <motion.span animate={{ scale: isShrunk ? 0.95 : 1 }} className={`font-black tracking-tight ${themeColors.text} text-lg`}>Fitzer</motion.span>
          </motion.a>

          <nav className="hidden md:flex items-center gap-6 text-sm">
            <motion.a href="#/" className={`${themeColors.textSecondary} hover:${themeColors.text.replace('text-', 'text-')} transition-colors`} whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>Home</motion.a>
            <motion.a href="#/exercise" className={`${themeColors.textSecondary} hover:${themeColors.text.replace('text-', 'text-')} transition-colors`} whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>Exercises</motion.a>
            <motion.a href="#/diet" className={`${themeColors.textSecondary} hover:${themeColors.text.replace('text-', 'text-')} transition-colors`} whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>Diet Plans</motion.a>
            <motion.a href="#/assistant" className={`${themeColors.textSecondary} hover:${themeColors.text.replace('text-', 'text-')} transition-colors`} whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>AI Assistant</motion.a>
            <motion.a href={isLoggedIn ? "#/profile" : "#/login"} className={`inline-flex items-center gap-2 rounded-2xl px-3 py-2 ${themeColors.accentBg} ring-1 ${themeColors.accentRing} ${themeColors.accent} ${themeColors.accentHover} transition`} whileHover={{ scale: 1.05, backgroundColor: "rgba(251, 146, 60, 0.3)", boxShadow: `0 0 20px ${themeColors.accentShadowStrong}` }} transition={{ duration: 0.2 }}>
              {isLoggedIn ? <User className="h-4 w-4" /> : <LogIn className="h-4 w-4" />} {isLoggedIn ? 'Profile' : 'Login'}
            </motion.a>
          </nav>

          <div className="flex items-center gap-2">
            <div className="md:hidden flex items-center gap-2">
              <motion.button className={`p-2 rounded-lg ${themeColors.cardBg}`} whileHover={{ scale: 1.1, backgroundColor: "rgba(0, 0, 0, 0.1)", boxShadow: `0 0 15px ${themeColors.accentShadow}` }} transition={{ duration: 0.2 }}>
                <Search className={`h-5 w-5 ${themeColors.textSecondary}`} />
              </motion.button>
              <motion.button onClick={() => setIsMobileOpen(v => !v)} className={`p-2 rounded-lg ${themeColors.cardBg} ring-1 ${themeColors.border}`} whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }} aria-label="Open menu">
                {isMobileOpen ? <X className={`h-5 w-5 ${themeColors.text}`} /> : <Menu className={`h-5 w-5 ${themeColors.text}`} />}
              </motion.button>
            </div>
          </div>
        </div>
        {isMobileOpen && (
          <div className={`md:hidden border-t ${themeColors.border} ${themeColors.bg}`}>
            <div className="px-3 py-3 space-y-2">
              <motion.a href="#/" onClick={() => setIsMobileOpen(false)} className={`block rounded-lg px-4 py-3 ring-1 ${themeColors.border} ${themeColors.cardBg} hover:${themeColors.cardBgHover} ${themeColors.text}`} whileHover={{ y: -1 }}>Home</motion.a>
              <motion.a href="#/exercise" onClick={() => setIsMobileOpen(false)} className={`block rounded-lg px-4 py-3 ring-1 ${themeColors.border} ${themeColors.cardBg} hover:${themeColors.cardBgHover} ${themeColors.text}`} whileHover={{ y: -1 }}>Exercises</motion.a>
              <motion.a href="#/diet" onClick={() => setIsMobileOpen(false)} className={`block rounded-lg px-4 py-3 ring-1 ${themeColors.border} ${themeColors.cardBg} hover:${themeColors.cardBgHover} ${themeColors.text}`} whileHover={{ y: -1 }}>Diet Plans</motion.a>
              <motion.a href="#/assistant" onClick={() => setIsMobileOpen(false)} className={`block rounded-lg px-4 py-3 ring-1 ${themeColors.border} ${themeColors.cardBg} hover:${themeColors.cardBgHover} ${themeColors.text}`} whileHover={{ y: -1 }}>AI Assistant</motion.a>
              <motion.a href={isLoggedIn ? "#/profile" : "#/login"} onClick={() => setIsMobileOpen(false)} className={`block rounded-lg px-4 py-3 ring-1 ${themeColors.border} ${themeColors.cardBg} hover:${themeColors.cardBgHover} ${themeColors.text}`} whileHover={{ y: -1 }}>{isLoggedIn ? 'Profile' : 'Login'}</motion.a>
            </div>
          </div>
        )}
      </header>

      <div className="px-6 py-8 flex flex-col items-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-extrabold text-center mb-8"
        >
          <span className="text-indigo-600">GigaChat</span> – Your AI Fitness Assistant
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className={`w-full max-w-4xl bg-white rounded-2xl professional-shadow-lg flex flex-col overflow-hidden professional-fade-in`}
        >
        {/* Chat Area */}
        <div className="flex-1 p-6 space-y-4 overflow-y-auto h-96">
          {messages.map((msg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: msg.sender === 'bot' ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.25 }}
              className={`flex ${msg.sender === 'bot' ? 'items-start gap-3' : 'justify-end'}`}
            >
              {msg.sender === 'bot' && (
                <img src="https://camo.githubusercontent.com/695d0e6dfb8812406ddb2fb2ead19612c219d729574a5c08de66ac1a771bd76f/68747470733a2f2f63646e2e657865726369736564622e6465762f657865726369736564622f616e64726f69642d6368726f6d652d353132783531322e706e67" alt="AI Assistant" className="w-8 h-8 rounded-full" />
              )}
              <div className={`p-3 rounded-lg text-sm leading-relaxed professional-shadow chat-message ${msg.sender === 'bot' ? 'italic tracking-wide bg-white border border-gray-200' : 'bg-blue-50 border border-blue-200'}`}>
                {msg.text.split('\n').map((line, lineIdx) => (
                  <div key={lineIdx} className="mb-1 last:mb-0">
                    {line}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.25 }}
              className={`flex items-start gap-3`}
            >
              <img src="https://camo.githubusercontent.com/695d0e6dfb8812406ddb2fb2ead19612c219d729574a5c08de66ac1a771bd76f/68747470733a2f2f63646e2e657865726369736564622e6465762f657865726369736564622f616e64726f69642d6368726f6d652d353132783531322e706e67" alt="AI Assistant" className="w-8 h-8 rounded-full" />
              <div className={`p-3 rounded-lg text-sm leading-relaxed professional-shadow bg-white border border-gray-200`} aria-live="polite" aria-label="Assistant is typing">
                <div className="flex items-center gap-1 text-gray-400">
                  <span className="professional-loading"></span>
                  <span className="professional-loading"></span>
                  <span className="professional-loading"></span>
                </div>
              </div>
            </motion.div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input Area */}
        <div className={`flex items-center gap-3 p-4 border-t border-gray-200 bg-white`}>
          <input
            type="text"
            placeholder="Ask GigaChat anything..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className={`flex-1 px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none`}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={sendMessage}
            disabled={isLoading}
            className={`px-4 py-2 rounded-lg professional-btn ${themeColors.accent} ${isLoading ? 'opacity-60 cursor-not-allowed' : ''}`}
          >
            <Send className="w-5 h-5" />
          </motion.button>
        </div>
        </motion.div>
      </div>
      <a href="#/assistant" className="fixed bottom-6 right-6 z-50">
        <motion.button
          className={`h-12 w-12 rounded-full ${themeColors.cardBg} ring-1 ${themeColors.border}`}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Open AI Assistant"
        >
          <Dumbbell className={`h-6 w-6 mx-auto ${themeColors.accent}`} />
        </motion.button>
      </a>
    </div>
  );
}