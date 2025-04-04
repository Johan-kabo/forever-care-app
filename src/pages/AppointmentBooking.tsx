
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import MobileLayout from "@/components/MobileLayout";
import AppointmentForm from "@/components/AppointmentForm";
import { toast } from "@/hooks/use-toast";

const AppointmentBooking = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const doctor = location.state?.doctor || null;
  const [isLoading, setIsLoading] = useState(false);

  const handleAppointmentSubmit = (appointmentData: any) => {
    setIsLoading(true);
    console.log("Appointment created:", appointmentData);
    
    // Simulate an API call with a timeout
    setTimeout(() => {
      toast({
        title: "Rendez-vous confirmé",
        description: `Vous avez un rendez-vous avec ${appointmentData.doctorName} le ${appointmentData.date} Mai à ${appointmentData.time}`,
      });
      
      setIsLoading(false);
      // Navigate to calendar page after successful booking
      navigate('/calendar');
    }, 800);
  };

  // If no doctor was passed, redirect to the main page
  if (!doctor && !location.state) {
    navigate('/');
    return null;
  }

  return (
    <MobileLayout>
      <div className="h-full">
        <AppointmentForm 
          onSubmit={handleAppointmentSubmit} 
          doctor={doctor}
        />
      </div>
    </MobileLayout>
  );
};

export default AppointmentBooking;
