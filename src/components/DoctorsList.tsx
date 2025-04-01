
import React from "react";
import DoctorCard from "./DoctorCard";
import { useNavigate } from "react-router-dom";

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  clinic?: string;
  rating: number;
  imageUrl: string;
  reviews?: number;
  lastMessage?: string;
  lastMessageTime?: string;
  unreadCount?: number;
  lastSeen?: string;
}

interface DoctorsListProps {
  doctors: Doctor[];
  horizontal?: boolean;
  forMessages?: boolean;
  onSelectDoctor?: (doctor: Doctor) => void;
}

const DoctorsList: React.FC<DoctorsListProps> = ({ 
  doctors, 
  horizontal = false, 
  forMessages = false,
  onSelectDoctor 
}) => {
  const navigate = useNavigate();

  const handleDoctorClick = (doctor: Doctor) => {
    if (forMessages && onSelectDoctor) {
      onSelectDoctor(doctor);
    } else {
      navigate(`/doctor/${doctor.id}`);
    }
  };

  if (forMessages) {
    return (
      <div className="flex-1 overflow-y-auto">
        {doctors.length > 0 ? (
          doctors.map((doctor) => (
            <div 
              key={doctor.id} 
              className="p-4 border-b hover:bg-gray-50 active:bg-gray-100 cursor-pointer"
              onClick={() => handleDoctorClick(doctor)}
            >
              <div className="flex items-start">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <img 
                      src={doctor.imageUrl} 
                      alt={doctor.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {doctor.lastSeen === "En ligne" && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>

                <div className="ml-3 flex-1">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium text-gray-900">{doctor.name}</h3>
                    <span className="text-xs text-gray-500">{doctor.lastMessageTime}</span>
                  </div>
                  <p className="text-sm text-gray-500 line-clamp-1">{doctor.lastMessage}</p>
                </div>

                {(doctor.unreadCount && doctor.unreadCount > 0) && (
                  <div className="ml-2 bg-health-primary text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {doctor.unreadCount}
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="p-8 text-center text-gray-500">
            Aucune conversation trouvée
          </div>
        )}
      </div>
    );
  }

  if (horizontal) {
    return (
      <div className="animate-slideUp" style={{ animationDelay: "0.4s" }}>
        {doctors.map((doctor) => (
          <DoctorCard
            key={doctor.id}
            id={doctor.id}
            name={doctor.name}
            specialty={doctor.clinic ? `${doctor.specialty} | ${doctor.clinic}` : doctor.specialty}
            rating={doctor.rating}
            imageUrl={doctor.imageUrl}
            horizontal
            onClick={() => handleDoctorClick(doctor)}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 animate-slideUp" style={{ animationDelay: "0.4s" }}>
      {doctors.map((doctor) => (
        <DoctorCard
          key={doctor.id}
          id={doctor.id}
          name={doctor.name}
          specialty={doctor.specialty}
          rating={doctor.rating}
          imageUrl={doctor.imageUrl}
          onClick={() => handleDoctorClick(doctor)}
        />
      ))}
    </div>
  );
};

export default DoctorsList;
