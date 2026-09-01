import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import {useEffect, useState} from "react";
import {getShop} from "@/lib/api.js";
import ShopItem from "@/components/shop/ShopItem.jsx";
import Autoplay from "embla-carousel-autoplay";

export function BundleCarousel() {
    const [shop, setShop] = useState(null);
    const [itemsBySize, setItemsBySize] = useState({});

    useEffect(() => {
        try {
            getShop().then((data) => {
                setShop(data.data);
            });
        }
        catch (e) {
            console.error(e);
        }
    }, []);


    return (
        <Carousel opts={{loop: true}} plugins={[ Autoplay({
            delay: 4000,
        })]} className="w-full md:max-w-[85vw] h-full max-w-xs">
            <CarouselContent>
                {shop ? (
                    shop.entries.filter((entry) => entry.bundle).map((entry) => (
                        <CarouselItem key={entry.devName} className={"max-h-[40vh]"}>
                            <ShopItem entry={entry} />
                        </CarouselItem>
                    ))
                ) : <span>loading</span>}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    )
}
