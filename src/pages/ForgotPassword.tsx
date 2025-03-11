
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
import { Mail, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Adresse email invalide" }),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

const ForgotPassword = () => {
  const navigate = useNavigate();

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data: ForgotPasswordFormValues) => {
    console.log("Reset password email:", data.email);
    toast({
      title: "Email envoyé",
      description: "Vérifiez votre boîte de réception pour réinitialiser votre mot de passe",
    });
    navigate("/login");
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-white flex flex-col">
      <div className="p-4">
        <Link to="/login" className="flex items-center text-gray-700">
          <ArrowLeft size={20} className="mr-2" />
          Retour
        </Link>
      </div>
      
      <div className="flex-1 flex flex-col justify-center p-6">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-3">Mot de passe oublié</h1>
          <p className="text-gray-500">Entrez votre email pour réinitialiser votre mot de passe</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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

            <Button type="submit" className="w-full bg-health-primary">
              Envoyer le lien de réinitialisation
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ForgotPassword;
