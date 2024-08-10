import React from "react";
import Profile from "../../components/student/profile/Profile";

const ProfilePage: React.FC = () => {
  return (
    <>
      <div className="flex justify-center w-8/12 border  ms-10">
        <Profile />
      </div>
    </>
  );
};

export default ProfilePage;
