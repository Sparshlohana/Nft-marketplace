import "./categoriesList.css";

const CategoriesList = () => {
  return (
    <div className="categoriesListContainer">
      <ul className="categoriesListUl">
        <li className="categoriesListItems">Photography</li>
        <li className="categoriesListItems">Sports</li>
        <li className="categoriesListItems">Music</li>
        <li className="categoriesListItems">Collectable</li>
        <li className="categoriesListItems">Art</li>
        <li className="categoriesListItems">Fashion</li>
        <li className="categoriesListItems">Trading Cards</li>
      </ul>
    </div>
  );
};

export default CategoriesList;
