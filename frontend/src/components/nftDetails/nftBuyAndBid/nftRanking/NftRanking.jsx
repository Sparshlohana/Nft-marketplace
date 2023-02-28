import "./nftRanking.css";
import { FiHeart } from "react-icons/fi";
import { AiFillHeart } from "react-icons/ai";
import { useContext, useState } from "react";
import { NFTMarketplaceContext } from "../../../../context/NFTMarketplaceContext";
import axios from "../../../../utils/axios";
import { useParams } from "react-router-dom";

const NftRanking = () => {
  const [like, setLike] = useState({ isLike: false, account: "" });
  const { currentAccount } = useContext(NFTMarketplaceContext);
  const [likes, setLikes] = useState([]);
  const id = useParams();

  const handleLike = async () => {
    if (currentAccount !== "") {
      setLike({ isLike: !like.isLike, account: currentAccount });
      console.log(like.isLike);
      if (like.isLike === true) {
        const data = { like: like.isLike, account: like.account, id };
        const res = await axios.post("/api/v1/nfts/favorites", data);
        setLikes(res?.data?.likes);
      }
    }
  };

  return (
    <div className="nftRankingContainer">
      <div className="rankingContainer">
        <p className="ranking">#1000</p>
      </div>
      <div className="favoritesContainer">
        {like?.isLike ? (
          <AiFillHeart
            onClick={handleLike}
            className="favoritesFillImg"
          ></AiFillHeart>
        ) : (
          <FiHeart onClick={handleLike} className="favoritesImg" />
        )}
        <p className="favorites">{likes?.length} favorites</p>
      </div>
    </div>
  );
};

export default NftRanking;
