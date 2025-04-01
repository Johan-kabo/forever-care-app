
import React, { useState, useRef, useEffect } from "react";
import MobileLayout from "@/components/MobileLayout";
import { Search, MoreVertical, Send, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import VoiceRecorder from "@/components/VoiceRecorder";
import FileUpload from "@/components/FileUpload";
import MessageContent from "@/components/MessageContent";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { v4 as uuidv4 } from "uuid";

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
      { id: 1, text: "Bonjour, comment puis-je vous aider aujourd'hui?", isDoctor: true, time: "10:30", message_type: "text" },
      { id: 2, text: "J'ai quelques questions sur mes médicaments récemment prescrits", isDoctor: false, time: "10:32", message_type: "text" },
      { id: 3, text: "Bien sûr, je serais ravi de clarifier tous vos doutes. Quelles questions avez-vous?", isDoctor: true, time: "10:33", message_type: "text" },
    ],
    lastMessage: "Bien sûr, je serais ravi de clarifier tous vos doutes. Quelles questions avez-vous?",
    lastMessageTime: "10:33",
    unreadCount: 0
  },
  {
    id: 2,
    doctor: {
      name: "Dr. Michael Chen",
      avatar: "/lovable-uploads/5bf871cd-3793-41a5-9a81-59bb21e3585a.png",
      specialty: "Dermatologue",
      lastSeen: "Il y a 2h"
    },
    messages: [
      { id: 1, text: "Bonjour, j'ai examiné votre dossier. Avez-vous suivi le traitement?", isDoctor: true, time: "Hier" },
      { id: 2, text: "Oui, j'ai appliqué la crème comme prescrit", isDoctor: false, time: "Hier" },
    ],
    lastMessage: "Oui, j'ai appliqué la crème comme prescrit",
    lastMessageTime: "Hier",
    unreadCount: 1
  },
  {
    id: 3,
    doctor: {
      name: "Dr. Sarah Johnson",
      avatar: "/lovable-uploads/5bf871cd-3793-41a5-9a81-59bb21e3585a.png",
      specialty: "Ophtalmologue",
      lastSeen: "Il y a 1j"
    },
    messages: [
      { id: 1, text: "Vos résultats d'examen sont disponibles.", isDoctor: true, time: "Lun" },
    ],
    lastMessage: "Vos résultats d'examen sont disponibles.",
    lastMessageTime: "Lun",
    unreadCount: 2
  }
];

