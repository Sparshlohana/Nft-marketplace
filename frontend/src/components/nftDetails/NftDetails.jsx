import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../utils/axios";
import NftBuyAndBidMainContainer from "./nftBuyAndBid/NftBuyAndBidMainContainer";
import "./nftDetails.css";
import NftPhotoAndDetails from "./NftPhotoAndDetails/NftPhotoAndDetails";

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
      setLike(() => {
        if (data.wishlist.includes(currentAccount.toLowerCase())) {
          return true;
        } else {
          return false;
        }
      });
      setLikes(data.wishlist.length);
    } catch (error) {
      console.log("error while fetching nft from api");
    }
  };
  // For toggle the like
  const toggleLikHandler = () => {
    setLike(!like);
  };

<<<<<<< HEAD
=======
  const setLikeHandler = (likes) => {
    setLikes(likes);
  };
  // const fetchSingleNft = async (tokenId) => {
  //   const data = await fetchNFT(Number(tokenId));
  //   setNft(data);
  // };

>>>>>>> d9b5ef9c6f49b0284ca9a4593e5c69382c430bf4
  useEffect(() => {
    (async () => await fetchNFTFromApi())();
  }, [currentAccount]);

  return (
    <div className="NftDetailsMainContainer">
      <NftPhotoAndDetails nft={nft} />
      <NftBuyAndBidMainContainer
        like={like}
        toggleLikHandler={toggleLikHandler}
        setLikeHandler={setLikeHandler}
        likes={likes}
        nft={nft}
      />
    </div>
  );
};

export default NftDetails;
