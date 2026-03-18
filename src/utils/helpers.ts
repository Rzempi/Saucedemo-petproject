// src/utils/helpers.ts

// ======================
// STRING HELPERS
// ======================

export function formatProductName(item: string) {
    return item.toLowerCase().replace(/ /g, '-');
}

// ======================
// RANDOM HELPERS
// ======================

export function getArrayOfBooleans(length: number): boolean[] {
    let resultArray: boolean[] = [];
    for (let i = 0; i < length; i++) {
        resultArray.push(Math.random() < 0.5);
    }
    return resultArray;
}