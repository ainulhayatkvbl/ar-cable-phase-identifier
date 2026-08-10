// cable-config.js
// Shared configuration for the 3 cable sets.

export const STORAGE_PREFIX = "cablePhaseSession_";

export const CABLE_SETS = {
    1: {
        label: "Cable Set 1",
        faultCore: null
    },

    2: {
        label: "Cable Set 2",
        faultCore: null
    },

    3: {
        label: "Cable Set 3",
        // 0 = Core 1, 1 = Core 2, 2 = Core 3
        faultCore: 1
    }
};

export function getCableSetFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const value = Number(params.get("set")) || 1;

    if (value < 1 || value > 3) {
        return 1;
    }

    return value;
}

export function getStorageKey(cableSet) {
    return STORAGE_PREFIX + cableSet;
}
