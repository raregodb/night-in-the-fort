import {Link} from "react-router-dom";
import {Card, CardFooter, CardHeader, CardTitle, CardDescription} from "@/components/ui/card.jsx";
import {Badge} from "@/components/ui/badge.jsx";
import VbucksPrice from "@/components/VbucksPrice.jsx";
import CartButton from "@/components/CartButton.jsx";
import {getColors} from "@/lib/utils.js";
import {getOfferImage, getOfferName, getOfferType, offerPath} from "@/lib/shop.js";

export default function OfferCard({entry}) {
    const name = getOfferName(entry);
    const image = getOfferImage(entry);
    const background = entry.colors?.color1 ? getColors(entry.colors) : undefined;

    return (
        <Card className="relative mx-auto flex h-full w-full max-w-sm flex-col pt-0">
            <Link to={offerPath(entry.offerId)} className="flex flex-1 flex-col gap-2">
                <div className="relative aspect-square w-full overflow-hidden rounded-t-[min(var(--radius-4xl),24px)] bg-muted"
                     style={{background}}>
                    {image && (
                        <img src={image} alt={name} loading="lazy" decoding="async"
                             className="h-full w-full object-contain" />
                    )}
                    {entry.banner?.value && (
                        <Badge className="absolute top-2 left-2">{entry.banner.value}</Badge>
                    )}
                </div>
                <CardHeader>
                    <CardTitle>{name}</CardTitle>
                    <CardDescription>{getOfferType(entry)}</CardDescription>
                </CardHeader>
            </Link>
            <CardFooter className="justify-between gap-2">
                <VbucksPrice finalPrice={entry.finalPrice} regularPrice={entry.regularPrice} />
                <CartButton entry={entry} compact />
            </CardFooter>
        </Card>
    )
}
