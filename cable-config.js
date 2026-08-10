// cable-config.js
// Shared configuration for the 3 cable sets.
//
// End A source indexes:
// 0 = End A Core 1
// 1 = End A Core 2
// 2 = End A Core 3
// 3 = Neutral
//
// endBMap maps:
// B Core A, B Core B, B Core C, B Core D
// to the hidden End A source conductor.

export const STORAGE_PREFIX = "cablePhaseSession_";

export const CABLE_SETS = {

    1: {
        label: "Cable Set 1",
        faultCore: null,

        // B A -> A Core 2
        // B B -> Neutral
        // B C -> A Core 1
        // B D -> A Core 3
        endBMap: [1, 3, 0, 2]
    },

    2: {
        label: "Cable Set 2",
        faultCore: null,

        // B A -> A Core 3
        // B B -> A Core 1
        // B C -> Neutral
        // B D -> A Core 2
        endBMap: [2, 0, 3, 1]
    },

    3: {
        label: "Cable Set 3",

        // End A Core 2 is broken.
        faultCore: 1,

        // B A -> Neutral
        // B B -> A Core 3
        // B C -> A Core 2 (broken)
        // B D -> A Core 1
        endBMap: [3, 2, 1, 0]
    }

};


export function getCableSetFromUrl() {

    const params =
        new URLSearchParams(
            window.location.search
        );

    const value =
        Number(
            params.get("set")
        ) || 1;

    if (
        value < 1 ||
        value > 3
    ) {
        return 1;
    }

    return value;
}


export function getStorageKey(
    cableSet
) {

    return (
        STORAGE_PREFIX
        +
        cableSet
    );
}
