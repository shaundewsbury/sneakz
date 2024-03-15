import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { categorySEO } from "../components/data/categorySEO";

import Main from "../components/layout/Main";
import PageTitle from "../components/PageTitle";
import ProductCard from "../components/ProductCard";

const Department = () => {
  const { departmentID } = useParams();
  const [productList, setProductList] = useState([]);
  //   const [isLoading, setIsLoading] = useState(true);

  const getProductsFromDB = async () => {
    const querySnapshot = await getDocs(collection(db, "products"));
    const list = [];

    querySnapshot.forEach((doc) => {
      list.push({ id: doc.id, ...doc.data() });
    });

    const filterProducts = list.filter(
      (product) => product.department === departmentID
    );
    setProductList(filterProducts);
  };

  useEffect(() => {
    getProductsFromDB();
    // eslint-disable-next-line
  }, [departmentID]);

  return (
    <Main>
      <PageTitle className="mb-4" title={categorySEO[departmentID].title} />
      <p className="mb-8">{categorySEO[departmentID].description}</p>

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

export default Department;
