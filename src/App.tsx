
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Calendar from "./pages/Calendar";
import Messages from "./pages/Messages";
import Profile from "./pages/Profile";
import FavouriteDoctors from "./pages/FavouriteDoctors";
import TopDoctors from "./pages/TopDoctors";
import Notifications from "./pages/Notifications";
import DoctorDetails from "./pages/DoctorDetails";
import Settings from "./pages/Settings";
import NotificationSettings from "./pages/NotificationSettings";
import NotFound from "./pages/NotFound";
import Help from "./pages/Help";
import ProfileDetails from "./pages/ProfileDetails";
import PasswordSettings from "./pages/PasswordSettings";
import DeleteAccount from "./pages/DeleteAccount";
import Services from "./pages/Services";
import ServiceDetails from "./pages/ServiceDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import { useState, useEffect } from "react";

const queryClient = new QueryClient();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Check for authentication status (simulated for demo)
  useEffect(() => {
    const userAuth = localStorage.getItem("isAuthenticated");
    if (userAuth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  // Function to handle login and logout for our demo
  const handleAuthChange = (status: boolean) => {
    setIsAuthenticated(status);
    localStorage.setItem("isAuthenticated", status.toString());
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Auth Routes (accessible when not authenticated) */}
            <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login />} />
            <Route path="/register" element={isAuthenticated ? <Navigate to="/" /> : <Register />} />
            <Route path="/forgot-password" element={isAuthenticated ? <Navigate to="/" /> : <ForgotPassword />} />
            
            {/* Protected Routes (need authentication) */}
            <Route path="/" element={isAuthenticated ? <Index /> : <Navigate to="/login" />} />
            <Route path="/calendar" element={isAuthenticated ? <Calendar /> : <Navigate to="/login" />} />
            <Route path="/messages" element={isAuthenticated ? <Messages /> : <Navigate to="/login" />} />
            <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/login" />} />
            <Route path="/profile/details" element={isAuthenticated ? <ProfileDetails /> : <Navigate to="/login" />} />
            <Route path="/favourite-doctors" element={isAuthenticated ? <FavouriteDoctors /> : <Navigate to="/login" />} />
            <Route path="/top-doctors" element={isAuthenticated ? <TopDoctors /> : <Navigate to="/login" />} />
            <Route path="/notifications" element={isAuthenticated ? <Notifications /> : <Navigate to="/login" />} />
            <Route path="/doctor/:id" element={isAuthenticated ? <DoctorDetails /> : <Navigate to="/login" />} />
            <Route path="/services" element={isAuthenticated ? <Services /> : <Navigate to="/login" />} />
            <Route path="/service/:id" element={isAuthenticated ? <ServiceDetails /> : <Navigate to="/login" />} />
            <Route path="/settings" element={isAuthenticated ? <Settings /> : <Navigate to="/login" />} />
            <Route path="/settings/notifications" element={isAuthenticated ? <NotificationSettings /> : <Navigate to="/login" />} />
            <Route path="/settings/password" element={isAuthenticated ? <PasswordSettings /> : <Navigate to="/login" />} />
            <Route path="/settings/delete-account" element={isAuthenticated ? <DeleteAccount /> : <Navigate to="/login" />} />
            <Route path="/help" element={isAuthenticated ? <Help /> : <Navigate to="/login" />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
