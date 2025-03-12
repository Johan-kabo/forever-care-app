
import React from "react";
import { Link } from "react-router-dom";
import AuthLayout from "@/components/auth/AuthLayout";
import RegisterForm from "@/components/auth/RegisterForm";

const Register = () => {
  return (
    <AuthLayout 
      title="Forever Care" 
      subtitle="Créez votre compte pour commencer"
    >
      <RegisterForm />
      
      <div className="text-center mt-4">
        <p className="text-gray-500 text-sm">
          Vous avez déjà un compte?{" "}
          <Link to="/login" className="text-health-primary font-medium">
            Se connecter
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default Register;
