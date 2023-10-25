import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar } from "swiper";
import Link from "next/link";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import "tippy.js/dist/tippy.css";
// import { bidsData } from "../../data/bids_data";
import { SupercoolAuthContext } from "../../context/supercoolContext";
import Tippy from "@tippyjs/react";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import { bidsModalShow } from "../../redux/counterSlice";
import { useDispatch } from "react-redux";
import Likes from "../likes";
import React, { useEffect } from "react";
import moment from "moment";

const BidsCarousel = () => {
  const superCoolContext = React.useContext(SupercoolAuthContext);
  const { allNfts, getProfileData, profileData } = superCoolContext;
  const dispatch = useDispatch();

  useEffect(() => {
    getProfileData();
  }, [])
  return (
    <>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar]}
        spaceBetween={30}
        slidesPerView="auto"
        breakpoints={{
          240: {
            slidesPerView: 1,
          },
          565: {
            slidesPerView: 2,
          },
          1000: {
            slidesPerView: 3,
          },
          1100: {
            slidesPerView: 4,
          },
        }}
        navigation={{
          nextEl: ".bids-swiper-button-next",
          prevEl: ".bids-swiper-button-prev",
        }}
        className=" card-slider-4-columns !py-5"
      >
        {profileData && profileData.map((item, i) => {
          console.log(item, "item");
          return (
            <SwiperSlide key={i} className="text-white" >
              <article>
                <div className="dark:bg-jacarta-700 dark:border-jacarta-700 border-jacarta-100 rounded-2xl block border bg-white p-[1.1875rem] transition-shadow hover:shadow-lg text-jacarta-500">
                  <figure>
                    <a>
                      <div className="w-full">
                        <Link href={`/item/${item.walletAddress}`}>
                          <img
                            src={item.profilephoto}
                            alt={item.username}
                            width={230}
                            layout="responsive"
                            objectFit="cover"
                            className="rounded-[0.625rem] w-full"
                            loading="lazy"
                            style={{ height: "250px" }}
                          />
                        </Link>
                      </div>
                    </a>
                  </figure>
                  <div className="mt-4 flex items-center justify-between">
                    <a>
                      <span className="font-display text-jacarta-700 hover:text-accent text-base dark:text-white">
                        {item.username}
                      </span>
                    </a>

                  </div>
                  <div className="mt-2 text-sm">
                    <span className="dark:text-jacarta-300 text-jacarta-500">
                      {item.bio}
                    </span>
                    <span className="dark:text-jacarta-100 text-jacarta-700">
                    </span>
                  </div>

                  <div className="mt-8 flex items-center justify-between">
                    <button
                      type="button"
                      className="text-accent font-display text-sm font-semibold"
                    >
                      Joining: {moment.unix(item.createdAt.seconds).milliseconds(item.createdAt.nanoseconds / 1e6).format('LL')}
                    </button>
                  </div>
                </div>
              </article>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <div className="group bids-swiper-button-prev swiper-button-prev shadow-white-volume absolute !top-1/2 !-left-4 z-10 -mt-6 flex !h-12 !w-12 cursor-pointer items-center justify-center rounded-full bg-white p-3 text-jacarta-700 text-xl sm:!-left-6 after:hidden">
        <MdKeyboardArrowLeft />
      </div>
      <div className="group bids-swiper-button-next swiper-button-next shadow-white-volume absolute !top-1/2 !-right-4 z-10 -mt-6 flex !h-12 !w-12 cursor-pointer items-center justify-center rounded-full bg-white p-3 text-jacarta-700 text-xl sm:!-right-6 after:hidden">
        <MdKeyboardArrowRight />
      </div>
    </>
  );
};

export default BidsCarousel;
