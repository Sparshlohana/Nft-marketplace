import { CgWebsite } from "react-icons/cg";
import { FaInstagram } from "react-icons/fa";
import { FiTwitter } from "react-icons/fi";
import { BsShare } from "react-icons/bs";
import { MdEdit } from "react-icons/md";

import { BiDotsHorizontalRounded } from "react-icons/bi";
import "./userSocialMedia.css";
import { useState } from "react";
import { AiFillFlag, AiFillSetting } from "react-icons/ai";
import { Link } from "react-router-dom";

const UserSocialMedia = () => {
  const [openSettings, setOpenSettings] = useState(false);

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
          <div
            className="userSocialMediaLink"
            onClick={() => setOpenSettings(!openSettings)}
          >
            <BiDotsHorizontalRounded className="userSocialMediaIcons userShowMoreIcon" />
          </div>
        </div>
      </div>
      {openSettings && (
        <div className="settingItemContainer">
          <Link className="settingItemContainerLink" to={"/user/edit"}>
            <button className="SettingItemBtn">
              <MdEdit></MdEdit> &nbsp; &nbsp; Edit Profile
            </button>
          </Link>
          <button className="SettingItemBtn">
            <AiFillSetting></AiFillSetting> &nbsp; &nbsp; Settings
          </button>

          <button className="SettingItemBtn">
            <AiFillFlag></AiFillFlag> &nbsp; &nbsp; Report
          </button>
        </div>
      )}
    </div>
  );
};

export default UserSocialMedia;
