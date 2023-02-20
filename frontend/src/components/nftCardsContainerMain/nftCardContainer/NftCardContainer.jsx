import { Link } from "react-router-dom";
import NftCard from "./nftCard/NftCard";
import "./nftCardContainer.css";

const NftCardContainer = ({ openFilter, nfts }) => {
  return (
    <div className="nftCardContainer">
      {nfts?.map((nft) => {
        return <NftCard nft={nft} />;
      })}
    </div>
  );
};

export default NftCardContainer;
