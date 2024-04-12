import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaSort, FaFilter } from "react-icons/fa";
import {
  RiAccountCircleLine,
  RiShoppingBasket2Line,
  RiMenuFill,
  RiSearchLine,
  RiCloseLine,
  RiContactsLine,
} from "react-icons/ri";

import products from "../../components/data/products.json";
import { categorySEO } from "../../components/data/categorySEO";

import Main from "../../components/layout/Main";
import Accordion from "../../components/Accordion";
import ProductCard from "../../components/ProductCard";
import Button from "../../components/Button";

const Department = () => {
  // GET PRODUCTS
  const { departmentID } = useParams();
  const initialProducts = products.filter(
    ({ department }) => department == departmentID
  );

  const [displayProducts, setDisplayProducts] = useState(initialProducts);
  const [openFilterMenu, setOpenFilterMenu] = useState(false);
  const [sortBy, setSortBy] = useState("newest-first");
  const [activeFilters, setActiveFilters] = useState([]);

  // SET DISPLAY PRODUCTS ON DEPARTMENT ID UPDATE
  useEffect(() => {
    setDisplayProducts(initialProducts);
  }, [departmentID]);

  const filtersClickHandler = () => {
    setOpenFilterMenu(true);

    // document.querySelector(".content").classList.add("no-scroll");
  };

  // UPDATE DISPLAY PRODUCTS BASED ON FILTERS
  useEffect(() => {
    setDisplayProducts(
      activeFilters.length > 0
        ? initialProducts.filter((prod) => activeFilters.includes(prod.brand))
        : initialProducts
    );
  }, [activeFilters]);

  // SET ACTIVE FILTERS
  const filterItemClickHandler = (value) => {
    if (activeFilters.includes(value)) {
      setActiveFilters(activeFilters.filter((e) => e !== value));
    } else {
      setActiveFilters([...activeFilters, value]);
    }
  };

  // POPULATE BRAND FILTERS
  const populateBrandFilters = {};
  const populateBrandFiltersList = [];
  initialProducts.forEach(function (x) {
    {
      count: populateBrandFilters[x.brand] =
        (populateBrandFilters[x.brand] || 0) + 1;
    }
  });
  for (const [key, value] of Object.entries(populateBrandFilters)) {
    populateBrandFiltersList.push({
      item: key,
      value: value,
    });
  }
  populateBrandFiltersList.sort((a, b) => a.item.localeCompare(b.item));

  // SORT BY
  useEffect(() => {
    let preSort = [...displayProducts];

    activeFilters.length > 0 &&
      preSort.filter((prod) => activeFilters.includes(prod.brand));

    if (sortBy === "newest-first") {
      setDisplayProducts(preSort);
    }

    if (sortBy === "oldest-first") {
      setDisplayProducts(preSort.reverse());
    }

    if (sortBy === "price-low-to-high") {
      setDisplayProducts(
        preSort.sort((a, b) => parseFloat(a.price) - parseFloat(b.price))
      );
    }

    if (sortBy == "price-high-to-low") {
      setDisplayProducts(
        preSort.sort((a, b) => parseFloat(b.price) - parseFloat(a.price))
      );
    }
  }, [sortBy]);

  const filterPanelContent = (
    <div>
      <h3 className="text-lg mb-1">Brands</h3>
      <div className="flex flex-col gap-3 mb-4">
        {populateBrandFiltersList.map(({ item, value }) => (
          <div key={item} className="flex gap-2 justify-between">
            <button
              className="flex gap-1 items-center"
              onClick={() => filterItemClickHandler(item)}
            >
              <div
                className={`w-4 h-4 rounded border border-[--color-primary] ${
                  activeFilters.includes(item) && "bg-[--color-primary]"
                }`}
              ></div>
              <p>{item}</p>
            </button>
            <span>{value}</span>
          </div>
        ))}
      </div>

      <Button
        onClick={() => setOpenFilterMenu(false)}
        text="Apply Filters"
        className="mb-2"
        fullWidth
      />

      <Button onClick={() => setActiveFilters([])} text="Reset" fullWidth />
    </div>
  );

  return (
    <>
      <Main>
        <Accordion
          title={categorySEO[departmentID].title}
          content={categorySEO[departmentID].description}
        />

        {/* SORT & FILTERS BUTTONS */}
        <div className="grid grid-cols-12 gap-4 mb-4">
          <div className="col-span-12 lg:col-span-3 flex gap-4 justify-items-stretch align-middle">
            <div className="flex basis-1/2 gap-1 items-center justify-center md:grow-0 lg:basis-auto lg:min-w-[200px] lg:w-full">
              <select
                className="w-full h-11 pl-2 bg-white py-2 font-bold box-shadow-custom rounded"
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="newest-first">Newest First</option>
                <option value="oldest-first">Oldest First</option>
                <option value="price-low-to-high">Price Low to High</option>
                <option value="price-high-to-low">Price High to Low</option>
              </select>
            </div>

            <button
              className="lg:hidden flex basis-1/2 gap-2 items-center justify-center h-11 bg-white font-bold box-shadow-custom rounded"
              onClick={filtersClickHandler}
            >
              <FaFilter className="w-4 h-4" /> Filters
            </button>
          </div>

          <div className="col-span-12 lg:col-span-9 flex gap-2 items-center justify-between">
            <div className=" flex gap-3 flex-wrap">
              {activeFilters.map((item) => (
                <button
                  className="flex items-center gap-1 p-1 pl-3 bg-[--color-primary] text-white rounded"
                  onClick={() => filterItemClickHandler(item)}
                >
                  <p className="text-sm">{item}</p>
                  <RiCloseLine className="w-4 h-4" />
                </button>
              ))}
            </div>

            <p className="flex gap-4 justify-end flex-nowrap whitespace-nowrap">
              {displayProducts.length} Product
              {displayProducts.length > 1 && "s"}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4 items-start">
          {/* DESKTOP FILTERS */}
          <div className="hidden lg:block col-span-3 bg-white p-4 box-shadow-custom rounded items-start">
            <h2 className="text-2xl mb-4">Filters</h2>
            {filterPanelContent}
          </div>

          {/* PRODUCTS MAP */}
          <div className="col-span-12 lg:col-span-9">
            <div className="grid grid-cols-12 gap-4">
              {displayProducts.map((product) => (
                <div
                  key={product.id}
                  className="col-span-6 md:col-span-4 lg:col-span-4"
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
          </div>
        </div>
      </Main>

      {/* Mobile & Tablet Filters */}
      <div
        className={
          openFilterMenu
            ? "fixed lg:hidden left-0 top-0 w-[100%] h-full ease-in-out duration-500 z-[1] bg-white"
            : "ease-in-out w-[100%] duration-500 fixed top-0 bottom-0 left-[-100%] z-[1]"
        }
      >
        <div className="flex items-center justify-between w-full h-14 px-4 bg-[--color-primary] text-white">
          <h2>Filters</h2>

          <button onClick={() => setOpenFilterMenu(false)}>
            <RiCloseLine />
            <span className="sr-only">Close Filters</span>
          </button>
        </div>

        <div className="p-4 h-full">{filterPanelContent}</div>
      </div>
    </>
  );
};

export default Department;
