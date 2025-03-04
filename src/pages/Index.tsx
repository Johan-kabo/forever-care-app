
import React from "react";
import MobileLayout from "@/components/MobileLayout";
import SearchBar from "@/components/SearchBar";
import CategoryTabs from "@/components/CategoryTabs";
import SectionHeader from "@/components/SectionHeader";
import DoctorsList from "@/components/DoctorsList";
import { Bell } from "lucide-react";
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
        <div className="bg-health-primary px-4 pt-4 pb-6">
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
                <p className="text-sm font-light">Hello, Welcome 👋</p>
                <h2 className="font-bold text-xl">Savannah Nguyen</h2>
              </div>
            </div>
            <Link to="/notifications" className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
              <Bell size={20} color="white" />
            </Link>
          </div>
          <SearchBar />
        </div>

        {/* Main content */}
        <div className="px-4 pt-4 pb-20 flex-1">
          <CategoryTabs />
          
          <div className="mb-8">
            <SectionHeader title="Favourite Doctor" linkTo="/favourite-doctors" />
            <DoctorsList doctors={favouriteDoctors} />
          </div>

          <div>
            <SectionHeader title="Top Doctor" linkTo="/top-doctors" />
            <DoctorsList doctors={topDoctors} horizontal />
          </div>
        </div>
      </div>
    </MobileLayout>
  );
};

export default Index;
