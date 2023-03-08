import "./profileBanner.css";
import { MdModeEdit } from "react-icons/md";
import { useState } from "react";

const ProfileBanner = () => {
  const [hovered, setHovered] = useState(false);

  const handleMouseOver = () => {
    setHovered(true);
  };

  const handleMouseOut = () => {
    setHovered(false);
  };
  return (
    <div
      className="profileBannerContainer"
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      <img
        className="profileBanner"
        src="https://cdn.pixabay.com/photo/2015/11/19/08/52/banner-1050629__340.jpg"
        alt=""
      />
      <div className="profileBannerEditIconContainer">
        {/* <MdModeEdit className="profileBannerEditIcon" /> */}
        {hovered ? <MdModeEdit className="profileBannerEditIcon" /> : null}
      </div>
    </div>
  );
};

export default ProfileBanner;
