import "./collectionSpecification.css";

const CollectionSpecification = ({ stats }) => {
  return (
    <div className="collectionSpecificationContainerMain">
      <div className="collectionSpecificationContainer">
        <p className="collectionSpecificationDetails">{stats.total} ETH</p>
        <h3 className="collectionSpecificationHeading">TOTAL VOLUME</h3>
      </div>

      <div className="collectionSpecificationContainer">
        <p className="collectionSpecificationDetails">
          {stats?.avg?.toFixed(2)} ETH
        </p>
        <h3 className="collectionSpecificationHeading">FLOOR PRICE</h3>
      </div>

      {/* <div className="collectionSpecificationContainer">
        <p className="collectionSpecificationDetails">5.3205 WETH</p>
        <h3 className="collectionSpecificationHeading">best offer</h3>
      </div> */}
    </div>
  );
};

export default CollectionSpecification;
