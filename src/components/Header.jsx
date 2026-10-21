import {Castle, Heart, Search, ShoppingCart, Sparkles, Store} from "lucide-react";
import {buttonVariants} from "@/components/ui/button.jsx";
import {ModeToggle} from "@/components/mode-toggle.jsx";
import {Link, NavLink} from "react-router-dom";
import {useCart} from "@/components/cart-provider.jsx";
import {useWishlist} from "@/components/wishlist-provider.jsx";
import {cn} from "@/lib/utils.js";

const NAV = [
    {to: "/", label: "Новинки", icon: Sparkles, end: true},
    {to: "/shop", label: "Магазин", icon: Store},
    {to: "/cosmetics", label: "Поиск", icon: Search},
];

function CounterLink({to, label, count, children}) {
    return (
        <Link to={to} aria-label={`${label}: ${count}`} title={label}
              className={cn(buttonVariants({variant: "outline", size: "icon"}), "relative")}>
            {children}
            {count > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-xs font-semibold text-primary-foreground">
                    {count}
                </span>
            )}
        </Link>
    )
}

export default function Header () {
    const cart = useCart();
    const wishlist = useWishlist();

    return (
        <header className={"flex justify-between items-center gap-2 w-full h-[70px] bg-sidebar-accent p-4"}>
            <Link to="/" className="flex shrink-0 items-center gap-2">
                <Castle className="size-7 text-primary" aria-hidden="true"/>
                <span className={"hidden sm:inline text-xl md:text-2xl font-bold"}>Night<span className={"text-xs"}> in the </span>Fort</span>
            </Link>

            <nav className="flex items-center gap-2 overflow-x-auto md:gap-4">
                {NAV.map(({to, label, icon: Icon, end}) => (
                    <NavLink key={to} to={to} end={end} aria-label={label}
                             className={({isActive}) => cn(
                                 "flex items-center gap-1.5 text-base md:text-2xl font-bold transition-transform hover:brightness-125",
                                 !isActive && "text-muted-foreground",
                             )}>
                        <Icon className="size-5 md:size-6" aria-hidden="true"/>
                        <span className="hidden sm:inline">{label}</span>
                    </NavLink>
                ))}
            </nav>

            <div className={"flex shrink-0 items-center gap-2"}>
                <ModeToggle/>
                <CounterLink to="/wishlist" label="Вишлист" count={wishlist.count}>
                    <Heart/>
                </CounterLink>
                <CounterLink to="/cart" label="Корзина" count={cart.count}>
                    <ShoppingCart/>
                </CounterLink>
            </div>
        </header>
    )
}
