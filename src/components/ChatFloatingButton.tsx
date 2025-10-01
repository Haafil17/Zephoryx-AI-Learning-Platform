
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { AIChatAssistant } from './AIChatAssistant';

export const ChatFloatingButton: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [position, setPosition] = useState({ x: window.innerWidth - 80, y: window.innerHeight - 80 });
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef<{ startX: number; startY: number; offsetX: number; offsetY: number }>({
    startX: 0,
    startY: 0,
    offsetX: 0,
    offsetY: 0
  });

  const toggleChat = () => {
    if (!isDragging) {
      setIsChatOpen(!isChatOpen);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(false);
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      offsetX: e.clientX - position.x,
      offsetY: e.clientY - position.y
    };

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const deltaX = Math.abs(moveEvent.clientX - dragRef.current.startX);
      const deltaY = Math.abs(moveEvent.clientY - dragRef.current.startY);
      
      if (deltaX > 5 || deltaY > 5) {
        setIsDragging(true);
      }

      setPosition({
        x: moveEvent.clientX - dragRef.current.offsetX,
        y: moveEvent.clientY - dragRef.current.offsetY
      });
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      setTimeout(() => setIsDragging(false), 100);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <>
      {!isChatOpen && (
        <Button
          onMouseDown={handleMouseDown}
          onClick={toggleChat}
          variant="premium"
          style={{
            position: 'fixed',
            left: `${position.x}px`,
            top: `${position.y}px`,
            cursor: isDragging ? 'grabbing' : 'grab'
          }}
          className="z-50 w-14 h-14 rounded-full"
          size="lg"
        >
          <MessageCircle className="w-6 h-6" />
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse shadow-lg"></div>
        </Button>
      )}
      
      <AIChatAssistant isOpen={isChatOpen} onToggle={toggleChat} position={position} />
    </>
  );
};
