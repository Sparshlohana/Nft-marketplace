import PriceUnderHeading from "./priceUnderHeading/PriceUnderHeading";
import "./priceUnderContainer.css";
import PriceUnderCards from "./priceUnderCards/PriceUnderCards";

const PriceUnderContainer = () => {
  return (
    <div className="priceUnderContainerMain">
      <PriceUnderHeading title={"Nfts under 5 ETH"} />
      <PriceUnderCards price={5} />
      <hr className="priceUnderContainerHr" />
      <PriceUnderHeading title={"Nfts under 15 ETH"} />
      <PriceUnderCards price={15} />
      <hr className="priceUnderContainerHr" />
      <PriceUnderHeading title={"Nfts under 25 ETH"} />
      <PriceUnderCards price={25} />
    </div>
  );
};

export default PriceUnderContainer;
