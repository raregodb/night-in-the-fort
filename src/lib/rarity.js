export const RARITIES = {
    common: {
        label: 'Common',
        color: 'var(--rarity-common)',
        className: 'rarity-common',
    },
    uncommon: {
        label: 'Uncommon',
        color: 'var(--rarity-uncommon)',
        className: 'rarity-uncommon',
    },
    rare: {
        label: 'Rare',
        color: 'var(--rarity-rare)',
        className: 'rarity-rare',
    },
    epic: {
        label: 'Epic',
        color: 'var(--rarity-epic)',
        className: 'rarity-epic',
    },
    legendary: {
        label: 'Legendary',
        color: 'var(--rarity-legendary)',
        className: 'rarity-legendary',
    },
    mythic: {
        label: 'Mythic',
        color: 'var(--rarity-mythic)',
        className: 'rarity-mythic',
    },
    icon: {
        label: 'Icon',
        color: 'var(--rarity-icon)',
        className: 'rarity-icon',
    },
}

const DEFAULT_RARITY = RARITIES.icon

export function getRarity(type) {
    if (!type) return DEFAULT_RARITY
    return RARITIES[String(type).trim().toLowerCase()] ?? DEFAULT_RARITY
}
