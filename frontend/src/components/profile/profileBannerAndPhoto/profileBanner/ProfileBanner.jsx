import "./profileBanner.css";
import { MdModeEdit } from "react-icons/md";
import { useState } from "react";

import { useDropzone } from "react-dropzone";
import { useCallback } from "react";

const ProfileBanner = ({ handleDrop, userDetails }) => {
  const onDrop = useCallback(async (acceptedFile) => {
    handleDrop(acceptedFile, "banner");
  });

  const [hovered, setHovered] = useState(false);

  const handleMouseOver = () => {
    setHovered(true);
  };

  const handleMouseOut = () => {
    setHovered(false);
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image,gif,avif",
    onDrop,
  });

  return (
    <div
      className="profileBannerContainer"
      {...getRootProps()}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      <input type={"hidden"} {...getInputProps()}></input>
      <img
        className="profileBanner"
        src={
          userDetails.banner
            ? userDetails.banner
            : "https://cdn.shopify.com/s/files/1/1905/9639/files/lucent_logo.svg?v=1641550748"
        }
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
