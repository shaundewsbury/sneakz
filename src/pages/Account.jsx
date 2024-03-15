import React, { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import ItemCard from "../components/ItemCard";
import Main from "../components/layout/Main";
import {
  RiShoppingBasket2Line,
  RiSettings2Line,
  RiContactsLine,
  RiLogoutBoxRLine,
} from "react-icons/ri";
import { FaRegAddressCard } from "react-icons/fa";
import { PiKeyReturnLight } from "react-icons/pi";
import { CiDeliveryTruck } from "react-icons/ci";

const Account = () => {
  const { user, logOut } = UserAuth();
  const [displayName, setDisplayName] = useState("");

  useEffect(() => {
    onSnapshot(doc(db, "users", `${user?.email}`), (doc) => {
      setDisplayName(doc.data()?.username);
    });
  }, [user]);

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Main>
      <h1>My Account</h1>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12">
          <p>Hey {displayName}!</p>
        </div>
        <div className="flex flex-col gap-4 col-span-12 md:col-span-6 lg:col-span-4">
          <h2>Account</h2>
          <ItemCard
            icon={<RiShoppingBasket2Line className="w-6 h-6 " />}
            title="My Orders"
            link="/placeholder"
          />

          <ItemCard
            icon={<FaRegAddressCard className="w-6 h-6 " />}
            title="My Details"
            link="/placeholder"
          />

          <ItemCard
            icon={<RiSettings2Line className="w-6 h-6 " />}
            title="Settings"
            link="/placeholder"
          />

          <button onClick={handleLogout}>
            <ItemCard
              icon={<RiLogoutBoxRLine className="w-6 h-6 " />}
              title="Logout"
            />
          </button>
        </div>

        <div className="flex flex-col gap-4 col-span-12 md:col-span-6 lg:col-span-4">
          <h2>Support</h2>

          <ItemCard
            icon={<CiDeliveryTruck className="w-6 h-6 " />}
            title="Delivery"
            link="/placeholder"
          />

          <ItemCard
            icon={<PiKeyReturnLight className="w-6 h-6 " />}
            title="Returns"
            link="/placeholder"
          />

          <ItemCard
            icon={<RiContactsLine className="w-6 h-6 " />}
            title="Contact"
            link="/placeholder"
          />

          <ItemCard
            icon={<FaRegAddressCard className="w-6 h-6 " />}
            title="About"
            link="/placeholder"
          />
        </div>
      </div>
    </Main>
  );
};

export default Account;
