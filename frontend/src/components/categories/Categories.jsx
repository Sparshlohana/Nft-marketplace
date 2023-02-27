import CategoriesBanner from "./categoriesBanner/CategoriesBanner";
import CategoriesCardContainer from "./categoriesCardContainer/CategoriesCardContainer";
import CategoriesHeadingAndDetails from "./categoriesHeadingAndDetails/CategoriesHeadingAndDetails";
import CategoriesList from "./categoriesList/CategoriesList";

const Categories = () => {
  return (
    <div className="categoriesMainContainer">
      <CategoriesList />
      <CategoriesBanner />
      <CategoriesHeadingAndDetails />
      <CategoriesCardContainer />
    </div>
  );
};

export default Categories;
