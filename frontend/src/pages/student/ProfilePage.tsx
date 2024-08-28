import React, { useEffect } from "react";
import Profile from "../../components/student/profile/Profile";

const ProfilePage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <div className="flex justify-center md:w-8/12 lg:w-8/12 sm:w-full md:ms-10 lg:ms-10">
        <Profile />
      </div>
    </>
  );
};

export default ProfilePage;
