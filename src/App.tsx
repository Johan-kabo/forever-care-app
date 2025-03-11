
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/details" element={<ProfileDetails />} />
          <Route path="/favourite-doctors" element={<FavouriteDoctors />} />
          <Route path="/top-doctors" element={<TopDoctors />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/doctor/:id" element={<DoctorDetails />} />
          <Route path="/services" element={<Services />} />
          <Route path="/service/:id" element={<ServiceDetails />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/settings/notifications" element={<NotificationSettings />} />
          <Route path="/settings/password" element={<PasswordSettings />} />
          <Route path="/settings/delete-account" element={<DeleteAccount />} />
          <Route path="/help" element={<Help />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
