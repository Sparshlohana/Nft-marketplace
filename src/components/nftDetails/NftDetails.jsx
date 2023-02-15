import "./nftDetails.css";
import NftBuyAndBidMainContainer from "./nftBuyAndBid/NftBuyAndBidMainContainer";
import NftPhotoAndDetails from "./NftPhotoAndDetails/NftPhotoAndDetails";

const NftDetails = () => {
  return (
    <div className="NftDetailsMainContainer">
      <NftPhotoAndDetails />
      <NftBuyAndBidMainContainer />
    </div>
  );
};

export default NftDetails;
