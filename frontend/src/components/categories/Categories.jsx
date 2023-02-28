import CategoriesBanner from "./categoriesBanner/CategoriesBanner";
import CategoriesCardContainer from "./categoriesCardContainer/CategoriesCardContainer";
import CategoriesHeadingAndDetails from "./categoriesHeadingAndDetails/CategoriesHeadingAndDetails";
import CategoriesList from "./categoriesList/CategoriesList";
import CategoryItems from "./CategoryItems/CategoryItems";

const Categories = ({ name, img, description, data }) => {
  return (
    <div className="categoriesMainContainer">
      <CategoriesList data={data} />
      <CategoriesBanner img={img} />
      <CategoriesHeadingAndDetails name={name} description={description} />
      <CategoriesCardContainer />
      <CategoryItems></CategoryItems>
    </div>
  );
};

export default Categories;
