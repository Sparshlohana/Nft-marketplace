import NftBuyAndMakeOffer from "./nftBuyAndMakeOffer/NftBuyAndMakeOffer";
import "./nftBuyBidAndSaleContainer.css";
import NftSaleTime from "./nftSaleTime/NftSaleTime";

const NftBuyBidAndSaleContainer = () => {
  return (
    <div className="nftBuyBidAndSaleContainer">
      <NftSaleTime />
      <hr />
      <NftBuyAndMakeOffer />
    </div>
  );
};

export default NftBuyBidAndSaleContainer;
