import CollectionCards from "../collectionCards/CollectionCards";
import CollectionHeading from "../collectionHeading/CollectionHeading";
import "./collectionContainer.css";

const CollectionContainer = () => {
  return (
    <div className="collectionContainer">
      <CollectionHeading />
      <CollectionCards />
    </div>
  );
};

export default CollectionContainer;
