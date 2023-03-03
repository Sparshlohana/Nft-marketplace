import React, { useEffect, useState } from "react";
import CollectionContainer from "../../components/collectionContainer/CollectionContainer";
import FilterContainer from "../../components/filterContainer/FilterContainer";
import FilterContainerMain from "../../components/filterContainerMain/FilterContainerMain";
import NftCardsContainerMain from "../../components/nftCardsContainerMain/NftCardsContainerMain";
import SortByContainer from "../../components/sortByContainer/SortByContainer";
import PageBtnContainer from "../../components/pageBtnContainer/PageBtnContainer";
// import { NFTMarketplaceContext } from "../../context/NFTMarketplaceContext";
import "./shop.css";

import axios from "../../utils/axios";

import {
  handleFilteredNfts,
  fetchNFTsFromApi,
  handleSortFilter,
} from "../../apiFunctions/nftsApi";
// import fetch from "axios";

const Shop = ({ search }) => {
  const [openSort, setOpenSort] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [nfts, setNfts] = useState([]);
  const [collections, setCollections] = useState([]);

  const [filter, setFilter] = useState({
    minPrice: 0,
    maxPrice: 0,
    currency: null,
    category: [],
  });

  const [sort, setSort] = useState(null);
  const [page, onPageChange] = useState(1);

  const [filteredNfts, setFilteredNfts] = useState([]);

  const fetchCollections = async () => {
    try {
      const res = await axios.get("/api/v1/collections");
      setCollections(res?.data?.collections);
    } catch (error) {}
  };

  useEffect(() => {
    fetchNFTsFromApi(page, 30).then((data) => setNfts(data));
    (async () => {
      await fetchCollections();
    })();
  }, [page]);

  const handleSearch = () => {
    const data = nfts?.filter((nft) => nft?.name?.includes(search));
    setFilteredNfts(data);
  };

  const handleSelectCategoryFilter = () => {
    const data = nfts?.filter((nft) => nft?.category === filter.category);
    setFilteredNfts(data);
  };

  useEffect(() => {
    handleSearch();
  }, [search]);

  useEffect(() => {
    handleFilteredNfts(filter.maxPrice, filter.minPrice).then((data) =>
      setFilteredNfts(data)
    );

    handleSelectCategoryFilter();
  }, [filter]);

  useEffect(() => {
    handleSortFilter(sort).then((data) => setFilteredNfts(data));
  }, [sort]);

  return (
    <>
      <div className="shop">
        <CollectionContainer collections={collections} />

        <div
          style={{
            position: "relative",
          }}
        >
          <SortByContainer
            openSort={openSort}
            sort={sort}
            setSort={setSort}
            setOpenSort={setOpenSort}
          />
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
              nfts={filteredNfts?.length > 0 ? filteredNfts : nfts}
              setNfts={setNfts}
              openFilter={openFilter}
            />
          </div>

          <PageBtnContainer
            page={page}
            onPageChange={onPageChange}
          ></PageBtnContainer>
        </div>
      </div>
    </>
  );
};

export default Shop;
