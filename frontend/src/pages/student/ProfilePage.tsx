import React, { useEffect } from "react";
import Profile from "../../components/student/profile/Profile";

const ProfilePage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <div className="flex justify-center w-8/12   ms-10">
        <Profile />
      </div>
    </>
  );
};

export default ProfilePage;
