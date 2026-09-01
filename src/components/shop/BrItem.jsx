import {Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.jsx";
import {Button} from "@/components/ui/button.jsx";
import RarityBadge from "@/components/RarityBadge.jsx";
import {getRarity} from "@/lib/rarity";
import {useMediaQuery} from "@/hooks/use-media-query";
import {Link} from "react-router-dom";

export default function BrItem(props) {
    const {item, type} = props;

    const smallSrc = item?.images?.smallIcon;
    const largeSrc = item?.images?.icon;

    const isDesktop = useMediaQuery("(min-width: 640px)");
    const iconSrc = (isDesktop ? largeSrc : smallSrc) ?? largeSrc ?? smallSrc;

    if (!item || item.name === "null") return null;

    const rarity = getRarity(item.rarity?.value);

    if (type === "icon") {
        return (
            <Link to={`/cosmetics/br/${item.id}`}>
                <div className={`h-fit w-fit gap-0.5 relative mx-auto flex max-w-sm flex-col`}>
                    {iconSrc ? (
                        <img
                            src={smallSrc}
                            alt={`${item.name} Icon`}
                            loading={"lazy"}
                            decoding={"async"}
                            className={`h-[100px] w-[100px] relative z-20 aspect-square object-cover`}
                            style={{backgroundColor: rarity.color}}
                        />
                    ) : (
                        <div className={`h-[100px] w-[100px] relative z-20 flex aspect-square items-center justify-center`}
                             style={{backgroundColor: rarity.color}}>
                            <span className={"text-2xl"}>Oops! No Icon</span>
                        </div>
                    )}
                </div>
            </Link>
        )
    }

    return (
        <Link to={`/cosmetics/br/${item.id}`}>
            <Card className={`${type === "s" ? "h-fit w-fit gap-0.5" : "h-full w-full"} relative mx-auto flex max-w-sm flex-col`}>
                {iconSrc ? (
                    <img
                        src={type === "s" ? smallSrc : iconSrc}
                        alt={`${item.name} Icon`}
                        loading={"lazy"}
                        decoding={"async"}
                        className={`${type === "s" ? "h-[100px] w-[100px]" : "h-full w-full"} relative z-20 aspect-square object-cover`}
                        style={{backgroundColor: rarity.color}}
                    />
                ) : (
                    <div className={`${type === "s" ? "h-[100px] w-[100px]" : "h-full w-full"} relative z-20 flex aspect-square items-center justify-center`}
                         style={{backgroundColor: rarity.color}}>
                        <span className={"text-2xl"}>Oops! No Icon</span>
                    </div>
                )}

                <CardHeader className={"w-full h-full p-0"}>
                    {type !== "s" &&
                        <CardAction>
                            <RarityBadge type={item.rarity?.value} />
                        </CardAction>
                    }

                    <CardTitle>{item.name}</CardTitle>
                    {type !== "s" && <CardDescription>
                        {item.description}
                    </CardDescription>
                    }

                </CardHeader>
                {type !== "s" && <CardFooter className={"w-full h-full p-0"}>
                    <Button className="w-full">View Event</Button>
                </CardFooter>}

            </Card>
        </Link>
    )
}