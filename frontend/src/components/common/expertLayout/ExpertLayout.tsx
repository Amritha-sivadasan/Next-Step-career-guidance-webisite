import React, { ReactNode } from "react";
import ExpertNavbar from "../../expert/header/ExpertNavBar";
import Footer from "../footer/Footer";
import Sidebar from "../../expert/sidebar/ExpertSidebar";

interface LayoutProps {
  children: ReactNode;
}

const ExpertLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <div className="flex py-2 flex-col w-full min-h-screen">
        <ExpertNavbar />
        <div className="flex flex-grow bg-gray-100 mt-12">
          <Sidebar />
          <main className="flex-1 p-4">{children}</main>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default ExpertLayout;
