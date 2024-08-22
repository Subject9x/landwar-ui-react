import React, {useEffect, useState} from "react";

import UserInfoBar from "../../components/UserInfoBar";
import UnitEditorTable from "../../components/unitEditor/unitSheet/UnitEditorTable";

import { calculateUnitBaseCost, calculateUnitTagCost } from "../../components/data/UnitCalculator";
import { tagInfo } from "../../components/data/tagInfo";

function UnitEditor(){

    const unitObj = {'id':0, 'name':"", 'size':0, 'move':0, 'evade':0, 'dmgMelee':0, 'dmgRange':0, 'range':0, 'armor':0, 'tags':[], 'points':0, 'tagTotal':0, 'completeTotal':0};
    const [unitData, setUnitData] = useState([{'id':0, 'name':"", 'size':0, 'move':0, 'evade':0, 'dmgMelee':0, 'dmgRange':0, 'range':0, 'armor':0, 'tags':[], 'points':0, 'tagTotal':0, 'completeTotal':0}]);

    function unitNewEntry(){
        return structuredClone(unitObj);
    }

    function onDeleteUnits(selectedUnits){

        //shortcut reset so user doesn't have to click 'add unit' again after wiping the table
        if(unitData.length === 1){
            let updateArr = unitData.filter(unit => unit.id !== 0);
            updateArr = [...updateArr, unitNewEntry()];
            setUnitData(updateArr);
        }
        else{
            let updateData = [...unitData];
            selectedUnits.forEach(unit => {
                updateData = updateData.filter(u => u.id !== unit);
            });

            if(updateData.length === 0){
                setUnitData([unitNewEntry()]);
            }
            else{
                setUnitData(updateData);
            }
        }
    }

    function onAddNewUnit(){
        let newUnit = unitNewEntry();
        newUnit['id'] = unitData.length;
        let addUnit = [...unitData, newUnit];
        setUnitData(addUnit);
    }

    function onRemoveLastRow(){
        let updateUnits = unitData.filter(unit => unit.id !== unitData.length-1);
        setUnitData([...updateUnits]);
    }

    function onCopyUnits(copyUnits){
        let updateUnitData = [...unitData];
        let idx = unitData.length;
        copyUnits.forEach(unit => {
            let newUnit = structuredClone(unit);
            newUnit['id'] = idx;
            updateUnitData = [...updateUnitData, newUnit];
            idx += 1;
        });
        setUnitData(updateUnitData);
    }


    function updateUnitEntryData(unitRowId, columnName, val){
        
        let tmpRows = [...unitData];
        let tmpUnit = unitData[unitRowId];
        
        //update costs
        if(columnName === "name"){
            tmpUnit[columnName] = val;
        }
        else{
            tmpUnit[columnName] = Number(val);
            tmpUnit = calculateUnitBaseCost(tmpUnit);

            //find tags to be removed due to validation
            let removeTag = [];
            tmpUnit['tags'].forEach(tag => {
                if(tagInfo['data'].find(item => item.abrv === tag).reqs(tmpUnit).length > 0 ){
                    removeTag = [...removeTag, tag];
                }
            });

            //remove invalid tags
            removeTag.forEach(tag => {
                tmpUnit['tags'] = tmpUnit['tags'].filter(item => item !== tag);
            });

            tmpUnit = calculateUnitTagCost(tmpUnit);
        }
        
        //bind changes
        tmpRows[unitRowId] = tmpUnit;
        
        //update table data
        setUnitData(tmpRows);
    }

    function updateUnitEntryTags(unitRowId){
        let tmpRows = [...unitData];
        let tmpUnit = unitData[unitRowId];

        tmpUnit = calculateUnitTagCost(tmpUnit);
        //bind changes
        tmpRows[unitRowId] = tmpUnit;

        //update table data
        setUnitData(unitData);
    }


    useEffect(()=>{},[unitData]);

    return(
<div className="grid-container fluid">
    <div className="grid-x grid-margin-x">
        <div className="cell small-4"><UserInfoBar /></div>
    </div>

    <div className="grid-x grid-margin-x">
        <div className="cell small-8">
            Unit Set:<input type="text" />
        </div>
    </div>
    
    <div className="grid-x grid-margin-x">
        <UnitEditorTable 
            unitDataSet={unitData} 
            unitRowDataChange={updateUnitEntryData} 
            unitRowTagChange={updateUnitEntryTags}
            handleDeleteUnits={onDeleteUnits}
            handleAddNewUnit={onAddNewUnit}
            handleRemoveRowLast={onRemoveLastRow}
            handleCopyUnits={onCopyUnits}
            />
    </div>
</div>
    );  
};


export default UnitEditor;