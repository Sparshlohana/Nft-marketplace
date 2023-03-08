import "./userBanner.css";

const UserBanner = ({ userDetails }) => {
  return (
    <div className="userBannerContainer">
      <img
        className="userBannerImage"
        src={
          userDetails?.banner
            ? userDetails.banner
            : "https://wallpapercave.com/wp/wp5281122.jpg"
        }
        alt=""
      />
    </div>
  );
};

export default UserBanner;
