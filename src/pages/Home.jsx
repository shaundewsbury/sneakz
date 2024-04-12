import React from "react";
import { MdChevronRight } from "react-icons/md";
import { Splide, SplideSlide } from "@splidejs/react-splide";

import Main from "../components/layout/Main";
import HeroBanner from "../components/HeroBanner";
import ItemCard from "../components/ItemCard";
import BrandCard from "../components/ui/brand-card/BrandCard";

const Home = () => {
  return (
    <>
      <Main>
        <HeroBanner />

        <div className="grid grid-cols-12 gap-4 mb-12">
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

      <div className="max-w-[1280px] m-auto pl-4 lg:p-4">
        <h2 className="text-xl md:text-2xl mb-4">Latest Brands</h2>

        <Splide
          options={{
            perPage: 4,
            gap: "1rem",
            breakpoints: {
              1024: {
                perPage: 3,
                padding: {
                  right: "4rem",
                },
              },
              768: {
                perPage: 2,
              },
            },
          }}
        >
          <SplideSlide>
            <BrandCard
              brand="Lomax"
              description="Lorem ipsum dolor sit amet"
              link="/brand/lomax"
            />
          </SplideSlide>
          <SplideSlide>
            <div className="aspect-square bg-slate-300" />
          </SplideSlide>
          <SplideSlide>
            <div className="aspect-square bg-slate-300" />
          </SplideSlide>
          <SplideSlide>
            <div className="aspect-square bg-slate-300" />
          </SplideSlide>
          <SplideSlide>
            <div className="aspect-square bg-slate-300" />
          </SplideSlide>
          <SplideSlide>
            <div className="aspect-square bg-slate-300" />
          </SplideSlide>
          <SplideSlide>
            <div className="aspect-square bg-slate-300" />
          </SplideSlide>
          <SplideSlide>
            <div className="aspect-square bg-slate-300" />
          </SplideSlide>
          <SplideSlide>
            <div className="aspect-square bg-slate-300" />
          </SplideSlide>
        </Splide>
      </div>
    </>
  );
};

export default Home;
