import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Index from "@/pages/Index";
import DoctorDetails from "@/pages/DoctorDetails";
import ServiceDetails from "@/pages/ServiceDetails";
import Services from "@/pages/Services";
import Calendar from "@/pages/Calendar";
import Messages from "@/pages/Messages";
import AppointmentBooking from "@/pages/AppointmentBooking";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/doctor/:id" element={<DoctorDetails />} />
        <Route path="/service/:id" element={<ServiceDetails />} />
        <Route path="/services" element={<Services />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/appointment-booking" element={<AppointmentBooking />} />
      </Routes>
    </Router>
  );
}

export default App;
