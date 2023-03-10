import PriceUnderHeading from "./priceUnderHeading/PriceUnderHeading";
import "./priceUnderContainer.css";
import HomeNftsSection from "../homeNftsSectionContainer/HomeNftsSection";

const PriceUnderContainer = () => {
  return (
    <div className="priceUnderContainerMain">
      <PriceUnderHeading title={"Top 15 Popular Nfts"} />
      <HomeNftsSection url={"/api/v1/nfts/popular-nfts?likes=1"} />

      <PriceUnderHeading title={"Latest Trending Nfts"} />
      <HomeNftsSection url={"/api/v1/nfts/trending-nfts"} />
    </div>
  );
};

export default PriceUnderContainer;
