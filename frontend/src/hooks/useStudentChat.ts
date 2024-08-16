import { useContext } from "react";
import { StudentContext } from "../context/StudentChatContext";

export const useStudentChat = () => {
  const context = useContext(StudentContext);
  if (!context) {
    throw new Error(
      "useSelectedChat must be used within a SelectedChatProvider"
    );
  }
  return context;
};
