import NftAuthorName from "./nftAuthorName/NftAuthorName";
import NftTokenName from "./nftTokenName/NftTokenName";
import "./nftBuyAndBidMainContainer.css";
import NftRanking from "./nftRanking/NftRanking";
import NftBuyBidAndSaleContainer from "./nftBuyBidAndSaleContainer/NftBuyBidAndSaleContainer";

const NftBuyAndBidMainContainer = () => {
  return (
    <div className="NftBuyAndBidMainContainer">
      <NftAuthorName />
      <NftTokenName />
      <NftRanking />
      <NftBuyBidAndSaleContainer />
    </div>
  );
};

export default NftBuyAndBidMainContainer;
