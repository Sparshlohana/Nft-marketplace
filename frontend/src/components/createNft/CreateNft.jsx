import CreateCollectionHeading from "./createCollectionHeading/CreateCollectionHeading";
import CreateNftDataCollection from "./CreateNftDataCollection/CreateNftDataCollection";
import "./createNft.css";
import CreateCollection from "./createCollection/CreateCollection";
import { useState } from "react";
import ChooseCollection from "./chooseCollection/ChooseCollection";

const CreateNft = () => {
  const [openCreateCollection, setOpenCreateCollection] = useState(false);
  return (
    <div className="CreateNftMainContainer">
      <CreateCollectionHeading />
      {openCreateCollection ? (
        <CreateCollection />
      ) : (
        <CreateNftDataCollection
          openCreateCollection={openCreateCollection}
          setOpenCreateCollection={setOpenCreateCollection}
        />
      )}
      <ChooseCollection />
    </div>
  );
};

export default CreateNft;
