// src/pages/ProfilePage.tsx
import React from "react";

import BookingRequest from "../../components/expert/Booking/BookingRequest";

const BookingRequestPage: React.FC = () => {
  return (
    <>
      <main className="flex-1 p-6">
        <BookingRequest />
      </main>
    </>
  );
};

export default BookingRequestPage;
