import axios from "../utils/axios";

export const fetchNFTsFromApi = async (page, limit) => {
  const token = localStorage.getItem("token");

  const response = await axios.get(`/api/v1/nfts?page=${page}&limit=${limit}`, {
    headers: { Authorization: token },
  });

  return response?.data?.data?.nfts;
};

export const handleFilteredNfts = async (minPrice, maxPrice) => {
  const token = localStorage.getItem("token");
  const response = await axios.get(
    `/api/v1/nfts?price[gte]=${minPrice}&price[lte]=${maxPrice}`,
    { headers: { Authorization: token } }
  );

  const data = response?.data?.data?.nfts;
  return data;
};

export const handleSortFilter = async (sort) => {
  const token = localStorage.getItem("token");
  try {
    if (sort === "Price: Lowest") {
      const response = await axios.get(`/api/v1/nfts?sort=price`, {
        headers: { Authorization: token },
      });

      const data = response?.data?.data?.nfts;
      return data;
    }
    if (sort === "Price: Highest") {
      const response = await axios.get(`/api/v1/nfts?sort=-price`, {
        headers: { Authorization: token },
      });

      const data = response?.data?.data?.nfts;
      return data;
    }
    if (sort === "Listed: Recent") {
      const response = await axios.get(`/api/v1/nfts?sort=-createdAt`, {
        headers: { Authorization: token },
      });

      const data = response?.data?.data?.nfts;
      return data;
    }
    if (sort === "Listed: Recent") {
      const response = await axios.get(`/api/v1/nfts?sort=createdAt`, {
        headers: { Authorization: token },
      });

      const data = response?.data?.data?.nfts;
      return data;
    }
  } catch (error) {}
};
