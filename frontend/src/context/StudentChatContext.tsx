import React, { createContext, useState, ReactNode } from "react";


interface LatestMessage {
  expertId: string;
  lastMessage: string;
}

// Updated interface for the context
export interface IStudentContext {
  selectedExpertId: string | null;
  setSelectedExpertId: (id: string) => void;
  chatId: string | null;
  setChatId: (id: string | null) => void;
  latestMessage: LatestMessage | null;
  setLatestMessage: (value: LatestMessage | null) => void;
  notificationCount: number;
  setNotificationCount: (num: number | ((prev: number) => number)) => void;
}

export const StudentContext = createContext<IStudentContext | undefined>(undefined);

export const StudentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedExpertId, setSelectedExpertId] = useState<string | null>(null);
  const [chatId, setChatId] = useState<string | null>(null);
  const [latestMessage, setLatestMessage] = useState<LatestMessage | null>(null);
  const [notificationCount, setNotificationCount] = useState<number>(0);

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
