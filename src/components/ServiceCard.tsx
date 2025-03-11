
import React from "react";
import { useNavigate } from "react-router-dom";

interface ServiceCardProps {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ id, name, icon, color }) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate(`/service/${id}`);
  };

  return (
    <div
      className="rounded-xl p-4 flex flex-col items-center cursor-pointer animate-slideUp"
      style={{ backgroundColor: `${color}20` }}
      onClick={handleClick}
    >
      <div 
        className="w-12 h-12 rounded-full flex items-center justify-center mb-2" 
        style={{ backgroundColor: color }}
      >
        {icon}
      </div>
      <span className="text-sm font-medium text-center text-gray-800">{name}</span>
    </div>
  );
};

export default ServiceCard;
