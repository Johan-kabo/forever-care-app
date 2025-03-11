
import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { CalendarIcon, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

// Sample doctors data
const doctors = [
  { id: "1", name: "Dr. Emma Wilson", specialty: "Cardiologue" },
  { id: "2", name: "Dr. Michael Chen", specialty: "Dermatologue" },
  { id: "3", name: "Dr. Sarah Johnson", specialty: "Neurologue" },
  { id: "4", name: "Dr. Jenny Wilson", specialty: "Neurologue" },
  { id: "5", name: "Dr. Claude Botoyie", specialty: "Dentiste" },
  { id: "6", name: "Dr. Queen Norma", specialty: "Dermatologue" },
];

// Sample time slots
const timeSlots = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00"
];

// Define form schema
const formSchema = z.object({
  date: z.date({
    required_error: "Veuillez sélectionner une date",
  }),
  doctorId: z.string({
    required_error: "Veuillez sélectionner un médecin",
  }),
  time: z.string({
    required_error: "Veuillez sélectionner une heure",
  }),
});

interface AppointmentFormProps {
  onSubmit: (data: any) => void;
  initialDate?: string;
}

const AppointmentForm: React.FC<AppointmentFormProps> = ({ onSubmit, initialDate }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: initialDate ? new Date(initialDate) : undefined,
    },
  });

  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    const doctor = doctors.find(d => d.id === values.doctorId);
    
    onSubmit({
      date: format(values.date, "yyyy-MM-dd"),
      time: values.time,
      doctorId: values.doctorId,
      doctorName: doctor?.name || "",
      specialty: doctor?.specialty || "",
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 mt-2">
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date du rendez-vous</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP", { locale: fr })
                      ) : (
                        <span>Sélectionner une date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date < new Date(new Date().setHours(0, 0, 0, 0))
                    }
                    initialFocus
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="doctorId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Médecin</FormLabel>
              <Select
                onValueChange={(value) => {
                  field.onChange(value);
                  setSelectedDoctor(value);
                }}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un médecin" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {doctors.map((doctor) => (
                    <SelectItem key={doctor.id} value={doctor.id}>
                      {doctor.name} - {doctor.specialty}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="time"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Heure</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner une heure" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {timeSlots.map((time) => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full bg-health-primary hover:bg-health-primary/90">
          Confirmer le rendez-vous
        </Button>
      </form>
    </Form>
  );
};

export default AppointmentForm;
