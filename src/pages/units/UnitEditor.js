import React, {useEffect, useState} from "react";
import 'foundation-sites/dist/css/foundation.min.css';

import UserInfoBar from "../../components/UserInfoBar";
import UnitEditorTable from "../../components/unitEditor/unitSheet/UnitEditorTable";

import { unitObj, convertCSVUnitToRaw } from "../../components/data/unitInfo";
import { calculateUnitBaseCost, calculateUnitTagCost } from "../../components/data/UnitCalculator";
import { tagInfo } from "../../components/data/tagInfo";
import { utilCheckMatchUnit } from "../../components/Utils";

import UnitInfoCard from "../../components/printUnits/UnitInfoCard";

function UnitEditor({props}){

    const [unitListName, setUnitListName] = useState("");
    const [unitDataIndex, setUnitDataIndex] = useState(0);
    const [unitData, setUnitData] = useState([]);

    function unitNewEntry(){
        let unit = structuredClone(unitObj);
        unit['tags'] = [];
        return unit;
    }

    //selectedUnits == array of ID
    function onDeleteUnits(selectedUnits){
        if(selectedUnits.length <= 0){
            return;
        }
        // NOTE - disabled at the moment
        //shortcut reset so user doesn't have to click 'add unit' again after wiping the table
        // if(unitData.length === 1){
        //     let updateArr = unitData.filter(unit => unit.id !== 0);
        //     updateArr = [...updateArr, unitNewEntry()];
        //     setUnitData(updateArr);
        // }
        // else{
        let updateData = [...unitData];
        updateData = updateData.filter(({id}) => !selectedUnits.includes(id));

        // if(updateData.length === 0){
        //     setUnitData([unitNewEntry()]);
        // }
        // else{
        setUnitData(updateData);
        // }
        // }
    }

    function onAddNewUnit(){
        let newUnit = unitNewEntry();
        let incIndex = unitDataIndex;
        newUnit['id'] = incIndex;
        let addUnit = [...unitData, newUnit];
        setUnitData(addUnit);
        incIndex = incIndex + 1;
        setUnitDataIndex(incIndex);
    }

    function onRemoveLastRow(){
        let updateUnits = [...unitData];
        updateUnits.pop();
        setUnitData([...updateUnits]);
    }

    function onCopyUnits(copyUnits){
        let updateUnitData = [...unitData];
        let incIndex = unitDataIndex;
        copyUnits.forEach(unit => {
            let newUnit = structuredClone(unit);
            newUnit['id'] = incIndex;
            updateUnitData = [...updateUnitData, newUnit];
            incIndex += 1;
        });
        setUnitDataIndex(incIndex);
        setUnitData(updateUnitData);
    }
    
    function onImportCSV(unitsArr){
        
        if(unitsArr.length === 0){
            return;
        }

        let unitIndex = unitDataIndex;
        let addUnits = [...unitData];
        
        unitsArr.forEach((unit)=>{
            let duplicate = false;
            unitData.forEach((existingUnit)=>{
                if(duplicate !== true){
                    duplicate = utilCheckMatchUnit(unit, existingUnit);
                }
            });

            if(!duplicate){
                unit["id"] = unitIndex;
                unit["name"] = unit.unitName;
                unit["tags"] = unit.tags.split(" ");
                unit["tags"].pop();

                let convertUnit = convertCSVUnitToRaw(unit);

                unitIndex = unitIndex + 1;
                addUnits = [...addUnits, convertUnit];
            }
        });
        setUnitDataIndex(unitIndex);
        setUnitData(addUnits);
    }

    function updateUnitEntryData(unitIndex, columnName, val){
        
        let tmpRows = [...unitData];
        let tmpUnit = unitData.find(({id}) => (id === unitIndex));
        const arrIdx = tmpRows.findIndex(unit => {
            return unit.id === unitIndex;
        });

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
        tmpRows[arrIdx] = tmpUnit;
        
        //update table data
        setUnitData(tmpRows);
    }

    function updateUnitEntryTags(unitIndex){
        let tmpRows = [...unitData];
        let tmpUnit = unitData.find(unit => unit.id === unitIndex);
        const arrIdx = tmpRows.findIndex(unit => {
            return unit.id === unitIndex;
        });

        tmpUnit = calculateUnitTagCost(tmpUnit);
        
        //bind changes
        tmpRows[arrIdx] = tmpUnit;

        //update table data
        setUnitData(unitData);
    }

    useEffect(()=>{},[unitData]);

    return(
<div className="grid-container fluid">
    <UserInfoBar />

    <div className="grid-x grid-margin-x">
        <div className="cell small-10 medium-8 large-6 medium-offset-2 large-offset-1">
            <span> Unit Set:</span><input type="text" placeholder="worksheet name" onChange={(e)=>{setUnitListName(e.target.value)}}/>
        </div>
    </div>

    <UnitEditorTable 
        unitDataSet={unitData} 
        worksheetName={unitListName}
        unitRowDataChange={updateUnitEntryData} 
        unitRowTagChange={updateUnitEntryTags}
        handleDeleteUnits={onDeleteUnits}
        handleAddNewUnit={onAddNewUnit}
        handleRemoveRowLast={onRemoveLastRow}
        handleCopyUnits={onCopyUnits}
        handleImportCSV={onImportCSV}
        />
</div>
    );  
};


export default UnitEditor;