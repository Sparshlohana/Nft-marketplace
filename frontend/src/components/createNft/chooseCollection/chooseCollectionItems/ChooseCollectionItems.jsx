import React from "react";

import "./chooseCollectionItems.css";

const ChooseCollectionItems = ({
  collections,
  collectionData,
  setCollectionData,
}) => {
  return (
    <div className="chooseCollectionItemsMainContainer">
      {collections?.map(
        ({ collectionName, collectionDescription, creator, image, _id }) => {
          return (
            <button
              className="chooseCollectionContainer"
              onClick={() => {
                setCollectionData({
                  collectionName,
                  collectionDescription,
                  creator,
                  image,
                  _id,
                });
              }}
            >
              <img
                className="chooseCollectionImage"
                src={image}
                alt="collection"
              ></img>
              <div className="chooseCollectionNameHeading">
                <h4>{collectionName}</h4>
              </div>
            </button>
          );
        }
      )}
    </div>
  );
};

export default ChooseCollectionItems;
