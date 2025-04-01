
import { supabase } from "@/integrations/supabase/client";
import { v4 as uuidv4 } from "uuid";

export type FileType = "image" | "audio" | "document" | "video";

export const uploadFile = async (
  file: File,
  fileType: FileType
): Promise<string | null> => {
  try {
    const user = (await supabase.auth.getUser()).data.user;
    if (!user) throw new Error("User not authenticated");
    
    const userId = user.id;
    const fileExt = file.name.split(".").pop();
    const fileName = `${uuidv4()}.${fileExt}`;
    const filePath = `${userId}/${fileType}/${fileName}`;
    
    const { error } = await supabase.storage
      .from("chat_attachments")
      .upload(filePath, file);
      
    if (error) throw error;
    
    const { data } = supabase.storage
      .from("chat_attachments")
      .getPublicUrl(filePath);
      
    return data.publicUrl;
  } catch (error) {
    console.error("Error uploading file:", error);
    return null;
  }
};

export const getFileTypeFromMime = (mimeType: string): FileType => {
  if (mimeType.startsWith("image/")) return "image";
  if (mimeType.startsWith("audio/")) return "audio";
  if (mimeType.startsWith("video/")) return "video";
  return "document";
};
