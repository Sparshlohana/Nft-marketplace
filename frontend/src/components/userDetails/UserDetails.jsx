import { useState } from "react";
import UserBannerAndProfile from "./userBannerAndProfile/UserBannerAndProfile";
import UserBio from "./userBio/UserBio";
import UserDetailHeading from "./userDetailHeading/UserDetailHeading";
import UserDetailJoiningDate from "./userDetailJoiningDate/UserDetailJoiningDate";
import UserNftCollectionAndCreationBtnContainer from "./userNftCollectionAndCreationBtnContainer/UserNftCollectionAndCreationBtnContainer";
import UserNftCollectionContainer from "./userNftCollectionContainer/UserNftCollectionContainer";
import UserSocialMedia from "./userSocialMedia/UserSocialMedia";

const UserDetails = () => {
  const [active, setActive] = useState(1);

  return (
    <div className="UserDetailsContainerMain">
      <UserBannerAndProfile />
      <UserDetailHeading />
      <UserSocialMedia />
      <UserDetailJoiningDate />
      <UserBio />
      <UserNftCollectionAndCreationBtnContainer
        active={active}
        setActive={setActive}
      />
      <UserNftCollectionContainer active={active} />
    </div>
  );
};

export default UserDetails;
