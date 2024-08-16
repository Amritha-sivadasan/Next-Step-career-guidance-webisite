import React, { createContext, useState, ReactNode } from "react";

export interface IStudentContext {
  selectedExpertId: string | null;
  setSelectedExpertId: (id: string) => void;
  chatId:string | null;
  setChatId: (id: string) => void;
}

export const StudentContext = createContext<IStudentContext | undefined>(undefined);

export const StudentProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [selectedExpertId, setSelectedExpertId] = useState<string | null>(null);
  const [chatId,setChatId]=useState<string | null>(null);
  return (
    <StudentContext.Provider value={{ selectedExpertId, setSelectedExpertId ,chatId,setChatId}}>
    {children}
  </StudentContext.Provider>
  );
};
