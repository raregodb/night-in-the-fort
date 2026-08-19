import {Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.jsx";
import {getRarity} from "@/lib/rarity";
import {useMediaQuery} from "@/hooks/use-media-query.js";
import {Button} from "@/components/ui/button.jsx";
import RarityBadge from "@/components/RarityBadge.jsx";

export default function InstrumentItem(props) {
    const {item} = props;

    if (!item || item.name === "null") return null;

    const smallSrc = item?.images?.small;
    const largeSrc = item?.images?.large;

    const isDesktop = useMediaQuery("(min-width: 640px)");
    const iconSrc = (isDesktop ? largeSrc : smallSrc) ?? largeSrc ?? smallSrc;

    const rarity = getRarity(item.rarity?.value);

    return (
        <Card className="relative mx-auto w-full max-w-sm pt-0">
            {iconSrc ? (
                <img
                    src={`${iconSrc}`}
                    alt={`${item.name} Icon`}
                    className="relative z-20 aspect-square w-full object-cover"
                    style={{backgroundColor: rarity.color}}
                />
            ) : (
                <div className="relative z-20 flex aspect-square w-full items-center justify-center" style={{backgroundColor: rarity.color}} >
                    <span className={"text-2xl"}>Oops! No Icon</span>
                </div>
            )}

            <CardHeader>
                <CardAction>
                    <RarityBadge type={rarity.label} />
                </CardAction>
                <CardTitle>{item.name}</CardTitle>
                <CardDescription>
                    {item.description}
                </CardDescription>
            </CardHeader>
            <CardFooter>
                <Button className="w-full mt-auto">View Event</Button>
            </CardFooter>
        </Card>
    )
}