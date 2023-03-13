import "./userBanner.css";

const UserBanner = ({ userDetails }) => {
  return (
    <div className="userBannerContainer">
      <img
        className="userBannerImage"
        src={
          userDetails?.banner
            ? userDetails.banner
            : "https://cdn.shopify.com/s/files/1/1905/9639/files/lucent_logo.svg?v=1641550748"
        }
        alt=""
      />
    </div>
  );
};

export default UserBanner;
