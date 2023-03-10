import { useContext } from "react";
import axios from "../../../utils/axios";
import { NFTMarketplaceContext } from "../../../context/NFTMarketplaceContext";
import ProfileBanner from "./profileBanner/ProfileBanner";
import ProfileImage from "./profileImage/ProfileImage";

const ProfileBannerAndPhoto = ({ userDetails, setUserDetails }) => {
  const { setError, setIsError } = useContext(NFTMarketplaceContext);

  const token = localStorage.getItem("token");

  const handleDrop = async (acceptedFile, type) => {
    try {
      const formData = new FormData();
      formData.append("media", acceptedFile[0]);

      const postUrl = "/api/v1/nfts/uploadToIPFS";

      if (
        acceptedFile[0].type.startsWith("image") ||
        acceptedFile[0].type.startsWith("image/gif")
      ) {
        const res = await axios.post(postUrl, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token,
          },
        });
        if (type === "image") {
          setUserDetails({ ...userDetails, image: res?.data?.url });
        }
        if (type === "banner") {
          setUserDetails({ ...userDetails, banner: res?.data?.url });
        }
      } else if (acceptedFile[0].type.startsWith("audio")) {
        setError("audio Cant be uploaded");
        setIsError(true);

        setTimeout(() => {
          setIsError(false);
        }, 3000);
      } else if (acceptedFile[0].type.startsWith("video")) {
        setError("Video Cant be uploaded");
        setIsError(true);

        setTimeout(() => {
          setIsError(false);
        }, 3000);
      }
    } catch (error) {
      setError("Cant'upload profile Image or banner ");
      setIsError(true);

      setTimeout(() => {
        setIsError(false);
      }, 5000);
    }
  };
  return (
    <div className="profileBannerAndPhotoContainer">
      <ProfileBanner handleDrop={handleDrop} userDetails={userDetails} />
      <ProfileImage handleDrop={handleDrop} userDetails={userDetails} />
    </div>
  );
};

export default ProfileBannerAndPhoto;
