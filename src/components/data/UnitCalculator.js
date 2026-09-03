/*
    Core Unit cost calculator function.

    Unit Builder Rules v1.0

        Core Stat Equations, TAGS are elsewhere.

        these are distinct from the unitbuilder bindings to make them accessible anywhere.
*/

import { tags_checkExclusions, tagInfo } from "./tagInfo";

// Beta 1.5 - size is more of a meta stat that affects other calcs, its a but redundant to factor this as a cost unto-itself, but it's a nice 'rounding
// value for additional cost bulk.
export function calcSize(sizeVal){
    return sizeVal / 3; 
}

export function calcMove(moveVal, sizeVal){
    if(moveVal === 0){
        return 0;
    }
    return (moveVal + sizeVal) / 2;
}

export function calcEvade(sizeVal, evadeVal, moveVal){
    if(evadeVal === 0){
        return 0;
    }
    return ((sizeVal / 1.5) * evadeVal) + (moveVal / 2);
}

export function calcDMG_M(meleeDamageVal, moveVal){
    if(meleeDamageVal === 0){
        return 0;
    }
    return meleeDamageVal / 2 + (moveVal / 4) ;
}

export function calcDMG_R(rangeDamageVal){
    return rangeDamageVal * 2;
}

export function calcRange(moveVal, rangeVal, rangeDamageVal){
    if(rangeVal === 0){
        return 0;
    }
    if(rangeDamageVal === 0){
        return 0;
    }

    let trueRange = (moveVal + rangeVal) - 2.0; //credit back melee range
    let ratio = (trueRange / 18.0);
    let cost = (rangeDamageVal * 3.0) * ratio;

    return Math.max(0, cost);
}

export function calcArmor(armorVal, sizeVal){
    if(armorVal === 0){
        return 0;
    }

    let armorFrac = armorVal * 0.33;
    armorVal = armorVal - armorFrac;
    armorVal = armorVal * 2;
    armorVal = armorVal + armorFrac;
    
    return Math.max(0, (armorVal - (sizeVal / 2)));
}

function calcBaseCost(sizeCost, moveCost, evadeCost, meleeCost, rangeDamageCost, rangeCost, armorCost){ //, structCost){
    return sizeCost + moveCost + evadeCost +  meleeCost +  rangeDamageCost +  rangeCost +  armorCost;// +  structCost;
}


export function calculateUnitBaseCost(unitData){

    let sizeVal = unitData['size'];
    let moveVal = unitData['move'];
    let evadeVal =  unitData['evade'];
    let dmgMeleeVal = unitData['dmgMelee'];
    let dmgRangeVal = unitData['dmgRange'];
    let rangeVal = unitData['range'];
    let armorVal =unitData['armor'];

    let sizeCost = calcSize(sizeVal);
    let moveCost = calcMove(moveVal, sizeVal);
    let evadeCost = calcEvade(sizeVal, evadeVal, moveVal);
    let dmgMeleeCost = calcDMG_M(dmgMeleeVal, moveVal);
    let dmgRangeCost = calcDMG_R(dmgRangeVal);
    let rangeCost = calcRange(moveVal, rangeVal, dmgRangeVal);
    let armorCost = calcArmor(armorVal, sizeVal);

    //DEBUG ONLY
    /*console.log('-------------change-------------------');
    console.log('sizeCost= ' + sizeCost);
    console.log('moveCost= ' + moveCost);
    console.log('evadeCost= ' + evadeCost);
    console.log('dmgMeleeCost= ' + dmgMeleeCost);
    console.log('dmgRangeCost= ' + dmgRangeCost);
    console.log('rangeCost= ' + rangeCost);
    console.log('armorCost= ' + armorCost);
    */

    let pointsVal = calcBaseCost(sizeCost, moveCost, evadeCost, dmgMeleeCost, dmgRangeCost, rangeCost, armorCost);
    pointsVal = Math.round((pointsVal + Number.EPSILON) * 100) / 100;
    
    unitData['points'] = pointsVal;

    return unitData;
}

export function calculateUnitTagCost(unitData){
    let tagCost = 0;
    let removeTag = [];
    unitData['tags'].forEach(tagAbrv => {
        let tag = tagInfo['data'].find(item => item.abrv === tagAbrv);
        try{
            tagCost = tagCost + tag.func(unitData);
        }
        catch(e){
            console.log("ERR on tag="+tagAbrv);
            console.log("ERR on tag="+tag);
            console.log(e);
        }
    });

    removeTag.forEach(tag => {
        unitData['tags'].filter(rem => rem === tag);
    })

    let tagTotal = Math.round((tagCost + Number.EPSILON) * 100) / 100;
    unitData['tagTotal'] = tagTotal;
    unitData['completeTotal'] =  Math.round(((unitData['points'] + tagTotal) + Number.EPSILON) * 100) / 100
    
    return unitData;
}
