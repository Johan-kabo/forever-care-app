
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Mail, Lock, User, Eye, EyeOff, Phone } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const countryOptions = [
  { value: "fr", label: "France", flag: "🇫🇷", code: "+33" },
  { value: "us", label: "États-Unis", flag: "🇺🇸", code: "+1" },
  { value: "gb", label: "Royaume-Uni", flag: "🇬🇧", code: "+44" },
  { value: "de", label: "Allemagne", flag: "🇩🇪", code: "+49" },
  { value: "es", label: "Espagne", flag: "🇪🇸", code: "+34" },
  { value: "it", label: "Italie", flag: "🇮🇹", code: "+39" },
  { value: "ca", label: "Canada", flag: "🇨🇦", code: "+1" },
  { value: "be", label: "Belgique", flag: "🇧🇪", code: "+32" },
  { value: "ch", label: "Suisse", flag: "🇨🇭", code: "+41" },
  { value: "ma", label: "Maroc", flag: "🇲🇦", code: "+212" },
  { value: "cm", label: "Cameroun", flag: "🇨🇲", code: "+237" },
  { value: "sn", label: "Sénégal", flag: "🇸🇳", code: "+221" },
  { value: "ci", label: "Côte d'Ivoire", flag: "🇨🇮", code: "+225" },
];

const registerSchema = z.object({
  name: z.string().min(2, { message: "Le nom doit contenir au moins 2 caractères" }),
  email: z.string().email({ message: "Adresse email invalide" }),
  phoneCountry: z.string().default("fr"),
  phoneNumber: z.string().min(6, { message: "Numéro de téléphone invalide" }),
  password: z.string().min(6, { message: "Mot de passe doit contenir au moins 6 caractères" }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"],
});

type RegisterFormValues = z.infer<typeof registerSchema>;

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      phoneCountry: "fr",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: RegisterFormValues) => {
    // Get the selected country code from the options array
    const selectedCountry = countryOptions.find(
      (country) => country.value === data.phoneCountry
    );
    const phoneWithCode = selectedCountry
      ? `${selectedCountry.code} ${data.phoneNumber}`
      : data.phoneNumber;
    
    console.log("Registration data:", {
      ...data,
      fullPhoneNumber: phoneWithCode,
    });
    
    toast({
      title: "Inscription réussie",
      description: "Votre compte a été créé avec succès",
    });
    navigate("/login");
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-white flex flex-col">
      <div className="flex-1 flex flex-col justify-center p-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-health-primary mb-3">Forever Care</h1>
          <p className="text-gray-500">Créez votre compte pour commencer</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom complet</FormLabel>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                      <User size={18} />
                    </div>
                    <FormControl>
                      <Input
                        placeholder="Jean Dupont"
                        className="pl-10"
                        {...field}
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                      <Mail size={18} />
                    </div>
                    <FormControl>
                      <Input
                        placeholder="exemple@email.com"
                        className="pl-10"
                        {...field}
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-12 gap-3">
              <FormField
                control={form.control}
                name="phoneCountry"
                render={({ field }) => (
                  <FormItem className="col-span-4">
                    <FormLabel>Pays</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pays" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {countryOptions.map((country) => (
                          <SelectItem
                            key={country.value}
                            value={country.value}
                            className="flex items-center"
                          >
                            <span className="mr-2">{country.flag}</span>
                            <span>{country.code}</span>
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
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem className="col-span-8">
                    <FormLabel>Téléphone</FormLabel>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <Phone size={18} />
                      </div>
                      <FormControl>
                        <Input
                          type="tel"
                          placeholder="612345678"
                          className="pl-10"
                          {...field}
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mot de passe</FormLabel>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                      <Lock size={18} />
                    </div>
                    <FormControl>
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••"
                        className="pl-10"
                        {...field}
                      />
                    </FormControl>
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirmer le mot de passe</FormLabel>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                      <Lock size={18} />
                    </div>
                    <FormControl>
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••"
                        className="pl-10"
                        {...field}
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full bg-health-primary mt-3">
              S'inscrire
            </Button>

            <div className="text-center mt-4">
              <p className="text-gray-500 text-sm">
                Vous avez déjà un compte?{" "}
                <Link to="/login" className="text-health-primary font-medium">
                  Se connecter
                </Link>
              </p>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Register;
