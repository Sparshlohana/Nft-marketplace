import { useContext, useEffect, useState } from "react";
import { NFTMarketplaceContext } from "../../../context/NFTMarketplaceContext";
import "./chooseCollection.css";

import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import Searchbar from "../../searchbar/Searchbar";
import axios from "../../../utils/axios";
import ChooseSearchItems from "./chooseSearchItems/ChooseSearchItems";

const ChooseCollection = ({ collectionData, setCollectionData }) => {
  const [search, setSearch] = useState("");

  const [openCollectionItems, setOpenCollectionItems] = useState(false);

  const { currentAccount } = useContext(NFTMarketplaceContext);

  const [collections, setCollections] = useState([]);
  const token = localStorage.getItem("token");

  const fetchUsersSearchCollection = async () => {
    try {
      const res = await axios.get(
        `/api/v1/collections/user/${currentAccount?.toLowerCase()}?search=${search}`,
        {
          headers: { Authorization: token },
        }
      );

      setCollections(res.data?.collections);
    } catch (error) {}
  };

  const fetchUsersCollections = async () => {
    try {
      const res = await axios.get(
        `/api/v1/collections/user/${currentAccount?.toLowerCase()}`,
        {
          headers: { Authorization: token },
        }
      );

      setCollections(res.data?.collections);
    } catch (error) {}
  };

  useEffect(() => {
    (async () => {
      await fetchUsersCollections();
    })();
  }, []);

  useEffect(() => {
    (async () => {
      await fetchUsersSearchCollection();
    })();
  }, [search]);

  return (
    <>
      <div className="ChooseCollectionItemsSelectContainer">
        <Searchbar
          title={"Find Your Collections.."}
          search={search}
          openCollectionItems={openCollectionItems}
          setOpenCollectionItems={setOpenCollectionItems}
          setSearch={setSearch}
        ></Searchbar>

        {openCollectionItems && (
          <ChooseSearchItems
            collectionData={collectionData}
            setCollectionData={setCollectionData}
            collections={collections}
          />
        )}
      </div>
    </>
  );
};

export default ChooseCollection;
