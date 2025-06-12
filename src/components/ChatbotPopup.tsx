import React, { useState } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageSquare, Send, X } from 'lucide-react';
import { cn } from '@/lib/utils'; // Assuming cn utility is for conditional class merging

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'; // Use Vite's environment variables

const ChatbotPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{
    text: string;
    sender: 'user' | 'bot';
  }[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (inputMessage.trim()) {
      setLoading(true);
      setMessages(prevMessages => [...prevMessages, { text: inputMessage, sender: 'user' }]);

      try {
        const response = await axios.post(`${API_BASE_URL}/api/chatbot/chat`, { message: inputMessage });
        const reply = response.data.reply;

        setMessages(prevMessages => [...prevMessages, { text: reply, sender: 'bot' }]);
      } catch (error) {
        console.error('Error communicating with chatbot:', error);
        setMessages(prevMessages => [...prevMessages, { text: 'Sorry, I couldn\'t process your request.', sender: 'bot' }]);
      } finally {
        setLoading(false);
        setInputMessage('');
      }
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen ? (
        // Chatbot Toggle Button - Size remains the same
        <Button
          className="rounded-full w-20 h-20 text-white shadow-lg flex items-center justify-center
                     bg-teal-600 hover:bg-teal-700 transition-colors duration-200
                     p-4 transform hover:scale-110"
          onClick={toggleChat}
        >
          <MessageSquare className="h-10 w-10" />
        </Button>
      ) : (
        // Chatbot Popup Container - Default size set to what was previously 'medium'
        <div
          className="bg-white rounded-lg shadow-xl flex flex-col
                     w-[320px] h-[450px] // Default size (now considered 'medium')
                     lg:w-[400px] lg:h-[600px] // Slightly larger for large screens if desired
                     "
        >
          <div className="flex justify-between items-center p-4 bg-teal-600 text-white rounded-t-lg">
            <h3 className="text-lg font-semibold">Health Chatbot</h3>
            <Button variant="ghost" size="icon" onClick={toggleChat} className="text-white hover:bg-white/20">
              <X className="h-5 w-5" />
            </Button>
          </div>
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={cn(
                  "p-3 rounded-lg max-w-[80%]",
                  msg.sender === 'user'
                    ? "bg-health-blue/10 text-right ml-auto"
                    : "bg-teal-50 text-left mr-auto"
                )}
              >
                {msg.text}
              </div>
            ))}
          </div>
          <form onSubmit={handleSendMessage} className="border-t border-gray-200 p-4 flex gap-2">
            <Input
              placeholder="Type a message..."
              value={inputMessage}
              onChange={e => setInputMessage(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" size="icon" disabled={loading} className="bg-teal-600 hover:bg-teal-700">
              {loading ? 'Sending...' : <Send className="h-5 w-5" />}
            </Button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatbotPopup;