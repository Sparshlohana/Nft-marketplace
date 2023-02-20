import UserBannerAndProfile from "./userBannerAndProfile/UserBannerAndProfile";
import UserDetailHeading from "./userDetailHeading/UserDetailHeading";
import UserDetailJoiningDate from "./userDetailJoiningDate/UserDetailJoiningDate";

const UserDetails = () => {
  return (
    <div className="UserDetailsContainerMain">
      <UserBannerAndProfile />
      <UserDetailHeading />
      <UserDetailJoiningDate />
    </div>
  );
};

export default UserDetails;
