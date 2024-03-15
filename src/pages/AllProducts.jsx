import React, { useState, useEffect } from "react";
import Main from "../components/layout/Main";
import ProductCard from "../components/ProductCard";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import PageTitle from "../components/PageTitle";
const AllProducts = () => {
  const [productList, setProductList] = useState([]);

  const getProductsFromDB = async () => {
    const querySnapshot = await getDocs(collection(db, "products"));
    const list = [];
    querySnapshot.forEach((doc) => {
      list.push({ id: doc.id, ...doc.data() });
    });
    setProductList(list);
  };

  useEffect(() => {
    getProductsFromDB();
  }, []);

  return (
    <Main>
      <PageTitle className="mb-4" title="All Products" />
      <p className="mb-8">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptate
        minima explicabo eius odio quae, consectetur nam officiis, ipsam dolorum
        eaque sapiente obcaecati, qui sequi autem animi corporis cupiditate?
        Esse, quaerat.
      </p>

      <div className="grid grid-cols-12 gap-4">
        {productList.length > 0 &&
          productList.map((product) => (
            <div
              key={product.id}
              className="col-span-6 md:col-span-4 lg:col-span-3"
            >
              <ProductCard
                id={product.id}
                imgSrc={product.img}
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
