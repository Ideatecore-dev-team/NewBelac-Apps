"use client";

import React from "react";
import Image from "next/image";
// Import gambar dengan cara Next.js
import Partner1 from '../../../../public/icons/KeeChain.svg';
import Partner2 from "../../../../public/icons/KeeChain.svg";
import Partner3 from "../../../../public/icons/KeeChain.svg";
import Partner4 from "../../../../public/icons/KeeChain.svg";
import Partner5 from "../../../../public/icons/KeeChain.svg";
import Partner6 from "../../../../public/icons/KeeChain.svg";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";

const HomeSwiper = () => {
    const partners = [
        { id: 1, src: Partner1, alt: "Partner Logo 1" },
        { id: 2, src: Partner2, alt: "Partner Logo 2" },
        { id: 3, src: Partner3, alt: "Partner Logo 3" },
        { id: 4, src: Partner4, alt: "Partner Logo 4" },
        { id: 5, src: Partner5, alt: "Partner Logo 5" },
        { id: 6, src: Partner6, alt: "Partner Logo 6" },
    ];

    return (
        <div className="partner flex flex-col mx-auto lg:pb-12 lg:px-0 py-9 px-6 gap-gap10">
            <div className="partner-container flex flex-col items-center overflow-hidden lg:w-full w-[312px] mx-auto lg:gap-6 gap-4">
                {/* <h1 className="font-bold lg:text-6xl xs:text-2xl text-center tracking-tight">
                    Our Partner
                </h1> */}
                <Swiper
                    spaceBetween={0}
                    slidesPerView={3}
                    loop={true}
                    autoplay={{
                        delay: 0,
                        disableOnInteraction: false, // Ubah menjadi false agar tidak berhenti saat di-hover
                        reverseDirection: false,
                    }}
                    speed={5000}
                    modules={[Autoplay]}
                    className="mySwiper lg:w-[1240px] w-[312px]"
                    breakpoints={{
                        320: {
                            slidesPerView: 2,
                            spaceBetween: 0,
                        },
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 0,
                        },
                        1024: {
                            slidesPerView: 5,
                            spaceBetween: 0,
                        },
                    }}
                >
                    {partners.map((partner) => (
                        <SwiperSlide key={partner.id}>
                            <div className="logoplaceholder flex w-[200px] h-[40px] content-center items-center justify-center">
                                <Image
                                    src={partner.src}
                                    alt={partner.alt}
                                    className="w-120 h-120 flex-shrink-0 object-contain"
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default HomeSwiper ;