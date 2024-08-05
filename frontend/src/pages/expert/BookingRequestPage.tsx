// src/pages/ProfilePage.tsx
import React from "react";
import Sidebar from "../../components/expert/sidebar/ExpertSidebar";

import ExpertNavbar from "../../components/expert/header/ExpertNavBar";
import BookingRequest from "../../components/expert/Booking/BookingRequest";

const BookingRequestPage: React.FC = () => {
  return (
    <>
      <ExpertNavbar />
      <div className="min-h-screen flex bg-gray-100">
        <Sidebar />
        <main className="flex-1 p-6">
          <BookingRequest />
        </main>
      </div>
    </>
  );
};

export default BookingRequestPage;
