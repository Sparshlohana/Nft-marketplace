import { MdModeEdit } from "react-icons/md";
import "./profileImage.css";

const ProfileImage = () => {
  return (
    <div className="profileImageContainer">
      <img
        className="profileImage"
        src="https://i.pinimg.com/736x/d7/f3/2e/d7f32e6c302205c45f082e6de141ef00.jpg"
        alt=""
      ></img>
      <MdModeEdit className="profileImageEditIcon" />
    </div>
  );
};

export default ProfileImage;
