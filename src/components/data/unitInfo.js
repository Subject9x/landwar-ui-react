import { calculateUnitBaseCost, calculateUnitTagCost } from "./UnitCalculator";
export const unitObj = {'name':"", 'subName' : "", 'size':0, 'move':0, 'evade':0, 
                        'dmgMelee':0, 'dmgRange':0, 'range':0, 
                        'armor':0, 'tags':"", 'points':0, 'tagTotal':0, 'completeTotal':0};

export const unitCSVColumns = [
    {label : 'unitName', key : 'name'},
    {label : 'subName', key : 'subName'},
    {label : 'size', key : 'size'}, 
    {label : 'move', key : 'move'}, 
    {label : 'evade', key : 'evade'},
    {label : 'dmgMelee', key : 'dmgMelee'}, 
    {label : 'dmgRange', key : 'dmgRange'}, 
    {label : 'range', key : 'range'},
    {label : 'armor', key : 'armor'},
    {label : 'points', key : 'points'}, 
    {label : 'tags', key : 'tags'}, 
    {label : 'tagTotal', key : 'tagTotal'},
    {label : 'completeTotal', key : 'completeTotal'}];

export function exportUnitToCSVRow(unitData){
    if(Object.keys(unitData).length <= 0 || unitData === undefined){
        return null;
    }   
    let exportUnit = structuredClone(unitObj);
    exportUnit['name'] = unitData['name'];
    exportUnit['subName'] = unitData['subName'];
    exportUnit['size'] = unitData['size'];
    exportUnit['move'] = unitData['move'];
    exportUnit['evade'] = unitData['evade'];
    exportUnit['dmgMelee'] = unitData['dmgMelee'];
    exportUnit['dmgRange'] = unitData['dmgRange'];
    exportUnit['range'] = unitData['range'];
    exportUnit['armor'] = unitData['armor'];
    
    let tagArr = "";
    unitData['tags'].forEach(t => {tagArr += t + " "});
    exportUnit['tags'] =  tagArr;
    exportUnit['points'] = unitData['points'];
    exportUnit['tagTotal'] = unitData['tagTotal'];
    exportUnit['completeTotal'] =  unitData['completeTotal'];

    if(exportUnit['imgUrl'] !== undefined){
        delete exportUnit['imgUrl'];
    }

    return exportUnit;
}

export function convertCSVUnitToRaw(srcUnit){
    srcUnit['size'] = Number(srcUnit['size']);
    srcUnit['move'] = Number(srcUnit['move']);
    srcUnit['evade'] = Number(srcUnit['evade']);
    srcUnit['dmgMelee'] = Number(srcUnit['dmgMelee']);
    srcUnit['dmgRange'] = Number(srcUnit['dmgRange']);
    srcUnit['range'] = Number(srcUnit['range']);
    srcUnit['armor'] = Number(srcUnit['armor']);

    srcUnit['points'] = parseFloat(srcUnit['points']);
    calculateUnitBaseCost(srcUnit);
    
    srcUnit['tagTotal'] = parseFloat(srcUnit['tagTotal']);
    calculateUnitTagCost(srcUnit);
    return srcUnit;
}

export const UnitRowColumns =[    
{
    id : "id",
    name : "id",
    grow : 0,
    compact : true,
    omit : true,
    selector: row => row.unitName,
},
{
    id : "Name",
    name : "Name",
    grow : 1,
    compact : true,
    selector: row => row.unitName,
    sortable: true,
    sortFuncton: (a,b) => {return a.unitName.toLowerCase() > b.unitName.toLowerCase()}
},
{
    id : "SZ",
    name : "SZ",
    grow : 0,
    center : true,
    compact : true,
    selector: row => row.size,
    sortable: true,
    sortFuncton: (a,b) => {return Number(a.size) <= Number(b.size)}
},
{
    id : "MV",
    name : "MV",
    grow : 0,
    center : true,
    compact : true,
    selector: row => row.move,
    sortable: true,
    sortFuncton: (a,b) => {return Number(a.move) <= Number(b.move)}
},
{
    id : "EV",
    name : "EV",
    grow : 0,
    center : true,
    compact : true,
    selector: row => row.evade,
    sortable: true,
    sortFuncton: (a,b) => {return Number(a.evade) <= Number(b.evade)}
},
{
    id : "MEL",
    name : "MEL",
    grow : 0,
    center : true,
    compact : true,
    selector: row => row.dmgMelee,
    sortable: true,
    sortFuncton: (a,b) => {return Number(a.dmgMelee) <= Number(b.dmgMelee)}
},
{
    id : "SH",
    name : "SH",
    grow : 0,
    center : true,
    compact : true,
    selector: row => row.dmgRange,
    sortable: true,
    sortFuncton: (a,b) => {return Number(a.dmgRange) <= Number(b.dmgRange)}
},
{
    id : "RNG",
    name : "RNG",
    grow : 0,
    center : true,
    compact : true,
    selector: row => row.range,
    sortable: true,
    sortFuncton: (a,b) => {return Number(a.range) <= Number(b.range)}
},
{
    id : "ARM",
    name : "ARM",
    grow : 0,
    center : true,
    compact : true,
    selector: row => row.armor,
    sortable: true,
    sortFuncton: (a,b) => {return Number(a.armor) <= Number(b.armor)}
},
{
    id : "Tags",
    name : "Tags",
    grow : 0,
    compact : true,
    selector: row => row.tags,
    sortable: true,
},
{
    id : "PTS",
    name : "PTS",
    grow : 0,
    center : true,
    compact : true,
    selector: row => row.completeTotal,
    sortable: true,
    sortFuncton: (a,b) => {return Number(a.completeTotal) <= Number(b.completeTotal)}
},
{
    id : "basePoints",
    name : "basePoints",
    grow : 0,
    omit: true,
    selector: row => row.points,
},
{
    id : "tagTotal",
    name : "tagTotal",
    grow : 0,
    omit: true,
    selector: row => row.tagTotal,
}
];