import {createContext, useContext} from "react";
import {useLocalStorageState} from "@/hooks/use-local-storage-state.js";
import {toWishlistItem} from "@/lib/shop.js";

const WishlistContext = createContext(undefined);
const EMPTY = [];

export function WishlistProvider({children, storageKey = "nif-wishlist"}) {
    const [items, setItems] = useLocalStorageState(storageKey, EMPTY);

    const has = (id) => items.some((item) => item.id === id);
    const remove = (id) => setItems((prev) => prev.filter((item) => item.id !== id));

    const value = {
        items,
        count: items.length,
        has,
        remove,
        toggle: (item) => {
            if (has(item.id)) remove(item.id);
            else setItems((prev) => [toWishlistItem(item), ...prev]);
        },
        clear: () => setItems(EMPTY),
    };

    return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export const useWishlist = () => {
    const context = useContext(WishlistContext);
    if (context === undefined) throw new Error("useWishlist must be used within a WishlistProvider");
    return context;
};
