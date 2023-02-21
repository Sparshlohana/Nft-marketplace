import NftAudioCard from "./nftCard/NftAudioCard/NftAudioCard";
import NftCard from "./nftCard/NftCard";
import "./nftCardContainer.css";

const NftCardContainer = ({ openFilter, nfts, filter }) => {
  return (
    <div className="nftCardContainer">
      {nfts?.map((nft, i) => {
        return nft?.fileType === "audio" ? (
          <NftAudioCard key={i} filter={filter} nft={nft} />
        ) : (
          <NftCard filter={filter} key={i} nft={nft} />
        );
      })}
    </div>
  );
};

export default NftCardContainer;
