import { useContext } from "react";
import { ExpertContext } from "../context/ExpertChatContext";

export const useExpertChat = () => {
    const context = useContext(ExpertContext);
    if (!context) {
      throw new Error(
        "useSelectedChat must be used within a SelectedChatProvider"
      );
    }
    return context;
  };