const selectClassName = "h-10 rounded-xl border border-input bg-background px-3";

export default function Search({query, rarity, type, rarities, types, onChange, total}) {
    return (
        <div className="flex w-full flex-col gap-2 md:flex-row md:items-center">
            <input
                type="search"
                placeholder="Поиск по названию..."
                aria-label="Поиск по названию"
                className={`${selectClassName} flex-1`}
                value={query}
                onChange={(e) => onChange("q", e.target.value)}
            />
            <select aria-label="Редкость" className={selectClassName} value={rarity} onChange={(e) => onChange("rarity", e.target.value)}>
                <option value="">Любая редкость</option>
                {rarities.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
            </select>
            <select aria-label="Тип" className={selectClassName} value={type} onChange={(e) => onChange("type", e.target.value)}>
                <option value="">Любой тип</option>
                {types.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
            </select>
            {total !== undefined && <span className="shrink-0 text-muted-foreground">Найдено: {total}</span>}
        </div>
    )
}
