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
      <div className=" ms-10 md:ms-0 lg:ms-0 flex h-[90vh] font-sans w-10/12 mt-5 border p-3 rounded-lg  ">
        <ChatWithExpertList />
        <ChatWindow />
      </div>
    </StudentProvider>
  );
};

export default StudentChatListPage;
