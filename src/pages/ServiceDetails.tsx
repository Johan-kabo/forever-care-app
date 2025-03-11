
import React from "react";
import MobileLayout from "@/components/MobileLayout";
import { ChevronLeft, Calendar, HeartPulse, Stethoscope, Baby, BrainCircuit, Thermometer, Eye, Smile } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import DoctorsList from "@/components/DoctorsList";

// Définition des services
const servicesData = {
  cardiology: {
    name: "Cardiologie",
    icon: <HeartPulse size={32} className="text-white" />,
    color: "#FF6B6B",
    description: "La cardiologie est la branche de la médecine qui étudie le cœur et ses maladies.",
    doctors: [
      {
        id: "101",
        name: "Dr. Marion Blanc",
        specialty: "Cardiologue",
        rating: 4.9,
        imageUrl: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=387&auto=format&fit=crop"
      },
      {
        id: "102",
        name: "Dr. Thomas Lepic",
        specialty: "Cardiologue",
        rating: 4.7,
        imageUrl: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=1170&auto=format&fit=crop"
      }
    ]
  },
  general: {
    name: "Médecine Générale",
    icon: <Stethoscope size={32} className="text-white" />,
    color: "#4D96FF",
    description: "La médecine générale est la branche de la médecine qui traite les problèmes de santé courants.",
    doctors: [
      {
        id: "201",
        name: "Dr. Martin Durand",
        specialty: "Médecin généraliste",
        rating: 4.8,
        imageUrl: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=464&auto=format&fit=crop"
      }
    ]
  },
  pediatrics: {
    name: "Pédiatrie",
    icon: <Baby size={32} className="text-white" />,
    color: "#5CE1E6",
    description: "La pédiatrie est la branche de la médecine qui étudie le développement et les maladies des enfants.",
    doctors: [
      {
        id: "301",
        name: "Dr. Sophie Martin",
        specialty: "Pédiatre",
        rating: 5.0,
        imageUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=1170&auto=format&fit=crop"
      }
    ]
  },
  neurology: {
    name: "Neurologie",
    icon: <BrainCircuit size={32} className="text-white" />,
    color: "#9C67E7",
    description: "La neurologie est la spécialité médicale qui étudie et traite les maladies du système nerveux.",
    doctors: [
      {
        id: "401",
        name: "Dr. Julie Noire",
        specialty: "Neurologue",
        rating: 4.6,
        imageUrl: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=387&auto=format&fit=crop"
      }
    ]
  },
  dermatology: {
    name: "Dermatologie",
    icon: <Thermometer size={32} className="text-white" />,
    color: "#FF9F45",
    description: "La dermatologie est la spécialité médicale qui étudie la peau, ses maladies et leurs traitements.",
    doctors: [
      {
        id: "501",
        name: "Dr. Claire Dubois",
        specialty: "Dermatologue",
        rating: 4.7,
        imageUrl: "https://images.unsplash.com/photo-1638202993928-7d113cdf04b9?q=80&w=387&auto=format&fit=crop"
      }
    ]
  },
  ophthalmology: {
    name: "Ophtalmologie",
    icon: <Eye size={32} className="text-white" />,
    color: "#38B000",
    description: "L'ophtalmologie est la spécialité médicale qui étudie et soigne les yeux et leurs maladies.",
    doctors: [
      {
        id: "601",
        name: "Dr. Marc Petit",
        specialty: "Ophtalmologue",
        rating: 4.5,
        imageUrl: "https://images.unsplash.com/photo-1622902046580-2b47f47f5471?q=80&w=387&auto=format&fit=crop"
      }
    ]
  },
  dentistry: {
    name: "Dentiste",
    icon: <Smile size={32} className="text-white" />,
    color: "#8338EC",
    description: "La dentisterie est l'art et la science du diagnostic, du traitement et de la prévention des maladies des dents.",
    doctors: [
      {
        id: "701",
        name: "Dr. Antoine Blanc",
        specialty: "Dentiste",
        rating: 4.8,
        imageUrl: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=464&auto=format&fit=crop"
      }
    ]
  }
};

const ServiceDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  
  // Si l'ID n'existe pas dans les données, rediriger vers la page des services
  if (!id || !servicesData[id as keyof typeof servicesData]) {
    navigate('/services');
    return null;
  }
  
  const service = servicesData[id as keyof typeof servicesData];

  const handleBookAppointment = () => {
    navigate('/calendar');
  };

  return (
    <MobileLayout>
      <div className="flex flex-col min-h-full">
        {/* Header with color from service */}
        <div 
          className="px-4 pt-10 pb-6 relative" 
          style={{ backgroundColor: service.color }}
        >
          <button
            onClick={() => navigate(-1)}
            className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center absolute top-4 left-4"
          >
            <ChevronLeft size={24} color="white" />
          </button>
          
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-3">
              {service.icon}
            </div>
            <h1 className="text-2xl font-bold text-white mb-1">{service.name}</h1>
          </div>
        </div>

        {/* Main content */}
        <div className="px-4 py-6">
          <div className="bg-white rounded-xl p-4 shadow-sm mb-6">
            <h2 className="text-lg font-semibold mb-2">À propos</h2>
            <p className="text-gray-700">{service.description}</p>
          </div>
          
          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-4">Spécialistes disponibles</h2>
            <DoctorsList doctors={service.doctors} horizontal />
          </div>
          
          <button 
            onClick={handleBookAppointment}
            className="w-full bg-health-primary text-white py-3 rounded-xl font-medium flex items-center justify-center gap-2"
          >
            <Calendar size={20} />
            <span>Prendre rendez-vous</span>
          </button>
        </div>
      </div>
    </MobileLayout>
  );
};

export default ServiceDetails;
