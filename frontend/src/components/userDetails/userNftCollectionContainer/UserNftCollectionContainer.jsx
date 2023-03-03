import axios from "../../../utils/axios";
import { useContext, useEffect, useState } from "react";
import FilterButton from "../../filterButton/FilterButton";
import FilterContainer from "../../filterContainer/FilterContainer";
import NftCardsContainerMain from "../../nftCardsContainerMain/NftCardsContainerMain";
import SortByContainer from "../../sortByContainer/SortByContainer";
import { NFTMarketplaceContext } from "../../../context/NFTMarketplaceContext";

const UserNftCollectionContainer = ({ active, search }) => {
  const [openSort, setOpenSort] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);

  const { currentAccount } = useContext(NFTMarketplaceContext);

  const [collected, setCollected] = useState([]);

  const [created, setCreated] = useState([]);

  const [favorites, setFavorites] = useState([]);

  const [filter, setFilter] = useState({
    minPrice: 0,
    maxPrice: 0,
    currency: null,
  });

  const [sort, setSort] = useState(null);

  const [collectedFilteredNfts, setCollectedFilteredNfts] = useState([]);
  const [createdFilteredNfts, setCreatedFilteredNfts] = useState([]);
  const [favoriteFilteredNfts, setFavoriteFilteredNfts] = useState([]);

  const fetchUsersNFTsFromApi = async (currentAccount) => {
    const response = await axios.get(
      `/api/v1/nfts/user/${currentAccount?.toLowerCase()}`
    );
    const data = response?.data?.data;
    setCollected(data?.nftsCollected);
    setCreated(data?.nftsCreated);
    setFavorites(data?.favorites);
  };

  const handleFilteredNfts = async (filter) => {
    const response = await axios.get(
      `/api/v1/nfts/user/${currentAccount?.toLowerCase()}?price[gte]=${
        filter.minPrice
      }&price[lte]=${filter.maxPrice}`
    );

    const data = response?.data?.data;

    setCollectedFilteredNfts(data?.nftsCollected);
    setCreatedFilteredNfts(data?.nftsCreated);
    setFavoriteFilteredNfts(data?.favorites);
  };

  const handleSortFilter = async (sort) => {
    try {
      if (sort === "Price: Lowest") {
        const response = await axios.get(
          `/api/v1/nfts/user/${currentAccount?.toLowerCase()}?sort=price`
        );

        const data = response?.data?.data;

        setCollectedFilteredNfts(data?.nftsCollected);
        setCreatedFilteredNfts(data?.nftsCreated);

        setFavoriteFilteredNfts(data?.favorites);
      }
      if (sort === "Price: Highest") {
        const response = await axios.get(
          `/api/v1/nfts/user/${currentAccount?.toLowerCase()}?sort=-price`
        );

        const data = response?.data?.data;

        setCollectedFilteredNfts(data?.nftsCollected);

        setFavoriteFilteredNfts(data?.favorites);
        setCreatedFilteredNfts(data?.nftsCreated);
      }
      if (sort === "Listed: Recent") {
        const response = await axios.get(
          `/api/v1/nfts/user/${currentAccount?.toLowerCase()}?sort=-createdAt`
        );

        const data = response?.data?.data;

        setFavoriteFilteredNfts(data?.favorites);
        setCollectedFilteredNfts(data?.nftsCollected);
        setCreatedFilteredNfts(data?.nftsCreated);
      }
      if (sort === "Listed: Recent") {
        const response = await axios.get(
          `/api/v1/nfts/user/${currentAccount?.toLowerCase()}?sort=createdAt`
        );

        const data = response?.data?.data;

        setFavoriteFilteredNfts(data?.favorites);
        setCollectedFilteredNfts(data?.nftsCollected);
        setCreatedFilteredNfts(data?.nftsCreated);
      }
    } catch (error) {}
  };

  const handleSearch = () => {
    const searchCollected = collected?.filter((nft) =>
      nft?.name?.includes(search)
    );
    const searchCreated = created?.filter((nft) => nft?.name?.includes(search));

    const searchfavorite = favorites?.filter((nft) =>
      nft?.name?.includes(search)
    );
    setCollectedFilteredNfts(searchCollected);
    setCreatedFilteredNfts(searchCreated);
    setFavoriteFilteredNfts(searchfavorite);
  };

  useEffect(() => {
    handleSearch();
  }, [search]);

  useEffect(() => {
    fetchUsersNFTsFromApi(currentAccount);
  }, [currentAccount, active]);

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
            nfts={
              collectedFilteredNfts?.length > 0 ||
              createdFilteredNfts?.length > 0 ||
              favoriteFilteredNfts?.length > 0
                ? active === 1
                  ? collectedFilteredNfts
                  : active === 2
                  ? createdFilteredNfts
                  : favoriteFilteredNfts
                : active === 1
                ? collected
                : active === 2
                ? created
                : favorites
            }
            openFilter={openFilter}
          />
        </div>
      </div>
    </div>
  );
};

export default UserNftCollectionContainer;
