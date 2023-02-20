import "./rangeFilter.css";

const RangeFilter = () => {
  return (
    <div className="rangeFilterContainer">
      <h3 className="priceRangeHeading">Price Range</h3>
      <input type="number" placeholder="Min.." className="priceInput" min={0} />
      <p className="colon">:</p>
      <input type="number" placeholder="Max.." className="priceInput" min={0} />
    </div>
  );
};

export default RangeFilter;
