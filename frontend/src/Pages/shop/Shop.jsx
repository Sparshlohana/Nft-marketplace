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

  const [sort, setSort] = useState(null);

  const [filteredNfts, setFilteredNfts] = useState([]);

  // const { fetchNFTs } = useContext(NFTMarketplaceContext);

  const fetchNFTsFromApi = async () => {
    const response = await axios.get(`/api/v1/nfts`);

    return response?.data?.data?.nfts;
  };

  const handleFilteredNfts = async (filter) => {
    const response = await axios.get(
      `/api/v1/nfts?nfts?price[gte]=${filter.minPrice}&price[lte]=${filter.maxPrice}`
    );

    const data = response?.data?.data?.nfts;
    setFilteredNfts(data);
  };

  const handleSortFilter = async (sort) => {
    try {
      if (sort === "Price: Lowest") {
        const response = await axios.get(`/api/v1/nfts?sort=price`);

        const data = response?.data?.data?.nfts;
        setFilteredNfts(data);
      }
      if (sort === "Price: Highest") {
        const response = await axios.get(`/api/v1/nfts?sort=-price`);

        const data = response?.data?.data?.nfts;
        setFilteredNfts(data);
      }
      if (sort === "Listed: Recent") {
        const response = await axios.get(`/api/v1/nfts?sort=-createdAt`);

        const data = response?.data?.data?.nfts;
        setFilteredNfts(data);
      }
      if (sort === "Listed: Recent") {
        const response = await axios.get(`/api/v1/nfts?sort=createdAt`);

        const data = response?.data?.data?.nfts;
        setFilteredNfts(data);
      }
    } catch (error) {
      console.log("error while sorting");
    }
  };

  useEffect(() => {
    fetchNFTsFromApi().then((data) => setNfts(data));
  }, []);

  console.log(filteredNfts);

  useEffect(() => {
    handleFilteredNfts(filter);
  }, [filter]);

  useEffect(() => {
    handleSortFilter(sort);
  }, [sort]);

  return (
    <>
      <div className="shop">
        <CollectionContainer />

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
        </div>
      </div>
    </>
  );
};

export default Shop;
