import "./collectionHeading.css";

const CollectionHeading = () => {
  return (
    <div className="collectionHeadingContainerMain">
      <div className="collectionHeadingAndVerificationImgContainer">
        <h1 className="collectionHeading">Deep Collection</h1>
        <div className="collectionVerificationImgContainer">
          <img
            className="collectionVerificationImg"
            src="	https://cdn.cdnlogo.com/logos/t/77/twitter-verified-badge.svg"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default CollectionHeading;
