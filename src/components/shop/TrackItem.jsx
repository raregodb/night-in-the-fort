import {Card, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.jsx";
import {Badge} from "@/components/ui/badge.jsx";
import ItemImage from "@/components/ItemImage.jsx";
import {formatDuration} from "@/lib/shop.js";

export default function TrackItem(props) {
    const {item, children} = props;

    if (!item || item.title === "null") return null;

    return (
        <Card className="relative mx-auto flex h-full w-full max-w-sm flex-col pt-0">
            <ItemImage src={item.albumArt} alt={`${item.title} — обложка`} />

            <CardHeader>
                <CardTitle>{item.title}</CardTitle>
                <CardDescription>
                    <div className="flex flex-col items-start justify-between gap-1">
                        {item.artist}{item.releaseYear ? ` · ${item.releaseYear}` : ""}
                        <div className="flex flex-row items-center justify-start gap-1">
                            {item.bpm && <Badge className="bg-primary/60">{item.bpm} BPM</Badge>}
                            {item.duration && <Badge className="bg-primary/60">{formatDuration(item.duration)}</Badge>}
                        </div>
                    </div>
                </CardDescription>
            </CardHeader>
            {children}
        </Card>
    )
}
