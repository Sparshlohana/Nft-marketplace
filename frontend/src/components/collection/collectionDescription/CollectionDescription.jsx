import "./collectionDescription.css";

const CollectionDescription = ({ collection }) => {
  return (
    <div className="collectionDescriptionContainer">
      <p className="collectionDescription">
        {collection?.collectionDescription}
      </p>
    </div>
  );
};

export default CollectionDescription;
