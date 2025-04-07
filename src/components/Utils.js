//https://stackoverflow.com/a/1584377

import { convertCSVUnitToRaw } from "./data/unitInfo";


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

export function basicImportUnits(unitsArr){
    if(unitsArr.length === 0){
        return;
    }
    let parsedUnits = [];
    let unitCount = 0;
    console.log(unitsArr);
    unitsArr.forEach((unit, unitId)=>{
            unit = convertCSVUnitToRaw(unit);
            unit["id"] = unitCount;
            unit["name"] = unit.unitName;
            if(!Object.keys(unit).includes("subName")){
                unit["subName"] = "";
            }
            unit["imgUrl"] = "";
            unit["tags"] = unit.tags.split(" ");
            unit["tags"].pop();
            unitCount += 1;
            parsedUnits = [...parsedUnits, unit];
    });
    return parsedUnits;
}

export function roundUsing(func, number, prec) {
    var tempnumber = number * Math.pow(10, prec);
    tempnumber = func(tempnumber);
    return tempnumber / Math.pow(10, prec);
}