import {Link} from "react-router-dom";

const LINKS = [
    {to: "/shop", label: "Магазин"},
    {to: "/cosmetics", label: "Поиск"},
    {to: "/wishlist", label: "Вишлист"},
    {to: "/cart", label: "Корзина"},
];

export default function Footer () {
    return (
        <footer className="flex w-full flex-col gap-3 bg-sidebar-accent p-4 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
            <nav className="flex flex-wrap gap-4">
                {LINKS.map(({to, label}) => (
                    <Link key={to} to={to} className="hover:text-foreground">{label}</Link>
                ))}
            </nav>
            <div className="flex flex-col gap-1 md:items-end">
                <span>
                    Данные: <a href="https://fortnite-api.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">fortnite-api.com</a>
                    {" · "}
                    <a href="https://www.fortnite.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">fortnite.com</a>
                </span>
                <span>© {new Date().getFullYear()} Night in the Fort. Не связан с Epic Games. Fortnite — товарный знак Epic Games, Inc.</span>
            </div>
        </footer>
    )
}
