import { Link } from "react-router-dom";
import "./categoriesCardContainer.css";

import CategoriesCards from "./categoriesCards/CategoriesCards";

const CategoriesCardContainer = ({ collections, currentAccount }) => {
  return (
    <div className="categoriesCardsContainerMains">
      {collections?.map((collection, i) => (
        <Link
          className="categoriesCardsLink"
          to={`/collection/${collection?._id}?${
            currentAccount && "account=" + currentAccount.toLowerCase()
          }`}
        >
          <CategoriesCards key={i} collection={collection} />
        </Link>
      ))}
    </div>
  );
};

export default CategoriesCardContainer;
