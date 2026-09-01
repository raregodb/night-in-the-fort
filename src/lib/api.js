const apiUrl = import.meta.env.VITE_PUBLIC_FORTNITE_URL;

export const getRecentShopItems = async () => {
    const response = await fetch(`${apiUrl}cosmetics/new`);
    return await response.json();
}

export const getAllCosmetics = async () => {
    const response = await fetch(`${apiUrl}cosmetics/br`);
    return await response.json();
}

export const getBrCosmeticById = async (id) => {
    const response = await fetch(`${apiUrl}cosmetics/br/${id}`, {cache: "force-cache"});
    return await response.json();
}

export const getShop = async () => {
    const response = await fetch(`${apiUrl}shop`);
    return await response.json();
}