import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { MainCroselData } from "./MainCroselData";

export default function MainCrosel() {
    const items = MainCroselData.map((item, index) => (
        <img
            key={index}
            className="cursor-pointer w-full h-[600px] object-cover"
            role="presentation"
            src={item.image}
            alt="carousel"
        />
    ));

    return (
        <AliceCarousel
            items={items}
            disableButtonsControls
            controlsStrategy="alternate"
            mouseTracking
            autoPlay
            infinite
        />
    );
}