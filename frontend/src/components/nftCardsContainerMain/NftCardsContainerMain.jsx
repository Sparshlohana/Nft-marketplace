import "./nftCardsContainerMain.css";
import NftCardsContainer from "./nftCardContainer/NftCardContainer";

const NftCardsContainerMain = ({ openFilter, nfts, setNfts, filter }) => {
  return (
    <div className="nftCardsContainerMain">
      <NftCardsContainer
        nfts={nfts}
        filter={filter}
        setNfts={setNfts}
        openFilter={openFilter}
      />
    </div>
  );
};

export default NftCardsContainerMain;
