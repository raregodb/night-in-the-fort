import ShopList from "@/components/shop/ShopList.jsx";

export default function Shop() {

    return (
        <div className={"w-full flex-1 grow flex flex-col gap-2 justify-center items-center"}>
            <h1 className={"text-6xl"}>Shop</h1>
            <ShopList/>
        </div>
    )
}