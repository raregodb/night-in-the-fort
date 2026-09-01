import RecentShopList from "@/components/shop/RecentShopList.jsx";
import ShopList from "@/components/shop/ShopList.jsx";
import {BundleCarousel} from "@/components/shop/BundleCarousel.jsx";

export default function Shop() {

    return (
        <div className={"w-full h-full flex flex-col gap-2 mt-10 justify-center items-center"}>
            <h1 className={"text-6xl"}>Recents</h1>
            {/*<ShopList/>*/}
            <RecentShopList/>
        </div>
    )
}