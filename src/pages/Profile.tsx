
import React from "react";
import MobileLayout from "@/components/MobileLayout";

const Profile = () => {
  return (
    <MobileLayout>
      <div className="flex flex-col min-h-full items-center justify-center p-4">
        <h1 className="text-2xl font-semibold mb-4">Profile</h1>
        <p className="text-gray-500">Your profile information will appear here</p>
      </div>
    </MobileLayout>
  );
};

export default Profile;
