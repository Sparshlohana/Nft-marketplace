import React from "react";
import UserBanner from "./userBanner/UserBanner";
import UserProfile from "./userProfile/UserProfile";

const UserBannerAndProfile = () => {
  return (
    <div className="userBannerAndProfileContainer">
      <UserBanner />
      <UserProfile />
    </div>
  );
};

export default UserBannerAndProfile;
