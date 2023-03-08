import "./userBio.css";

const UserBio = ({ userDetails }) => {
  return (
    <div className="userBioContainer">
      <p className="userBio" style={{ fontSize: "1rem" }}>
        {userDetails?.bio}
      </p>
    </div>
  );
};

export default UserBio;
