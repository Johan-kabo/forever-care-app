
import React, { useState } from "react";
import MobileLayout from "@/components/MobileLayout";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, parseISO } from "date-fns";
import { fr } from "date-fns/locale";
import { cn } from "@/lib/utils";

// Sample appointments data
const appointments = [
  { id: 1, date: "2023-11-15", time: "10:00", doctorName: "Dr. Emma Wilson", specialty: "Cardiologue" },
  { id: 2, date: "2023-11-20", time: "14:30", doctorName: "Dr. Michael Chen", specialty: "Dermatologue" },
  { id: 3, date: "2023-11-28", time: "09:15", doctorName: "Dr. Sarah Johnson", specialty: "Neurologue" },
];

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });
  
  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  
  const getAppointmentsForDate = (date: Date) => {
    const dateString = format(date, "yyyy-MM-dd");
    return appointments.filter(appointment => appointment.date === dateString);
  };
  
  const selectedAppointments = selectedDate ? getAppointmentsForDate(selectedDate) : [];

  return (
    <MobileLayout>
      <div className="p-4">
        {/* Header */}
        <div className="bg-health-primary text-white p-6 pt-5 pb-8 rounded-b-3xl mb-4">
          <h1 className="text-xl font-semibold">Calendrier des rendez-vous</h1>
          <p className="opacity-90">Gérez vos rendez-vous médicaux</p>
        </div>

        {/* Calendar Navigation */}
        <div className="flex items-center justify-between mb-4">
          <button onClick={prevMonth} className="p-2">
            <ChevronLeft size={24} />
          </button>
          <h2 className="text-lg font-semibold">
            {format(currentDate, "MMMM yyyy", { locale: fr })}
          </h2>
          <button onClick={nextMonth} className="p-2">
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1 mb-6">
          {["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"].map((day) => (
            <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
              {day}
            </div>
          ))}
          
          {/* Empty cells for days of the previous month */}
          {Array.from({ length: monthStart.getDay() === 0 ? 6 : monthStart.getDay() - 1 }).map((_, i) => (
            <div key={`empty-${i}`} className="h-10 rounded-lg"></div>
          ))}
          
          {/* Days of the current month */}
          {daysInMonth.map((day) => {
            const isSelected = selectedDate && day.getDate() === selectedDate.getDate() && 
                              day.getMonth() === selectedDate.getMonth();
            const hasAppointment = getAppointmentsForDate(day).length > 0;
            
            return (
              <button
                key={day.toString()}
                onClick={() => setSelectedDate(day)}
                className={cn(
                  "h-10 rounded-lg flex items-center justify-center text-sm",
                  isToday(day) && "border border-health-primary",
                  isSelected && "bg-health-primary text-white",
                  !isSelected && hasAppointment && "bg-blue-100"
                )}
              >
                {day.getDate()}
                {hasAppointment && !isSelected && (
                  <div className="absolute bottom-1 w-1 h-1 bg-health-primary rounded-full"></div>
                )}
              </button>
            );
          })}
        </div>

        {/* Appointments List */}
        {selectedDate && (
          <div>
            <h3 className="font-medium text-lg mb-3">
              {format(selectedDate, "d MMMM yyyy", { locale: fr })}
            </h3>
            
            {selectedAppointments.length > 0 ? (
              <div className="space-y-3">
                {selectedAppointments.map((appointment) => (
                  <div key={appointment.id} className="bg-white p-4 rounded-xl border border-gray-200">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold">{appointment.doctorName}</h4>
                      <span className="text-sm text-health-primary">{appointment.time}</span>
                    </div>
                    <p className="text-sm text-gray-500">{appointment.specialty}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">Pas de rendez-vous ce jour</p>
            )}
          </div>
        )}
      </div>
    </MobileLayout>
  );
};

export default Calendar;
