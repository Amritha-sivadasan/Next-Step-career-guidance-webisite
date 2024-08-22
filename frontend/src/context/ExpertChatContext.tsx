import React, { createContext, useState, ReactNode } from "react";

export interface IExpertContext {
  selectedStudentId: string | null;
  setSelectedStudentId: (id: string) => void;
  chatId:string | null;
  setChatId: (id: string) => void;
  latestMessage:string | null;
  setlatestMessage: (value: string) => void;
  notificationCount:number 
  setNotificationCount: (num: number | ((prev: number) => number)) => void;
}

export const ExpertContext = createContext<IExpertContext | undefined>(
  undefined
);

export const ExpertProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
    const [chatId, setChatId] = useState<string | null>(null);
    const [latestMessage,setlatestMessage]=useState<string | null>(null);
    const [notificationCount, setNotificationCount] = useState<number>(0);
  
    return (
      <ExpertContext.Provider value={{ selectedStudentId,setNotificationCount,notificationCount, setSelectedStudentId,chatId,setChatId,setlatestMessage,latestMessage }}>
        {children}
      </ExpertContext.Provider>
    );
  };