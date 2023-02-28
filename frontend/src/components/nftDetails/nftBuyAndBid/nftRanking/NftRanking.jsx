import "./nftRanking.css";
import { FiHeart } from "react-icons/fi";
import { AiFillHeart } from "react-icons/ai";
import { useContext, useState } from "react";
import { NFTMarketplaceContext } from "../../../../context/NFTMarketplaceContext";
import axios from "../../../../utils/axios";
import { useParams } from "react-router-dom";

const NftRanking = ({ like, likes, setLike, setLikes }) => {
  const { currentAccount } = useContext(NFTMarketplaceContext);

  const { id } = useParams();

  const handleLike = async () => {
    if (currentAccount !== "") {
      setLike(!like);
      const data = { like, account: currentAccount, id };
      const res = await axios.post("/api/v1/nfts/favorites", data);
      console.log({ res: res.data });
      setLikes(res?.data?.count);
    }
  };

  return (
    <div className="nftRankingContainer">
      <div className="rankingContainer">
        <p className="ranking">#1000</p>
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
