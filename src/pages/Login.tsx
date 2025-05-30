import React, { useState } from "react";
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
  FormMessage,
} from "@/components/ui/form";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const loginSchema = z.object({
  email: z.string().email({ message: "Adresse email invalide" }),
  password: z.string().min(6, { message: "Mot de passe doit contenir au moins 6 caractères" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    
    try {
      const { data: authData, error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) {
        throw error;
      }

      localStorage.setItem("isAuthenticated", "true");
      
      toast({
        title: "Connexion réussie",
        description: "Bienvenue sur Forever Care",
      });
      
      navigate("/");
    } catch (error: any) {
      toast({
        title: "Erreur de connexion",
        description: error.message || "Email ou mot de passe incorrect",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F8F8] flex flex-col">
      {/* Header Image */}
      <div className="h-[45vh] bg-[#4458E7] relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <img 
            src="https://images.pexels.com/photos/4021775/pexels-photo-4021775.jpeg" 
            alt="Medical"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#4458E7]/50 to-[#4458E7]"></div>
        <div className="absolute bottom-0 left-0 right-0 text-center text-white p-8">
          <h1 className="text-3xl font-bold mb-2">Bienvenue</h1>
          <p className="text-white/80">Connectez-vous pour continuer</p>
        </div>
      </div>

      {/* Login Form */}
      <div className="flex-1 px-6 -mt-6">
        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <Mail size={20} />
                      </div>
                      <FormControl>
                        <Input
                          placeholder="Email"
                          className="pl-10 h-12 rounded-xl bg-gray-50 border-0"
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
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <Lock size={20} />
                      </div>
                      <FormControl>
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Mot de passe"
                          className="pl-10 h-12 rounded-xl bg-gray-50 border-0"
                          {...field}
                        />
                      </FormControl>
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end">
                <Link to="/forgot-password" className="text-sm text-[#4458E7] font-medium">
                  Mot de passe oublié?
                </Link>
              </div>

              <Button 
                type="submit" 
                className="w-full h-12 text-base rounded-xl bg-[#4458E7] hover:bg-[#4458E7]/90"
                disabled={isLoading}
              >
                {isLoading ? "Connexion en cours..." : "Se connecter"}
              </Button>

              <div className="text-center mt-6">
                <p className="text-gray-600">
                  Vous n'avez pas de compte?{" "}
                  <Link to="/register" className="text-[#4458E7] font-medium">
                    S'inscrire
                  </Link>
                </p>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;