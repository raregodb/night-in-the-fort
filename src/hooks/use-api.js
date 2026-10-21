import {useEffect, useEffectEvent, useState} from "react";
import {getCacheExpiry, getShop, SHOP_PATH} from "@/lib/api.js";

export function useApi(fetcher, deps = []) {
    const [state, setState] = useState({data: null, error: null, key: null});
    const key = JSON.stringify(deps);
    const load = useEffectEvent(() => fetcher());

    useEffect(() => {
        let ignore = false;
        load().then(
            (data) => !ignore && setState({data, error: null, key}),
            (error) => !ignore && setState({data: null, error, key}),
        );
        return () => {
            ignore = true;
        };
    }, [key]);

    const isCurrent = state.key === key;
    return {
        data: isCurrent ? state.data : null,
        error: isCurrent ? state.error : null,
        loading: !isCurrent,
    };
}

const RETRY_MS = 60 * 1000;

export function useShop() {
    const [generation, setGeneration] = useState(0);
    const [lastShop, setLastShop] = useState(null);
    const result = useApi(getShop, [generation]);

    if (result.data && result.data !== lastShop) setLastShop(result.data);

    useEffect(() => {
        if (!lastShop) return;
        const expiresAt = getCacheExpiry(SHOP_PATH) ?? Date.now() + RETRY_MS;
        const timer = setTimeout(() => setGeneration((g) => g + 1), Math.max(expiresAt - Date.now(), 1000));
        return () => clearTimeout(timer);
    }, [lastShop, result.error]);

    return {
        data: result.data ?? lastShop,
        error: lastShop ? null : result.error,
        loading: result.loading && !lastShop,
    };
}
