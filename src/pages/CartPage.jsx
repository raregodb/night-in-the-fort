import {Link} from "react-router-dom";
import {Trash2} from "lucide-react";
import {Button} from "@/components/ui/button.jsx";
import {Card} from "@/components/ui/card.jsx";
import VbucksPrice from "@/components/VbucksPrice.jsx";
import BuyOnFortniteLink from "@/components/BuyOnFortniteLink.jsx";
import {EmptyState, Loading} from "@/components/Status.jsx";
import {useCart} from "@/components/cart-provider.jsx";
import {useShop} from "@/hooks/use-api.js";
import {findOffer, formatVbucks, offerPath, toCartItem} from "@/lib/shop.js";

function CartLine({item, unavailable, onRemove}) {
    return (
        <Card size="sm" className={`flex-row items-center gap-4 px-4 ${unavailable ? "opacity-60" : ""}`}>
            <Link to={offerPath(item.offerId)} className="size-20 shrink-0 overflow-hidden rounded-xl bg-muted">
                {item.image && <img src={item.image} alt={item.name} className="h-full w-full object-contain" />}
            </Link>
            <div className="flex min-w-0 flex-1 flex-col gap-1">
                <Link to={offerPath(item.offerId)} className="truncate text-lg font-semibold hover:underline">{item.name}</Link>
                {item.type && <span className="text-muted-foreground">{item.type}</span>}
            </div>
            {!unavailable && <VbucksPrice finalPrice={item.finalPrice} regularPrice={item.regularPrice} className="text-lg" />}
            <Button variant="ghost" size="icon" aria-label="Удалить" title="Удалить" onClick={() => onRemove(item.offerId)}>
                <Trash2 />
            </Button>
        </Card>
    )
}

export default function CartPage() {
    const cart = useCart();
    const {data: shop, loading} = useShop();

    if (!cart.count) {
        return (
            <EmptyState
                title="Корзина пуста"
                description="Добавьте предложения из магазина, чтобы посчитать стоимость."
                to="/shop"
                action="Перейти в магазин"
            />
        )
    }

    if (loading) return <Loading />;

    const available = [];
    const unavailable = [];
    for (const item of cart.items) {
        const entry = findOffer(shop, item.offerId);
        if (entry || !shop) available.push(entry ? toCartItem(entry) : item);
        else unavailable.push(item);
    }

    const total = available.reduce((sum, item) => sum + item.finalPrice, 0);
    const regularTotal = available.reduce((sum, item) => sum + Math.max(item.regularPrice, item.finalPrice), 0);

    return (
        <div className="flex w-full max-w-5xl flex-col gap-6 lg:flex-row">
            <div className="flex flex-1 flex-col gap-3">
                <div className="flex items-center justify-between">
                    <h1 className="text-4xl font-bold">Корзина</h1>
                    <Button variant="ghost" onClick={cart.clear}>Очистить</Button>
                </div>

                {available.map((item) => <CartLine key={item.offerId} item={item} onRemove={cart.remove} />)}

                {unavailable.length > 0 && (
                    <>
                        <h2 className="mt-4 text-xl font-semibold">Больше не в продаже</h2>
                        {unavailable.map((item) => <CartLine key={item.offerId} item={item} unavailable onRemove={cart.remove} />)}
                    </>
                )}
            </div>

            <Card className="h-fit gap-4 px-6 lg:w-80">
                <h2 className="text-xl font-semibold">Итого</h2>
                <div className="flex justify-between">
                    <span className="text-muted-foreground">Предложений</span>
                    <span>{available.length}</span>
                </div>
                {regularTotal > total && (
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Экономия</span>
                        <span>{formatVbucks(regularTotal - total)}</span>
                    </div>
                )}
                <div className="flex items-center justify-between text-2xl">
                    <span>Сумма</span>
                    <VbucksPrice finalPrice={total} />
                </div>
                <BuyOnFortniteLink variant="default" className="w-full">Купить</BuyOnFortniteLink>
                <span className="text-xs text-muted-foreground">
                    Покупка завершается в игре или на fortnite.com — перенести корзину туда нельзя.
                </span>
            </Card>
        </div>
    )
}
