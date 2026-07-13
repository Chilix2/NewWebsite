"use client";

import React, { useState, useEffect, useRef } from "react";
import { LazyMotion, domAnimation, m, AnimatePresence } from "framer-motion";
import { SaillyIcon } from "./sailly-icon";
import { cn } from "@/lib/utils";
import { GlassCard } from "./ui/glass-card";
import { 
  Phone,
  Mic,
  MoreHorizontal
} from "lucide-react";

interface ConversationMessage {
  id: string;
  speaker: "user" | "sailly";
  message: string;
  messageEn?: string;
  timestamp: number;
  saillyState?: "listening" | "thinking" | "speaking";
}

const demoConversationDe: ConversationMessage[] = [
  {
    id: "1",
    speaker: "sailly",
    message: "Hallo, hier ist Sailly von Bright Dental. Wie kann ich Ihnen helfen?",
    messageEn: "Hello, this is Sailly from Bright Dental. How can I help you?",
    timestamp: 0,
    saillyState: "speaking"
  },
  {
    id: "2",
    speaker: "user",
    message: "Ich muss meinen Termin für morgen verschieben.",
    messageEn: "I need to reschedule my appointment for tomorrow.",
    timestamp: 2500
  },
  {
    id: "3",
    speaker: "sailly",
    message: "Gerne. Welche Uhrzeit passt Ihnen stattdessen?",
    messageEn: "Of course. What time would work better for you?",
    timestamp: 5000,
    saillyState: "listening"
  },
  {
    id: "4",
    speaker: "user",
    message: "Haben Sie etwas am Nachmittag gegen 15 Uhr?",
    messageEn: "Do you have anything in the afternoon around 3 PM?",
    timestamp: 8000
  },
  {
    id: "5",
    speaker: "sailly",
    message: "Ich schaue nach... Ja, um 15:15 Uhr ist noch etwas frei. Soll ich das buchen?",
    messageEn: "Let me check... Yes, 3:15 PM is still available. Should I book that?",
    timestamp: 11000,
    saillyState: "thinking"
  },
  {
    id: "6",
    speaker: "user",
    message: "Ja bitte, das ist perfekt.",
    messageEn: "Yes please, that's perfect.",
    timestamp: 14000
  },
  {
    id: "7",
    speaker: "sailly",
    message: "Erledigt! Wir sehen uns morgen um 15:15 Uhr.",
    messageEn: "Done! See you tomorrow at 3:15 PM.",
    timestamp: 16000,
    saillyState: "speaking"
  }
];

interface SaillyConversationPreviewProps {
  className?: string;
  dict?: any;
}

