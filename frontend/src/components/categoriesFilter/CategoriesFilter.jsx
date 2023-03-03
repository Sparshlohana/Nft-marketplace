import "./categoriesFilter.css";

import data from "../../utils/Categorydata";

const CategoriesFilter = ({ setFilter, filter }) => {
  return (
    <div className="categoriesFilterContainer">
      <h3 className="categoriesHeading">Categories</h3>
      <div className="checkBoxContainer">
        {data?.map((category) => (
          <>
            <input
              type="checkbox"
              value={category.name.toLowerCase()}
              className="categoriesCheckbox"
              name={category.name}
              onChange={() =>
                setFilter({
                  ...filter,
                  category: [...filter.category, category.name],
                })
              }
            />
            {category.name}
            <br />
          </>
        ))}
      </div>
    </div>
  );
};

export default CategoriesFilter;
