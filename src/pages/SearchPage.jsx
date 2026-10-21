import CosmeticsList from "@/components/cosmetics/CosmeticsList.jsx";
import {useDeferredValue, useMemo} from "react";
import {useSearchParams} from "react-router-dom";
import {getAllCosmetics} from "@/lib/api.js";
import Search from "@/components/cosmetics/Search.jsx";
import {ErrorMessage} from "@/components/Status.jsx";
import {useApi} from "@/hooks/use-api.js";

function collectOptions(items, field) {
    const labels = new Map();
    for (const item of items) {
        const {value, displayValue} = item[field] ?? {};
        if (!value) continue;
        if (!labels.has(value)) labels.set(value, new Map());
        const counts = labels.get(value);
        if (displayValue && displayValue !== "null") counts.set(displayValue, (counts.get(displayValue) ?? 0) + 1);
    }
    return [...labels].map(([value, counts]) => ({
        value,
        label: [...counts].sort((a, b) => b[1] - a[1])[0]?.[0] ?? value,
    })).sort((a, b) => a.label.localeCompare(b.label, "ru"));
}

export default function SearchPage () {
    const {data: items, error} = useApi(getAllCosmetics);
    const [params, setParams] = useSearchParams();

    const query = params.get("q") ?? "";
    const rarity = params.get("rarity") ?? "";
    const type = params.get("type") ?? "";
    const deferredQuery = useDeferredValue(query.trim().toLowerCase());

    const rarities = useMemo(() => items ? collectOptions(items, "rarity") : [], [items]);
    const types = useMemo(() => items ? collectOptions(items, "type") : [], [items]);

    const filtered = useMemo(() => {
        if (!items) return null;
        return items.filter((item) =>
            item.name !== "null"
            && (!rarity || item.rarity?.value === rarity)
            && (!type || item.type?.value === type)
            && (!deferredQuery || item.name?.toLowerCase().includes(deferredQuery))
        );
    }, [items, rarity, type, deferredQuery]);

    const handleChange = (key, value) => {
        setParams((prev) => {
            const next = new URLSearchParams(prev);
            if (value) next.set(key, value);
            else next.delete(key);
            return next;
        }, {replace: true});
    };

    return (
        <div className="flex w-full max-w-7xl flex-col gap-4">
            <Search
                query={query}
                rarity={rarity}
                type={type}
                rarities={rarities}
                types={types}
                total={filtered?.length}
                onChange={handleChange}
            />
            {error ? <ErrorMessage error={error} /> : <CosmeticsList items={filtered}/>}
        </div>
    )
}
