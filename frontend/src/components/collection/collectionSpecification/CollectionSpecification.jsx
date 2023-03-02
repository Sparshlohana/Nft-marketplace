import "./collectionSpecification.css";

const CollectionSpecification = () => {
  return (
    <div className="collectionSpecificationContainerMain">
      <div className="collectionSpecificationContainer">
        <p className="collectionSpecificationDetails">2,29,739 ETH</p>
        <h3 className="collectionSpecificationHeading">total volume</h3>
      </div>

      <div className="collectionSpecificationContainer">
        <p className="collectionSpecificationDetails">5.49 ETH</p>
        <h3 className="collectionSpecificationHeading">floor price</h3>
      </div>

      {/* <div className="collectionSpecificationContainer">
        <p className="collectionSpecificationDetails">5.3205 WETH</p>
        <h3 className="collectionSpecificationHeading">best offer</h3>
      </div> */}

      <div className="collectionSpecificationContainer">
        <p className="collectionSpecificationDetails">5000</p>
        <h3 className="collectionSpecificationHeading">Owners</h3>
      </div>
    </div>
  );
};

export default CollectionSpecification;
