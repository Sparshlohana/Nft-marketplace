import "./collectionItems.css";

const CollectionItems = ({ nfts, collection }) => {
  return (
    <div className="collectionItemContainerMain">
      <div className="collectionItemContainer">
        <ul className="collectionItemUl">
          <li className="collectionItems">
            Items <span className="collectionItemSpan">{nfts?.length}</span>
          </li>
          <li className="collectionItems">
            Created{" "}
            <span className="collectionItemSpan">
              {collection?.createdAt?.slice(0, 10)}
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CollectionItems;
