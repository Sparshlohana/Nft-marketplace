import "./nftCardsContainerMain.css";
import NftCardsContainer from "./nftCardContainer/NftCardContainer";

const NftCardsContainerMain = ({ openFilter }) => {
  return (
    <div className="nftCardsContainerMain">
      <NftCardsContainer openFilter={openFilter} />
    </div>
  );
};

export default NftCardsContainerMain;
