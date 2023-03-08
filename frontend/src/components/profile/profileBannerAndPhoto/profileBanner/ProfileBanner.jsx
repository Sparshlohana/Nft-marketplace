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
import { useDropzone } from "react-dropzone";
import { useCallback } from "react";

const ProfileBanner = ({ handleDrop, userDetails }) => {
  const onDrop = useCallback(async (acceptedFile) => {
    handleDrop(acceptedFile, "banner");
  });

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image,gif,avif",
    onDrop,
  });

  return (
    <div className="profileBannerContainer" {...getRootProps()}>
      <input type={"hidden"} {...getInputProps()}></input>
      <img
        className="profileBanner"
        src={
          userDetails.banner
            ? userDetails.banner
            : "https://wallpapercave.com/wp/wp5281122.jpg"
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
