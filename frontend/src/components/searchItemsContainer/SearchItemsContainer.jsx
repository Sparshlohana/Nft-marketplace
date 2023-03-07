import React from "react";
import { Link } from "react-router-dom";
import "./searchItemsContainer.css";

const SearchItemsContainer = ({ collections, nfts }) => {
  console.log(collections.length);
  return (
    <div className="searchItemsContainer">
      {collections?.length > 0 ? (
        <div>
          <h5 className="searchItemsContainerHeading">Collectinons</h5>
          <div className="searchItem">
            {collections.map((collection, i) => (
              <Link
                style={{ textDecoration: "none", color: "black" }}
                to={"/collection/" + collection?._id}
              >
                <div className="SearchSingleItem">
                  <div className="searchItemImageContainer">
                    <img
                      className="searchItemImage"
                      src={collection?.image}
                      alt="Could not load img here!!"
                    ></img>
                  </div>
                  <p key={i}>{collection?.collectionName}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <div
            className="searchItem"
            style={{ color: "gray", textAlign: "center" }}
          >
            <p>No Result Found!</p>
          </div>
        </div>
      )}

      {nfts?.length > 0 && (
        <div>
          <h5 className="searchItemsContainerHeading">Nfts</h5>
          <div className="searchItem">
            {nfts.map((nft, i) => (
              <Link
                style={{ textDecoration: "none", color: "black" }}
                to={"/nft/" + nft?._id}
              >
                <div className="SearchSingleItem">
                  <div className="searchItemImageContainer">
                    <img
                      className="searchItemImage"
                      src={nft?.media}
                      alt="Could not load img here!!"
                    />
                  </div>
                  <p key={i}>{nft?.name}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchItemsContainer;
