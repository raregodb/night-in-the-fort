import {ExternalLink} from "lucide-react";
import {buttonVariants} from "@/components/ui/button.jsx";
import {FORTNITE_SHOP_URL} from "@/lib/shop.js";
import {cn} from "@/lib/utils.js";

export default function BuyOnFortniteLink({children = "Купить на fortnite.com", variant = "outline", className}) {
    return (
        <a href={FORTNITE_SHOP_URL} target="_blank" rel="noopener noreferrer"
           className={cn(buttonVariants({variant, size: "lg"}), className)}>
            {children}
            <ExternalLink />
        </a>
    )
}
