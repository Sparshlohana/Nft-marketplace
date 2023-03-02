import CollectionBanner from "./collectionBanner/CollectionBanner";
import CollectionProfile from "./collectionProfile/CollectionProfile";

const CollectionBannerAndImage = ({ collection }) => {
  return (
    <div className="collectionBannerAndImageContainer">
      <CollectionBanner />
      <CollectionProfile img={collection?.image} />
    </div>
  );
};

export default CollectionBannerAndImage;
