import React, { useContext, useEffect, useState } from "react";
import CollectionContainer from "../../components/collectionContainer/CollectionContainer";
import FilterContainer from "../../components/filterContainer/FilterContainer";
import FilterContainerMain from "../../components/filterContainerMain/FilterContainerMain";
import NftCardsContainerMain from "../../components/nftCardsContainerMain/NftCardsContainerMain";
import SortByContainer from "../../components/sortByContainer/SortByContainer";
import { NFTMarketplaceContext } from "../../context/NFTMarketplaceContext";
import "./shop.css";

const Shop = () => {
  const [openSort, setOpenSort] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [nfts, setNfts] = useState([]);
  const [filter, setFilter] = useState({
    minPrice: null,
    maxPrice: null,
    currency: null,
  });

  const { fetchNFTs } = useContext(NFTMarketplaceContext);

  useEffect(() => {
    fetchNFTs().then((data) => {
      setNfts(data);
    });
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
            {openFilter && <FilterContainer />}
            <NftCardsContainerMain
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
