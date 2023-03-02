import "./collectionCards.css";
import CollectionCard from "./collectionCard/CollectionCard";

const CollectionCards = ({ collections }) => {
  return (
    <div className="CollectionCardsContainerMain">
      {collections?.map((collection) => (
        <CollectionCard collection={collection} />
      ))}
    </div>
  );
};

export default CollectionCards;
