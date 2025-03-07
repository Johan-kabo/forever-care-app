
import React, { useState } from "react";
import MobileLayout from "@/components/MobileLayout";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Switch } from "@/components/ui/switch";

const NotificationSettings = () => {
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
    general: true,
    sound: true,
    call: true,
    vibration: false
  });

  const handleToggle = (setting: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
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
        <div className="flex items-center justify-between">
          <span className="text-base font-medium">Notification générale</span>
          <Switch 
            checked={settings.general}
            onCheckedChange={() => handleToggle('general')}
            className="data-[state=checked]:bg-health-primary"
          />
        </div>

        <div className="flex items-center justify-between">
          <span className="text-base font-medium">Son</span>
          <Switch 
            checked={settings.sound}
            onCheckedChange={() => handleToggle('sound')}
            className="data-[state=checked]:bg-health-primary"
          />
        </div>

        <div className="flex items-center justify-between">
          <span className="text-base font-medium">Appel sonore</span>
          <Switch 
            checked={settings.call}
            onCheckedChange={() => handleToggle('call')}
            className="data-[state=checked]:bg-health-primary"
          />
        </div>

        <div className="flex items-center justify-between">
          <span className="text-base font-medium">Vibrer</span>
          <Switch 
            checked={settings.vibration}
            onCheckedChange={() => handleToggle('vibration')}
            className="data-[state=checked]:bg-health-primary"
          />
        </div>
      </div>
    </MobileLayout>
  );
};

export default NotificationSettings;
