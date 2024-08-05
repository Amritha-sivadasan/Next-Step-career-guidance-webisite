import ExpertNavbar from "../../components/expert/header/ExpertNavBar";
import SchedulePage from "../../components/expert/Schedule/SchedulePage";
import Sidebar from "../../components/expert/sidebar/ExpertSidebar";

const AvailableSchedule = () => {
  return (
    <>
      <ExpertNavbar />
      <div className="min-h-screen flex bg-gray-100">
        <Sidebar />
        <main className="flex-1 p-6">
          <SchedulePage />
        </main>
      </div>
    </>
  );
};

export default AvailableSchedule;
