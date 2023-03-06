import React from "react";
import "./chooseSearchItems.css";

const ChooseSearchItems = ({
  collections,
  collectionData,
  setCollectionData,
}) => (
  <div className="chooseSearchItemsContainer">
    {collections?.length > 0 && (
      <div>
        <h5 className="searchItemsContainerHeading">Your Collectinons</h5>
        <div className="searchItem">
          {collections.map((collection, i) => (
            <div
              className="SearchSingleItem searchChooseSingleItem"
              onClick={() =>
                setCollectionData({
                  collectionName: collection.collectionName,
                  collectionDescription: collection.collectionDescription,
                  image: collection.image,
                  category: collection.category,
                  created: true,
                  _id: collection._id,
                })
              }
            >
              <div className="searchItemImageContainer">
                <img
                  className="searchItemImage"
                  src={collection?.image}
                  alt="Could not load img here!!"
                ></img>
              </div>
              <p key={i}>{collection?.collectionName}</p>
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
);

export default ChooseSearchItems;