const Messages = () => {
  const [view, setView] = useState<"list" | "chat">("list");
  const [activeConversation, setActiveConversation] = useState(conversations[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [attachmentInfo, setAttachmentInfo] = useState<{
    url: string;
    type: string;
  } | null>(null);

  // Filter conversations based on search term
  const filteredConversations = conversations.filter(
    conv => conv.doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            conv.doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenChat = (conversation) => {
    setActiveConversation(conversation);
    setView("chat");
  };

  const handleBackToList = () => {
    setView("list");
  };

  const handleSendMessage = async () => {
    if ((newMessage.trim() === "" && !attachmentInfo) || isRecording) return;
    
    // Create a new message object
    const newMessageObj = {
      id: activeConversation.messages.length + 1,
      text: newMessage.trim() || (attachmentInfo ? "Pièce jointe" : ""),
      isDoctor: false,
      time: format(new Date(), 'HH:mm'),
      message_type: attachmentInfo ? attachmentInfo.type : "text",
      attachment_url: attachmentInfo?.url
    };
    
    // Update the active conversation with the new message
    const updatedConversation = {
      ...activeConversation,
      messages: [...activeConversation.messages, newMessageObj],
      lastMessage: newMessage.trim() || (
        attachmentInfo?.type === "image" ? "Image" : 
        attachmentInfo?.type === "audio" ? "Message vocal" :
        attachmentInfo?.type === "video" ? "Vidéo" :
        attachmentInfo?.type === "document" ? "Document" : "Pièce jointe"
      ),
      lastMessageTime: format(new Date(), 'HH:mm')
    };
    
    // Update the conversation in the conversations array
    const updatedConversations = conversations.map(conv => 
      conv.id === activeConversation.id ? updatedConversation : conv
    );
    
    try {
      // In a real app, send the message to the backend
      // Here we're just updating the local state
      
      // Update state
      setActiveConversation(updatedConversation);
      setNewMessage("");
      setAttachmentInfo(null);
      
      // You could send the message to Supabase here
      // const { error } = await supabase.from('messages').insert({
      //   sender_id: user.id,
      //   receiver_id: doctor.id,
      //   content: newMessage.trim(),
      //   message_type: attachmentInfo ? attachmentInfo.type : "text",
      //   attachment_url: attachmentInfo?.url
      // });
      // if (error) throw error;
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Erreur",
        description: "Impossible d'envoyer le message. Veuillez réessayer.",
        variant: "destructive"
      });
    }
  };

  const handleFileUploaded = (url: string, fileType: string) => {
    setAttachmentInfo({ url, type: fileType });
    toast({
      title: "Fichier téléchargé",
      description: "Votre fichier est prêt à être envoyé",
    });
  };

  const handleVoiceUploaded = (url: string) => {
    setAttachmentInfo({ url, type: "audio" });
    handleSendMessage();
  };

  const handleCancelAttachment = () => {
    setAttachmentInfo(null);
  };

  // Scroll to bottom of messages when chat is opened or new message is sent
  useEffect(() => {
    if (view === "chat" && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [view, activeConversation.messages]);

  const formatDate = (dateString) => {
    // For demo purposes, just return the string
    // In production, this should parse and format an actual date
    return dateString;
  };

  return (
    <MobileLayout>
      <div className="flex flex-col h-full">
        {view === "list" ? (
          // Conversations List View
          <>
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
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Conversations List */}
            <div className="flex-1 overflow-y-auto">
              {filteredConversations.length > 0 ? (
                filteredConversations.map((conversation) => (
                  <div 
                    key={conversation.id} 
                    className="p-4 border-b hover:bg-gray-50 active:bg-gray-100 cursor-pointer"
                    onClick={() => handleOpenChat(conversation)}
                  >
                    <div className="flex items-start">
                      <div className="relative">
                        <Avatar className="w-12 h-12 rounded-full">
                          <img 
                            src={conversation.doctor.avatar} 
                            alt={conversation.doctor.name} 
                            className="w-full h-full object-cover"
                          />
                        </Avatar>
                        {conversation.doctor.lastSeen === "En ligne" && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                        )}
                      </div>

                      <div className="ml-3 flex-1">
                        <div className="flex justify-between items-center">
                          <h3 className="font-medium text-gray-900">{conversation.doctor.name}</h3>
                          <span className="text-xs text-gray-500">{formatDate(conversation.lastMessageTime)}</span>
                        </div>
                        <p className="text-sm text-gray-500 line-clamp-1">{conversation.lastMessage}</p>
                      </div>

                      {conversation.unreadCount > 0 && (
                        <div className="ml-2 bg-health-primary text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                          {conversation.unreadCount}
                        </div>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-gray-500">
                  Aucune conversation trouvée
                </div>
              )}
            </div>
          </>
        ) : (
          // Chat View
          <>
            {/* Chat Header */}
            <div className="bg-white border-b p-3 flex items-center sticky top-0 z-10">
              <button 
                onClick={handleBackToList}
                className="mr-2 p-1 rounded-full hover:bg-gray-100"
              >
                <ArrowLeft size={20} />
              </button>
              
              <div className="flex items-center flex-1">
                <Avatar className="w-10 h-10 rounded-full mr-2">
                  <img 
                    src={activeConversation.doctor.avatar} 
                    alt={activeConversation.doctor.name} 
                    className="w-full h-full object-cover"
                  />
                </Avatar>
                <div>
                  <h2 className="font-semibold text-gray-900">{activeConversation.doctor.name}</h2>
                  <p className="text-xs text-green-600">{activeConversation.doctor.lastSeen}</p>
                </div>
              </div>
              
              <button className="text-gray-600 p-1 rounded-full hover:bg-gray-100">
                <MoreVertical size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 bg-gray-50 overflow-y-auto space-y-4">
              {activeConversation.messages.map((message) => (
                <MessageContent key={message.id} message={message} />
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Attachment Preview */}
            {attachmentInfo && (
              <div className="bg-health-secondary p-2 flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-sm font-medium text-health-primary">
                    {attachmentInfo.type === "image" ? "Image" : 
                     attachmentInfo.type === "audio" ? "Message vocal" :
                     attachmentInfo.type === "video" ? "Vidéo" : "Document"}
                  </span>
                </div>
                <button
                  onClick={handleCancelAttachment}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
            )}

            {/* Message Input */}
            <div className="p-3 bg-white border-t flex items-center sticky bottom-0 z-10">
              {!isRecording && (
                <FileUpload onFileUploaded={handleFileUploaded} />
              )}
              
              {!isRecording && !attachmentInfo && (
                <Input
                  type="text"
                  placeholder="Écrivez votre message..."
                  className="flex-1 border border-gray-300 rounded-full py-2 px-4 focus:outline-none focus:ring-1 focus:ring-health-primary mx-2"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
              )}
              
              {!attachmentInfo && (
                <VoiceRecorder 
                  onRecordingComplete={handleVoiceUploaded} 
                  isRecording={isRecording}
                  setIsRecording={setIsRecording}
                />
              )}
              
              {!isRecording && (
                <Button 
                  className={cn(
                    "ml-2 text-white p-2 rounded-full h-10 w-10",
                    (newMessage.trim() !== "" || attachmentInfo) 
                      ? "bg-health-primary" 
                      : "bg-gray-300"
                  )}
                  onClick={handleSendMessage}
                  disabled={newMessage.trim() === "" && !attachmentInfo}
                >
                  <Send size={18} />
                </Button>
              )}
            </div>
          </>
        )}
      </div>
    </MobileLayout>
  );
};

export default Messages;
