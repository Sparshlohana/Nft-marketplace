import { Link } from "react-router-dom";
import NftAudioCard from "./nftCard/NftAudioCard/NftAudioCard";
import NftCard from "./nftCard/NftCard";
import "./nftCardContainer.css";

const NftCardContainer = ({ openFilter, nfts }) => {
  return (
    <div className="nftCardContainer">
      {nfts?.map((nft, i) => {
        return nft?.fileType === "audio" ? (
          <NftAudioCard key={i} nft={nft} />
        ) : (
          <NftCard key={i} nft={nft} />
        );
      })}
    </div>
  );
};

export default NftCardContainer;
