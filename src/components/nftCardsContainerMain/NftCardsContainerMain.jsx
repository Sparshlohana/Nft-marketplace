import "./nftCardsContainerMain.css";
import NftCardsContainer from "./nftCardContainer/NftCardContainer";

const NftCardsContainerMain = ({ openFilter, nfts, setNfts }) => {
  return (
    <div className="nftCardsContainerMain">
      <NftCardsContainer
        nfts={nfts}
        setNfts={setNfts}
        openFilter={openFilter}
      />
    </div>
  );
};

export default NftCardsContainerMain;
