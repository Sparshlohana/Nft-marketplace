import { Link } from "react-router-dom";
import "./categoriesList.css";

const CategoriesList = ({ data }) => {
  return (
    <div className="categoriesListContainer">
      <ul className="categoriesListUl">
        {data?.map((cat, i) => (
          <Link
            style={{ textDecoration: "none" }}
            key={i}
            to={"/categories/" + cat?.name.toLowerCase()}
          >
            <li className="categoriesListItems">{cat.name}</li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default CategoriesList;
