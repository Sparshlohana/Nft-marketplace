import "./chooseCollection.css";

const ChooseCollection = () => {
  return (
    <>
      <div className="createCollectionContainerMain">
        <div className="createCollectionContainer">
          <form action="" className="createNftDataCollectionForm">
            <h2 className="createNftDataCollectionFormPriceHeading">
              Choose Collection
            </h2>
            <select
              name=""
              id=""
              className="createNftDataCollectionFormInput chooseCollectionSelect"
            >
              <option
                className="createNftDataCollectionOption"
                value="Collection"
              >
                Choose Collection..
              </option>
              <option
                className="createNftDataCollectionOption"
                value="Collection"
              >
                Collection1
              </option>
              <option
                className="createNftDataCollectionOption"
                value="Collection"
              >
                Collection1
              </option>
              <option
                className="createNftDataCollectionOption"
                value="Collection"
              >
                Collection1
              </option>
              <option
                className="createNftDataCollectionOption"
                value="Collection"
              >
                Collection1
              </option>
            </select>
            <button className="createNftBtn chooseCollection">
              Choose Collection
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ChooseCollection;
