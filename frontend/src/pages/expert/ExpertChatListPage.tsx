import ChatWindowExpert from "../../components/expert/chat/ChatWindowForExpert";
import ChatWithStudentList from "../../components/expert/chat/ChatWithStudentList";
import { ExpertProvider } from "../../context/ExpertChatContext";

const ExpertChatListPage = () => {
  return (
    <ExpertProvider>
      <div className=" flex h-[93vh] font-sans border p-3 rounded-lg bg-white">
        <ChatWithStudentList />
        <ChatWindowExpert />
      </div>
    </ExpertProvider>
  );
};

export default ExpertChatListPage;
