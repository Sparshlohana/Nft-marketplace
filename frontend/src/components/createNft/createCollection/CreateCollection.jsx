import { useContext } from "react";
import Dropzone from "react-dropzone";

import { BiCloudUpload } from "react-icons/bi";
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
  const token = localStorage.getItem("token");

  const handleDrop = async (acceptedFile, type) => {
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
            Authorization: token,
          },
        });
        if (type === "image") {
          setCollectionData({ ...collectionData, image: res?.data?.url });
        }
        if (type === "banner") {
          setCollectionData({ ...collectionData, banner: res?.data?.url });
        }
      } else if (acceptedFile[0].type.startsWith("audio")) {
        setError("audio Cant be uploaded");
        setIsError(true);

        setTimeout(() => {
          setIsError(false);
        }, 3000);
      } else if (acceptedFile[0].type.startsWith("video")) {
        setError("Video Cant be uploaded");
        setIsError(true);

        setTimeout(() => {
          setIsError(false);
        }, 3000);
      }
    } catch (error) {
      setError("Cant'upload  Nft try again ");
      setIsError(true);

      setTimeout(() => {
        setIsError(false);
      }, 5000);
    }
  };

  return (
    <>
      <div className="createCollectionContainerMain">
        <div className="createCollectionContainer">
          <form action="" className="createNftDataCollectionForm">
            <div className="createCollectionHeadingContainer">
              <h1 className="createCollectionHeading">Create Collection</h1>
            </div>
            <div className="createCollectionInputContainer">
              {collectionData.image !== "" ? (
                <div>
                  <label className="dropFileHeading">Choose Image</label>
                  <Dropzone
                    onDrop={(acceptedFile) => handleDrop(acceptedFile, "image")}
                  >
                    {({ getRootProps, getInputProps }) => (
                      <div className="dropFileContainer" {...getRootProps()}>
                        {collectionData.image && (
                          <>
                            <input
                              autocomplete="off"
                              required
                              {...getInputProps()}
                            />
                            <img
                              className="NftImgDisplay"
                              src={collectionData.image}
                              alt="Uploaded "
                            />
                          </>
                        )}
                      </div>
                    )}
                  </Dropzone>
                </div>
              ) : (
                <div className="createNftDataCollectionFormItemContainer">
                  <label className="dropFileHeading">Choose Image</label>
                  <Dropzone
                    onDrop={(acceptedFile) => handleDrop(acceptedFile, "image")}
                  >
                    {({ getRootProps, getInputProps }) => (
                      <div className="dropFileContainer" {...getRootProps()}>
                        <input
                          autocomplete="off"
                          required
                          {...getInputProps()}
                        />
                        <BiCloudUpload className="dropFileIcon" />
                      </div>
                    )}
                  </Dropzone>
                </div>
              )}
              {collectionData.banner !== "" ? (
                <div>
                  <label className="dropFileHeading">Choose Banner</label>

                  <Dropzone
                    onDrop={(acceptedFile) =>
                      handleDrop(acceptedFile, "banner")
                    }
                  >
                    {({ getRootProps, getInputProps }) => (
                      <div
                        className="dropFileBannerContainer "
                        {...getRootProps()}
                      >
                        <input
                          autocomplete="off"
                          required
                          {...getInputProps()}
                        />
                        {collectionData.banner && (
                          <img
                            className="NftBannerDisplay"
                            src={collectionData.banner}
                            alt="Uploaded "
                          />
                        )}
                      </div>
                    )}
                  </Dropzone>
                </div>
              ) : (
                <div className="createNftDataCollectionFormItemContainer">
                  <label className="dropFileHeading">Choose Banner</label>

                  <Dropzone
                    onDrop={(acceptedFile) =>
                      handleDrop(acceptedFile, "banner")
                    }
                  >
                    {({ getRootProps, getInputProps }) => (
                      <div
                        className="dropFileBannerContainer"
                        {...getRootProps()}
                      >
                        <input
                          autocomplete="off"
                          required
                          {...getInputProps()}
                        />

                        <BiCloudUpload className="dropFileIcon" />
                      </div>
                    )}
                  </Dropzone>
                </div>
              )}
              <div className="createNftDataCollectionFormItemContainer">
                <h2 className="createNftDataCollectionFormPriceHeading">
                  Collection Name
                </h2>
                <input
                  autocomplete="off"
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
                  required
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
                  autocomplete="off"
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
