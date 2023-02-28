import { useCallback, useContext, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FaDropbox } from "react-icons/fa";
import { NFTMarketplaceContext } from "../../../context/NFTMarketplaceContext";
import axios from "../../../utils/axios";
import "./createCollection.css";

const CreateCollection = () => {
  const [media, setMedia] = useState(null);
  const [fileType, setFileType] = useState(null);

  const { createNFT, setError, setIsError } = useContext(NFTMarketplaceContext);

  const onDrop = useCallback(async (acceptedFile) => {
    try {
      const formData = new FormData();
      formData.append("media", acceptedFile[0]);

      const postUrl = "/api/v1/nfts/uploadToIPFS";

      const url = await axios.post(postUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setMedia(url.data.url);

      if (
        acceptedFile[0].type.startsWith("image") ||
        acceptedFile[0].type.startsWith("image/gif")
      ) {
        setFileType("image");
      } else if (acceptedFile[0].type.startsWith("audio")) {
        setFileType("audio");
      } else if (acceptedFile[0].type.startsWith("video")) {
        setFileType("video");
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
                {fileType === "image" && (
                  <img className="NftImgDisplay" src={media} alt="Uploaded " />
                )}
                {fileType === "video" && (
                  <video
                    className="NftImgDisplay"
                    src={media}
                    controls
                    muted
                    autoPlay
                  />
                )}
                {fileType === "audio" && (
                  <audio controls muted autoPlay>
                    <source src={media}></source>
                  </audio>
                )}
              </div>{" "}
              <div
                className="createNftDataCollectionFormItemContainer"
                {...getRootProps()}
              >
                <input {...getInputProps()} />

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
                />
              </div>
              <div className="createNftDataCollectionFormItemContainer">
                <h2 className="createNftDataCollectionFormPriceHeading">
                  Collection description
                </h2>
                <input
                  className="createNftDataCollectionFormInput"
                  type="text"
                  placeholder="Enter Collection Description.."
                />
              </div>
              <button className="createNftBtn">Create NFT</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateCollection;
