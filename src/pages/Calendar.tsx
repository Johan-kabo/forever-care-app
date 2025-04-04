
import React, { useState } from "react";
import MobileLayout from "@/components/MobileLayout";
import { ChevronLeft, ChevronRight, Plus, Calendar as CalendarIcon } from "lucide-react";
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, parseISO } from "date-fns";
import { fr } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import AppointmentForm from "@/components/AppointmentForm";
import { toast } from "@/hooks/use-toast";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

// Sample appointments data
const initialAppointments = [
  { id: 1, date: "2023-11-15", time: "10:00", doctorName: "Dr. Emma Wilson", specialty: "Cardiologue", imageUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=1170&auto=format&fit=crop" },
  { id: 2, date: "2023-11-20", time: "14:30", doctorName: "Dr. Michael Chen", specialty: "Dermatologue", imageUrl: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=1170&auto=format&fit=crop" },
  { id: 3, date: "2023-11-28", time: "09:15", doctorName: "Dr. Sarah Johnson", specialty: "Neurologue", imageUrl: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=1964&auto=format&fit=crop" },
];

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [appointments, setAppointments] = useState(initialAppointments);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
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

  const handleAddAppointment = (appointment: any) => {
    const newAppointment = {
      id: appointments.length + 1,
      ...appointment
    };
    
    setAppointments([...appointments, newAppointment]);
    setIsDialogOpen(false);
    toast({
      title: "Rendez-vous confirmé",
      description: `Vous avez un rendez-vous le ${format(parseISO(appointment.date), "d MMMM yyyy", { locale: fr })} à ${appointment.time}`,
    });
  };
  
  // Get upcoming appointments
  const getUpcomingAppointments = () => {
    const today = new Date();
    return appointments
      .filter(appointment => {
        const appointmentDate = parseISO(appointment.date);
        return appointmentDate >= today;
      })
      .sort((a, b) => {
        return parseISO(a.date).getTime() - parseISO(b.date).getTime();
      })
      .slice(0, 2); // Show only next 2 appointments
  };
  
  const upcomingAppointments = getUpcomingAppointments();

  return (
    <MobileLayout>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-health-primary text-white p-6 pt-8 pb-16 rounded-b-[30px] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-bl-full"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-tr-full"></div>
          
          <h1 className="text-2xl font-bold">Calendrier</h1>
          <p className="text-white/80 text-sm mt-1">Gérer vos rendez-vous médicaux</p>
        
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="absolute top-6 right-6 bg-white text-health-primary hover:bg-white/90 flex items-center gap-1 rounded-full px-4">
                <Plus size={18} />
                <span>Nouveau</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md p-0">
              <AppointmentForm 
                onSubmit={handleAddAppointment} 
                initialDate={selectedDate ? format(selectedDate, "yyyy-MM-dd") : undefined}
              />
            </DialogContent>
          </Dialog>
        </div>
        
        {/* Calendar Card */}
        <div className="px-4 -mt-10">
          <div className="bg-white rounded-xl shadow-sm border border-gray-50 p-4 mb-6">
            {/* Month Navigation */}
            <div className="flex items-center justify-between mb-4">
              <button 
                onClick={prevMonth} 
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
              <h2 className="text-lg font-semibold">
                {format(currentDate, "MMMM yyyy", { locale: fr })}
              </h2>
              <button 
                onClick={nextMonth} 
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <ChevronRight size={20} />
              </button>
            </div>
            
            {/* Weekday Headers */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"].map((day) => (
                <div key={day} className="text-center text-xs font-medium text-gray-500 py-1">
                  {day}
                </div>
              ))}
            </div>
            
            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1">
              {/* Empty cells for days of the previous month */}
              {Array.from({ length: monthStart.getDay() === 0 ? 6 : monthStart.getDay() - 1 }).map((_, i) => (
                <div key={`empty-${i}`} className="h-10 rounded-lg bg-gray-50/50"></div>
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
                      "h-10 rounded-lg flex items-center justify-center text-sm relative",
                      isToday(day) && !isSelected && "border border-health-primary text-health-primary",
                      isSelected && "bg-health-primary text-white",
                      !isSelected && hasAppointment && "bg-health-secondary text-health-primary font-medium",
                      "hover:bg-gray-100 transition-colors",
                      !isSelected && !isToday(day) && !hasAppointment && "text-gray-700"
                    )}
                  >
                    <span className={cn(
                      isSelected && "font-bold"
                    )}>
                      {day.getDate()}
                    </span>
                    {hasAppointment && !isSelected && (
                      <div className="absolute bottom-1 w-1 h-1 bg-health-primary rounded-full"></div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
          
          {/* Upcoming Appointments Section */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Prochains rendez-vous</h3>
            {upcomingAppointments.length > 0 ? (
              <div className="space-y-3">
                {upcomingAppointments.map((appointment) => (
                  <UpcomingAppointment key={appointment.id} appointment={appointment} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl p-6 text-center border border-gray-100">
                <div className="w-14 h-14 bg-health-secondary rounded-full flex items-center justify-center mx-auto mb-3">
                  <CalendarIcon size={24} className="text-health-primary" />
                </div>
                <h4 className="font-medium">Aucun rendez-vous à venir</h4>
                <p className="text-sm text-gray-500 mt-1">Planifiez vos prochains rendez-vous médicaux</p>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="mt-4 bg-health-primary hover:bg-health-primary/90">
                      Prendre rendez-vous
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="p-0 sm:max-w-md">
                    <AppointmentForm 
                      onSubmit={handleAddAppointment}
                    />
                  </DialogContent>
                </Dialog>
              </div>
            )}
          </div>
          
          {/* Selected Date Appointments */}
          {selectedDate && (
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-semibold">
                  {format(selectedDate, "d MMMM yyyy", { locale: fr })}
                </h3>
                <Badge variant="outline" className="bg-health-secondary border-none text-health-primary">
                  {selectedAppointments.length} {selectedAppointments.length > 1 ? 'rendez-vous' : 'rendez-vous'}
                </Badge>
              </div>
              
              {selectedAppointments.length > 0 ? (
                <div className="space-y-3">
                  {selectedAppointments.map((appointment) => (
                    <div key={appointment.id} className="bg-white p-4 rounded-xl border border-gray-100 flex items-center">
                      <Avatar className="h-12 w-12 mr-3">
                        <AvatarImage src={appointment.imageUrl} alt={appointment.doctorName} />
                        <AvatarFallback>{appointment.doctorName.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h4 className="font-semibold">{appointment.doctorName}</h4>
                        <p className="text-sm text-gray-500">{appointment.specialty}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-medium text-health-primary">{appointment.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-xl p-4 text-center border border-gray-100">
                  <p className="text-gray-500">Pas de rendez-vous ce jour</p>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="mt-3">
                        <Plus size={16} className="mr-1" />
                        Ajouter
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="p-0 sm:max-w-md">
                      <AppointmentForm 
                        onSubmit={handleAddAppointment}
                        initialDate={format(selectedDate, "yyyy-MM-dd")}
                      />
                    </DialogContent>
                  </Dialog>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </MobileLayout>
  );
};

// Upcoming Appointment Component
const UpcomingAppointment = ({ appointment }: { appointment: any }) => {
  const navigate = useNavigate();
  
  const handleReschedule = (appointment: any) => {
    console.log("Rescheduled appointment:", appointment);
    toast({
      title: "Rendez-vous reprogrammé",
      description: `Votre rendez-vous a été reprogrammé pour le ${appointment.date} à ${appointment.time}`,
    });
  };
  
  const formattedDate = format(parseISO(appointment.date), "d MMMM", { locale: fr });
  
  return (
    <div className="bg-white rounded-xl overflow-hidden border border-gray-100">
      <div className="p-4">
        <div className="flex items-center">
          <Avatar className="h-12 w-12 mr-3">
            <AvatarImage src={appointment.imageUrl} alt={appointment.doctorName} />
            <AvatarFallback>{appointment.doctorName.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h4 className="font-semibold">{appointment.doctorName}</h4>
            <div className="flex items-center text-sm text-gray-500 mt-0.5">
              <CalendarIcon size={14} className="mr-1" />
              <span>{formattedDate}, {appointment.time}</span>
            </div>
          </div>
        </div>
        <div className="flex mt-3 gap-2">
          <Button 
            variant="outline" 
            className="flex-1 text-sm border-gray-200 hover:bg-gray-50"
            onClick={() => navigate("/messages")}
          >
            Message
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button 
                variant="outline" 
                className="flex-1 text-sm border-gray-200 hover:bg-gray-50"
              >
                Reprogrammer
              </Button>
            </DialogTrigger>
            <DialogContent className="p-0 sm:max-w-md">
              <AppointmentForm 
                onSubmit={handleReschedule}
                doctor={{
                  id: appointment.id.toString(),
                  name: appointment.doctorName,
                  specialty: appointment.specialty,
                  imageUrl: appointment.imageUrl
                }}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
