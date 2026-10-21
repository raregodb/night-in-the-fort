import {Heart} from "lucide-react";
import {Button} from "@/components/ui/button.jsx";
import {useWishlist} from "@/components/wishlist-provider.jsx";
import {cn} from "@/lib/utils.js";

export default function WishlistButton({item, withLabel = false, className, ...props}) {
    const wishlist = useWishlist();
    const active = wishlist.has(item.id);
    const label = active ? "Убрать из вишлиста" : "В вишлист";

    return (
        <Button
            variant={withLabel ? "outline" : "secondary"}
            size={withLabel ? "lg" : "icon"}
            aria-pressed={active}
            aria-label={label}
            title={label}
            onClick={() => wishlist.toggle(item)}
            className={className}
            {...props}
        >
            <Heart className={cn(active && "fill-red-500 text-red-500")} />
            {withLabel && label}
        </Button>
    )
}
