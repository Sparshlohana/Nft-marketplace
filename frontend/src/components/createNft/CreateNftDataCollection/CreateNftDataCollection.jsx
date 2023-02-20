import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FaDropbox } from "react-icons/fa";
import { useContext } from "react";

import { NFTMarketplaceContext } from "../../../context/NFTMarketplaceContext";
import axios from "../../../utils/axios";

const CreateNftDataCollection = () => {
  const [media, setMedia] = useState(null);

  const [fileType, setFileType] = useState(null);

  const [fileUrl, setFileUrl] = useState(null);
  const [price, setPrice] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [royalties, setRoyalties] = useState("");
  const [category, setCategory] = useState(0);

  const { createNFT } = useContext(NFTMarketplaceContext);

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

      setFileUrl(url.data.url);
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
      console.log(error);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/*, video/*, .gif",
    onDrop,
  });

  return (
    <div className="createNftDataCollection">
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
      </div>
      <form action="" className="createNftDataCollectionForm">
        <div
          className="createNftDataCollectionFormItemContainer"
          {...getRootProps()}
        >
          <input {...getInputProps()} />

          {isDragActive ? (
            <div className="dropFileContainer">
              <FaDropbox className="dropFileIcon" />
              <p className="dropYourFilePara">Choose files...</p>
            </div>
          ) : (
            <div className="dropFileContainer">
              <FaDropbox className="dropFileIcon" />
              <p className="dropYourFilePara">Choose files...</p>
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
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            required
          />
        </div>
        <div className="createNftDataCollectionFormItemContainer">
          <h2 className="createNftDataCollectionFormPriceHeading">
            Description
          </h2>
          <input
            className="createNftDataCollectionFormInput"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description of this container.."
          />
        </div>

        <div className="createNftDataCollectionFormPriceAndRoyaltyContainer">
          <div className="createNftDataCollectionFormItemContainer">
            <h2 className="createNftDataCollectionFormPriceHeading">Price</h2>
            <input
              className="createNftDataCollectionFormInput"
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter Amount.."
              required
            />
          </div>

          <div className="createNftDataCollectionFormItemContainer">
            <h2 className="createNftDataCollectionFormPriceHeading">
              Royalty Amount
            </h2>
            <input
              className="createNftDataCollectionFormInput"
              type="text"
              placeholder="%"
            />
          </div>
        </div>
        <div className="createNftDataCollectionFormItemContainer">
          <h2 className="createNftDataCollectionFormPriceHeading">
            Royalty recipient
          </h2>
          <input
            className="createNftDataCollectionFormInput"
            type="text"
            placeholder="Royalty recipient"
          />
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            createNFT(name, price, media, fileType, description);
          }}
          className="createNftBtn"
        >
          Create NFT
        </button>
      </form>
    </div>
  );
};

export default CreateNftDataCollection;
