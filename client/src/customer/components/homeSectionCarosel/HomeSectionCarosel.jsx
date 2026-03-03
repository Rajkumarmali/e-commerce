import React, { useState, useRef } from "react";
import AliceCarousel from "react-alice-carousel";
import HomeSectionCard from "../homeSectionCard/HomeSectionCard";
import { Button } from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";


function HomeSectionCarosel({ data, sectionName }) {

    const [activeIndex, setActiveIndex] = useState(0);
    const carouselRef = useRef(null);

    const responsive = {
        0: { items: 1 },
        720: { items: 3 },
        1024: { items: 5.5 },
    };

    const slidePre = () => {
        if (carouselRef.current) {
            carouselRef.current.slidePrev();
        }
    };

    const slideNext = () => {
        if (carouselRef.current) {
            carouselRef.current.slideNext();
        }
    };

    const syncActiveIndex = ({ item }) => setActiveIndex(item);

    const items = data.slice(0, 10).map((items) => <HomeSectionCard product={items} />);

    return (
        <div className="">
            <h2 className="text-2xl font-extrabold text-gray-800 py-5 text-left">{sectionName}</h2>
            <div className="relative p-5">
                <AliceCarousel
                    ref={carouselRef}
                    items={items}
                    disableButtonsControls
                    responsive={responsive}
                    disableDotsControls
                    onSlideChanged={syncActiveIndex}
                    activeIndex={activeIndex}
                />
                {activeIndex !== items.length - 5 &&
                    <Button
                        variant="contained"
                        className="z-50 bg-white"
                        sx={{
                            position: "absolute",
                            top: "8rem",
                            right: "0rem",
                            transform: "translateX(50%) rotate(90deg)",
                            bgcolor: "white",
                        }}
                        aria-label="next"
                        onClick={slideNext}
                    >
                        <KeyboardArrowLeftIcon
                            sx={{ transform: "rotate(90deg)", color: "black" }}
                        />
                    </Button>
                }

                {activeIndex !== 0 && <Button
                    variant="contained"
                    className="z-50 bg-white"
                    sx={{
                        position: "absolute",
                        top: "8rem",
                        left: "0rem",
                        transform: "translateX(-50%) rotate(90deg)",
                        bgcolor: "white",
                    }}
                    aria-label="next"
                    onClick={slidePre}
                >
                    <KeyboardArrowLeftIcon
                        sx={{ transform: "rotate(-90deg)", color: "black" }}
                    />
                </Button>}
            </div>
        </div>
    );
}

export default HomeSectionCarosel;
