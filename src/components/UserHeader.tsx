
import React from "react";
import { Bell } from "lucide-react";

interface UserHeaderProps {
  name: string;
  avatarUrl: string;
}

const UserHeader: React.FC<UserHeaderProps> = ({ name, avatarUrl }) => {
  return (
    <div className="flex justify-between items-center mb-4 animate-fadeIn">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white">
          <img
            src={avatarUrl}
            alt={name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="flex flex-col">
          <div className="text-white text-sm font-normal">
            Hello, Welcome <span className="text-yellow-300">👋</span>
          </div>
          <div className="text-white text-xl font-semibold">{name}</div>
        </div>
      </div>
      <button className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm">
        <Bell size={20} className="text-white" />
      </button>
    </div>
  );
};

export default UserHeader;
