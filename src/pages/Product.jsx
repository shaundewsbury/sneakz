import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { db } from "../firebase";
import { onSnapshot, doc } from "firebase/firestore";

import Main from "../components/layout/Main";
import Button from "../components/Button";

const Product = () => {
  const { productID } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState();

  useEffect(() => {
    onSnapshot(doc(db, "products", `${productID}`), (doc) => {
      setProduct(doc.data());
      setIsLoading(false);
    });
  }, [productID]);

  return (
    <Main>
      {!isLoading && (
        <div className="grid grid-cols-12 gap-4 p-4 box-shadow-custom rounded-md bg-white">
          <div className="col-span-12 md:col-span-4 p-4">
            <div className="rounded-sm aspect-[3/4] mb-2 bg-[--color-secondary]">
              <img className="rounded-sm" src={product.img} alt="" />
            </div>
          </div>
          <div className="col-span-12 md:col-span-8 p-4">
            <h1 className="mb-1">{product.brand}</h1>
            <h2 className="mb-2">{product.description}</h2>
            <p className="mb-2">{product.fullDescription}</p>
            <p className="mb-4">£{product.price}</p>
            <Button text="Add to Basket" />
          </div>
        </div>
      )}
    </Main>
  );
};

export default Product;
