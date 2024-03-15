import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";
import { db } from "../../firebase";
import { doc, onSnapshot } from "firebase/firestore";

import { navBarLinks } from "../data/navBarLinks";

import { GoHeart } from "react-icons/go";
import {
  RiAccountCircleLine,
  RiShoppingBasket2Line,
  RiMenuFill,
} from "react-icons/ri";
import Icon from "../Icon";

const Navbar = () => {
  const { user } = UserAuth();
  const [displayName, setDisplayName] = useState("");

  useEffect(() => {
    onSnapshot(doc(db, "users", `${user?.email}`), (doc) => {
      setDisplayName(doc.data()?.username);
    });
  }, [user]);

  const menuClickHandler = () => {
    console.log("clicked");
  };

  return (
    <nav className="sticky top-0 left-0 p-4 bg-[--color-primary] box-shadow-custom mb-4 text-white z-[1]">
      <div className="flex w-full max-w-[1280px] items-center justify-between m-auto">
        <button className="lg:hidden" onClick={menuClickHandler}>
          <RiMenuFill className="w-6 h-6 text-whit" />
        </button>
        <Link to="/">
          <div className="flex gap-2 items-center justify-center">
            <div className="w-6 h-6 md:w-8 md:h-8">
              <Icon />
            </div>
            <span className="decorativeText text-white text-xl md:text-2xl lg:text-3xl cursor-pointer">
              SNEAKZ
            </span>
          </div>
        </Link>
        <div className="flex gap-3">
          {navBarLinks.products.map((product) => (
            <Link to={product.link}>{product.label}</Link>
          ))}

          {navBarLinks.company.map((company) => (
            <Link to={company.link}>{company.label}</Link>
          ))}
        </div>
        <div>
          <div className="flex gap-3">
            {displayName && <p>Hey {displayName}</p>}

            {displayName ? (
              <Link to="/account">
                <RiAccountCircleLine className="w-6 h-6 text-white" />
              </Link>
            ) : (
              <Link to="/login">
                <RiAccountCircleLine className="w-6 h-6 text-white" />
              </Link>
            )}

            <Link to="/saved-products">
              <GoHeart className="w-6 h-6 text-white" />
            </Link>
            <Link to="/basket">
              <RiShoppingBasket2Line className="w-6 h-6 text-white" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
