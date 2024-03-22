import React from "react";
import products from "../components/data/products.json";

import Main from "../components/layout/Main";
import ProductCard from "../components/ProductCard";
import Accordion from "../components/Accordion";

const AllProducts = () => {
  return (
    <Main>
      <Accordion
        title="All Products"
        content="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptate
        minima explicabo eius odio quae, consectetur nam officiis, ipsam dolorum
        eaque sapiente obcaecati, qui sequi autem animi corporis cupiditate?
        Esse, quaerat."
      />

      <div className="grid grid-cols-12 gap-4">
        {products.length > 0 &&
          products.map((product) => (
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

export default AllProducts;
