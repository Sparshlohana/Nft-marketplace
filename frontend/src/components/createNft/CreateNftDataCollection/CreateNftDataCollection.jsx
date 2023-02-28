import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FaDropbox } from "react-icons/fa";
import { useContext } from "react";

import { NFTMarketplaceContext } from "../../../context/NFTMarketplaceContext";
import axios from "../../../utils/axios";

const CreateNftDataCollection = ({
  openCreateCollection,
  setOpenCreateCollection,
}) => {
  const [media, setMedia] = useState(null);
  const [fileType, setFileType] = useState(null);

  const [price, setPrice] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [royalties, setRoyalties] = useState("");
  const [category, setCategory] = useState(0);

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
  console.log(category);
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
          <h2 className="createNftDataCollectionFormPriceHeading">NFT Name</h2>
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
            Category Name
          </h2>
          <select
            className="createNftDataCollectionFormInput"
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="" className="createNftDataCollectionOption">
              -- Select Category --
            </option>
            <option className="createNftDataCollectionOption" value={"art"}>
              Art
            </option>
            <option className="createNftDataCollectionOption" value={"music"}>
              Music
            </option>
            <option className="createNftDataCollectionOption" value={"video"}>
              Video
            </option>
            <option className="createNftDataCollectionOption" value={"fashion"}>
              Fashion
            </option>
            <option className="createNftDataCollectionOption" value={"sports"}>
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
        <>
          <div className="createNftDataCollectionBtnContainer">
            <button
              className="createNftBtn createNftDataCollectionBtn"
              onClick={() => setOpenCreateCollection(!openCreateCollection)}
            >
              Create Collection
            </button>
            <button className="createNftBtn createNftDataCollectionBtn">
              Choose Collection
            </button>
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              createNFT(name, price, media, fileType, description, category);
            }}
            className="createNftBtn"
          >
            Create NFT
          </button>
        </>
      </form>
    </div>
  );
};

export default CreateNftDataCollection;
