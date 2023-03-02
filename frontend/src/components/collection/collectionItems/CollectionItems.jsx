import "./collectionItems.css";

const CollectionItems = () => {
  return (
    <div className="collectionItemContainerMain">
      <div className="collectionItemContainer">
        <ul className="collectionItemUl">
          <li className="collectionItems">
            Items <span className="collectionItemSpan">10k</span>
          </li>
          <li className="collectionItems">
            Created{" "}
            <span className="collectionItemSpan">
              {new Date().toLocaleDateString()}
            </span>
          </li>
          <li className="collectionItems">
            Categories <span className="collectionItemSpan">Art</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CollectionItems;
