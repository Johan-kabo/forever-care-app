
import React from "react";
import MobileLayout from "@/components/MobileLayout";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TopDoctors = () => {
  const navigate = useNavigate();

  return (
    <MobileLayout>
      <div className="p-4">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center text-gray-700 mb-6"
        >
          <ChevronLeft size={20} />
          <span>Back</span>
        </button>
        
        <h1 className="text-2xl font-semibold mb-4">Top Doctors</h1>
        <p className="text-gray-500">More details about top doctors will appear here</p>
      </div>
    </MobileLayout>
  );
};

export default TopDoctors;
