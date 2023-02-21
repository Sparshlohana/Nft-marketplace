import { CgWebsite } from "react-icons/cg";
import { FaInstagram } from "react-icons/fa";
import { CiTwitter } from "react-icons/ci";
import { BsShare } from "react-icons/bs";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import "./userSocialMedia.css";

const UserSocialMedia = () => {
  return (
    <div className="socialMediaContainerMain">
      <div className="userSocialMediaContainer">
        <a href="/" className="userSocialMediaLink">
          <CgWebsite />
        </a>
        <a href="/" className="userSocialMediaLink">
          <FaInstagram />
        </a>
        <a href="/" className="userSocialMediaLink">
          <CiTwitter />
        </a>
        <div className="userSocialMediaHr"></div>
        <a href="/" className="userSocialMediaLink">
          <BsShare />
        </a>
        <a href="/" className="userSocialMediaLink">
          <BiDotsHorizontalRounded />
        </a>
      </div>
    </div>
  );
};

export default UserSocialMedia;
