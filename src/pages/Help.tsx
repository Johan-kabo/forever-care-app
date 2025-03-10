
import React from "react";
import MobileLayout from "@/components/MobileLayout";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Help = () => {
  const navigate = useNavigate();

  return (
    <MobileLayout>
      {/* Header */}
      <div className="bg-health-primary text-white p-6 pt-5 pb-8 rounded-b-3xl mb-4">
        <div className="flex items-center">
          <button onClick={() => navigate(-1)} className="mr-4">
            <ChevronLeft size={24} className="text-white" />
          </button>
          <h1 className="text-xl font-semibold">Centre d'aide</h1>
        </div>
      </div>

      {/* Content */}
      <div className="px-4">
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Comment pouvons-nous vous aider?</h2>
          <p className="text-gray-600 mb-4">
            Consultez nos sections d'aide ci-dessous ou contactez notre équipe de support.
          </p>
        </div>

        {/* Help Categories */}
        <div className="space-y-3">
          <div className="p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
            <h3 className="font-medium mb-1">Rendez-vous médicaux</h3>
            <p className="text-sm text-gray-500">Comment prendre, modifier ou annuler un rendez-vous</p>
          </div>
          
          <div className="p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
            <h3 className="font-medium mb-1">Messages et consultations</h3>
            <p className="text-sm text-gray-500">Communiquer avec votre médecin</p>
          </div>
          
          <div className="p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
            <h3 className="font-medium mb-1">Mon compte et paramètres</h3>
            <p className="text-sm text-gray-500">Gestion de votre profil et préférences</p>
          </div>
          
          <div className="p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
            <h3 className="font-medium mb-1">Paiements et facturation</h3>
            <p className="text-sm text-gray-500">Questions concernant les paiements et assurances</p>
          </div>
        </div>

        {/* Contact */}
        <div className="mt-8 p-4 bg-gray-50 rounded-xl">
          <h3 className="font-medium mb-2">Besoin d'aide supplémentaire?</h3>
          <p className="text-sm text-gray-600 mb-4">
            Notre équipe est disponible 7j/7 pour répondre à vos questions.
          </p>
          <button className="w-full py-3 bg-health-primary text-white rounded-xl">
            Contacter le support
          </button>
        </div>
      </div>
    </MobileLayout>
  );
};

export default Help;
