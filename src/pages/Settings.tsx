
import React from "react";
import MobileLayout from "@/components/MobileLayout";
import { Bell, Key, User, ChevronRight, ChevronLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const SettingsMenuItem = ({ 
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
      <div className="h-12 w-12 rounded-full bg-health-primary flex items-center justify-center">
        {icon}
      </div>
      <span className="font-medium text-base">{title}</span>
    </div>
    <ChevronRight className="text-gray-400" size={20} />
  </Link>
);

const Settings = () => {
  const navigate = useNavigate();
  
  return (
    <MobileLayout>
      {/* Header */}
      <div className="bg-health-primary text-white p-6 pt-5 pb-8 rounded-b-3xl mb-4">
        <div className="flex items-center">
          <button onClick={() => navigate(-1)} className="mr-4">
            <ChevronLeft size={24} className="text-white" />
          </button>
          <h1 className="text-xl font-semibold">Paramètres</h1>
        </div>
      </div>

      {/* Menu Items */}
      <div className="px-4">
        <SettingsMenuItem 
          icon={<Bell size={22} className="text-white" />} 
          title="Paramètres de notification" 
          to="/settings/notifications" 
        />
        <SettingsMenuItem 
          icon={<Key size={22} className="text-white" />} 
          title="Gestion des mots de passe" 
          to="/settings/password" 
        />
        <SettingsMenuItem 
          icon={<User size={22} className="text-white" />} 
          title="Supprimer le compte" 
          to="/settings/delete-account" 
        />
      </div>
    </MobileLayout>
  );
};

export default Settings;
