
import React, { useState } from "react";
import MobileLayout from "@/components/MobileLayout";
import { ChevronLeft, BellRing } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

type NotificationSetting = {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
};

const NotificationSettings = () => {
  const navigate = useNavigate();
  const [settings, setSettings] = useState<NotificationSetting[]>([
    {
      id: "appointments",
      title: "Rendez-vous",
      description: "Notifications pour les rendez-vous à venir et les rappels",
      enabled: true
    },
    {
      id: "messages",
      title: "Messages",
      description: "Notifications pour les nouveaux messages des médecins",
      enabled: true
    },
    {
      id: "updates",
      title: "Mises à jour",
      description: "Notifications pour les mises à jour de l'application",
      enabled: false
    },
    {
      id: "promotions",
      title: "Promotions",
      description: "Offres et promotions de nos partenaires",
      enabled: false
    }
  ]);

  const handleToggle = (id: string) => {
    setSettings(prev => prev.map(setting => 
      setting.id === id ? { ...setting, enabled: !setting.enabled } : setting
    ));
    
    // Show toast for UX feedback
    toast.success("Paramètres de notification mis à jour");
  };

  const saveSettings = () => {
    // Here you would typically send these settings to an API
    toast.success("Paramètres de notification enregistrés");
    navigate(-1);
  };

  return (
    <MobileLayout>
      {/* Header */}
      <div className="bg-health-primary text-white p-6 pt-5 pb-8 rounded-b-3xl mb-4">
        <div className="flex items-center">
          <button onClick={() => navigate(-1)} className="mr-4">
            <ChevronLeft size={24} className="text-white" />
          </button>
          <h1 className="text-xl font-semibold">Paramètres de notification</h1>
        </div>
      </div>

      {/* Notification Options */}
      <div className="px-4 space-y-6">
        {settings.map((setting) => (
          <div key={setting.id} className="flex flex-col space-y-2">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-base font-medium">{setting.title}</span>
                <p className="text-sm text-gray-500">{setting.description}</p>
              </div>
              <Switch 
                checked={setting.enabled}
                onCheckedChange={() => handleToggle(setting.id)}
                className="data-[state=checked]:bg-health-primary"
              />
            </div>
          </div>
        ))}
        
        <div className="pt-4">
          <button 
            onClick={saveSettings}
            className="w-full bg-health-primary text-white py-3 rounded-xl font-medium"
          >
            Enregistrer les modifications
          </button>
        </div>
      </div>
    </MobileLayout>
  );
};

export default NotificationSettings;
