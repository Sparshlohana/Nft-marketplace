import { Link } from "react-router-dom";
import "./categoriesCardContainer.css";

import CategoriesCards from "./categoriesCards/CategoriesCards";

const CategoriesCardContainer = ({ collections }) => {
  return (
    <div className="categoriesCardsContainerMains">
      {collections?.map((collection, i) => (
        <Link to={"/collection/" + collection?._id}>
          <CategoriesCards key={i} collection={collection} />
        </Link>
      ))}
    </div>
  );
};

export default CategoriesCardContainer;
