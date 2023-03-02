import { useContext, useEffect, useState } from "react";
import { NFTMarketplaceContext } from "../../../context/NFTMarketplaceContext";
import "./chooseCollection.css";

import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";

import axios from "../../../utils/axios";
import ChooseCollectionItems from "./chooseCollectionItems/ChooseCollectionItems";

const ChooseCollection = ({
  setOpenChooseCollection,
  collectionData,
  setCollectionData,
  category,
  name,
  fileType,
  media,
  price,
  description,
  createNFT,
}) => {
  const [openChooseCollectionItems, setOpenChooseCollectionItems] =
    useState(false);

  const { currentAccount } = useContext(NFTMarketplaceContext);

  const [collections, setCollections] = useState([]);

  const fetchUsersCollection = async () => {
    try {
      const res = await axios.get(
        "/api/v1/collections/user/" + currentAccount?.toLowerCase()
      );

      setCollections(res.data?.collections);
    } catch (error) {}
  };

  useEffect(() => {
    (async () => {
      await fetchUsersCollection();
    })();
  }, []);

  console.log(collectionData);

  return (
    <>
      <div className="createCollectionContainerMain">
        <div className="createCollectionContainer">
          <div action="" className="createNftDataCollectionForm">
            <h2 className="createNftDataCollectionFormPriceHeading">
              Choose Collection
            </h2>
            <div className="ChooseCollectionItemsSelectContainer">
              <button
                className="ChooseCollectionItemsSelectBtn"
                onClick={() => {
                  setOpenChooseCollectionItems(!openChooseCollectionItems);
                }}
              >
                {openChooseCollectionItems ? (
                  <AiFillCaretUp className="arrow" />
                ) : (
                  <AiFillCaretDown className="arrow" />
                )}
                Choose Collection
              </button>
              {openChooseCollectionItems && (
                <ChooseCollectionItems
                  collections={collections}
                  collectionData={collectionData}
                  setCollectionData={setCollectionData}
                />
              )}
            </div>
            <div className="chooseCollectionCreateCancelBtn">
              <button
                className="createNftBtn chooseCollection"
                onClick={(e) => {
                  e.preventDefault();

                  createNFT(
                    name,
                    price,
                    media,
                    fileType,
                    description,
                    category,
                    collectionData
                  );
                  setOpenChooseCollection(false);
                }}
              >
                Create NFT
              </button>

              <button
                className="createNftBtn chooseCollection"
                onClick={(e) => {
                  e.preventDefault();
                  setOpenChooseCollection(false);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChooseCollection;
