import {Card, CardAction, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.jsx";
import RarityBadge from "@/components/RarityBadge.jsx";
import ItemImage from "@/components/ItemImage.jsx";
import WishlistButton from "@/components/WishlistButton.jsx";
import {Link} from "react-router-dom";

export default function BrItem(props) {
    const {item, type, children} = props;

    if (!item || item.name === "null") return null;

    const href = `/cosmetics/br/${item.id}`;

    if (type === "icon") {
        return (
            <Link to={href} title={item.name} className="block size-[100px]">
                <ItemImage src={item.images?.smallIcon ?? item.images?.icon} alt={item.name} rarity={item.rarity?.value} />
            </Link>
        )
    }

    return (
        <Card className="relative mx-auto flex h-full w-full max-w-sm flex-col">
            <Link to={href} className="flex flex-1 flex-col gap-2">
                <ItemImage
                    src={item.images?.icon}
                    smallSrc={item.images?.smallIcon}
                    alt={item.name}
                    rarity={item.rarity?.value}
                    className="rounded-t-[min(var(--radius-4xl),24px)]"
                />
                <CardHeader>
                    <CardAction>
                        <RarityBadge type={item.rarity?.value} label={item.rarity?.displayValue} />
                    </CardAction>
                    <CardTitle>{item.name}</CardTitle>
                    <CardDescription>
                        {item.type?.displayValue && item.type.displayValue !== "null" ? `${item.type.displayValue} · ` : ""}
                        {item.description}
                    </CardDescription>
                </CardHeader>
            </Link>
            <WishlistButton item={item} className="absolute top-2 right-2 z-30" />
            {children}
        </Card>
    )
}
