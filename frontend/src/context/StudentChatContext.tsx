import React, { createContext, useState, ReactNode } from "react";
import { IMessage } from "../@types/message";


interface LatestMessage {
  expertId: string;
  lastMessage: IMessage
}
interface Notification {
  chatId: string;
  count: number;
}


export interface IStudentContext {
  selectedExpertId: string | null;
  setSelectedExpertId: (id: string) => void;
  chatId: string | null;
  setChatId: (id: string | null) => void;
  latestMessage: LatestMessage | null;
  setLatestMessage: (value: LatestMessage | null) => void;
  notificationCount: Notification|null;
  setNotificationCount:  (value: Notification | null) => void;
}

export const StudentContext = createContext<IStudentContext | undefined>(undefined);

export const StudentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedExpertId, setSelectedExpertId] = useState<string | null>(null);
  const [chatId, setChatId] = useState<string | null>(null);
  const [latestMessage, setLatestMessage] = useState<LatestMessage | null>(null);
  const [notificationCount, setNotificationCount] = useState<Notification|null>(null);

  return (
    <StudentContext.Provider value={{
      selectedExpertId,
      setSelectedExpertId,
      chatId,
      setChatId,
      latestMessage,
      setLatestMessage,
      notificationCount,
      setNotificationCount
    }}>
      {children}
    </StudentContext.Provider>
  );
};
