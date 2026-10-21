import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import ShopItem from "@/components/shop/ShopItem.jsx";
import Autoplay from "embla-carousel-autoplay";
import {useShop} from "@/hooks/use-api.js";

const autoplay = Autoplay({delay: 4000});

export function BundleCarousel() {
    const {data: shop, error} = useShop();

    if (error) return null;

    const bundles = shop?.entries.filter((entry) => entry.bundle) ?? [];

    return (
        <Carousel opts={{loop: true}} plugins={[autoplay]} className="h-full w-full max-w-xs md:max-w-[85vw]">
            <CarouselContent>
                {shop ? (
                    bundles.map((entry) => (
                        <CarouselItem key={entry.offerId} className="h-[40vh]">
                            <ShopItem entry={entry} />
                        </CarouselItem>
                    ))
                ) : (
                    <CarouselItem className="flex h-[40vh] items-center justify-center">Загрузка...</CarouselItem>
                )}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    )
}
