import {Link} from "react-router-dom";
import BrItem from "@/components/shop/BrItem.jsx";
import CartButton from "@/components/CartButton.jsx";
import VbucksPrice from "@/components/VbucksPrice.jsx";
import {Button} from "@/components/ui/button.jsx";
import {CardFooter} from "@/components/ui/card.jsx";
import {EmptyState} from "@/components/Status.jsx";
import {useWishlist} from "@/components/wishlist-provider.jsx";
import {useShop} from "@/hooks/use-api.js";
import {findOffersWithCosmetic, offerPath} from "@/lib/shop.js";

export default function WishlistPage() {
    const wishlist = useWishlist();
    const {data: shop} = useShop();

    if (!wishlist.count) {
        return (
            <EmptyState
                title="Вишлист пуст"
                description="Нажмите на сердечко у предмета, чтобы следить за его появлением в магазине."
                to="/cosmetics"
                action="Найти предметы"
            />
        )
    }

    const withOffers = wishlist.items.map((item) => ({item, offer: findOffersWithCosmetic(shop, item.id)[0]}));
    const inShop = withOffers.filter(({offer}) => offer).length;

    return (
        <div className="flex w-full max-w-7xl flex-col gap-6">
            <div className="flex flex-wrap items-end justify-between gap-2">
                <div className="flex flex-col gap-1">
                    <h1 className="text-4xl font-bold">Вишлист</h1>
                    <span className="text-muted-foreground">
                        {wishlist.count} предм. · сейчас в магазине: {inShop}
                    </span>
                </div>
                <Button variant="ghost" onClick={wishlist.clear}>Очистить</Button>
            </div>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                {withOffers.map(({item, offer}) => (
                    <BrItem key={item.id} item={item}>
                        {offer ? (
                            <CardFooter className="flex-wrap justify-between gap-2">
                                <Link to={offerPath(offer.offerId)} className="hover:underline">
                                    <VbucksPrice finalPrice={offer.finalPrice} regularPrice={offer.regularPrice} />
                                </Link>
                                <CartButton entry={offer} compact />
                            </CardFooter>
                        ) : (
                            <CardFooter className="text-muted-foreground">Нет в магазине</CardFooter>
                        )}
                    </BrItem>
                ))}
            </div>
        </div>
    )
}
