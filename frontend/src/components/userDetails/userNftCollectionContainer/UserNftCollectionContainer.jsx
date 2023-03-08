import { useContext, useEffect, useState } from "react";
import { NFTMarketplaceContext } from "../../../context/NFTMarketplaceContext";
import axios from "../../../utils/axios";
import CategoriesCardContainer from "../../categories/categoriesCardContainer/CategoriesCardContainer";
import FilterButton from "../../filterButton/FilterButton";
import FilterContainer from "../../filterContainer/FilterContainer";
import NftCardsContainerMain from "../../nftCardsContainerMain/NftCardsContainerMain";
import SortByContainer from "../../sortByContainer/SortByContainer";

const UserNftCollectionContainer = ({
  active,
  search,
  created,
  setCollected,

  isPublised,
  setIsPublished,
  setCreated,
  collected,
  favorites,
  setFavorites,
  collections,
}) => {
  const [openSort, setOpenSort] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);

  const { currentAccount, random } = useContext(NFTMarketplaceContext);

  const [filter, setFilter] = useState({
    minPrice: 0,
    maxPrice: 0,
    currency: null,
  });

  const token = sessionStorage.getItem("token");
  const [sort, setSort] = useState(null);

  const [collectedFilteredNfts, setCollectedFilteredNfts] = useState([]);
  const [createdFilteredNfts, setCreatedFilteredNfts] = useState([]);
  const [favoriteFilteredNfts, setFavoriteFilteredNfts] = useState([]);

  const fetchUsersNFTsFromApi = async (currentAccount) => {
    const response = await axios.get(
      `/api/v1/nfts/user/${currentAccount?.toLowerCase()}`,
      { headers: { Authorization: token } }
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
      }&price[lte]=${filter.maxPrice}`,
      { headers: { Authorization: token } }
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
          `/api/v1/nfts/user/${currentAccount?.toLowerCase()}?sort=price`,
          { headers: { Authorization: token } }
        );

        const data = response?.data?.data;

        setCollectedFilteredNfts(data?.nftsCollected);
        setCreatedFilteredNfts(data?.nftsCreated);

        setFavoriteFilteredNfts(data?.favorites);
      }
      if (sort === "Price: Highest") {
        const response = await axios.get(
          `/api/v1/nfts/user/${currentAccount?.toLowerCase()}?sort=-price`,
          { headers: { Authorization: token } }
        );

        const data = response?.data?.data;

        setCollectedFilteredNfts(data?.nftsCollected);

        setFavoriteFilteredNfts(data?.favorites);
        setCreatedFilteredNfts(data?.nftsCreated);
      }
      if (sort === "Listed: Recent") {
        const response = await axios.get(
          `/api/v1/nfts/user/${currentAccount?.toLowerCase()}?sort=-createdAt`,
          { headers: { Authorization: token } }
        );

        const data = response?.data?.data;

        setFavoriteFilteredNfts(data?.favorites);
        setCollectedFilteredNfts(data?.nftsCollected);
        setCreatedFilteredNfts(data?.nftsCreated);
      }
      if (sort === "Listed: Recent") {
        const response = await axios.get(
          `/api/v1/nfts/user/${currentAccount?.toLowerCase()}?sort=createdAt`,
          { headers: { Authorization: token } }
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
    // handleSearch();
  }, [search]);

  useEffect(() => {
    fetchUsersNFTsFromApi(currentAccount);
  }, [currentAccount, active, random]);

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
          {active !== 4 && (
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
          )}

          {collections.length > 0 && active === 4 && (
            <CategoriesCardContainer collections={collections} />
          )}
        </div>
      </div>
    </div>
  );
};

export default UserNftCollectionContainer;
