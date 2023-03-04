import { useContext, useEffect, useState } from "react";
import UserBannerAndProfile from "./userBannerAndProfile/UserBannerAndProfile";
import UserBio from "./userBio/UserBio";
import UserDetailHeading from "./userDetailHeading/UserDetailHeading";
import UserDetailJoiningDate from "./userDetailJoiningDate/UserDetailJoiningDate";
import UserNftCollectionAndCreationBtnContainer from "./userNftCollectionAndCreationBtnContainer/UserNftCollectionAndCreationBtnContainer";
import UserNftCollectionContainer from "./userNftCollectionContainer/UserNftCollectionContainer";
import UserSocialMedia from "./userSocialMedia/UserSocialMedia";
import CategoriesCardContainer from "../categories/categoriesCardContainer/CategoriesCardContainer";
import { NFTMarketplaceContext } from "../../context/NFTMarketplaceContext";

import axios from "../../utils/axios";

const UserDetails = ({ search }) => {
  const [active, setActive] = useState(1);

  const [collected, setCollected] = useState([]);

  const [created, setCreated] = useState([]);

  const [favorites, setFavorites] = useState([]);

  const [collections, setCollections] = useState([]);

  const { currentAccount } = useContext(NFTMarketplaceContext);

  const fetchUserCollections = async () => {
    try {
      const res = await axios.get(
        "/api/v1/collections/user/" + currentAccount?.toLowerCase()
      );

      setCollections(res.data?.collections);
    } catch (error) {}
  };

  useEffect(() => {
    (async () => {
      fetchUserCollections();
    })();
  }, [currentAccount, active]);

  return (
    <div className="UserDetailsContainerMain">
      <UserBannerAndProfile />
      <UserDetailHeading />
      <UserSocialMedia />
      <UserDetailJoiningDate />
      <UserBio />
      <UserNftCollectionAndCreationBtnContainer
        active={active}
        created={created.length}
        collected={collected.length}
        favorites={favorites.length}
        collections={collections.length}
        setActive={setActive}
      />

      <UserNftCollectionContainer
        collected={collected}
        setCollected={setCollected}
        created={created}
        setCreated={setCreated}
        favorites={favorites}
        setFavorites={setFavorites}
        collections={collections}
        setCollections={setCollections}
        search={search}
        active={active}
      />
    </div>
  );
};

export default UserDetails;
