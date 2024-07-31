// src/pages/ProfilePage.tsx
import React from 'react';
import Sidebar from './ExpertSidebar';
import ProfileDetails from '../../pages/expert/ExpertProfile';


const ProfilePage: React.FC = () => {
  return (
    <div className="min-h-screen flex bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-6">
        <ProfileDetails />
      </main>
    </div>
  );
};

export default ProfilePage;
