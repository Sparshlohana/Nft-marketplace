import "./collectionCards.css";
import CollectionCard from "./collectionCard/CollectionCard";
import { Link } from "react-router-dom";

const CollectionCards = ({ collections }) => {
  return (
    <div className="CollectionCardsContainerMain">
      {collections?.map((collection) => (
        <Link to={"/collection/" + collection?._id}>
          <CollectionCard collection={collection} />
        </Link>
      ))}
    </div>
  );
};

export default CollectionCards;
