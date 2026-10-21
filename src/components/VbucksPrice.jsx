import {formatVbucks} from "@/lib/shop.js";
import {cn} from "@/lib/utils.js";

const VBUCKS_ICON = "https://fortnite-api.com/images/vbuck.png";

export default function VbucksPrice({finalPrice, regularPrice, className}) {
    const onSale = regularPrice > finalPrice;

    return (
        <span className={cn("inline-flex items-center gap-1.5 font-semibold", className)}>
            <img src={VBUCKS_ICON} alt="V-Bucks" className="size-[1.1em]" />
            {formatVbucks(finalPrice)}
            {onSale && (
                <s className="text-[0.8em] font-normal text-muted-foreground">{formatVbucks(regularPrice)}</s>
            )}
        </span>
    )
}