export function SaillyConversationPreview({ className, dict }: SaillyConversationPreviewProps) {
  // Use dict messages if available and valid, otherwise fall back to demo conversation
  const conversationMessages = (dict?.conversation_preview?.messages && Array.isArray(dict.conversation_preview.messages) && dict.conversation_preview.messages.length > 0) 
    ? dict.conversation_preview.messages.map((msg: any, idx: number) => ({
        ...msg,
        id: msg.id || `msg-${idx}`,
        speaker: msg.speaker || 'user',
        message: msg.message || '',
        timestamp: typeof msg.timestamp === 'number' ? msg.timestamp : (idx * 3000),
        saillyState: msg.saillyState || (msg.speaker === 'sailly' ? 'speaking' : undefined)
      }))
    : demoConversationDe;
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const chatRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages appear
  useEffect(() => {
    if (chatRef.current) {
      setTimeout(() => {
        if (chatRef.current) {
          chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
      }, 100);
    }
  }, [currentMessageIndex]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    const playNext = () => {
      const nextIndex = (currentMessageIndex + 1) % (conversationMessages.length + 1); // +1 for pause at end
      
      if (nextIndex === conversationMessages.length) {
        // Pause at end before restarting
        timeout = setTimeout(() => {
          setCurrentMessageIndex(0);
        }, 3000);
      } else {
        // Next message
        const currentMsg = conversationMessages[currentMessageIndex];
        const nextMsg = conversationMessages[nextIndex];
        const delay = nextMsg ? (nextMsg.timestamp - (currentMsg?.timestamp || 0)) : 2000;
        
        // Ensure minimum reading time
        const finalDelay = Math.max(delay, 1500); 

        timeout = setTimeout(() => {
          setCurrentMessageIndex(nextIndex);
        }, finalDelay);
      }
    };

    playNext();
    return () => clearTimeout(timeout);
  }, [currentMessageIndex, conversationMessages]);

  // Messages to show: all up to current index
  const visibleMessages = conversationMessages.slice(0, currentMessageIndex + 1);
  const latestMessage = visibleMessages[visibleMessages.length - 1];

  // Get message text (dict messages don't have .messageEn, they're already in the language)
  const getMessageText = (msg: ConversationMessage) => {
    return msg.message;
  };

  // Translate status labels based on dict
  const isSpeaking = latestMessage?.speaker === 'sailly';
  const speakingLabel = dict?.conversation_preview?.speaking || "Speaking...";
  const listeningLabel = dict?.conversation_preview?.listening || "Listening...";
  const speakerLabel = dict?.conversation_preview?.customerLabel || "Customer";
  const saillyLabel = dict?.conversation_preview?.saillyLabel || "Sailly";

  return (
    <LazyMotion features={domAnimation}>
      <div data-testid="conversation-preview" className={cn("w-full max-w-sm mx-auto", className)}>
      <GlassCard 
        intensity="xl" 
        className="w-full h-[520px] sm:h-[600px] bg-white/80 border border-slate-100 shadow-xl overflow-hidden flex flex-col relative rounded-[2rem] sm:rounded-[3rem]"
      >
        {/* Phone Notch/Status Bar (Simulated) */}
        <div className="h-6 w-full flex justify-center items-center mt-2 z-20">
           <div className="w-20 h-5 bg-black/10 rounded-full backdrop-blur-md" />
        </div>

        {/* Dynamic Header */}
        <div className="p-4 pt-2 border-b border-white/20 bg-white/30 backdrop-blur-md relative z-10">
          <div className="flex flex-col items-center gap-2">
            <div className="relative">
              <m.div 
                className="w-20 h-20 rounded-full flex items-center justify-center overflow-hidden bg-white shadow-inner will-change-transform"
                animate={{ scale: latestMessage?.speaker === 'sailly' ? [1, 1.65, 1] : 1 }}
              >
                <SaillyIcon className="w-full h-full" state={latestMessage?.speaker === 'sailly' ? (latestMessage.saillyState || 'idle') : 'listening'} animated />
              </m.div>
              <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-400 border-2 border-white rounded-full" />
            </div>
            
            <div className="text-center">
              <div className="font-bold text-gray-800">{saillyLabel}</div>
              <div className="text-xs text-primary font-medium flex items-center justify-center gap-1">
                {isSpeaking ? (
                   <>
                     <span className="flex gap-0.5 items-end h-3">
                        <span className="w-0.5 bg-primary rounded-full animate-[soundwave_0.5s_ease-in-out_infinite]" style={{ height: 4 }} />
                        <span className="w-0.5 bg-primary rounded-full animate-[soundwave_0.5s_ease-in-out_infinite_0.1s]" style={{ height: 8 }} />
                        <span className="w-0.5 bg-primary rounded-full animate-[soundwave_0.5s_ease-in-out_infinite_0.2s]" style={{ height: 4 }} />
                     </span>
                     {speakingLabel}
                   </>
                ) : (
                  listeningLabel
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div 
          ref={chatRef}
          className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 relative overscroll-y-contain scroll-smooth"
        >
          {/* Subtle Background */}
          <div className="absolute inset-0 opacity-30 pointer-events-none"
               style={{ backgroundImage: 'radial-gradient(#ddd 1px, transparent 1px)', backgroundSize: '20px 20px' }} 
          />

          <AnimatePresence mode="popLayout">
            {visibleMessages.map((msg) => (
              <m.div
                key={msg.id}
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className={cn(
                  "flex flex-col gap-1 max-w-[85%]",
                  msg.speaker === "user" ? "self-start items-start" : "self-end items-end"
                )}
              >
                <GlassCard 
                  variant={msg.speaker === "sailly" ? "frosted" : "light"}
                  intensity="sm"
                  className={cn(
                    "p-3 rounded-2xl text-sm leading-relaxed shadow-sm border-0",
                    msg.speaker === "user"
                      ? "bg-white/80 text-gray-800 rounded-tl-none"
                      : "bg-gradient-to-br from-[#f97e70] to-[#ffb090] text-white rounded-tr-none shadow-[0_4px_14px_rgba(249,126,112,0.25)]"
                  )}
                >
                  {getMessageText(msg)}
                </GlassCard>
                <span className="text-[10px] text-gray-400 px-1">
                  {msg.speaker === "sailly" ? saillyLabel : speakerLabel}
                </span>
              </m.div>
            ))}
          </AnimatePresence>
          
          {/* Typing Indicator */}
          {latestMessage?.speaker === 'user' && currentMessageIndex < conversationMessages.length - 1 && (
             <m.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               className="self-end bg-gray-100 rounded-full px-3 py-2"
             >
               <div className="flex gap-1">
                 <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" />
                 <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                 <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
               </div>
             </m.div>
          )}
        </div>

        {/* Bottom Actions */}
        <div className="p-6 pb-8 bg-white/40 backdrop-blur-md border-t border-white/30 flex justify-between items-center">
           <button className="p-3 rounded-full bg-gray-100/50 hover:bg-gray-200/50 transition-colors">
             <MoreHorizontal className="w-5 h-5 text-gray-600" />
           </button>
           
           <button className="p-4 rounded-full bg-red-500 shadow-lg shadow-red-500/30 hover:bg-red-600 transition-all hover:scale-105">
             <Phone className="w-6 h-6 text-white rotate-[135deg]" />
           </button>

           <button className="p-3 rounded-full bg-gray-100/50 hover:bg-gray-200/50 transition-colors">
             <Mic className="w-5 h-5 text-gray-600" />
           </button>
        </div>

      </GlassCard>
    </div>
    </LazyMotion>
  );
}
