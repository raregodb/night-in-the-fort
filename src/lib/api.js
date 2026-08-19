const apiUrl = import.meta.env.VITE_PUBLIC_FORTNITE_URL;

export const getShopItems = async () => {
    const response = await fetch(`${apiUrl}cosmetics/new`);
    return await response.json();
}