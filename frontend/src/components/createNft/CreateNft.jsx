import CreateCollectionHeading from "./createCollectionHeading/CreateCollectionHeading";
import CreateNftDataCollection from "./CreateNftDataCollection/CreateNftDataCollection";
import "./createNft.css";
import CreateCollection from "./createCollection/CreateCollection";
import { useContext, useState } from "react";
import ChooseCollection from "./chooseCollection/ChooseCollection";
import { NFTMarketplaceContext } from "../../context/NFTMarketplaceContext";

const CreateNft = () => {
  const [openCreateCollection, setOpenCreateCollection] = useState(false);
  const [openChooseCollection, setOpenChooseCollection] = useState(false);

  const { currentAccount, createNFT, setError, setIsError } = useContext(
    NFTMarketplaceContext
  );

  const [media, setMedia] = useState(null);
  const [fileType, setFileType] = useState(null);
  const [price, setPrice] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [royalties, setRoyalties] = useState("");
  const [category, setCategory] = useState(0);

  const [collectionData, setCollectionData] = useState({
    collectionName: "",
    collectionDescription: "",
    image: "",
    creator: currentAccount.toLowerCase(),
    created: false,
  });

  return (
    <div className="CreateNftMainContainer">
      <CreateCollectionHeading />
      {openCreateCollection ? (
        <CreateCollection
          setOpenCreateCollection={setOpenCreateCollection}
          collectionData={collectionData}
          setCollectionData={setCollectionData}
          name={name}
          fileType={fileType}
          media={media}
          category={category}
          price={price}
          description={description}
          createNFT={createNFT}
        />
      ) : openChooseCollection ? (
        <ChooseCollection
          collectionData={collectionData}
          setCollectionData={setCollectionData}
          setOpenChooseCollection={setOpenChooseCollection}
          name={name}
          fileType={fileType}
          media={media}
          category={category}
          price={price}
          description={description}
          createNFT={createNFT}
        />
      ) : (
        <CreateNftDataCollection
          collectionData={collectionData}
          openCreateCollection={openCreateCollection}
          setOpenCreateCollection={setOpenCreateCollection}
          openChooseCollection={openChooseCollection}
          setOpenChooseCollection={setOpenChooseCollection}
          setMedia={setMedia}
          setName={setName}
          setFileType={setFileType}
          setPrice={setPrice}
          setDescription={setDescription}
          setCategory={setCategory}
          name={name}
          fileType={fileType}
          media={media}
          category={category}
          price={price}
          description={description}
          createNFT={createNFT}
          setError={setError}
          setIsError={setIsError}
        />
      )}
    </div>
  );
};

export default CreateNft;
