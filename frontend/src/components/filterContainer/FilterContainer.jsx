import CategoriesFilter from "../categoriesFilter/CategoriesFilter";
import CurrencyFilter from "../currencyFilter/CurrencyFilter";
import RangeFilter from "../rangeFilter/RangeFilter";
import "./filterContainer.css";

const FilterContainer = () => {
  return (
    <div className="filterContainer">
      <CurrencyFilter />
      <hr className="hr" />
      <RangeFilter />
      <hr className="hr" />
      <CategoriesFilter />
    </div>
  );
};

export default FilterContainer;
