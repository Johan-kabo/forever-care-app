
import React from "react";
import MobileLayout from "@/components/MobileLayout";
import SearchBar from "@/components/SearchBar";
import CategoryTabs from "@/components/CategoryTabs";
import SectionHeader from "@/components/SectionHeader";
import DoctorsList from "@/components/DoctorsList";
import ServicesList from "@/components/ServicesList";
import { Bell, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  // Données des médecins
  const favouriteDoctors = [
    {
      id: "1",
      name: "Dr. Esther",
      specialty: "Dentist",
      rating: 4.5,
      imageUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=1170&auto=format&fit=crop"
    },
    {
      id: "2",
      name: "Dr. Warren",
      specialty: "Physician",
      rating: 4.8,
      imageUrl: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=387&auto=format&fit=crop"
    },
  ];

  const topDoctors = [
    {
      id: "3",
      name: "Dr. Jenny Wilson",
      specialty: "Neurologist",
      clinic: "Vcare Clinic",
      rating: 5.0,
      reviews: 332,
      imageUrl: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=464&auto=format&fit=crop"
    },
    {
      id: "4",
      name: "Dr. Claude Botoyie",
      specialty: "Dentist",
      clinic: "Zen X Clinic",
      rating: 4.0,
      reviews: 210,
      imageUrl: "https://images.unsplash.com/photo-1622902046580-2b47f47f5471?q=80&w=387&auto=format&fit=crop"
    },
    {
      id: "5",
      name: "Dr. Queen Norma",
      specialty: "Dermatologist",
      rating: 3.8,
      reviews: 220,
      imageUrl: "https://images.unsplash.com/photo-1638202993928-7d113cdf04b9?q=80&w=387&auto=format&fit=crop"
    },
  ];

  return (
    <MobileLayout>
      <div className="flex flex-col min-h-full">
        {/* Header with gradient */}
        <div className="bg-gradient-to-b from-health-primary to-blue-500 px-4 pt-4 pb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-white overflow-hidden border-2 border-white">
                <img 
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=464&auto=format&fit=crop" 
                  alt="avatar"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="text-white">
                <p className="text-sm font-light">Bonjour 👋</p>
                <h2 className="font-bold text-xl">Savannah Nguyen</h2>
              </div>
            </div>
            <div className="flex gap-3">
              <Link to="/calendar" className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
                <Calendar size={20} color="white" />
              </Link>
              <Link to="/notifications" className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
                <Bell size={20} color="white" />
              </Link>
            </div>
          </div>
          <SearchBar />
        </div>

        {/* Main content */}
        <div className="px-4 pt-4 pb-20 flex-1">
          {/* Prochains rendez-vous */}
          <div className="mb-6 p-4 bg-blue-50 rounded-xl border border-blue-100">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold text-gray-900">Prochain rendez-vous</h3>
              <Link to="/calendar" className="text-health-primary text-sm font-medium">
                Voir tout
              </Link>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                <Calendar size={24} className="text-health-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">Dr. Jenny Wilson • 10:00</p>
                <p className="text-xs text-gray-500">Aujourd'hui, 15 juin 2024</p>
              </div>
            </div>
          </div>
          
          {/* Services médicaux */}
          <div className="mb-8">
            <SectionHeader title="Services médicaux" linkTo="/services" />
            <ServicesList />
          </div>
          
          <CategoryTabs />
          
          <div className="mb-8">
            <SectionHeader title="Médecins favoris" linkTo="/favourite-doctors" />
            <DoctorsList doctors={favouriteDoctors} />
          </div>

          <div>
            <SectionHeader title="Médecins recommandés" linkTo="/top-doctors" />
            <DoctorsList doctors={topDoctors} horizontal />
          </div>
        </div>
      </div>
    </MobileLayout>
  );
};

export default Index;
