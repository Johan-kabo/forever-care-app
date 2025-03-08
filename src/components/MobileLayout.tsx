
import React from "react";
import { Home, Heart, ShoppingBag, Bell } from "lucide-react";
import { useLocation, Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface MobileLayoutProps {
  children: React.ReactNode;
}

const MobileLayout: React.FC<MobileLayoutProps> = ({ children }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    { icon: <Home size={24} />, path: "/", label: "Home" },
    { icon: <Heart size={24} />, path: "/calendar", label: "Favorites" },
    { icon: <ShoppingBag size={24} />, path: "/messages", label: "Shop" },
    { icon: <Bell size={24} />, path: "/profile", label: "Notifications" }
  ];

  return (
    <div className="max-w-md mx-auto min-h-screen relative bg-white overflow-hidden flex flex-col">
      {/* Main Content */}
      <main className="flex-1 overflow-auto pb-20">
        {children}
      </main>

      {/* Bottom Navigation - Simple Design */}
      <div className="h-20 fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-gray-100">
        <div className="grid grid-cols-4 h-full">
          {navItems.map((item) => {
            const isActive = currentPath === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className="flex flex-col items-center justify-center relative"
              >
                {React.cloneElement(item.icon as React.ReactElement, {
                  className: cn(
                    "transition-colors duration-200",
                    isActive ? "text-blue-600" : "text-gray-400"
                  ),
                  strokeWidth: isActive ? 2 : 1.5,
                })}
                
                {/* Small dot indicator for active item */}
                {isActive && (
                  <div className="absolute bottom-2 w-5 h-1 bg-blue-600 rounded-full" />
                )}
              </Link>
            );
          })}
        </div>
        
        {/* Horizontal line indicator at the bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200"></div>
      </div>
    </div>
  );
};

export default MobileLayout;
