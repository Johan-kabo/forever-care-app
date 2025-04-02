
import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { ArrowLeft } from "lucide-react";
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
}

const AppointmentForm: React.FC<AppointmentFormProps> = ({ 
  onSubmit, 
  doctor = {
    id: "1",
    name: "Dr. Ali Uzair",
    specialty: "Senior Cardiologist and Surgeon",
    clinic: "Mirpur Medical College and Hospital",
    imageUrl: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=1170&auto=format&fit=crop"
  } 
}) => {
  const navigate = useNavigate();
  const [selectedDay, setSelectedDay] = useState("5");
  const [selectedTime, setSelectedTime] = useState("9:00 AM");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: "5",
      time: "9:00 AM",
    },
  });

  const days = [
    { day: "Sun", number: "3" },
    { day: "Mon", number: "4" },
    { day: "Tue", number: "5" },
    { day: "Wed", number: "6" },
    { day: "Thu", number: "7" },
  ];

  const timeSlots = [
    "9:00 AM",
    "9:30 AM",
    "10:00 AM",
    "10:30 AM"
  ];

  const handleSubmit = () => {
    onSubmit({
      date: selectedDay,
      time: selectedTime,
      doctorId: doctor.id,
      doctorName: doctor.name,
      specialty: doctor.specialty,
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-white relative">
      {/* Header with back button */}
      <div className="p-4 flex items-center">
        <button 
          onClick={() => navigate(-1)}
          className="p-2"
        >
          <ArrowLeft size={24} />
        </button>
      </div>

      {/* Doctor Information */}
      <div className="px-4 pt-4 pb-6">
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
      <div className="px-4 mb-6">
        <h3 className="text-lg font-semibold mb-3">Appointment</h3>
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
      <div className="px-4 mb-8">
        <h3 className="text-lg font-semibold mb-3">Available Time</h3>
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

      {/* Confirm Button */}
      <div className="px-4 mt-auto mb-20">
        <Button 
          onClick={handleSubmit}
          className="w-full bg-health-primary hover:bg-health-primary/90 text-lg py-6 rounded-xl"
        >
          Confirm
        </Button>
      </div>

      {/* Navigation */}
      <div className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-gray-200 flex items-center justify-around">
        <button className="flex flex-col items-center justify-center w-1/4 text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          </svg>
        </button>
        <button className="flex flex-col items-center justify-center w-1/4 text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
            <line x1="16" x2="16" y1="2" y2="6" />
            <line x1="8" x2="8" y1="2" y2="6" />
            <line x1="3" x2="21" y1="10" y2="10" />
          </svg>
        </button>
        <button className="flex flex-col items-center justify-center w-1/4 text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>
        </button>
        <button className="flex flex-col items-center justify-center w-1/4 text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 20a6 6 0 0 0-12 0" />
            <circle cx="12" cy="10" r="4" />
            <circle cx="12" cy="12" r="10" />
          </svg>
        </button>
        <div className="absolute bottom-0 left-0 right-0 h-0.5">
          <div className="w-1/4 h-full bg-blue-900 mx-auto"></div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentForm;
