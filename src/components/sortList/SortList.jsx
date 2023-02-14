// import { Link } from "react-router-dom";
import "./sortList.css";

const SortList = () => {
  const list = [
    "Listed: Recent",
    "Listed: Oldest",
    "Price: Lowest",
    "Price: Highest",
  ];
  return (
    <div className="sortListContainer">
      {list.map((element, i) => (
        <a href="/shop" key={i}>
          <button className="SortListBtn">{element}</button>
        </a>
      ))}
    </div>
  );
};

export default SortList;
