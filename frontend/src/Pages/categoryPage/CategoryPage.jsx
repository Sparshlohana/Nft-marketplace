import React from "react";
import { useParams } from "react-router-dom";
import Categories from "../../components/categories/Categories";
import categoryData from "../../utils/Categorydata";

const CategoryPage = () => {
  const { category } = useParams();

  const data = categoryData.find((cat) => cat.name.toLowerCase() === category);

  return (
    <>
      <Categories
        data={categoryData}
        name={data.name}
        img={data.img}
        description={data.description}
      />
    </>
  );
};

export default CategoryPage;
