import axios from "../../../utils/axios";
import { useEffect, useState } from "react";
import FilterButton from "../../filterButton/FilterButton";
import FilterContainer from "../../filterContainer/FilterContainer";
import NftCardsContainerMain from "../../nftCardsContainerMain/NftCardsContainerMain";
import SortByContainer from "../../sortByContainer/SortByContainer";

const UserNftCollectionContainer = () => {
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
    <div className="filterContainerMain">
      <div
        style={{
          position: "relative",
          width: "100%",
        }}
      >
        <div className="shop">
          <SortByContainer
            openSort={openSort}
            sort={sort}
            setSort={setSort}
            setOpenSort={setOpenSort}
          />
        </div>
        <FilterButton openFilter={openFilter} setOpenFilter={setOpenFilter} />
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
  );
};

export default UserNftCollectionContainer;
