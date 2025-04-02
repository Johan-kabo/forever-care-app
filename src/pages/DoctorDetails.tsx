
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Users, Calendar, MessageCircle, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import AppointmentForm from "@/components/AppointmentForm";
import { toast } from "@/hooks/use-toast";
import { Star } from "lucide-react";

const DoctorDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data - in a real app, this would be fetched from an API
  const doctor = {
    id: id || "3",
    name: "Dr. Jenny Wilson",
    specialty: "Neurologist",
    clinic: "Vcare Clinic",
    rating: 5.0,
    reviews: 332,
    imageUrl: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=464&auto=format&fit=crop",
    patients: 120,
    experience: 7,
    about: "Dr. Carly Angel is the top most immunologists specialist in Crist Hospital in London, UK."
  };

  const handleAppointmentSubmit = (appointmentData: any) => {
    console.log("Appointment created:", appointmentData);
    toast({
      title: "Rendez-vous confirmé",
      description: `Vous avez un rendez-vous avec ${doctor.name} le ${appointmentData.date} à ${appointmentData.time}`,
    });
    navigate('/calendar');
  };

  const handleBookAppointment = () => {
    navigate('/appointment-booking', { state: { doctor } });
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="p-4 flex items-center">
        <button 
          onClick={() => navigate(-1)}
          className="p-2"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-semibold mx-auto">Mon Rendez-vous</h1>
      </div>
      
      {/* Doctor Image */}
      <div className="aspect-[4/3] bg-health-gray">
        <img 
          src={doctor.imageUrl} 
          alt={doctor.name}
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Doctor Info */}
      <div className="p-4">
        <div className="flex justify-between items-center mb-1">
          <h2 className="text-xl font-bold">{doctor.name}</h2>
          <div className="flex items-center gap-1">
            <Star size={16} className="text-yellow-400 fill-yellow-400" />
            <span className="font-medium">{doctor.rating.toFixed(1)}</span>
            <span className="text-gray-500 text-sm">({doctor.reviews} reviews)</span>
          </div>
        </div>
        <p className="text-gray-500">{doctor.specialty} | {doctor.clinic}</p>
        
        {/* Stats */}
        <div className="flex justify-between mt-6 mb-6">
          <div className="flex flex-col items-center">
            <div className="h-12 w-12 rounded-full bg-health-secondary flex items-center justify-center mb-1">
              <Users size={20} className="text-health-primary" />
            </div>
            <div className="text-center">
              <p className="font-semibold">{doctor.patients}+</p>
              <p className="text-gray-500 text-sm">Patients</p>
            </div>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="h-12 w-12 rounded-full bg-health-secondary flex items-center justify-center mb-1">
              <Calendar size={20} className="text-health-primary" />
            </div>
            <div className="text-center">
              <p className="font-semibold">{doctor.experience}+</p>
              <p className="text-gray-500 text-sm">Years Exp</p>
            </div>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="h-12 w-12 rounded-full bg-health-secondary flex items-center justify-center mb-1">
              <Star size={20} className="text-health-primary" />
            </div>
            <div className="text-center">
              <p className="font-semibold">4.9</p>
              <p className="text-gray-500 text-sm">Rating</p>
            </div>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="h-12 w-12 rounded-full bg-health-secondary flex items-center justify-center mb-1">
              <MessageCircle size={20} className="text-health-primary" />
            </div>
            <div className="text-center">
              <p className="font-semibold">100+</p>
              <p className="text-gray-500 text-sm">Reviews</p>
            </div>
          </div>
        </div>
        
        {/* About */}
        <div className="mb-6">
          <h3 className="font-semibold text-lg mb-2">About Me</h3>
          <p className="text-gray-500">
            {doctor.about} <Link to="#" className="text-health-primary">Read More...</Link>
          </p>
        </div>
        
        {/* Appointment Buttons */}
        <div className="px-4 mb-6">
          <button 
            onClick={handleBookAppointment}
            className="w-full bg-health-primary text-white py-3 rounded-xl flex items-center justify-center gap-2 mb-4"
          >
            <Calendar size={20} />
            <span>Prendre rendez-vous</span>
          </button>
          
          <button className="w-full border border-health-primary text-health-primary py-3 rounded-xl flex items-center justify-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="phone">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
            <span>Appeler directement</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorDetails;
