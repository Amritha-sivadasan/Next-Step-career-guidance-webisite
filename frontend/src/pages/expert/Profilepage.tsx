// src/pages/ProfilePage.tsx
import React from "react";
import Sidebar from "../../components/expert/sidebar/ExpertSidebar";
import ExpertProfile from "../../components/expert/profile/ExpertProfile";
import ExpertNavbar from "../../components/expert/header/ExpertNavBar";

const ProfilePage: React.FC = () => {
  return (
    <>
      <ExpertNavbar />
      <div className="min-h-screen flex bg-gray-100">
        <Sidebar />
        <main className="flex-1 p-6">
          <ExpertProfile />
        </main>
      </div>
    </>
  );
};

export default ProfilePage;