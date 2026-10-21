import {getRarity} from "@/lib/rarity";
import {cn} from "@/lib/utils.js";

export default function ItemImage({src, smallSrc, alt, rarity, className, sizes = "(min-width: 640px) 25vw, 50vw"}) {
    const background = getRarity(rarity).color;
    const main = src ?? smallSrc;

    if (!main) {
        return (
            <div className={cn("flex aspect-square w-full items-center justify-center text-center text-white", className)}
                 style={{backgroundColor: background}}>
                <span className="text-lg">Нет изображения</span>
            </div>
        )
    }

    return (
        <img
            src={main}
            srcSet={src && smallSrc ? `${smallSrc} 128w, ${src} 512w` : undefined}
            sizes={src && smallSrc ? sizes : undefined}
            alt={alt}
            loading="lazy"
            decoding="async"
            className={cn("aspect-square w-full object-cover ", className)}
            style={{backgroundColor: background}}
        />
    )
}
