import {useEffect, useState} from "react";
import {getShop} from "@/lib/api.js";
import ShopItem from "@/components/shop/ShopItem.jsx";

export default function ShopList () {
    // const [items, setItems] = useState(null);
    const [shop, setShop] = useState(null);
    const [itemsBySize, setItemsBySize] = useState({});

    useEffect(() => {
        try {
            getShop().then((data) => {
                setShop(data.data);
            });
        }
        catch (e) {
            console.error(e);
        }
    }, []);

    useEffect(() => {
        if (!shop) return

        const grouped = Object.values(shop.entries).reduce((acc, entry) => {
            if (!acc[entry.tileSize]) acc[entry.tileSize] = [];
            acc[entry.tileSize].push(entry);
            return acc;
        }, {});

        setItemsBySize(grouped);
    }, [shop]);

    return (
        <div className="flex flex-col h-full w-full overflow-auto gap-2 justify-between items-center">
            {Object.keys(itemsBySize).flatMap((key) =>
                itemsBySize[key]
                    .sort((a, b) => b.sortPriority - a.sortPriority)
                    .map((entry, index) => (
                        <ShopItem key={entry.offerId ?? `${key}-${index}`} entry={entry} />
                    ))
            )}
        </div>
    );
}