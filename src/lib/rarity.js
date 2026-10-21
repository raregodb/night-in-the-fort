export const RARITIES = {
    common: {
        label: 'Обычный',
        color: 'var(--rarity-common)',
        className: 'rarity-common',
    },
    uncommon: {
        label: 'Необычный',
        color: 'var(--rarity-uncommon)',
        className: 'rarity-uncommon',
    },
    rare: {
        label: 'Редкий',
        color: 'var(--rarity-rare)',
        className: 'rarity-rare',
    },
    epic: {
        label: 'Эпический',
        color: 'var(--rarity-epic)',
        className: 'rarity-epic',
    },
    legendary: {
        label: 'Легендарный',
        color: 'var(--rarity-legendary)',
        className: 'rarity-legendary',
    },
    mythic: {
        label: 'Мифический',
        color: 'var(--rarity-mythic)',
        className: 'rarity-mythic',
    },
    icon: {
        label: 'Звёздная серия',
        color: 'var(--rarity-icon)',
        className: 'rarity-icon',
    },
}

const DEFAULT_RARITY = RARITIES.icon

export function getRarity(type) {
    if (!type) return DEFAULT_RARITY
    return RARITIES[String(type).trim().toLowerCase()] ?? DEFAULT_RARITY
}
