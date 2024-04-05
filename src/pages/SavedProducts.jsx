import React, { useEffect, useState } from "react";
import products from "../components/data/products.json";

import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { updateDoc, doc, onSnapshot } from "firebase/firestore";

import Main from "../components/layout/Main";
import PageTitle from "../components/PageTitle";
import ProductCard from "../components/ProductCard";

const SavedProducts = () => {
  const { user } = UserAuth();

  const [savedProducts, setSavedProducts] = useState([]);

  useEffect(() => {
    onSnapshot(doc(db, "users", `${user?.email}`), (doc) => {
      console.log(doc.data().savedProducts);
      setSavedProducts(doc.data()?.savedProducts);
    });
  }, [user?.email]);
  return (
    <Main>
      <PageTitle title="Saved Products" />

      <div className="grid grid-cols-12 gap-4">
        {savedProducts.map((x) => {
          const { id, img, brand, description, price } = products.find(
            (prod) => prod.id == x.id
          );
          return (
            <div key={id} className="col-span-6 md:col-span-4 lg:col-span-3">
              <ProductCard
                id={id}
                img={img}
                brand={brand}
                description={description}
                price={price}
              />
            </div>
          );
        })}
      </div>
    </Main>
  );
};

export default SavedProducts;
