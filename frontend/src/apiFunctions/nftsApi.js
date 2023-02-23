import axios from "../utils/axios";

export const fetchNFTsFromApi = async (price) => {
    const response = await axios.get(`/api/v1/nfts?price[lte]=${price}`);

    const data = response?.data?.data?.nfts;
    return data;
};
