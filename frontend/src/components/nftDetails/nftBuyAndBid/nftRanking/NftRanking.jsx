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
  console.log(likes);
  const handleLike = async () => {
    if (currentAccount !== "") {
      setLike({ isLike: !like.isLike, account: currentAccount });
      if (like.isLike) {
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
        {!like?.isLike ? (
          <FiHeart onClick={handleLike} className="favoritesImg" />
        ) : (
          <AiFillHeart
            onClick={handleLike}
            className="favoritesFillImg"
          ></AiFillHeart>
        )}
        <p className="favorites">3 favorites</p>
      </div>
    </div>
  );
};

export default NftRanking;
