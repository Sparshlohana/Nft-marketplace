import "./categoriesFilter.css";

const CategoriesFilter = () => {
  return (
    <div className="categoriesFilterContainer">
      <h3 className="categoriesHeading">Categories</h3>
      <div className="checkBoxContainer">
        <input
          type="checkbox"
          className="categoriesCheckbox"
          name="Art"
          value={"Art"}
        />
        Art <br />
        <input
          type="checkbox"
          className="categoriesCheckbox"
          name="Celebrities"
        />
        Celebrities
        <br />
        <input type="checkbox" className="categoriesCheckbox" name="Gaming" />
        Gaming
        <br />
        <input type="checkbox" className="categoriesCheckbox" name="Sport" />
        Sport
        <br />
        <input type="checkbox" className="categoriesCheckbox" name="Music" />
        Music
        <br />
        <input type="checkbox" className="categoriesCheckbox" name="Crypto" />
        Crypto
        <br />
        <input
          type="checkbox"
          className="categoriesCheckbox"
          name="Cross Chain"
        />
        Cross Chain
        <br />
        <input type="checkbox" className="categoriesCheckbox" name="PFP" />
        PFP
        <br />
      </div>
    </div>
  );
};

export default CategoriesFilter;
