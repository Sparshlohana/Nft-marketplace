import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FaDropbox } from "react-icons/fa";

const CreateNftDataCollection = () => {
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onload = function (e) {
      const fileDataUrl = e.target.result;

      if (file.type.startsWith("image/")) {
        setImage(fileDataUrl);
      } else if (file.type.startsWith("video/")) {
        setVideo(fileDataUrl);
      } else if (file.type.startsWith("image/gif")) {
        setImage(fileDataUrl);
      } else {
        console.log("Unsupported file type");
      }
    };

    reader.readAsDataURL(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/*, video/*, .gif",
    onDrop,
  });

  return (
    <div className="createNftDataCollection">
      <div className="NftImgVidDisplayContainer">
        {image && <img className="NftImgDisplay" src={image} alt="Uploaded " />}
        {video && (
          <video
            className="NftImgDisplay"
            src={video}
            controls
            muted
            autoPlay
          />
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
            placeholder="Description of this container.."
          />
        </div>
        <div className="createNftDataCollectionFormPriceAndRoyaltyContainer">
          <div className="createNftDataCollectionFormItemContainer">
            <h2 className="createNftDataCollectionFormPriceHeading">Price</h2>
            <input
              className="createNftDataCollectionFormInput"
              type="text"
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
        <div className="createNftDataCollectionFormItemContainer">
          <h2 className="createNftDataCollectionFormPriceHeading">
            Minting revenue recipient
          </h2>
          <input
            className="createNftDataCollectionFormInput"
            type="text"
            placeholder="Royalty recipient"
            required
          />
        </div>
        <button type="submit" className="createNftBtn">
          Create NFT
        </button>
      </form>
    </div>
  );
};

export default CreateNftDataCollection;
