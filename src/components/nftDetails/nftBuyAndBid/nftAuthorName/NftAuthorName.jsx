import "./nftAuthorName.css";

const NftAuthorName = () => {
  return (
    <div className="nftAuthorNameContainer">
      <div className="nftAuthorName">
        <a href="/" className="nftAuthorNameAnchor">
          Author Name
        </a>
        <img
          className="nftAuthorNameVerificationImage"
          src="	https://cdn.cdnlogo.com/logos/t/77/twitter-verified-badge.svg"
          alt=""
        />
      </div>
    </div>
  );
};

export default NftAuthorName;
