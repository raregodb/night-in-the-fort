export const FORTNITE_SHOP_URL = "https://www.fortnite.com/item-shop";

const vbucksFormat = new Intl.NumberFormat("ru-RU");

export function formatVbucks(value) {
    return vbucksFormat.format(value ?? 0);
}

export function offerPath(offerId) {
    return `/shop/${encodeURIComponent(offerId)}`;
}

export function getOfferItems(entry) {
    return {
        br: entry?.brItems ?? [],
        tracks: entry?.tracks ?? [],
        instruments: entry?.instruments ?? [],
        cars: entry?.cars ?? [],
    };
}

export function getOfferName(entry) {
    if (!entry) return "";
    const {br, tracks, instruments, cars} = getOfferItems(entry);
    return entry.bundle?.name
        ?? br[0]?.name
        ?? tracks[0]?.title
        ?? instruments[0]?.name
        ?? cars[0]?.name
        ?? entry.devName;
}

export function getOfferImage(entry) {
    if (!entry) return null;
    const {br, tracks, instruments, cars} = getOfferItems(entry);
    return entry.newDisplayAsset?.renderImages?.[0]?.image
        ?? entry.bundle?.image
        ?? br[0]?.images?.featured
        ?? br[0]?.images?.icon
        ?? tracks[0]?.albumArt
        ?? instruments[0]?.images?.large
        ?? cars[0]?.images?.large
        ?? null;
}

export function getOfferType(entry) {
    const {br, tracks, instruments, cars} = getOfferItems(entry);
    if (entry?.bundle) return "Набор";
    return br[0]?.type?.displayValue
        ?? (tracks.length ? "Трек" : null)
        ?? (instruments.length ? "Инструмент" : null)
        ?? (cars.length ? "Машина" : null);
}

export function isOnSale(entry) {
    return entry?.regularPrice > entry?.finalPrice;
}

export function toCartItem(entry) {
    return {
        offerId: entry.offerId,
        name: getOfferName(entry),
        image: getOfferImage(entry),
        type: getOfferType(entry),
        finalPrice: entry.finalPrice,
        regularPrice: entry.regularPrice,
        outDate: entry.outDate,
    };
}

export function findOffer(shop, offerId) {
    return shop?.entries?.find((entry) => entry.offerId === offerId) ?? null;
}

export function findOffersWithCosmetic(shop, cosmeticId) {
    if (!shop?.entries || !cosmeticId) return [];
    const offers = shop.entries.filter((entry) => {
        const {br, tracks, instruments, cars} = getOfferItems(entry);
        return [...br, ...tracks, ...instruments, ...cars].some((item) => item.id === cosmeticId);
    });
    return offers.sort((a, b) => Number(Boolean(a.bundle)) - Number(Boolean(b.bundle)));
}

export function groupShopSections(shop) {
    const sections = new Map();
    for (const entry of shop?.entries ?? []) {
        const id = entry.layout?.id ?? entry.layoutId ?? "other";
        if (!sections.has(id)) {
            sections.set(id, {
                id,
                name: entry.layout?.name ?? "Другое",
                index: entry.layout?.index ?? Number.MAX_SAFE_INTEGER,
                rank: entry.layout?.rank ?? 0,
                entries: [],
            });
        }
        sections.get(id).entries.push(entry);
    }
    return [...sections.values()]
        .sort((a, b) => a.index - b.index || b.rank - a.rank)
        .map((section) => ({
            ...section,
            entries: section.entries.sort((a, b) => b.sortPriority - a.sortPriority),
        }));
}

export function formatDate(value) {
    if (!value) return "";
    return new Date(value).toLocaleDateString("ru-RU", {day: "numeric", month: "long"});
}

export function formatDuration(seconds) {
    if (!Number.isFinite(seconds)) return "";
    const minutes = Math.floor(seconds / 60);
    return `${minutes}:${String(seconds % 60).padStart(2, "0")}`;
}

export function toWishlistItem(item) {
    return {
        id: item.id,
        name: item.name,
        description: item.description,
        images: {smallIcon: item.images?.smallIcon, icon: item.images?.icon},
        rarity: item.rarity,
        type: item.type,
    };
}
