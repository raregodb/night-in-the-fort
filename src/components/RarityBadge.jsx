import { getRarity } from '@/lib/rarity'

/**
 * @param {{ type: string, className?: string }} props - type — код редкости с бэка ("legendary" и т.п.)
 */
export default function RarityBadge({ type, className = '' }) {
    const rarity = getRarity(type)

    return (
        <span
            className={`inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-xs font-semibold text-white ${className}`}
            style={{ backgroundColor: rarity.color }}
        >
            {rarity.label}
        </span>
    )
}
