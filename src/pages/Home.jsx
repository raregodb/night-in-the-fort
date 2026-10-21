import {BundleCarousel} from "@/components/shop/BundleCarousel.jsx";
import RecentShopList from "@/components/shop/RecentShopList.jsx";

export default function Home () {

    return (
        <>
            <BundleCarousel/>
            <div className="mt-10 flex w-full max-w-7xl flex-col items-center gap-2">
                <h1 className="text-4xl font-bold md:text-6xl">Новинки</h1>
                <RecentShopList/>
            </div>
        </>
    )
}
