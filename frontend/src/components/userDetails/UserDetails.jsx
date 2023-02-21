import UserBannerAndProfile from "./userBannerAndProfile/UserBannerAndProfile";
import UserBio from "./userBio/UserBio";
import UserDetailHeading from "./userDetailHeading/UserDetailHeading";
import UserDetailJoiningDate from "./userDetailJoiningDate/UserDetailJoiningDate";
import UserNftCollectionAndCreationBtnContainer from "./userNftCollectionAndCreationBtnContainer/UserNftCollectionAndCreationBtnContainer";
import UserNftCollectionContainer from "./userNftCollectionContainer/UserNftCollectionContainer";
import UserSocialMedia from "./userSocialMedia/UserSocialMedia";

const UserDetails = () => {
  return (
    <div className="UserDetailsContainerMain">
      <UserBannerAndProfile />
      <UserDetailHeading />
      <UserSocialMedia />
      <UserDetailJoiningDate />
      <UserBio />
      <UserNftCollectionAndCreationBtnContainer />
      <UserNftCollectionContainer />
    </div>
  );
};

export default UserDetails;
