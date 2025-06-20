
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { AIChatAssistant } from './AIChatAssistant';

export const ChatFloatingButton: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <>
      {!isChatOpen && (
        <Button
          onClick={toggleChat}
          className="fixed bottom-4 right-4 z-40 w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-2xl transition-all duration-300 hover:scale-110"
          size="lg"
        >
          <MessageCircle className="w-6 h-6" />
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
        </Button>
      )}
      
      <AIChatAssistant isOpen={isChatOpen} onToggle={toggleChat} />
    </>
  );
};
