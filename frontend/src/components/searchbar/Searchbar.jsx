import React from "react";
import { CgClose } from "react-icons/cg";

const Searchbar = ({
  search,
  setSearch,
  title,
  openCollectionItems,
  setOpenCollectionItems,
}) => {
  return (
    <div
      className="searchContainer"
      onClick={() => setOpenCollectionItems(!openCollectionItems)}
    >
      <input
        autocomplete="off"
        type="search"
        name="search"
        id="search"
        className="searchBar"
        placeholder={title}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {search !== "" && (
        <CgClose
          className="searchColseIcon"
          onClick={() => setSearch("")}
        ></CgClose>
      )}
      <img
        src="https://cdn-icons-png.flaticon.com/512/3917/3917754.png"
        alt=""
        className="searchIcon"
      />
    </div>
  );
};

export default Searchbar;
