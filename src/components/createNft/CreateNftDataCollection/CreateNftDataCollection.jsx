import "./createNftDataCollection.css";

const CreateNftDataCollection = () => {
  return (
    <div className="createNftDataCollection">
      <form action="" className="createNftDataCollectionForm">
        <div className="createNftDataCollectionFormItemContainer">
          <input type="file" />
        </div>

        <div className="createNftDataCollectionFormItemContainer">
          <h4 className="">Collection Name</h4>
          <input type="text" placeholder="Name" required />
        </div>

        <div className="createNftDataCollectionFormItemContainer">
          <h4 className="">Description</h4>
          <input type="text" placeholder="Description of this container.." />
        </div>

        <div className="createNftDataCollectionFormPriceAndRoyaltyContainer">
          <div className="createNftDataCollectionFormItemContainer">
            <h4 className="">Price</h4>
            <input type="text" placeholder="Enter Amount.." required />
          </div>
          <div className="createNftDataCollectionFormItemContainer">
            <h4 className="">Royalty Amount</h4>
            <input type="text" placeholder="%" />
          </div>
        </div>

        <div className="createNftDataCollectionFormItemContainer">
          <h4 className="">Royalty recipient</h4>
          <input type="text" placeholder="Royalty recipient" />
        </div>

        <div className="createNftDataCollectionFormItemContainer">
          <h4 className="">Minting revenue recipient</h4>
          <input type="text" placeholder="Royalty recipient" required />
        </div>
      </form>
    </div>
  );
};

export default CreateNftDataCollection;
