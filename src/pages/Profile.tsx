
import React from "react";
import { useNavigate } from "react-router-dom";
import MobileLayout from "@/components/MobileLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronRight, UserRound, Heart, Bell, Lock, HelpCircle, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const Profile = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    toast({
      title: "Déconnexion réussie",
      description: "À bientôt!",
    });
    navigate("/login");
  };

  const menuItems = [
    {
      icon: <UserRound className="text-health-primary" />,
      title: "Mon profil",
      path: "/profile/details",
    },
    {
      icon: <Heart className="text-health-primary" />,
      title: "Médecins favoris",
      path: "/favourite-doctors",
    },
    {
      icon: <Bell className="text-health-primary" />,
      title: "Notifications",
      path: "/notifications",
    },
    {
      icon: <Lock className="text-health-primary" />,
      title: "Paramètres",
      path: "/settings",
    },
    {
      icon: <HelpCircle className="text-health-primary" />,
      title: "Aide",
      path: "/help",
    },
  ];

  return (
    <MobileLayout>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-6">Profil</h1>

        <div className="flex items-center bg-white rounded-xl p-4 shadow-sm mb-6">
          <div className="h-16 w-16 bg-health-gray rounded-full overflow-hidden mr-4">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop"
              alt="Profile"
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <h2 className="font-bold">Sophie Martin</h2>
            <p className="text-gray-500 text-sm">sophie.martin@example.com</p>
          </div>
        </div>

        <Card className="mb-6">
          <div className="divide-y">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className="flex items-center justify-between p-4 hover:bg-gray-50"
              >
                <div className="flex items-center">
                  <div className="mr-3">{item.icon}</div>
                  <span>{item.title}</span>
                </div>
                <ChevronRight size={20} className="text-gray-400" />
              </Link>
            ))}
          </div>
        </Card>

        <Button
          variant="outline"
          className="w-full flex items-center justify-center gap-2 border-red-500 text-red-500 hover:bg-red-50 hover:text-red-600 mt-6"
          onClick={handleLogout}
        >
          <LogOut size={18} />
          Se déconnecter
        </Button>
      </div>
    </MobileLayout>
  );
};

export default Profile;
