import {Link, useParams} from "react-router-dom";
import {getBrCosmeticById} from "@/lib/api.js";
import {getRarity} from "@/lib/rarity.js";
import {getColors} from "@/lib/utils.js";
import {Badge} from "@/components/ui/badge.jsx";
import RarityBadge from "@/components/RarityBadge.jsx";
import WishlistButton from "@/components/WishlistButton.jsx";
import CartButton from "@/components/CartButton.jsx";
import VbucksPrice from "@/components/VbucksPrice.jsx";
import {EmptyState, ErrorMessage, Loading} from "@/components/Status.jsx";
import {useApi, useShop} from "@/hooks/use-api.js";
import {findOffersWithCosmetic, formatDate, getOfferName, offerPath} from "@/lib/shop.js";

function ShopAvailability({item}) {
    const {data: shop} = useShop();
    const offers = findOffersWithCosmetic(shop, item.id);

    if (!shop) return null;

    if (!offers.length) {
        const lastSeen = item.shopHistory?.at(-1);
        return (
            <span className="text-muted-foreground">
                Сейчас нет в магазине{lastSeen ? ` · последний раз ${formatDate(lastSeen)}` : ""}
            </span>
        )
    }

    return (
        <div className="flex w-full flex-col gap-2 rounded-2xl border p-3">
            <span className="font-semibold">Сейчас в магазине</span>
            {offers.map((offer) => (
                <div key={offer.offerId} className="flex flex-wrap items-center justify-between gap-2">
                    <Link to={offerPath(offer.offerId)} className="hover:underline">
                        {offer.bundle ? `В наборе «${getOfferName(offer)}»` : "Отдельно"}
                    </Link>
                    <div className="flex items-center gap-2">
                        <VbucksPrice finalPrice={offer.finalPrice} regularPrice={offer.regularPrice} />
                        <CartButton entry={offer} compact />
                    </div>
                </div>
            ))}
        </div>
    )
}

export default function CosmeticItem() {
    const {id} = useParams();
    const {data: item, error, loading} = useApi(() => getBrCosmeticById(id), [id]);

    if (loading) return <Loading />;
    if (error?.status === 404) {
        return <EmptyState title="Предмет не найден" to="/cosmetics" action="К поиску" />;
    }
    if (error) return <ErrorMessage error={error} />;

    const rarityColor = getRarity(item.rarity?.value).color;
    const image = item.images?.featured || item.images?.icon;

    return (
        <div className="flex w-full max-w-7xl flex-col gap-4 md:flex-row">
            <div className="relative aspect-square w-full overflow-hidden rounded-3xl md:w-1/2"
                 style={{background: item.series?.colors ? getColors(item.series.colors) : rarityColor}}>
                {item.series?.image && (
                    <img
                        src={item.series.image}
                        alt=""
                        className="absolute inset-0 z-0 h-full w-full object-cover"
                    />
                )}
                {image ? (
                    <img src={image} alt={item.name} className="relative z-10 h-full w-full object-contain" />
                ) : (
                    <div className="flex h-full w-full items-center justify-center text-2xl text-white">Нет изображения</div>
                )}
            </div>

            <div className="flex flex-1 flex-col items-start gap-4 p-2">
                <h1 className="text-4xl font-bold md:text-5xl">{item.name}</h1>
                <div className="flex flex-wrap items-center gap-2">
                    <RarityBadge type={item.rarity?.value} label={item.rarity?.displayValue} className="text-base" />
                    {item.type?.displayValue && item.type.displayValue !== "null" && (
                        <Badge variant="secondary" className="h-7 text-base">{item.type.displayValue}</Badge>
                    )}
                </div>
                {item.description && <span className="text-2xl">{item.description}</span>}
                <div className="flex flex-col gap-1 text-muted-foreground">
                    {item.introduction?.text && <span>{item.introduction.text}</span>}
                    {item.set?.text && <span>{item.set.text}</span>}
                </div>
                <WishlistButton item={item} withLabel />
                <ShopAvailability item={item} />
            </div>
        </div>
    )
}
