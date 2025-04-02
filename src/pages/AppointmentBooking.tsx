
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AppointmentForm from "@/components/AppointmentForm";
import { toast } from "@/hooks/use-toast";

const AppointmentBooking = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const doctor = location.state?.doctor || null;

  const handleAppointmentSubmit = (appointmentData: any) => {
    console.log("Appointment created:", appointmentData);
    toast({
      title: "Rendez-vous confirmé",
      description: `Vous avez un rendez-vous avec ${appointmentData.doctorName} le ${appointmentData.date} à ${appointmentData.time}`,
    });
    navigate('/calendar');
  };

  return (
    <AppointmentForm onSubmit={handleAppointmentSubmit} doctor={doctor} />
  );
};

export default AppointmentBooking;
