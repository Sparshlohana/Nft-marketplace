import { useContext, useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { FiHeart } from "react-icons/fi";
import { useParams } from "react-router-dom";
import { NFTMarketplaceContext } from "../../../../context/NFTMarketplaceContext";
import axios from "../../../../utils/axios";
import "./nftRanking.css";

const NftRanking = ({ like, likes, toggleLikHandler, setLikeHandler, nft }) => {
  const { currentAccount } = useContext(NFTMarketplaceContext);
  const { id } = useParams();

  const token = localStorage.getItem("token");

  const handleLike = async () => {
    let isLoading = false;
    if (currentAccount !== "") {
      toggleLikHandler();
      const data = { like, account: currentAccount, id };
      isLoading = true;
      await axios.post("/api/v1/nfts/favorites", data, {
        headers: { Authorization: token },
      });
      isLoading = false;
      if (!isLoading) {
        setLikeHandler(like ? likes - 1 : likes + 1);
      }
    }
  };

  return (
    <div className="nftRankingContainer">
      <div className="rankingContainer">
        <p className="ranking">#{nft?.tokenId}</p>
      </div>
      <div className="favoritesContainer">
        {like ? (
          <AiFillHeart
            onClick={handleLike}
            className="favoritesFillImg"
          ></AiFillHeart>
        ) : (
          <FiHeart onClick={handleLike} className="favoritesImg" />
        )}
        <p className="favorites">{likes} favorites</p>
      </div>
    </div>
  );
};

export default NftRanking;
