import { CgWebsite } from "react-icons/cg";
import { FaInstagram } from "react-icons/fa";
import { FiTwitter } from "react-icons/fi";
import { BsShare } from "react-icons/bs";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import "./userSocialMedia.css";

const UserSocialMedia = () => {
  return (
    <div className="socialMediaContainerMain">
      <div className="userSocialMediaContainer">
        <div className="socialMediaIconsContainer">
          <a href="/" className="userSocialMediaLink">
            <CgWebsite className="userSocialMediaIcons userWebsite" />
          </a>
        </div>

        <div className="socialMediaIconsContainer">
          <a href="/" className="userSocialMediaLink">
            <FaInstagram className="userSocialMediaIcons userInstagram" />
          </a>
        </div>

        <div className="socialMediaIconsContainer">
          <a href="/" className="userSocialMediaLink">
            <FiTwitter className="userSocialMediaIcons userTwitter" />
          </a>
        </div>

        <div className="userSocialMediaHr"></div>
        <div className="socialMediaIconsContainer">
          <a href="/" className="userSocialMediaLink">
            <BsShare className="userSocialMediaIcons userShareIcon" />
          </a>
        </div>

        <div className="socialMediaIconsContainer">
          <a href="/" className="userSocialMediaLink">
            <BiDotsHorizontalRounded className="userSocialMediaIcons userShowMoreIcon" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default UserSocialMedia;
