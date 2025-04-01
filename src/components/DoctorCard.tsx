
import React from "react";
import { Star } from "lucide-react";

interface DoctorCardProps {
  id?: string;
  name: string;
  specialty: string;
  rating: number;
  imageUrl: string;
  horizontal?: boolean;
  onClick?: () => void;
}

const DoctorCard: React.FC<DoctorCardProps> = ({
  id = "1",
  name,
  specialty,
  rating,
  imageUrl,
  horizontal = false,
  onClick,
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };
  
  if (horizontal) {
    return (
      <div 
        className="flex items-center gap-4 p-3 bg-white rounded-xl card-shadow mb-4 animate-slideUp cursor-pointer"
        onClick={handleClick}
      >
        <div className="w-20 h-20 rounded-xl overflow-hidden">
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <h3 className="font-semibold text-gray-900">{name}</h3>
            <button>
              <svg width="16" height="4" viewBox="0 0 16 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 2C2 2.55228 1.55228 3 1 3C0.447715 3 0 2.55228 0 2C0 1.44772 0.447715 1 1 1C1.55228 1 2 1.44772 2 2Z" fill="#212121"/>
                <path d="M9 2C9 2.55228 8.55229 3 8 3C7.44772 3 7 2.55228 7 2C7 1.44772 7.44772 1 8 1C8.55229 1 9 1.44772 9 2Z" fill="#212121"/>
                <path d="M16 2C16 2.55228 15.5523 3 15 3C14.4477 3 14 2.55228 14 2C14 1.44772 14.4477 1 15 1C15.5523 1 16 1.44772 16 2Z" fill="#212121"/>
              </svg>
            </button>
          </div>
          <p className="text-sm text-gray-500">{specialty}</p>
          <div className="flex items-center mt-1">
            <Star size={16} className="text-yellow-400 fill-yellow-400" />
            <span className="text-sm font-medium ml-1">{rating}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="rounded-xl overflow-hidden bg-white card-shadow animate-slideUp cursor-pointer"
      onClick={handleClick}
    >
      <div className="aspect-square overflow-hidden">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="p-3">
        <div className="flex justify-between items-center mb-1">
          <h3 className="font-semibold text-gray-900">{name}</h3>
          <div className="flex items-center">
            <Star size={14} className="text-yellow-400 fill-yellow-400" />
            <span className="text-sm font-medium ml-1">{rating}</span>
          </div>
        </div>
        <p className="text-sm text-gray-500">{specialty}</p>
      </div>
    </div>
  );
};

export default DoctorCard;
