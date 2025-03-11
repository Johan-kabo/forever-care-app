
import React from "react";
import MobileLayout from "@/components/MobileLayout";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ServicesList from "@/components/ServicesList";

const Services = () => {
  const navigate = useNavigate();

  return (
    <MobileLayout>
      <div className="px-4 py-6">
        <div className="flex items-center mb-6">
          <button
            onClick={() => navigate(-1)}
            className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center mr-4"
          >
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-xl font-bold">Services médicaux</h1>
        </div>

        <p className="text-gray-600 mb-6">
          Consultez nos différents services médicaux et prenez rendez-vous avec nos spécialistes.
        </p>

        <ServicesList />
      </div>
    </MobileLayout>
  );
};

export default Services;
