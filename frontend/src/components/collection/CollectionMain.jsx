import UserNftCollectionContainer from "../userDetails/userNftCollectionContainer/UserNftCollectionContainer";
import CollectionBannerAndImage from "./collectionBannerAndImage/CollectionBannerAndImage";
import CollectionDescription from "./collectionDescription/CollectionDescription";
import CollectionHeading from "./collectionHeading/CollectionHeading";
import CollectionItems from "./collectionItems/CollectionItems";
import CollectionOwner from "./collectionOwner/CollectionOwner";
import CollectionSpecification from "./collectionSpecification/CollectionSpecification";

const CollectionMain = () => {
  return (
    <div className="collectionMain">
      <CollectionBannerAndImage />
      <CollectionHeading />
      <CollectionOwner />
      <CollectionItems />
      <CollectionDescription />
      <CollectionSpecification />
      <UserNftCollectionContainer />
    </div>
  );
};

export default CollectionMain;
