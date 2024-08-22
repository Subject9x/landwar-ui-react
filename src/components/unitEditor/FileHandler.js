
/*
    
*/
export function file_exportUnit_csv(unitData){

    
    let exp = {'name':"", 'size':0, 'move':0, 'evade':0, 'dmgMelee':0, 'dmgRange':0, 'range':0, 'armor':0, 'tags':"", 'points':0, 'tagTotal':0, 'completeTotal':0}
    exp['name'] = unitData['name'];
    exp['size'] = unitData['size'];
    exp['move'] = unitData['move'];
    exp['evade'] = unitData['evade'];
    exp['dmgMelee'] = unitData['dmgMelee'];
    exp['dmgRange'] = unitData['dmgRange'];
    exp['range'] = unitData['range'];
    exp['armor'] = unitData['armor'];
    
    let tagArr = "";
    unitData['tags'].forEach(t => {tagArr += t + " "});
    exp['tags'] =  tagArr;
    exp['points'] = unitData['points'];
    exp['tagTotal'] = unitData['tagTotal'];
    exp['completeTotal'] =  unitData['completeTotal'];

    return exp;
}