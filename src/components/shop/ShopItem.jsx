import {Link} from "react-router-dom";
import BrItem from "@/components/shop/BrItem.jsx";
import VbucksPrice from "@/components/VbucksPrice.jsx";
import {getColors} from "@/lib/utils.js";
import {getOfferImage, getOfferName, offerPath} from "@/lib/shop.js";

export default function ShopItem({entry}) {
    if (!entry) return null;

    const name = getOfferName(entry);
    const image = getOfferImage(entry);
    const items = entry.brItems ?? [];
    const background = entry.colors?.color1 ? getColors(entry.colors) : undefined;

    return (
        <div className="relative flex h-full w-full overflow-hidden rounded-2xl" style={{background}}>
            <Link to={offerPath(entry.offerId)} className="absolute inset-0 z-10" aria-label={name} />

            <div className="pointer-events-none absolute top-3 left-4 z-20 flex flex-col gap-1">
                <span className="rounded-md bg-black/50 px-2 py-1 text-lg font-bold text-white md:text-2xl">{name}</span>
                <span className="w-fit rounded-md bg-black/50 px-2 py-1 text-white">
                    <VbucksPrice finalPrice={entry.finalPrice} regularPrice={entry.regularPrice} />
                </span>
            </div>

            {items.length > 1 && !entry.layout?.useWidePreview && (
                <div className="relative z-20 m-auto ml-4 gap-2 hidden w-full max-w-[45%] grid-cols-3 pt-20 sm:grid lg:grid-cols-5">
                    {items.map((item) => (
                        <div key={item.id} className="h-fit w-[100px] border-4 border-white transition-transform duration-300 hover:scale-110">
                            <BrItem item={item} type="icon" />
                        </div>
                    ))}
                </div>
            )}

            {image && (
                <img
                    src={image}
                    alt={name}
                    className={`h-full w-full ${entry.layout?.useWidePreview ? "object-cover" : "object-contain"}`}
                />
            )}
        </div>
    )
}
