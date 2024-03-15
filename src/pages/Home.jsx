import React from "react";
import { MdChevronRight } from "react-icons/md";

import Main from "../components/layout/Main";
import HeroBanner from "../components/HeroBanner";
import ItemCard from "../components/ItemCard";

const Home = () => {
  return (
    <Main>
      <HeroBanner />
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12">
          <h2 className="text-xl md:text-2xl">Shop by Department</h2>
        </div>

        <div className="col-span-12 md:col-span-4">
          <ItemCard
            icon={<MdChevronRight className="w-6 h-6" />}
            iconRight
            title="Mens"
            link="/department/mens"
          />
        </div>
        <div className="col-span-12 md:col-span-4">
          <ItemCard
            icon={<MdChevronRight className="w-6 h-6" />}
            iconRight
            title="Womens"
            link="/department/womens"
          />
        </div>
        <div className="col-span-12 md:col-span-4">
          <ItemCard
            icon={<MdChevronRight className="w-6 h-6" />}
            iconRight
            title="Kids"
            link="/department/kids"
          />
        </div>
      </div>
    </Main>
  );
};

export default Home;
