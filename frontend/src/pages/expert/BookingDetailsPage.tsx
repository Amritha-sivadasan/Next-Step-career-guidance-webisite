import Sidebar from "../../components/expert/sidebar/ExpertSidebar";
import ExpertNavbar from "../../components/expert/header/ExpertNavBar";
import BookingDetails from "../../components/expert/Booking/BookingDetails";


const BookingDetailsPage = () => {
  return (
    <>
    <ExpertNavbar />
    <div className="min-h-screen flex bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-6">
      <BookingDetails/>
      </main>
    </div>
  </>
  )
}

export default BookingDetailsPage
