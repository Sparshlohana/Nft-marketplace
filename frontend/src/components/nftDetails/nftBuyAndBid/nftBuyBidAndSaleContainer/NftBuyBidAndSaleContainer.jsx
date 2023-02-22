import NftBuyAndMakeOffer from "./nftBuyAndMakeOffer/NftBuyAndMakeOffer";
import "./nftBuyBidAndSaleContainer.css";
import NftSaleTime from "./nftSaleTime/NftSaleTime";
import NFTResellInput from "../../../resellNft/nftResell-input/NFTResellInput";

const NftBuyBidAndSaleContainer = ({ nft }) => {
  return (
    <div className="nftBuyBidAndSaleContainer">
      <NftSaleTime></NftSaleTime>
      <NftBuyAndMakeOffer nft={nft}></NftBuyAndMakeOffer>
    </div>
  );
};

export default NftBuyBidAndSaleContainer;
