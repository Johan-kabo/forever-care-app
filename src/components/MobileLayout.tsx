
import React from "react";
import { Home, Calendar, MessageSquare, User } from "lucide-react";
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
    { icon: <MessageSquare size={24} />, path: "/messages", label: "Messages" },
    { icon: <User size={24} />, path: "/profile", label: "Profile" },
  ];

  return (
    <div className="max-w-md mx-auto min-h-screen relative bg-white overflow-hidden flex flex-col">
      {/* Status Bar - simulated */}
      <div className="h-10 bg-health-primary w-full flex justify-between items-center px-4 text-white text-xs">
        <div>9:41</div>
        <div className="flex items-center gap-1">
          <div className="h-2 w-2 rounded-full bg-white"></div>
          <div className="h-2 w-2 rounded-full bg-white"></div>
          <div className="h-2 w-2 rounded-full bg-white"></div>
          <div className="h-2 w-2 rounded-full bg-white"></div>
          <div className="h-2 w-2 rounded-full bg-white"></div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>

      {/* Bottom Navigation */}
      <div className="h-16 bg-white border-t border-gray-200 grid grid-cols-4 items-center">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "flex flex-col items-center justify-center h-full",
              currentPath === item.path
                ? "text-health-primary"
                : "text-gray-400"
            )}
          >
            {React.cloneElement(item.icon as React.ReactElement, {
              className: cn(
                "transition-colors duration-200",
                currentPath === item.path
                  ? "text-health-primary"
                  : "text-gray-400"
              ),
            })}
          </Link>
        ))}
      </div>

      {/* iPhone Home Indicator */}
      <div className="h-1 w-1/3 mx-auto bg-black rounded-full my-2"></div>
    </div>
  );
};

export default MobileLayout;
