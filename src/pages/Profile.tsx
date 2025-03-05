
import React from "react";
import MobileLayout from "@/components/MobileLayout";
import { User, Settings, HelpCircle, LogOut, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const ProfileMenuItem = ({ 
  icon, 
  title, 
  to = "#" 
}: { 
  icon: React.ReactNode; 
  title: string; 
  to?: string;
}) => (
  <Link to={to} className="flex items-center justify-between p-4 bg-white rounded-xl mb-3">
    <div className="flex items-center gap-3">
      <div className="h-10 w-10 rounded-xl bg-health-primary flex items-center justify-center">
        {icon}
      </div>
      <span className="font-medium text-base">{title}</span>
    </div>
    <ChevronRight className="text-gray-400" size={20} />
  </Link>
);

const Profile = () => {
  return (
    <MobileLayout>
      {/* User Profile Header */}
      <div className="bg-health-primary text-white p-6 pt-5 pb-8 rounded-b-3xl mb-4">
        <div className="flex items-center">
          <div className="relative">
            <img 
              src="/lovable-uploads/5bf871cd-3793-41a5-9a81-59bb21e3585a.png"
              alt="Profile" 
              className="w-16 h-16 rounded-full object-cover border-2 border-white" 
            />
            <button className="absolute bottom-0 right-0 bg-white rounded-full p-1">
              <User size={14} className="text-health-primary" />
            </button>
          </div>
          <div className="ml-4">
            <h2 className="text-xl font-semibold">Savannah Nguyen</h2>
            <p className="text-sm opacity-90">+237 677732845</p>
            <p className="text-sm opacity-90">savannahnngue@gmail.com</p>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="px-4">
        <ProfileMenuItem 
          icon={<User size={22} className="text-white" />} 
          title="Profil" 
        />
        <ProfileMenuItem 
          icon={<Settings size={22} className="text-white" />} 
          title="Paramètres" 
        />
        <ProfileMenuItem 
          icon={<HelpCircle size={22} className="text-white" />} 
          title="Aide" 
        />
        <ProfileMenuItem 
          icon={<LogOut size={22} className="text-white" />} 
          title="Déconnexion" 
        />
      </div>
    </MobileLayout>
  );
};

export default Profile;
