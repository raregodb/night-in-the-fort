import {useCallback, useEffect, useState} from "react";

function read(key, fallback) {
    try {
        const raw = localStorage.getItem(key);
        return raw === null ? fallback : JSON.parse(raw);
    } catch {
        return fallback;
    }
}

export function useLocalStorageState(key, initialValue) {
    const [value, setValue] = useState(() => read(key, initialValue));

    const update = useCallback((next) => {
        setValue((prev) => {
            const resolved = typeof next === "function" ? next(prev) : next;
            try {
                localStorage.setItem(key, JSON.stringify(resolved));
            } catch (error) {
                console.warn(`Не удалось сохранить ${key}`, error);
            }
            return resolved;
        });
    }, [key]);

    useEffect(() => {
        const onStorage = (event) => {
            if (event.key === key) setValue(read(key, initialValue));
        };
        window.addEventListener("storage", onStorage);
        return () => window.removeEventListener("storage", onStorage);
    }, [key, initialValue]);

    return [value, update];
}
