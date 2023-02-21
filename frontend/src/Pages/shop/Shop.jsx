import React, { useContext, useEffect, useState } from "react";
import CollectionContainer from "../../components/collectionContainer/CollectionContainer";
import FilterContainer from "../../components/filterContainer/FilterContainer";
import FilterContainerMain from "../../components/filterContainerMain/FilterContainerMain";
import NftCardsContainerMain from "../../components/nftCardsContainerMain/NftCardsContainerMain";
import SortByContainer from "../../components/sortByContainer/SortByContainer";
import { NFTMarketplaceContext } from "../../context/NFTMarketplaceContext";
import "./shop.css";

import axios from "../../utils/axios";

import fetch from "axios";

const Shop = () => {
  const [openSort, setOpenSort] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [nfts, setNfts] = useState([]);

  const [filter, setFilter] = useState({
    minPrice: 0,
    maxPrice: 0,
    currency: null,
  });

  const { fetchNFTs } = useContext(NFTMarketplaceContext);

  const fetchNFTsFromApi = async () => {
    const response = await axios.get("/api/v1/nfts");

    if (response.data.data?.nfts?.length > 0) {
      const arr = [];
      for (let nft of response.data.data?.nfts) {
        fetch.get(nft?.tokenURI).then((res) => {
          nft.media = res.data.media;
          nft.description = res.data.description;
          nft.fileType = res.data.fileType;
          arr.push(nft);
        });
      }

      return arr;
    } else {
      console.log("didnt get nfts");
    }
  };

  useEffect(() => {
    fetchNFTsFromApi().then((data) => setNfts(data));
  }, []);

  return (
    <>
      <div className="shop">
        <CollectionContainer />

        <div
          style={{
            position: "relative",
          }}
        >
          <SortByContainer openSort={openSort} setOpenSort={setOpenSort} />
          <FilterContainerMain
            openFilter={openFilter}
            setOpenFilter={setOpenFilter}
          />
          <div className="shopContainerFlex">
            {openFilter && (
              <FilterContainer filter={filter} setFilter={setFilter} />
            )}
            <NftCardsContainerMain
              filter={filter}
              nfts={nfts}
              setNfts={setNfts}
              openFilter={openFilter}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Shop;
