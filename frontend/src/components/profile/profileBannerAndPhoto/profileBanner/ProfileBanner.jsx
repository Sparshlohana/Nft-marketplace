import "./profileBanner.css";

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
    </div>
  );
};

export default ProfileBanner;
