
import React, { useState } from "react";
import MobileLayout from "@/components/MobileLayout";
import { ChevronLeft, User, Mail, Phone, MapPin, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProfileDetails = () => {
  const navigate = useNavigate();
  
  // Données du profil (dans une application réelle, ces données seraient chargées depuis une API)
  const [profile] = useState({
    name: "Savannah Nguyen",
    email: "savannahnngue@gmail.com",
    phone: "+237 677732845",
    address: "8502 Preston Rd. Inglewood, Maine",
    dob: "24 Février 1995",
    bloodType: "B+",
    height: "168 cm",
    weight: "65 kg"
  });

  return (
    <MobileLayout>
      {/* Header */}
      <div className="bg-health-primary text-white p-6 pt-5 pb-8 rounded-b-3xl mb-4">
        <div className="flex items-center">
          <button onClick={() => navigate(-1)} className="mr-4">
            <ChevronLeft size={24} className="text-white" />
          </button>
          <h1 className="text-xl font-semibold">Détails du profil</h1>
        </div>
      </div>

      {/* Profile Image */}
      <div className="flex justify-center mb-6">
        <div className="relative">
          <img 
            src="/lovable-uploads/5bf871cd-3793-41a5-9a81-59bb21e3585a.png"
            alt="Profile" 
            className="w-24 h-24 rounded-full object-cover border-2 border-white shadow-md" 
          />
          <button className="absolute bottom-0 right-0 bg-health-primary text-white rounded-full p-2">
            <User size={16} />
          </button>
        </div>
      </div>

      {/* Personal Information */}
      <div className="px-4">
        <h2 className="text-lg font-semibold mb-4">Informations personnelles</h2>
        
        <div className="space-y-4">
          <div className="flex items-center p-3 bg-white rounded-xl border border-gray-100">
            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
              <User size={20} className="text-health-primary" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Nom complet</p>
              <p className="font-medium">{profile.name}</p>
            </div>
          </div>
          
          <div className="flex items-center p-3 bg-white rounded-xl border border-gray-100">
            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
              <Mail size={20} className="text-health-primary" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium">{profile.email}</p>
            </div>
          </div>
          
          <div className="flex items-center p-3 bg-white rounded-xl border border-gray-100">
            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
              <Phone size={20} className="text-health-primary" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Téléphone</p>
              <p className="font-medium">{profile.phone}</p>
            </div>
          </div>
          
          <div className="flex items-center p-3 bg-white rounded-xl border border-gray-100">
            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
              <MapPin size={20} className="text-health-primary" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Adresse</p>
              <p className="font-medium">{profile.address}</p>
            </div>
          </div>
          
          <div className="flex items-center p-3 bg-white rounded-xl border border-gray-100">
            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
              <Calendar size={20} className="text-health-primary" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Date de naissance</p>
              <p className="font-medium">{profile.dob}</p>
            </div>
          </div>
        </div>
        
        {/* Medical Information */}
        <h2 className="text-lg font-semibold mt-8 mb-4">Informations médicales</h2>
        
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="p-4 bg-white rounded-xl border border-gray-100 text-center">
            <p className="text-sm text-gray-500 mb-1">Groupe sanguin</p>
            <p className="text-xl font-bold text-health-primary">{profile.bloodType}</p>
          </div>
          
          <div className="p-4 bg-white rounded-xl border border-gray-100 text-center">
            <p className="text-sm text-gray-500 mb-1">Taille</p>
            <p className="text-xl font-bold text-health-primary">{profile.height}</p>
          </div>
          
          <div className="p-4 bg-white rounded-xl border border-gray-100 text-center">
            <p className="text-sm text-gray-500 mb-1">Poids</p>
            <p className="text-xl font-bold text-health-primary">{profile.weight}</p>
          </div>
        </div>
        
        {/* Edit Button */}
        <button className="w-full py-3 bg-health-primary text-white rounded-xl mb-8">
          Modifier le profil
        </button>
      </div>
    </MobileLayout>
  );
};

export default ProfileDetails;
