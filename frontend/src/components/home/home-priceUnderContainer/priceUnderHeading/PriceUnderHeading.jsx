import "./priceUnderHeading.css";

const PriceUnderHeading = ({ title }) => {
  return (
    <div className="priceUnderHeadingContainer">
      <h1 className="priceUnderHeading  ">{title}</h1>
    </div>
  );
};

export default PriceUnderHeading;
