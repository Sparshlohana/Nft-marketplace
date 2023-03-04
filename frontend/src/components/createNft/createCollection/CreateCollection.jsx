import { useCallback, useContext } from "react";
import { useDropzone } from "react-dropzone";
import { FaDropbox } from "react-icons/fa";
import { NFTMarketplaceContext } from "../../../context/NFTMarketplaceContext";
import axios from "../../../utils/axios";
import "./createCollection.css";

const CreateCollection = ({
  setOpenCreateCollection,
  collectionData,
  setCollectionData,
  name,
  fileType,
  media,
  price,
  description,
  createNFT,
}) => {
  const { setError, setIsError } = useContext(NFTMarketplaceContext);

  const onDrop = useCallback(async (acceptedFile) => {
    try {
      const formData = new FormData();
      formData.append("media", acceptedFile[0]);

      const postUrl = "/api/v1/nfts/uploadToIPFS";

      if (
        acceptedFile[0].type.startsWith("image") ||
        acceptedFile[0].type.startsWith("image/gif")
      ) {
        const res = await axios.post(postUrl, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setCollectionData({ ...collectionData, image: res?.data?.url });
      } else if (acceptedFile[0].type.startsWith("audio")) {
        setError("audio Cant be uploaded");
        setIsError(true);
      } else if (acceptedFile[0].type.startsWith("video")) {
        setError("Video Cant be uploaded");
        setIsError(true);
      }
    } catch (error) {
      setError("Cant'upload  Nft try again ");
      setIsError(true);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/*, video/*, .gif",
    onDrop,
  });

  return (
    <>
      <div className="createCollectionContainerMain">
        <div className="createCollectionContainer">
          <form action="" className="createNftDataCollectionForm">
            <div className="createCollectionHeadingContainer">
              <h1 className="createCollectionHeading">Create Collection</h1>
            </div>
            <div className="createCollectionInputContainer">
              <div className="NftImgVidDisplayContainer">
                {collectionData.image && (
                  <img
                    className="NftImgDisplay"
                    src={collectionData.image}
                    alt="Uploaded "
                  />
                )}
              </div>{" "}
              <div
                className="createNftDataCollectionFormItemContainer"
                {...getRootProps()}
              >
                <input required {...getInputProps()} />

                {isDragActive ? (
                  <div className="dropFileContainer">
                    <FaDropbox className="dropFileIcon" />
                    <p className="dropYourFilePara">
                      Choose Collection Image...
                    </p>
                  </div>
                ) : (
                  <div className="dropFileContainer">
                    <FaDropbox className="dropFileIcon" />
                    <p className="dropYourFilePara">
                      {" "}
                      Choose Collection Image...
                    </p>
                  </div>
                )}
              </div>
              <div className="createNftDataCollectionFormItemContainer">
                <h2 className="createNftDataCollectionFormPriceHeading">
                  Collection Name
                </h2>
                <input
                  className="createNftDataCollectionFormInput"
                  type="text"
                  placeholder="Enter Collection Name.."
                  required
                  value={collectionData.collectionName}
                  onChange={(e) =>
                    setCollectionData({
                      ...collectionData,
                      collectionName: e.target.value,
                    })
                  }
                />
              </div>
              <div className="createNftDataCollectionFormItemContainer">
                <h2 className="createNftDataCollectionFormPriceHeading">
                  Category Name
                </h2>
                <select
                  className="createNftDataCollectionFormInput"
                  onChange={(e) =>
                    setCollectionData({
                      ...collectionData,
                      category: e.target.value,
                    })
                  }
                >
                  <option value="" className="createNftDataCollectionOption">
                    -- Select Category --
                  </option>
                  <option
                    className="createNftDataCollectionOption"
                    value={"art"}
                  >
                    Art
                  </option>
                  <option
                    className="createNftDataCollectionOption"
                    value={"music"}
                  >
                    Music
                  </option>
                  <option
                    className="createNftDataCollectionOption"
                    value={"video"}
                  >
                    Video
                  </option>
                  <option
                    className="createNftDataCollectionOption"
                    value={"fashion"}
                  >
                    Fashion
                  </option>
                  <option
                    className="createNftDataCollectionOption"
                    value={"sports"}
                  >
                    Sports
                  </option>
                  <option
                    className="createNftDataCollectionOption"
                    value={"photography"}
                  >
                    Photography
                  </option>
                  <option
                    className="createNftDataCollectionOption"
                    value={"collectibles"}
                  >
                    Collectibles
                  </option>
                </select>
              </div>
              <div className="createNftDataCollectionFormItemContainer">
                <h2 className="createNftDataCollectionFormPriceHeading">
                  Collection description
                </h2>
                <input
                  className="createNftDataCollectionFormInput"
                  type="text"
                  required
                  placeholder="Enter Collection Description.."
                  value={collectionData.collectionDescription}
                  onChange={(e) =>
                    setCollectionData({
                      ...collectionData,
                      collectionDescription: e.target.value,
                    })
                  }
                />
              </div>
              <button
                className="createNftBtn"
                onClick={(e) => {
                  e.preventDefault();

                  createNFT(
                    name,
                    price,
                    media,
                    fileType,
                    description,
                    collectionData
                  );
                }}
              >
                Create NFT
              </button>
              &nbsp; &nbsp;
              <button
                className="createNftBtn"
                onClick={(e) => {
                  e.preventDefault();
                  setCollectionData({
                    collectionName: "",
                    collectionDescription: "",
                    image: "",
                  });
                  setOpenCreateCollection(false);
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateCollection;
