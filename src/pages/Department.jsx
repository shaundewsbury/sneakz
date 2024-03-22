import React from "react";
import { useParams } from "react-router-dom";
import products from "../components/data/products.json";
import { categorySEO } from "../components/data/categorySEO";

import Main from "../components/layout/Main";
import Accordion from "../components/Accordion";
import ProductCard from "../components/ProductCard";

const Department = () => {
  const { departmentID } = useParams();

  const departmentProducts = products.filter(
    ({ department }) => department == departmentID
  );

  return (
    <Main>
      <Accordion
        title={categorySEO[departmentID].title}
        content={categorySEO[departmentID].description}
      />

      <div className="grid grid-cols-12 gap-4">
        {departmentProducts.map((product) => (
          <div
            key={product.id}
            className="col-span-6 md:col-span-4 lg:col-span-3"
          >
            <ProductCard
              id={product.id}
              img={product.img}
              brand={product.brand}
              description={product.description}
              colour={product.colour}
              price={product.price}
            />
          </div>
        ))}
      </div>
    </Main>
  );
};

export default Department;
