import NftCard from "./nftCard/NftCard";
import "./nftCardContainer.css";

const NftCardContainer = ({ openFilter }) => {
  return (
    <div className="nftCardContainer">
      <NftCard />
      <NftCard />
      <NftCard />
      <NftCard />
      <NftCard />
      <NftCard />
      <NftCard />
      <NftCard />
      <NftCard />
      <NftCard />
    </div>
  );
};

export default NftCardContainer;
