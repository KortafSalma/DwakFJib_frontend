import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User, Sparkles, ChevronDown } from 'lucide-react';
import { chatbotService } from '../../api/pharmacy';

const suggestions = [
  'Chercher un médicament',
  'Trouver une pharmacie',
  'Comment passer commande?',
  'Suivi de livraison',
  'Contact support',
];

const ChatbotFloating = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: 'Bonjour! Je suis l\'assistant DwakFJib. Comment puis-je vous aider aujourd\'hui?', sender: 'bot', suggestions: suggestions },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (text) => {
    const userMsg = { id: Date.now(), text, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await chatbotService.sendMessage(text);
      const botMsg = {
        id: Date.now() + 1,
        text: res.data.message,
        sender: 'bot',
        suggestions: res.data.suggestions || suggestions,
      };
      setMessages(prev => [...prev, botMsg]);
    } catch {
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        text: 'Désolé, je n\'ai pas pu traiter votre demande. Veuillez réessayer.',
        sender: 'bot',
        suggestions: suggestions,
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;
    sendMessage(input.trim());
  };

  const handleSuggestion = (suggestion) => {
    sendMessage(suggestion);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-[88px] lg:bottom-6 right-4 lg:right-6 z-50 w-14 h-14 rounded-full bg-brand-500 text-white shadow-lg hover:bg-brand-600 hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-[106px] lg:bottom-24 right-4 lg:right-6 z-50 w-[380px] max-w-[calc(100vw-2rem)] h-[600px] max-h-[calc(100vh-10rem)] lg:max-h-[calc(100vh-8rem)] bg-card rounded-2xl border border-elevated shadow-2xl flex flex-col overflow-hidden"
          >
            <div className="flex items-center gap-3 p-4 border-b border-elevated bg-gradient-to-r from-brand-500 to-brand-600 text-white">
              <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
                <Bot className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold">Assistant DwakFJib</p>
                <p className="text-[10px] text-white/70">IA en ligne</p>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-1.5 rounded-lg hover:bg-white/10 transition-all">
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg) => (
                <div key={msg.id}>
                  <div className={`flex items-start gap-2.5 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                      msg.sender === 'user' ? 'bg-brand-100' : 'bg-brand-500'
                    }`}>
                      {msg.sender === 'user' ? (
                        <User className="w-4 h-4 text-brand-600" />
                      ) : (
                        <Bot className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
                      msg.sender === 'user'
                        ? 'bg-brand-500 text-white'
                        : 'bg-elevated text-contrast-primary border border-elevated'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                  {msg.suggestions && msg.sender === 'bot' && (
                    <div className="flex flex-wrap gap-1.5 mt-2 ml-9">
                      {msg.suggestions.map((s, i) => (
                        <button
                          key={i}
                          onClick={() => handleSuggestion(s)}
                          className="px-3 py-1.5 rounded-lg bg-brand-50 border border-brand-200 text-[11px] font-medium text-brand-600 hover:bg-brand-100 transition-all"
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              {loading && (
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-brand-500 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex gap-1 px-4 py-2.5 rounded-2xl bg-elevated border border-elevated">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSubmit} className="p-3 border-t border-elevated">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Écrivez votre message..."
                  className="flex-1 h-10 px-4 rounded-xl border border-elevated bg-card text-sm text-contrast-primary placeholder:text-contrast-muted outline-none focus:border-brand-500/50 focus:ring-2 focus:ring-brand-500/10 transition-all"
                  disabled={loading}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || loading}
                  className="w-10 h-10 rounded-xl bg-brand-500 text-white flex items-center justify-center hover:bg-brand-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatbotFloating;
