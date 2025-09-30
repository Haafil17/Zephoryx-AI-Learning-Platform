
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { AIChatAssistant } from './AIChatAssistant';

export const ChatFloatingButton: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    console.log('Toggle chat clicked, current state:', isChatOpen);
    setIsChatOpen(!isChatOpen);
  };

  console.log('ChatFloatingButton render, isChatOpen:', isChatOpen);

  return (
    <>
      {!isChatOpen && (
        <Button
          onClick={toggleChat}
          variant="premium"
          className="fixed bottom-4 right-4 z-50 w-14 h-14 rounded-full"
          size="lg"
        >
          <MessageCircle className="w-6 h-6" />
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse shadow-lg"></div>
        </Button>
      )}
      
      <AIChatAssistant isOpen={isChatOpen} onToggle={toggleChat} />
    </>
  );
};
