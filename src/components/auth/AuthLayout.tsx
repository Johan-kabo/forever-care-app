
import React from "react";

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ title, subtitle, children }) => {
  return (
    <div className="max-w-md mx-auto min-h-screen bg-white flex flex-col">
      <div className="flex-1 flex flex-col justify-center p-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-health-primary mb-3">{title}</h1>
          <p className="text-gray-500">{subtitle}</p>
        </div>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
