import CreateCollectionHeading from "./createCollectionHeading/CreateCollectionHeading";
import CreateNftDataCollection from "./CreateNftDataCollection/CreateNftDataCollection";
import "./createNft.css";

const CreateNft = () => {
  return (
    <div className="CreateNftMainContainer">
      <CreateCollectionHeading />
      <CreateNftDataCollection />
    </div>
  );
};

export default CreateNft;
