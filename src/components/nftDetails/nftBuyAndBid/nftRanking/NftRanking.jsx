import "./nftRanking.css";
import { FiHeart } from "react-icons/fi";

const NftRanking = () => {
  return (
    <div className="nftRankingContainer">
      <div className="rankingContainer">
        <p className="ranking">#1000</p>
      </div>
      <div className="favoritesContainer">
        <FiHeart className="favoritesImg" />
        <p className="favorites">3 favorites</p>
      </div>
    </div>
  );
};

export default NftRanking;
