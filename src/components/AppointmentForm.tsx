
import React, { useState, useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { ArrowLeft, Calendar as CalendarIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Simple schema for the appointment
const formSchema = z.object({
  date: z.string(),
  time: z.string(),
});

interface AppointmentFormProps {
  onSubmit: (data: any) => void;
  doctor?: {
    id: string;
    name: string;
    specialty: string;
    clinic?: string;
    imageUrl: string;
  };
  initialDate?: string;
}

const AppointmentForm: React.FC<AppointmentFormProps> = ({ 
  onSubmit, 
  doctor = {
    id: "1",
    name: "Dr. Ali Uzair",
    specialty: "Senior Cardiologist and Surgeon",
    clinic: "Mirpur Medical College and Hospital",
    imageUrl: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=1170&auto=format&fit=crop"
  },
  initialDate
}) => {
  const navigate = useNavigate();
  const [selectedDay, setSelectedDay] = useState("5");
  const [selectedTime, setSelectedTime] = useState("9:00 AM");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Set initial day if provided
  useEffect(() => {
    if (initialDate) {
      const day = initialDate.split('-')[2];
      if (day) {
        setSelectedDay(day);
      }
    }
  }, [initialDate]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: selectedDay,
      time: selectedTime,
    },
  });

  const days = [
    { day: "Dim", number: "3" },
    { day: "Lun", number: "4" },
    { day: "Mar", number: "5" },
    { day: "Mer", number: "6" },
    { day: "Jeu", number: "7" },
  ];

  const timeSlots = [
    "9:00 AM",
    "9:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "14:00 PM",
    "14:30 PM"
  ];

  const handleSubmit = () => {
    setIsSubmitting(true);
    // Simulate loading
    setTimeout(() => {
      onSubmit({
        date: selectedDay,
        time: selectedTime,
        doctorId: doctor.id,
        doctorName: doctor.name,
        specialty: doctor.specialty,
      });
      setIsSubmitting(false);
    }, 500);
  };

  return (
    <div className="flex flex-col h-full bg-white relative">
      {/* Header with back button */}
      <div className="p-4 flex items-center bg-white sticky top-0 z-10 border-b border-gray-100">
        <button 
          onClick={() => navigate(-1)}
          className="p-2"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-semibold mx-auto">Prise de rendez-vous</h1>
      </div>

      {/* Doctor Information */}
      <div className="px-4 pt-2 pb-6">
        <div className="bg-health-primary rounded-xl p-6 text-white text-center">
          <div className="w-24 h-24 rounded-full mx-auto mb-3 overflow-hidden border-4 border-white">
            <img 
              src={doctor.imageUrl} 
              alt={doctor.name} 
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-xl font-bold mb-1">{doctor.name}</h2>
          <p className="text-sm text-white/90 mb-1">{doctor.specialty}</p>
          {doctor.clinic && (
            <p className="text-sm text-white/80">{doctor.clinic}</p>
          )}
        </div>
      </div>

      {/* Date Selection */}
      <div className="px-4 mb-6 overflow-auto">
        <h3 className="text-lg font-semibold mb-3">Date du rendez-vous</h3>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div className="grid grid-cols-5 gap-2">
            {days.map((day) => (
              <div 
                key={day.day}
                className="flex flex-col items-center"
              >
                <span className="text-sm text-gray-500 mb-1">{day.day}</span>
                <button
                  type="button"
                  onClick={() => setSelectedDay(day.number)}
                  className={`w-12 h-12 rounded-xl flex items-center justify-center text-base font-medium transition-colors ${
                    selectedDay === day.number
                      ? "bg-health-primary text-white"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {day.number}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Time Selection */}
      <div className="px-4 mb-8 overflow-auto">
        <h3 className="text-lg font-semibold mb-3">Horaires disponibles</h3>
        <div className="flex flex-wrap gap-2">
          {timeSlots.map((time) => (
            <button
              key={time}
              type="button"
              onClick={() => setSelectedTime(time)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedTime === time
                  ? "bg-health-primary text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {time}
            </button>
          ))}
        </div>
      </div>

      {/* Summary */}
      <div className="px-4 mb-8">
        <h3 className="text-lg font-semibold mb-3">Récapitulatif</h3>
        <div className="bg-health-secondary rounded-xl p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-health-primary rounded-full p-2">
              <CalendarIcon size={18} className="text-white" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Date</p>
              <p className="font-medium">Mai {selectedDay}, 2024</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-health-primary rounded-full p-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Heure</p>
              <p className="font-medium">{selectedTime}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Confirm Button */}
      <div className="px-4 mt-auto sticky bottom-20 pb-4 bg-white">
        <Button 
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="w-full bg-health-primary hover:bg-health-primary/90 text-lg py-6 rounded-xl"
        >
          {isSubmitting ? "Confirmation en cours..." : "Confirmer le rendez-vous"}
        </Button>
      </div>
    </div>
  );
};

export default AppointmentForm;
