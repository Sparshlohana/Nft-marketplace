import "./nftBuyAndBidMainContainer.css";
import NftAuthorName from "./nftAuthorName/NftAuthorName";
import NftTokenName from "./nftTokenName/NftTokenName";
import NftRanking from "./nftRanking/NftRanking";
import NftBuyBidAndSaleContainer from "./nftBuyBidAndSaleContainer/NftBuyBidAndSaleContainer";
import NftDetailContainer from "./nftDetails/NftDetailContainer";

const NftBuyAndBidMainContainer = () => {
  return (
    <div className="NftBuyAndBidMainContainer">
      <NftAuthorName />
      <NftTokenName />
      <NftRanking />
      <NftBuyBidAndSaleContainer />
      <NftDetailContainer />
    </div>
  );
};

export default NftBuyAndBidMainContainer;
