import ProfileBanner from "./profileBanner/ProfileBanner";
import ProfileImage from "./profileImage/ProfileImage";

const ProfileBannerAndPhoto = () => {
  return (
    <div className="profileBannerAndPhotoContainer">
      <ProfileBanner />
      <ProfileImage />
    </div>
  );
};

export default ProfileBannerAndPhoto;
