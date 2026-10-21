import {createContext, useContext} from "react";
import {useLocalStorageState} from "@/hooks/use-local-storage-state.js";

const CartContext = createContext(undefined);
const EMPTY = [];

export function CartProvider({children, storageKey = "nif-cart"}) {
    const [items, setItems] = useLocalStorageState(storageKey, EMPTY);

    const value = {
        items,
        count: items.length,
        has: (offerId) => items.some((item) => item.offerId === offerId),
        add: (item) => setItems((prev) => prev.some((i) => i.offerId === item.offerId) ? prev : [...prev, item]),
        remove: (offerId) => setItems((prev) => prev.filter((item) => item.offerId !== offerId)),
        clear: () => setItems(EMPTY),
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) throw new Error("useCart must be used within a CartProvider");
    return context;
};
