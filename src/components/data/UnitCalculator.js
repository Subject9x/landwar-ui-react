/*
    Core Unit cost calculator function.

    Unit Builder Rules v0.8

        Core Stat Equations, TAGS are elsewhere.

        these are distinct from the unitbuilder bindings to make them accessible anywhere.
*/

import { tags_checkExclusions } from "./tagInfo";

// Beta 1.5 - size is more of a meta stat that affects other calcs, its a but redundant to factor this as a cost unto-itself, but it's a nice 'rounding
// value for additional cost bulk.
export function calcSize(sizeVal){
    // return sizeVal * 2; // old, pre 1.3
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
    // return (meleeDamageVal * 2) + (moveVal / 4) ;
    return meleeDamageVal / 2 + (moveVal / 4) ;
}

export function calcDMG_R(rangeDamageVal){
    return rangeDamageVal * 4;
}

export function calcRange(moveVal, rangeVal, rangeDamageVal){
    if(rangeVal === 0){
        return 0;
    }
    if(rangeDamageVal === 0){
        return 0;
    }
    return Math.max(0, (moveVal / 2) + ((rangeVal / 16) * rangeVal) + (rangeDamageVal / 2));
}

export function calcArmor(armorVal, sizeVal){
    if(armorVal === 0){
        return 0;
    }

    let armorFrac = armorVal * 0.33;
    armorVal = armorVal - armorFrac;
    
    armorFrac = armorFrac * 2;
    armorVal = armorVal * 4;

    armorVal = armorVal + armorFrac;
    
    return Math.max(0, (armorVal - sizeVal / 2));
}

//function uc_calc_Structure(structVal,sizeVal){
//    return Math.max(0, structVal - sizeVal);
//}

function calcBaseCost(sizeCost, moveCost, evadeCost, meleeCost, rangeDamageCost, rangeCost, armorCost){ //, structCost){
    return sizeCost + moveCost + evadeCost +  meleeCost +  rangeDamageCost +  rangeCost +  armorCost;// +  structCost;
}


export function calculateUnitBaseCost(unitData){

    let sizeVal = unitData['size'];
    let moveVal = unitData['move'];
    let evadeVal =  unitData['evade'];
    let dmgMeleeVal = unitData['dmg_m'];
    let dmgRangeVal = unitData['dmg_r'];
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
    
    unitData['baseCost'] = pointsVal;

    return unitData;
}

export function calculateUnitTagCost(unitData){
    let tagCost = 0;
    let removeTag = [];
    unitData['tags'].forEach(tag => {
        let check = tag.req(unitData);
        check = tags_checkExclusions(tag.excl, unitData['tags'], check);

        if(check.length <= 0){
            tagCost = tagCost + tag.func(unitData);
        }
        else{
            removeTag = [...removeTag, tag]
        }
    });

    removeTag.forEach(tag => {
        unitData['tags'].filter(rem => rem === tag);
    })

    unitData['tagCost'] = tagCost;
    unitData['total'] = unitData['baseCost'] + tagCost;

    
    return unitData;
}
