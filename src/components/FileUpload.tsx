
import React, { useRef } from "react";
import { Paperclip, FileImage, FileAudio, FileVideo, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { uploadFile, getFileTypeFromMime } from "@/utils/fileUpload";

interface FileUploadProps {
  onFileUploaded: (url: string, fileType: string) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileUploaded }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const fileType = getFileTypeFromMime(file.type);
    const url = await uploadFile(file, fileType);
    
    if (url) {
      onFileUploaded(url, fileType);
      
      // Reset the input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'image': return <FileImage size={16} />;
      case 'audio': return <FileAudio size={16} />;
      case 'video': return <FileVideo size={16} />;
      default: return <FileText size={16} />;
    }
  };

  return (
    <div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/*,audio/*,video/*,application/pdf,.doc,.docx,.txt"
      />
      <Button
        onClick={handleClick}
        variant="ghost"
        size="icon"
        className="text-health-primary hover:bg-health-secondary"
      >
        <Paperclip />
      </Button>
    </div>
  );
};

export default FileUpload;
