import React, { createContext, useState, ReactNode } from "react";

interface LatestMessage {
  studentId: string;
  lastMessage: string;
}
interface Notification {
  chatId: string;
  count: number;
}

export interface IExpertContext {
  selectedStudentId: string | null;
  setSelectedStudentId: (id: string) => void;
  chatId:string | null;
  setChatId: (id: string|null) => void;
  latestMessage: LatestMessage | null;
  setLatestMessage: (value: LatestMessage | null) => void;
  notificationCount: Notification|null;
  setNotificationCount:  (value: Notification | null) => void;
}

export const ExpertContext = createContext<IExpertContext | undefined>(
  undefined
);

export const ExpertProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
    const [chatId, setChatId] = useState<string | null>(null);
    const [latestMessage, setLatestMessage] = useState<LatestMessage | null>(null);
    const [notificationCount, setNotificationCount] = useState<Notification|null>(null);
    return (
      <ExpertContext.Provider value={{ selectedStudentId,setNotificationCount,notificationCount, setSelectedStudentId,chatId,setChatId,setLatestMessage,latestMessage }}>
        {children}
      </ExpertContext.Provider>
    );
  };