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

  const { currentAccount } = useContext(NFTMarketplaceContext);

  const [like, setLike] = useState(false);
  const [likes, setLikes] = useState(0);

  const fetchNFTFromApi = async () => {
    try {
      const response = await axios.get(`/api/v1/nfts/${id}`);
      const data = response?.data?.data?.nft;
      setNft(data);
      // console.log({ wishlist: data.wishlist });
      const isFavourite = data.wishlist.find((ac) => {
        return ac.account == currentAccount.toLowerCase();
      });
      console.log({ isFavourite });
      setLike(isFavourite?.isLiked);
      setLikes(nft?.wishlist?.length);
    } catch (error) {
      console.log("error while fetching nft from api");
    }
  };

  // const fetchSingleNft = async (tokenId) => {
  //   const data = await fetchNFT(Number(tokenId));
  //   setNft(data);
  // };

  useEffect(() => {
    (async () => await fetchNFTFromApi())();
    // fetchSingleNft();
  }, [currentAccount]);

  return (
    <div className="NftDetailsMainContainer">
      <NftPhotoAndDetails nft={nft} />
      <NftBuyAndBidMainContainer
        like={like}
        setLike={setLike}
        setLikes={setLikes}
        likes={likes}
        nft={nft}
      />
    </div>
  );
};

export default NftDetails;
