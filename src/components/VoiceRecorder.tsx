
import React, { useState, useRef } from "react";
import { Mic, Square, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { uploadFile } from "@/utils/fileUpload";

interface VoiceRecorderProps {
  onRecordingComplete: (audioUrl: string) => void;
  isRecording: boolean;
  setIsRecording: (isRecording: boolean) => void;
}

const VoiceRecorder: React.FC<VoiceRecorderProps> = ({ 
  onRecordingComplete,
  isRecording,
  setIsRecording
}) => {
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];
      
      mediaRecorder.ondataavailable = (e) => {
        chunksRef.current.push(e.data);
      };
      
      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(chunksRef.current, { type: 'audio/webm' });
        setAudioBlob(audioBlob);
        
        // Stop all tracks in the stream
        stream.getTracks().forEach(track => track.stop());
      };
      
      // Start recording
      mediaRecorder.start();
      setIsRecording(true);
      
      // Start timer
      setRecordingTime(0);
      timerRef.current = setInterval(() => {
        setRecordingTime(prevTime => prevTime + 1);
      }, 1000);
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      // Clear timer
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
  };

  const sendAudio = async () => {
    if (audioBlob) {
      const file = new File([audioBlob], `audio-${Date.now()}.webm`, { type: 'audio/webm' });
      const url = await uploadFile(file, "audio");
      
      if (url) {
        onRecordingComplete(url);
        setAudioBlob(null);
      }
    }
  };

  const cancelRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setAudioBlob(null);
      
      // Clear timer
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex items-center space-x-2">
      {!isRecording && !audioBlob ? (
        <Button
          onClick={startRecording}
          variant="ghost"
          size="icon"
          className="text-health-primary hover:bg-health-secondary"
        >
          <Mic />
        </Button>
      ) : isRecording ? (
        <div className="flex items-center space-x-2 bg-red-50 px-3 py-2 rounded-full">
          <div className="animate-pulse w-2 h-2 bg-red-500 rounded-full" />
          <span className="text-sm font-medium text-red-500">{formatTime(recordingTime)}</span>
          <Button
            onClick={stopRecording}
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-red-500 hover:bg-red-100"
          >
            <Square size={16} />
          </Button>
        </div>
      ) : (
        <div className="flex items-center space-x-2">
          <Button
            onClick={sendAudio}
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-health-primary hover:bg-health-secondary"
          >
            <Send size={16} />
          </Button>
          <Button
            onClick={cancelRecording}
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-gray-500 hover:bg-gray-100"
          >
            <Square size={16} />
          </Button>
        </div>
      )}
    </div>
  );
};

export default VoiceRecorder;
