import UserBannerAndProfile from "./userBannerAndProfile/UserBannerAndProfile";
import UserBio from "./userBio/UserBio";
import UserDetailHeading from "./userDetailHeading/UserDetailHeading";
import UserDetailJoiningDate from "./userDetailJoiningDate/UserDetailJoiningDate";
import UserSocialMedia from "./userSocialMedia/UserSocialMedia";

const UserDetails = () => {
  return (
    <div className="UserDetailsContainerMain">
      <UserBannerAndProfile />
      <UserDetailHeading />
      <UserSocialMedia />
      <UserDetailJoiningDate />
      <UserBio />
    </div>
  );
};

export default UserDetails;
