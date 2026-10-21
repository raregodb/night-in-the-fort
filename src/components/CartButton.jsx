import {Check, ShoppingCart} from "lucide-react";
import {Button} from "@/components/ui/button.jsx";
import {useCart} from "@/components/cart-provider.jsx";
import {toCartItem} from "@/lib/shop.js";

export default function CartButton({entry, compact = false, ...props}) {
    const cart = useCart();
    const inCart = cart.has(entry.offerId);
    const label = inCart ? "В корзине" : "В корзину";

    return (
        <Button
            variant={inCart ? "secondary" : "default"}
            size={compact ? "icon" : "lg"}
            aria-pressed={inCart}
            aria-label={inCart ? "Убрать из корзины" : "Добавить в корзину"}
            title={inCart ? "Убрать из корзины" : "Добавить в корзину"}
            onClick={() => inCart ? cart.remove(entry.offerId) : cart.add(toCartItem(entry))}
            {...props}
        >
            {inCart ? <Check /> : <ShoppingCart />}
            {!compact && label}
        </Button>
    )
}
