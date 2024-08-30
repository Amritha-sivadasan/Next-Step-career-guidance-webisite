import { useEffect } from "react";
import ChatWindow from "../../components/student/chat/ChatWindowStudent";
import ChatWithExpertList from "../../components/student/chat/ChatWithExpert";
import { StudentProvider } from "../../context/StudentChatContext";

const StudentChatListPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <StudentProvider>
      <div className=" ms-5  flex h-[90vh] font-sans w-full md:w-8/12 md:mt-5 lg:mt-5 sm:border-0 border p-3 rounded-lg  ">
        <ChatWithExpertList />

        <ChatWindow />
      </div>
    </StudentProvider>
  );
};

export default StudentChatListPage;
