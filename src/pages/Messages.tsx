
import React from "react";
import MobileLayout from "@/components/MobileLayout";
import { Search, MoreVertical, Send } from "lucide-react";
import { cn } from "@/lib/utils";

// Sample conversations data
const conversations = [
  {
    id: 1,
    doctor: {
      name: "Dr. Emma Wilson",
      avatar: "/lovable-uploads/5bf871cd-3793-41a5-9a81-59bb21e3585a.png",
      specialty: "Cardiologue",
      lastSeen: "En ligne"
    },
    messages: [
      { id: 1, text: "Bonjour, comment puis-je vous aider aujourd'hui?", isDoctor: true, time: "10:30" },
      { id: 2, text: "J'ai quelques questions sur mes médicaments récemment prescrits", isDoctor: false, time: "10:32" },
      { id: 3, text: "Bien sûr, je serais ravi de clarifier tous vos doutes. Quelles questions avez-vous?", isDoctor: true, time: "10:33" },
    ]
  },
  {
    id: 2,
    doctor: {
      name: "Dr. Michael Chen",
      avatar: "/lovable-uploads/5bf871cd-3793-41a5-9a81-59bb21e3585a.png",
      specialty: "Dermatologue",
      lastSeen: "Il y a 2h"
    },
    messages: []
  }
];

const Messages = () => {
  // For demonstration, we'll show the first conversation
  const activeConversation = conversations[0];

  return (
    <MobileLayout>
      <div className="flex flex-col h-full pb-20">
        {/* Header */}
        <div className="bg-health-primary text-white p-4">
          <h1 className="text-xl font-semibold mb-2">Messages</h1>
          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Rechercher des messages..."
              className="w-full bg-white/10 text-white placeholder-white/70 rounded-full py-2 pl-10 pr-4 focus:outline-none"
            />
          </div>
        </div>

        {/* Chat section */}
        <div className="flex-1 flex flex-col">
          {/* Doctor info */}
          <div className="p-4 bg-white border-b flex items-center justify-between">
            <div className="flex items-center">
              <img 
                src={activeConversation.doctor.avatar} 
                alt={activeConversation.doctor.name}
                className="w-12 h-12 rounded-full object-cover mr-3" 
              />
              <div>
                <h2 className="font-semibold">{activeConversation.doctor.name}</h2>
                <p className="text-xs text-green-600">{activeConversation.doctor.lastSeen}</p>
              </div>
            </div>
            <button className="text-gray-600">
              <MoreVertical size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 bg-gray-50 overflow-y-auto space-y-4">
            {activeConversation.messages.map((message) => (
              <div 
                key={message.id}
                className={cn(
                  "max-w-[75%] p-3 rounded-t-xl",
                  message.isDoctor 
                    ? "bg-white rounded-br-xl rounded-bl-none ml-0 mr-auto" 
                    : "bg-health-primary text-white rounded-bl-xl rounded-br-none mr-0 ml-auto"
                )}
              >
                <p>{message.text}</p>
                <span className={cn(
                  "text-xs block mt-1", 
                  message.isDoctor ? "text-gray-500" : "text-white/80"
                )}>
                  {message.time}
                </span>
              </div>
            ))}
          </div>

          {/* Message input */}
          <div className="p-3 bg-white border-t flex items-center">
            <input
              type="text"
              placeholder="Écrivez votre message..."
              className="flex-1 border border-gray-300 rounded-full py-2 px-4 focus:outline-none focus:ring-1 focus:ring-health-primary"
            />
            <button className="ml-2 bg-health-primary text-white p-2 rounded-full">
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </MobileLayout>
  );
};

export default Messages;
