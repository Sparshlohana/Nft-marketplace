import CreateCollectionHeading from "./createCollectionHeading/CreateCollectionHeading";
import "./createNft.css";
import CreateNftDataCollection from "./CreateNftDataCollection/CreateNftDataCollection";

const CreateNft = () => {
  return (
    <div className="CreateNftMainContainer">
      <CreateCollectionHeading />
      <CreateNftDataCollection />
    </div>
  );
};

export default CreateNft;
