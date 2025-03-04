
import React from "react";
import DoctorCard from "./DoctorCard";

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  clinic?: string;
  rating: number;
  imageUrl: string;
  reviews?: number;
}

interface DoctorsListProps {
  doctors: Doctor[];
  horizontal?: boolean;
}

const DoctorsList: React.FC<DoctorsListProps> = ({ doctors, horizontal = false }) => {
  if (horizontal) {
    return (
      <div className="animate-slideUp" style={{ animationDelay: "0.4s" }}>
        {doctors.map((doctor, index) => (
          <DoctorCard
            key={doctor.id}
            name={doctor.name}
            specialty={doctor.clinic ? `${doctor.specialty} | ${doctor.clinic}` : doctor.specialty}
            rating={doctor.rating}
            imageUrl={doctor.imageUrl}
            horizontal
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
          name={doctor.name}
          specialty={doctor.specialty}
          rating={doctor.rating}
          imageUrl={doctor.imageUrl}
        />
      ))}
    </div>
  );
};

export default DoctorsList;
