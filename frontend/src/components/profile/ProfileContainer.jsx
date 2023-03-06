import ProfileHeading from "./profileHeading/ProfileHeading";
import "./profileContainer.css";
import ProfileForm from "./profileForm/ProfileForm";

const ProfileContainer = () => {
  return (
    <div className="profileContainer">
      <ProfileHeading />
      <ProfileForm />
    </div>
  );
};

export default ProfileContainer;
