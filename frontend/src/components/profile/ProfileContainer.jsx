import "./profileContainer.css";
import ProfileForm from "./profileForm/ProfileForm";
import ProfileBannerAndPhoto from "./profileBannerAndPhoto/ProfileBannerAndPhoto";

const ProfileContainer = () => {
  return (
    <>
      <ProfileBannerAndPhoto />
      <div className="profileContainer">
        <ProfileForm />
      </div>
    </>
  );
};

export default ProfileContainer;
