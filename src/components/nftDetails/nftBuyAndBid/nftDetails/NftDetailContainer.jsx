import "./nftDetailContainer.css";
import NftDetailHeading from "./nftDetailHeading/NftDetailHeading";
import NftDetailsContent from "./nftDetailsContent/NftDetailsContent";

const NftDetailContainer = () => {
  return (
    <div className="nftDetailContainer">
      <NftDetailHeading />
      <hr className="nftDetailContainerHr" />
      <NftDetailsContent />
    </div>
  );
};

export default NftDetailContainer;
