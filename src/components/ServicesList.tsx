
import React from "react";
import ServiceCard from "./ServiceCard";
import { HeartPulse, Stethoscope, Baby, BrainCircuit, Thermometer, Eye, Tooth } from "lucide-react";

const services = [
  {
    id: "cardiology",
    name: "Cardiologie",
    icon: <HeartPulse size={24} color="white" />,
    color: "#FF6B6B"
  },
  {
    id: "general",
    name: "Médecine Générale",
    icon: <Stethoscope size={24} color="white" />,
    color: "#4D96FF"
  },
  {
    id: "pediatrics",
    name: "Pédiatrie",
    icon: <Baby size={24} color="white" />,
    color: "#5CE1E6"
  },
  {
    id: "neurology",
    name: "Neurologie",
    icon: <BrainCircuit size={24} color="white" />,
    color: "#9C67E7"
  },
  {
    id: "dermatology",
    name: "Dermatologie",
    icon: <Thermometer size={24} color="white" />,
    color: "#FF9F45"
  },
  {
    id: "ophthalmology",
    name: "Ophtalmologie",
    icon: <Eye size={24} color="white" />,
    color: "#38B000"
  },
  {
    id: "dentistry",
    name: "Dentiste",
    icon: <Tooth size={24} color="white" />,
    color: "#8338EC"
  },
];

const ServicesList: React.FC = () => {
  return (
    <div className="grid grid-cols-3 gap-3 animate-slideUp" style={{ animationDelay: "0.3s" }}>
      {services.map((service) => (
        <ServiceCard
          key={service.id}
          id={service.id}
          name={service.name}
          icon={service.icon}
          color={service.color}
        />
      ))}
    </div>
  );
};

export default ServicesList;
