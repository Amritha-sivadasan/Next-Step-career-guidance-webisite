import { ReactNode } from "react";
import Navbar from "../../student/header/Header";
import Footer from "../footer/Footer";

interface LayoutProps {
  children: ReactNode;
}
const StudentLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Navbar />

      <main>{children}</main>
      <Footer />
    </>
  );
};

export default StudentLayout;
