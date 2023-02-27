import "./nftDetails.css";
import NftBuyAndBidMainContainer from "./nftBuyAndBid/NftBuyAndBidMainContainer";
import NftPhotoAndDetails from "./NftPhotoAndDetails/NftPhotoAndDetails";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../utils/axios";

import fetch from "axios";

import { NFTMarketplaceContext } from "../../context/NFTMarketplaceContext";

const NftDetails = () => {
  const { id } = useParams();
  const [nft, setNft] = useState(null);

  // const { fetchNFT } = useContext(NFTMarketplaceContext);

  const fetchNFTFromApi = async () => {
    try {
      const response = await axios.get(`/api/v1/nfts/${id}`);
      return response?.data?.data?.nft;
    } catch (error) {
      console.log("error while fetching nft from api");
    }
  };

  // const fetchSingleNft = async (tokenId) => {
  //   const data = await fetchNFT(Number(tokenId));
  //   setNft(data);
  // };

  useEffect(() => {
    fetchNFTFromApi().then((data) => {
      setNft(data);
      console.log(data);
    });
    // fetchSingleNft();
  }, []);

  return (
    <div className="NftDetailsMainContainer">
      <NftPhotoAndDetails nft={nft} />
      <NftBuyAndBidMainContainer nft={nft} />
    </div>
  );
};

export default NftDetails;
