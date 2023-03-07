import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CollectionBannerAndImage from "./collectionBannerAndImage/CollectionBannerAndImage";
import CollectionDescription from "./collectionDescription/CollectionDescription";
import CollectionHeading from "./collectionHeading/CollectionHeading";
import CollectionItems from "./collectionItems/CollectionItems";
import axios from "../../utils/axios";
import CollectionOwner from "./collectionOwner/CollectionOwner";
import CollectionSpecification from "./collectionSpecification/CollectionSpecification";
import CollectionNftsSectionContainer from "./collectionNftsSectionContainer/CollectionNftsSectionContainer";

const CollectionMain = ({ search }) => {
  const { id } = useParams();

  const [sort, setSort] = useState(null);

  const [filteredNfts, setFilteredNfts] = useState([]);

  const [openSort, setOpenSort] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);

  const [filter, setFilter] = useState({
    minPrice: 0,
    maxPrice: 0,
    currency: null,
  });

  const [collection, setCollection] = useState({});
  const [nfts, setNfts] = useState([]);
  const [stats, setStats] = useState({ total: 0, avg: 0, owners: 0 });

  const fetchSingleCollection = async () => {
    try {
      const res = await axios.get(`/api/v1/collections/${id}`);

      const total = res?.data?.total[0];

      setCollection(res?.data?.collection);
      setNfts(res?.data?.nfts);
      setStats({
        total: total?.TotalAmount,
        avg: total?.avg,
        owners: total?.owners,
      });
    } catch (error) {}
  };

  const handleFilteredNfts = async (filter) => {
    const response = await axios.get(
      `/api/v1/collections/${id}?price[gte]=${filter.minPrice}&price[lte]=${filter.maxPrice}`
    );

    const data = response?.data?.nfts;
    setFilteredNfts(data);
  };

  const handleSortFilter = async (sort) => {
    try {
      if (sort === "Price: Lowest") {
        const response = await axios.get(
          `/api/v1/collections/${id}?sort=price`
        );

        const data = response?.data?.nfts;
        setFilteredNfts(data);
      }
      if (sort === "Price: Highest") {
        const response = await axios.get(
          `/api/v1/collections/${id}?sort=-price`
        );

        const data = response?.data?.nfts;
        setFilteredNfts(data);
      }
      if (sort === "Listed: Recent") {
        const response = await axios.get(
          `/api/v1/collections/${id}?sort=-createdAt`
        );

        const data = response?.data?.nfts;
        setFilteredNfts(data);
      }
      if (sort === "Listed: Recent") {
        const response = await axios.get(
          `/api/v1/collections/${id}?sort=createdAt`
        );

        const data = response?.data?.nfts;
        setFilteredNfts(data);
      }
    } catch (error) {}
  };

  const handleSearch = () => {
    const data = nfts?.filter((nft) => nft?.name?.includes(search));
    setFilteredNfts(data);
  };
  useEffect(() => {
    // handleSearch();
  }, [search]);

  useEffect(() => {
    (async () => {
      await fetchSingleCollection();
    })();
  }, [nfts]);

  useEffect(() => {
    handleFilteredNfts(filter);
  }, [filter]);

  useEffect(() => {
    handleSortFilter(sort);
  }, [sort]);

  return (
    <div className="collectionMain">
      <CollectionBannerAndImage collection={collection} />
      <CollectionHeading collection={collection} />
      <CollectionOwner collection={collection} />
      <CollectionDescription collection={collection} />
      <CollectionItems collection={collection} nfts={nfts} />
      <CollectionSpecification stats={stats} />
      <CollectionNftsSectionContainer
        setOpenSort={setOpenSort}
        setOpenFilter={setOpenFilter}
        openFilter={openFilter}
        openSort={openSort}
        filter={filter}
        setFilter={setFilter}
        sort={sort}
        setSort={setSort}
        nfts={filteredNfts?.length > 0 ? filteredNfts : nfts}
        filteredNfts={filteredNfts}
      />
    </div>
  );
};

export default CollectionMain;
