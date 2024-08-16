

//https://stackoverflow.com/a/1584377
export const mergePrimitiveArrs = (a, b, predicate = (a, b) => a === b) => {
    const c = [...a]; // copy to avoid side effects
    // add all items from B to copy C if they're not already present
    b.forEach((bItem) => (c.some((cItem) => predicate(bItem, cItem)) ? null : c.push(bItem)))
    return c;
};

export const numRound2Decimal = (numVal) => {

    return Math.round((numVal + Number.EPSILON) * 100) / 100;

};