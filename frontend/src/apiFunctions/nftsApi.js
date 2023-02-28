import axios from "../utils/axios";

export const fetchNFTsFromApi = async (page, limit) => {
  const response = await axios.get(`/api/v1/nfts?page=${page}&limit=${limit}`);

  return response?.data?.data?.nfts;
};

export const handleFilteredNfts = async (minPrice, maxPrice) => {
  const response = await axios.get(
    `/api/v1/nfts?price[gte]=${minPrice}&price[lte]=${maxPrice}`
  );

  const data = response?.data?.data?.nfts;
  return data;
};

export const handleSortFilter = async (sort) => {
  try {
    if (sort === "Price: Lowest") {
      const response = await axios.get(`/api/v1/nfts?sort=price`);

      const data = response?.data?.data?.nfts;
      return data;
    }
    if (sort === "Price: Highest") {
      const response = await axios.get(`/api/v1/nfts?sort=-price`);

      const data = response?.data?.data?.nfts;
      return data;
    }
    if (sort === "Listed: Recent") {
      const response = await axios.get(`/api/v1/nfts?sort=-createdAt`);

      const data = response?.data?.data?.nfts;
      return data;
    }
    if (sort === "Listed: Recent") {
      const response = await axios.get(`/api/v1/nfts?sort=createdAt`);

      const data = response?.data?.data?.nfts;
      return data;
    }
  } catch (error) {
    console.log("error while sorting");
  }
};
