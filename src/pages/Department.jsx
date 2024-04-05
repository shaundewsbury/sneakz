import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaSort, FaFilter } from "react-icons/fa";

import products from "../components/data/products.json";
import { categorySEO } from "../components/data/categorySEO";

import Main from "../components/layout/Main";
import Accordion from "../components/Accordion";
import ProductCard from "../components/ProductCard";
import Button from "../components/Button";

const Department = () => {
  const { departmentID } = useParams();

  const departmentProducts = products.filter(
    ({ department }) => department == departmentID
  );

  const [sortProducts, setSortProducts] = useState(departmentProducts);

  useEffect(() => {
    setSortProducts(departmentProducts);
  }, [departmentID]);

  const [activeFilters, setActiveFilters] = useState([]);

  const filtersClickHandler = () => {
    alert("clicked");
  };

  useEffect(() => {
    setSortProducts(
      activeFilters.length > 0
        ? departmentProducts.filter((prod) =>
            activeFilters.includes(prod.brand)
          )
        : departmentProducts
    );
  }, [activeFilters]);

  const filterItemClickHandler = (filterType, value) => {
    if (activeFilters.includes(value)) {
      setActiveFilters(activeFilters.filter((e) => e !== value));
    } else {
      setActiveFilters([...activeFilters, value]);
    }
  };

  const filterByBrand = {};
  const filterByBrandList = [];
  departmentProducts.forEach(function (x) {
    {
      count: filterByBrand[x.brand] = (filterByBrand[x.brand] || 0) + 1;
    }
  });
  for (const [key, value, nav] of Object.entries(filterByBrand)) {
    filterByBrandList.push({
      item: key,
      value: value,
    });
  }
  filterByBrandList.sort((a, b) => a.item.localeCompare(b.item));

  const filterByColour = {};
  const filterByColourList = [];
  departmentProducts.forEach(function (x) {
    {
      count: filterByColour[x.colour] = (filterByColour[x.colour] || 0) + 1;
    }
  });
  for (const [key, value, nav] of Object.entries(filterByColour)) {
    filterByColourList.push({
      item: key,
      value: value,
    });
  }
  filterByColourList.sort((a, b) => a.item.localeCompare(b.item));

  const sortClickHandler = (e) => {
    const sortValue = e.target.value;

    if (sortValue == "newest-first") {
      setSortProducts(departmentProducts);
    }

    if (sortValue == "oldest-first") {
      setSortProducts(departmentProducts.reverse());
    }

    if (sortValue == "price-low-to-high") {
      setSortProducts(
        departmentProducts.sort(
          (a, b) => parseFloat(a.price) - parseFloat(b.price)
        )
      );
    }

    if (sortValue == "price-high-to-low") {
      setSortProducts(
        departmentProducts.sort(
          (a, b) => parseFloat(b.price) - parseFloat(a.price)
        )
      );
    }
  };

  return (
    <Main>
      <Accordion
        title={categorySEO[departmentID].title}
        content={categorySEO[departmentID].description}
      />

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="col-span-2 lg:col-span-1 flex gap-4 justify-items-stretch align-middle">
          <div className="flex basis-1/2 gap-1 items-center justify-center md:grow-0 lg:basis-auto lg:min-w-[200px]">
            <select
              className="w-full h-11 pl-2 bg-white py-2 font-bold box-shadow-custom rounded"
              onChange={sortClickHandler}
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

        <div className="col-span-2 lg:col-span-1 flex gap-4 justify-end w-full">
          <p>
            {sortProducts.length} Product
            {sortProducts.length > 1 && "s"}
          </p>
        </div>
      </div>

      {activeFilters.map((filter) => (
        <p>{filter}</p>
      ))}

      <div className="grid grid-cols-12 gap-4">
        <div className="hidden lg:block col-span-3 bg-white p-4 box-shadow-custom rounded">
          <div className="filters">
            <h2 className="text-2xl mb-4">Filters</h2>
            <h2 className="text-lg mb-1">Brand</h2>
            {filterByBrandList.map(({ item, value }) => (
              <div key={item} className="flex gap-2 justify-between">
                <button
                  className="flex gap-1 items-center"
                  onClick={() => filterItemClickHandler("brand", item)}
                >
                  <div
                    className={`w-3 h-3 rounded border border-[--color-primary] ${
                      activeFilters.includes(item) && "bg-[--color-primary]"
                    }`}
                  ></div>
                  <p className="">{item}</p>
                </button>
                <span className="">{value}</span>
              </div>
            ))}
            <h2 className="text-lg mb-1">Colour</h2>
            {filterByColourList.map(({ item, value }) => (
              <div
                key={item}
                className="flex gap-2 justify-between"
                onClick={() => filterItemClickHandler(item)}
              >
                <p className="">{item}</p>
                <span className="">{value}</span>
              </div>
            ))}
            <Button
              onClick={() => setActiveFilters([])}
              text="Reset"
              className="mt-4"
            />
          </div>
        </div>
        <div className="col-span-12 lg:col-span-9">
          <div className="grid grid-cols-12 gap-4">
            {sortProducts.map((product) => (
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
  );
};

export default Department;
