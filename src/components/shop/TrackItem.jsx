import {Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.jsx";
import {Button} from "@/components/ui/button.jsx";
import {getRarity} from "@/lib/rarity";
import {Badge} from "@/components/ui/badge.jsx";

export default function TrackItem(props) {
    const {item} = props;

    if (!item || item.name === "null") return null;

    const rarity = getRarity(item.rarity?.value);

    return (
        <Card className="relative mx-auto w-full max-w-sm pt-0">
            <div className="absolute inset-0 z-30 aspect-video " />
            {item.albumArt ? (
                <img
                    src={`${item.albumArt}`}
                    alt={`${item.title} Cover`}
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

                </CardAction>
                <CardTitle>{item.title}</CardTitle>
                <CardDescription>
                    <div className={"flex flex-col justify-between items-start gap-1"}>
                        {item.artist}
                        <div className={"flex flex-row gap-1 justify-start items-center"}>
                            <Badge className={"bg-primary/60"}>{item.bpm} BPM</Badge>
                            <Badge className={"bg-primary/60"}>{item.duration} duration</Badge>
                        </div>
                    </div>

                </CardDescription>
            </CardHeader>
            <CardFooter>
                <Button className="w-full mt-auto">View Event</Button>
            </CardFooter>
        </Card>
    )
}