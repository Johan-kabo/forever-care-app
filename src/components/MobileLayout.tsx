
import React from "react";
import { Home, Calendar, MessageCircle, User } from "lucide-react";
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
    { icon: <Calendar size={24} />, path: "/calendar", label: "Calendar" },
    { icon: <MessageCircle size={22} />, path: "/messages", label: "Messages" },
    { icon: <User size={24} />, path: "/profile", label: "Profile" }
  ];

  return (
    <div className="max-w-md mx-auto min-h-screen relative bg-white overflow-hidden flex flex-col">
      {/* Main Content */}
      <main className="flex-1 overflow-auto pb-20">
        {children}
      </main>

      {/* Bottom Navigation - Fun Design */}
      <div className="h-20 fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white">
        {/* Curved background with gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-100 via-blue-50 to-purple-100 rounded-t-3xl shadow-lg"></div>
        
        {/* Nav items */}
        <div className="relative grid grid-cols-4 h-full">
          {navItems.map((item) => {
            const isActive = currentPath === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className="flex flex-col items-center justify-center"
              >
                {/* Indicator for active item */}
                {isActive && (
                  <div className="absolute top-0 w-12 h-1 bg-health-primary rounded-full animate-pulse" />
                )}
                
                {/* Icon container with animations */}
                <div 
                  className={cn(
                    "flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300",
                    isActive 
                      ? "bg-health-primary shadow-md shadow-health-primary/20 -translate-y-2" 
                      : "bg-white border border-gray-100 hover:bg-health-secondary hover:-translate-y-1"
                  )}
                >
                  {React.cloneElement(item.icon as React.ReactElement, {
                    className: cn(
                      "transition-colors duration-200",
                      isActive ? "text-white" : "text-gray-500"
                    ),
                    strokeWidth: isActive ? 2 : 1.5,
                  })}
                </div>
                
                {/* Label */}
                <span className={cn(
                  "text-xs mt-1 font-medium",
                  isActive ? "text-health-primary" : "text-gray-400"
                )}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MobileLayout;
