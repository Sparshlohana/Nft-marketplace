import CollectionBanner from "./collectionBanner/CollectionBanner";
import CollectionProfile from "./collectionProfile/CollectionProfile";

const CollectionBannerAndImage = () => {
  return (
    <div className="collectionBannerAndImageContainer">
      <CollectionBanner />
      <CollectionProfile />
    </div>
  );
};

export default CollectionBannerAndImage;
