const apiUrl = import.meta.env.VITE_PUBLIC_FORTNITE_URL;
const API_LANGUAGE = "ru";

const ROTATION_GRACE_MS = 60 * 1000;

const cache = new Map();

export function getNextRotation(now = Date.now()) {
    const next = new Date(now);
    next.setUTCHours(24, 0, 0, 0);
    return next.getTime() + ROTATION_GRACE_MS;
}

function getShopExpiry(shop, now = Date.now()) {
    const nextRotation = getNextRotation(now);
    const outDates = (shop?.entries ?? [])
        .map((entry) => Date.parse(entry.outDate))
        .filter((time) => time > now);
    if (!outDates.length) return nextRotation;
    return Math.min(nextRotation, Math.min(...outDates) + ROTATION_GRACE_MS);
}

export class ApiError extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
    }
}

async function fetchJson(path) {
    const url = new URL(path, apiUrl);
    url.searchParams.set("language", API_LANGUAGE);

    const response = await fetch(url);
    const json = await response.json().catch(() => null);

    if (!response.ok || !json || json.status !== 200) {
        const status = json?.status ?? response.status;
        throw new ApiError(json?.error ?? `Ошибка запроса (${status})`, status);
    }
    return json.data;
}

function request(path, getExpiry = () => getNextRotation()) {
    const cached = cache.get(path);
    if (cached && (cached.expiresAt === null || cached.expiresAt > Date.now())) return cached.promise;

    const record = {expiresAt: null, promise: null};
    record.promise = fetchJson(path).then(
        (data) => {
            record.expiresAt = getExpiry(data);
            return data;
        },
        (error) => {
            if (cache.get(path) === record) cache.delete(path);
            throw error;
        },
    );
    cache.set(path, record);
    return record.promise;
}

export function getCacheExpiry(path) {
    return cache.get(path)?.expiresAt ?? null;
}

export const SHOP_PATH = "shop";

export const getRecentShopItems = () => request("cosmetics/new");

export const getAllCosmetics = () => request("cosmetics/br");

export const getBrCosmeticById = (id) => request(`cosmetics/br/${encodeURIComponent(id)}`);

export const getShop = () => request(SHOP_PATH, getShopExpiry);
