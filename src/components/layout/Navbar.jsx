import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";
import { db } from "../../firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { useBasket } from "../../context/BasketContext";

import { navBarLinks } from "../data/navBarLinks";

import { GoHeart } from "react-icons/go";
import {
  RiAccountCircleLine,
  RiShoppingBasket2Line,
  RiMenuFill,
  RiSearchLine,
  RiCloseLine,
  RiContactsLine,
} from "react-icons/ri";
import { FaRegAddressCard } from "react-icons/fa";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);

  const { user } = UserAuth();
  const [displayName, setDisplayName] = useState("");

  const { basketQuantity } = useBasket();

  useEffect(() => {
    onSnapshot(doc(db, "users", `${user?.email}`), (doc) => {
      setDisplayName(doc.data()?.username);
    });
  }, [user]);

  const openMenuClickHandler = () => {
    setOpenMenu(true);
    document.querySelector(".content").classList.add("overlay");
  };

  const closeMenuClickHandler = () => {
    setOpenMenu(false);
    document.querySelector(".content").classList.remove("overlay");
  };

  return (
    <nav className="flex items-center sticky top-0 left-0 h-14 bg-[--color-primary] mb-4 z-[1]">
      <div className="flex w-full max-w-[1280px] px-4 items-center justify-between m-auto">
        <button className="lg:hidden text-white" onClick={openMenuClickHandler}>
          <RiMenuFill />
          <span className="sr-only">Open Menu</span>
        </button>
        <Link to="/">
          <div className="flex gap-2 items-center justify-center">
            <span className="decorativeText text-white text-xl md:text-2xl lg:text-3xl cursor-pointer">
              SNEAKZ
            </span>
          </div>
        </Link>
        <Link className="relative lg:hidden text-white" to="/basket">
          <RiShoppingBasket2Line />
          <span className="sr-only">Basket</span>
          {basketQuantity > 0 && (
            <div className="flex items-center justify-center absolute top-[-0.5rem] right-[-0.5rem] bg-[--color-secondary]  border rounded-[50%] w-4 h-4">
              <span className="text-xs font-bold text-[--color-primary]">
                {basketQuantity}
              </span>
            </div>
          )}
        </Link>

        <div
          className={
            openMenu
              ? "fixed lg:hidden left-0 top-0 w-[100%] h-full ease-in-out duration-500"
              : "ease-in-out w-[100%] duration-500 fixed top-0 bottom-0 left-[-100%]"
          }
        >
          <div className="flex items-center justify-between w-full h-14 px-4 bg-[--color-primary] text-white">
            <h2>Menu</h2>

            <button onClick={closeMenuClickHandler}>
              <RiCloseLine />
              <span className="sr-only">Close Menu</span>
            </button>
          </div>

          <div className="h-full bg-[--color-secondary] p-4">
            <div className="flex flex-col gap-3 items-start bg-[--color-secondary]">
              <h3 className="text-lg decorativeText">Department</h3>
              {navBarLinks.products.map((product) => (
                <Link
                  className="decorativeText hover:underline"
                  to={product.link}
                  onClick={closeMenuClickHandler}
                >
                  {product.label}
                </Link>
              ))}
            </div>

            <hr className="w-full border-white border my-4" />

            <div className="flex flex-col gap-5 items-start bg-[--color-secondary]">
              <h3 className="text-lg decorativeText">Account & Support</h3>
              <Link
                className="flex gap-1"
                to="/account"
                onClick={closeMenuClickHandler}
              >
                <RiAccountCircleLine />
                <span className="decorativeText hover:underline">
                  My Account
                </span>
              </Link>

              <Link
                className="flex gap-1"
                to="/placeholder"
                onClick={closeMenuClickHandler}
              >
                <RiContactsLine />
                <span className="decorativeText hover:underline">Contact</span>
              </Link>

              <Link
                className="flex gap-1"
                to="/placeholder"
                onClick={closeMenuClickHandler}
              >
                <FaRegAddressCard />
                <span className="decorativeText hover:underline">About</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="hidden lg:flex gap-3 text-white">
          {navBarLinks.products.map((product) => (
            <Link className="decorativeText hover:underline" to={product.link}>
              {product.label}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex gap-3 text-white">
          {/* {displayName && <p>Hey {displayName}</p>} */}

          {displayName ? (
            <Link to="/account">
              <RiAccountCircleLine />
              <span className="sr-only">Account</span>
            </Link>
          ) : (
            <Link to="/login">
              <RiAccountCircleLine />
              <span className="sr-only">Login</span>
            </Link>
          )}

          <Link to="/x">
            <RiSearchLine />
            <span className="sr-only">Search</span>
          </Link>
          <Link to="/saved-products">
            <GoHeart />
            <span className="sr-only">Saved Products</span>
          </Link>
          <Link className="relative" to="/basket">
            <RiShoppingBasket2Line />
            <span className="sr-only">Basket</span>
            {basketQuantity > 0 && (
              <div className="flex items-center justify-center absolute top-[-0.5rem] right-[-0.5rem] bg-[--color-secondary]  border rounded-[50%] w-4 h-4">
                <span className="text-xs font-bold text-[--color-primary]">
                  {basketQuantity}
                </span>
              </div>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
