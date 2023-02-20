import NftBuyAndMakeOffer from "./nftBuyAndMakeOffer/NftBuyAndMakeOffer";
import "./nftBuyBidAndSaleContainer.css";
import NftSaleTime from "./nftSaleTime/NftSaleTime";

const NftBuyBidAndSaleContainer = ({ nft }) => {
  return (
    <div className="nftBuyBidAndSaleContainer">
      <NftSaleTime />
      <hr />
      <NftBuyAndMakeOffer nft={nft} />
    </div>
  );
};

export default NftBuyBidAndSaleContainer;
