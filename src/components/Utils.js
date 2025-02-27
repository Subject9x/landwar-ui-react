

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

export function utilCheckMatchUnit(fromUnit, toUnit){
    for(const key of Object.keys(fromUnit)){
        if(fromUnit[key] === toUnit[key]){
            return true;
        }
    }
}

export function parseCSVFileInput(csvObj){
    var lines = csvObj.split('\n');
    var result = [];
    var headers = lines[0].split(',');

    for (var i = 1; i < lines.length; i++) {
        var obj = {};
        var currentline = lines[i].split(',');
        if(lines[i].length > 0){
            for (var j = 0; j < headers.length; j++) {
                obj[headers[j]] = currentline[j];
            }
            result.push(obj);
        }
    }
    return result;
}