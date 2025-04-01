
import React from "react";
import { cn } from "@/lib/utils";

interface MessageContentProps {
  message: {
    text: string;
    time: string;
    isDoctor: boolean;
    message_type?: string;
    attachment_url?: string;
  };
}

const MessageContent: React.FC<MessageContentProps> = ({ message }) => {
  const renderContent = () => {
    switch (message.message_type) {
      case "audio":
        return (
          <div className="mb-1">
            <audio src={message.attachment_url} controls className="max-w-full" />
            <p className="mt-1">{message.text}</p>
          </div>
        );
      case "image":
        return (
          <div className="mb-1">
            <img 
              src={message.attachment_url} 
              alt="Image"
              className="max-w-full rounded-lg mb-1 max-h-60 object-cover" 
            />
            <p>{message.text}</p>
          </div>
        );
      case "video":
        return (
          <div className="mb-1">
            <video src={message.attachment_url} controls className="max-w-full rounded-lg mb-1" />
            <p>{message.text}</p>
          </div>
        );
      case "document":
        return (
          <div className="mb-1">
            <a 
              href={message.attachment_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 underline mb-1 block"
            >
              Télécharger le document
            </a>
            <p>{message.text}</p>
          </div>
        );
      default:
        return <p className="break-words">{message.text}</p>;
    }
  };

  return (
    <div 
      className={cn(
        "max-w-[80%] p-3 rounded-t-xl",
        message.isDoctor 
          ? "bg-white rounded-br-xl rounded-bl-none ml-0 mr-auto shadow-sm" 
          : "bg-health-primary text-white rounded-bl-xl rounded-br-none mr-0 ml-auto"
      )}
    >
      {renderContent()}
      <span className={cn(
        "text-xs block mt-1 text-right", 
        message.isDoctor ? "text-gray-500" : "text-white/80"
      )}>
        {message.time}
      </span>
    </div>
  );
};

export default MessageContent;
