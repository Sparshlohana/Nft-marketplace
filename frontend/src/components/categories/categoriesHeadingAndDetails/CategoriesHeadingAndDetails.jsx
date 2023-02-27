import CategoriesHeading from "./categoriesHeading/CategoriesHeading";
import CategoriesHeadingDetails from "./categoriesHeadingDetails/CategoriesHeadingDetails";
import "./categoriesHeadingAndDetails.css";

const CategoriesHeadingAndDetails = () => {
  return (
    <div className="categoriesHeadingAndDetailsContainer">
      <CategoriesHeading />
      <CategoriesHeadingDetails />
    </div>
  );
};

export default CategoriesHeadingAndDetails;
