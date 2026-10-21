import {Card, CardAction, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.jsx";
import RarityBadge from "@/components/RarityBadge.jsx";
import ItemImage from "@/components/ItemImage.jsx";

export default function CarItem(props) {
    const {item, children} = props;

    if (!item || item.name === "null") return null;

    return (
        <Card className="relative mx-auto flex h-full w-full max-w-sm flex-col pt-0">
            <ItemImage
                src={item.images?.large}
                smallSrc={item.images?.small}
                alt={item.name}
                rarity={item.rarity?.value}
            />

            <CardHeader>
                <CardAction>
                    <RarityBadge type={item.rarity?.value} label={item.rarity?.displayValue} />
                </CardAction>
                <CardTitle>{item.name}</CardTitle>
                <CardDescription>
                    {item.description}
                </CardDescription>
            </CardHeader>
            {children}
        </Card>
    )
}
