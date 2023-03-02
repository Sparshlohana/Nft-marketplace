import "./collectionSpecification.css";

const CollectionSpecification = ({ stats }) => {
  return (
    <div className="collectionSpecificationContainerMain">
      <div className="collectionSpecificationContainer">
        <p className="collectionSpecificationDetails">{stats.total} ETH</p>
        <h3 className="collectionSpecificationHeading">total volume</h3>
      </div>

      <div className="collectionSpecificationContainer">
        <p className="collectionSpecificationDetails">{stats.avg} ETH</p>
        <h3 className="collectionSpecificationHeading">floor price</h3>
      </div>

      {/* <div className="collectionSpecificationContainer">
        <p className="collectionSpecificationDetails">5.3205 WETH</p>
        <h3 className="collectionSpecificationHeading">best offer</h3>
      </div> */}
    </div>
  );
};

export default CollectionSpecification;
