import { getRarity } from '@/lib/rarity'

export default function RarityBadge({ type, label, className = '' }) {
    const rarity = getRarity(type)

    return (
        <span
            className={`inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-xs font-semibold text-white ${className}`}
            style={{ backgroundColor: rarity.color }}
        >
            {label && label !== 'null' ? label : rarity.label}
        </span>
    )
}
