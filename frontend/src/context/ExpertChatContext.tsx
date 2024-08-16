import React, { createContext, useState, ReactNode } from "react";

export interface IExpertContext {
  selectedStudentId: string | null;
  setSelectedStudentId: (id: string) => void;
  chatId:string | null;
  setChatId: (id: string) => void;
}

export const ExpertContext = createContext<IExpertContext | undefined>(
  undefined
);


export const ExpertProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
    const [chatId, setChatId] = useState<string | null>(null);
  
    return (
      <ExpertContext.Provider value={{ selectedStudentId, setSelectedStudentId,chatId,setChatId }}>
        {children}
      </ExpertContext.Provider>
    );
  };