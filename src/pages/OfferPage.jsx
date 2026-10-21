import {useParams} from "react-router-dom";
import {Badge} from "@/components/ui/badge.jsx";
import BrItem from "@/components/shop/BrItem.jsx";
import TrackItem from "@/components/shop/TrackItem.jsx";
import InstrumentItem from "@/components/shop/InstrumentItem.jsx";
import CarItem from "@/components/shop/CarItem.jsx";
import VbucksPrice from "@/components/VbucksPrice.jsx";
import CartButton from "@/components/CartButton.jsx";
import WishlistButton from "@/components/WishlistButton.jsx";
import BuyOnFortniteLink from "@/components/BuyOnFortniteLink.jsx";
import {EmptyState, ErrorMessage, Loading} from "@/components/Status.jsx";
import {useShop} from "@/hooks/use-api.js";
import {getColors} from "@/lib/utils.js";
import {findOffer, formatDate, getOfferImage, getOfferItems, getOfferName, getOfferType, isOnSale} from "@/lib/shop.js";

export default function OfferPage() {
    const {offerId} = useParams();
    const {data: shop, error, loading} = useShop();

    if (loading) return <Loading />;
    if (error) return <ErrorMessage error={error} />;

    const entry = findOffer(shop, offerId);

    if (!entry) {
        return (
            <EmptyState
                title="Этого предложения уже нет в магазине"
                description="Магазин обновляется каждый день в 03:00 по Москве."
                to="/shop"
                action="Перейти в магазин"
            />
        )
    }

    const name = getOfferName(entry);
    const image = getOfferImage(entry);
    const {br, tracks, instruments, cars} = getOfferItems(entry);
    const itemsCount = br.length + tracks.length + instruments.length + cars.length;
    const singleBrItem = !entry.bundle && br.length === 1 ? br[0] : null;

    return (
        <div className="flex w-full max-w-7xl flex-col gap-8">
            <div className="flex w-full flex-col gap-6 md:flex-row">
                <div className="flex aspect-square w-full items-center justify-center overflow-hidden rounded-3xl bg-muted md:w-1/2"
                     style={{background: entry.colors?.color1 ? getColors(entry.colors) : undefined}}>
                    {image && <img src={image} alt={name} className="h-full w-full object-contain" />}
                </div>

                <div className="flex flex-1 flex-col gap-4">
                    <div className="flex flex-wrap gap-2">
                        {getOfferType(entry) && <Badge variant="secondary">{getOfferType(entry)}</Badge>}
                        {entry.banner?.value && <Badge>{entry.banner.value}</Badge>}
                        {isOnSale(entry) && (
                            <Badge variant="destructive">
                                −{Math.round((1 - entry.finalPrice / entry.regularPrice) * 100)}%
                            </Badge>
                        )}
                    </div>

                    <h1 className="text-4xl font-bold md:text-5xl">{name}</h1>

                    {entry.bundle?.info && <span className="text-muted-foreground">{entry.bundle.info}</span>}
                    {singleBrItem?.description && <span className="text-lg">{singleBrItem.description}</span>}

                    <VbucksPrice finalPrice={entry.finalPrice} regularPrice={entry.regularPrice} className="text-3xl" />

                    <ul className="flex flex-col gap-1 text-muted-foreground">
                        {entry.outDate && <li>В магазине до {formatDate(entry.outDate)}</li>}
                        {entry.bundle && <li>Предметов в наборе: {itemsCount}</li>}
                        <li>{entry.giftable ? "Можно подарить" : "Нельзя подарить"}</li>
                        <li>{entry.refundable ? "Можно вернуть" : "Возврат недоступен"}</li>
                    </ul>

                    {entry.offerTag?.text && (
                        <span className="rounded-xl border p-3 text-sm">{entry.offerTag.text}</span>
                    )}

                    <div className="flex flex-wrap gap-2">
                        <CartButton entry={entry} />
                        {singleBrItem && <WishlistButton item={singleBrItem} withLabel />}
                        <BuyOnFortniteLink />
                    </div>
                </div>
            </div>

            {itemsCount > 1 || !singleBrItem ? (
                <section className="flex flex-col gap-3">
                    <h2 className="text-2xl font-semibold">Состав</h2>
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                        {br.map((item) => <BrItem key={item.id} item={item} />)}
                        {tracks.map((item) => <TrackItem key={item.id} item={item} />)}
                        {instruments.map((item) => <InstrumentItem key={item.id} item={item} />)}
                        {cars.map((item) => <CarItem key={item.id} item={item} />)}
                    </div>
                </section>
            ) : null}
        </div>
    )
}
