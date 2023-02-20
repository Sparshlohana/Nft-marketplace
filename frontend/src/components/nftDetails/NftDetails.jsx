import "./nftDetails.css";
import NftBuyAndBidMainContainer from "./nftBuyAndBid/NftBuyAndBidMainContainer";
import NftPhotoAndDetails from "./NftPhotoAndDetails/NftPhotoAndDetails";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../utils/axios";
import { NFTMarketplaceContext } from "../../context/NFTMarketplaceContext";

const NftDetails = () => {
  const { tokenId } = useParams();
  const [nft, setNft] = useState(null);

  const { fetchNFT } = useContext(NFTMarketplaceContext);

  const fetchSingleNft = async () => {
    const data = await fetchNFT(Number(tokenId));
    setNft(data);
  };

  useEffect(() => {
    fetchSingleNft();
  }, []);

  return (
    <div className="NftDetailsMainContainer">
      <NftPhotoAndDetails nft={nft} />
      <NftBuyAndBidMainContainer nft={nft} />
    </div>
  );
};

export default NftDetails;
