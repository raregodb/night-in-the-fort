import {Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.jsx";
import {Button} from "@/components/ui/button.jsx";
import RarityBadge from "@/components/RarityBadge.jsx";
import {getRarity} from "@/lib/rarity";
import {useMediaQuery} from "@/hooks/use-media-query";

export default function BrItem(props) {
    const {item} = props;

    const smallSrc = item?.images?.smallIcon;
    const largeSrc = item?.images?.icon;

    const isDesktop = useMediaQuery("(min-width: 640px)");
    const iconSrc = (isDesktop ? largeSrc : smallSrc) ?? largeSrc ?? smallSrc;

    if (!item || item.name === "null") return null;

    const rarity = getRarity(item.rarity?.value);

    return (
        <Card className="relative mx-auto flex h-full w-full max-w-sm flex-col">
            {iconSrc ? (
                <img
                    src={iconSrc}
                    alt={`${item.name} Icon`}
                    className="relative z-20 aspect-square w-full object-cover"
                    style={{backgroundColor: rarity.color}}
                />
            ) : (
                <div className="relative z-20 flex aspect-square w-full items-center justify-center" style={{backgroundColor: rarity.color}}>
                    <span className={"text-2xl"}>Oops! No Icon</span>
                </div>
            )}

            <CardHeader>
                <CardAction>
                    <RarityBadge type={item.rarity?.value} />
                </CardAction>
                <CardTitle>{item.name}</CardTitle>
                <CardDescription>
                    {item.description}
                </CardDescription>
            </CardHeader>
            <CardFooter>
                <Button className="w-full">View Event</Button>
            </CardFooter>
        </Card>
    )
}