import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MobileLayout from "@/components/MobileLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronRight, UserRound, Heart, Bell, Lock, HelpCircle, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import LogoutDialog from "@/components/LogoutDialog";

const Profile = () => {
  const navigate = useNavigate();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const menuItems = [
    {
      icon: <UserRound className="text-white" size={20} />,
      title: "Mon profil",
      path: "/profile/details",
      bgColor: "bg-blue-500"
    },
    {
      icon: <Heart className="text-white" size={20} />,
      title: "Médecins favoris",
      path: "/favourite-doctors",
      bgColor: "bg-red-500"
    },
    {
      icon: <Bell className="text-white" size={20} />,
      title: "Notifications",
      path: "/notifications",
      bgColor: "bg-yellow-500"
    },
    {
      icon: <Lock className="text-white" size={20} />,
      title: "Paramètres",
      path: "/settings",
      bgColor: "bg-purple-500"
    },
    {
      icon: <HelpCircle className="text-white" size={20} />,
      title: "Aide",
      path: "/help",
      bgColor: "bg-green-500"
    },
  ];

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        throw error;
      }
      
      localStorage.removeItem("isAuthenticated");
      toast({
        title: "Déconnexion réussie",
        description: "À bientôt!",
      });
      navigate("/login");
    } catch (error: any) {
      toast({
        title: "Erreur de déconnexion",
        description: error.message || "Une erreur est survenue lors de la déconnexion",
        variant: "destructive",
      });
    }
    setShowLogoutDialog(false);
  };

  return (
    <MobileLayout>
      {/* Header */}
      <div className="bg-health-primary text-white p-6 pt-8 pb-16 rounded-b-[30px] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-bl-full"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-tr-full"></div>
        
        <h1 className="text-2xl font-bold mb-2">Mon Profil</h1>
        <p className="text-white/80">Gérez vos informations personnelles</p>
      </div>

      {/* Profile Card */}
      <div className="px-4 -mt-10">
        <Card className="p-4 mb-6 flex items-center">
          <div className="h-16 w-16 rounded-full overflow-hidden mr-4 border-2 border-white">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop"
              alt="Profile"
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <h2 className="font-bold text-lg">Sophie Martin</h2>
            <p className="text-gray-500">sophie.martin@example.com</p>
          </div>
        </Card>

        {/* Menu Items */}
        <div className="space-y-3 mb-6">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-100"
            >
              <div className="flex items-center gap-3">
                <div className={`h-10 w-10 rounded-full ${item.bgColor} flex items-center justify-center`}>
                  {item.icon}
                </div>
                <span className="font-medium">{item.title}</span>
              </div>
              <ChevronRight size={20} className="text-gray-400" />
            </Link>
          ))}
        </div>

        {/* Logout Button */}
        <Button
          variant="outline"
          className="w-full flex items-center justify-center gap-2 border-red-500 text-red-500 hover:bg-red-50 hover:text-red-600"
          onClick={() => setShowLogoutDialog(true)}
        >
          <LogOut size={18} />
          Se déconnecter
        </Button>
      </div>

      {/* Logout Dialog */}
      {showLogoutDialog && (
        <LogoutDialog
          onClose={() => setShowLogoutDialog(false)}
          onConfirm={handleLogout}
        />
      )}
    </MobileLayout>
  );
};

export default Profile;