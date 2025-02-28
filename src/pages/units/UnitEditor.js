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

    const [unitData, setUnitData] = useState([]);

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
    
    function onImportCSV(unitsArr){
        
        if(unitsArr.length === 0){
            return;
        }

        let unitIndex = unitData.length;
        let addUnits = [...unitData];
        
        console.log(unitsArr);
        unitsArr.forEach((unit, unitId)=>{
            let duplicate = false;
            unitData.forEach((existingUnit,idx)=>{
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
        setUnitData(addUnits);
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
    <UserInfoBar />

    <div className="grid-x grid-margin-x">
        <div className="cell small-8">
            Unit Set:<input type="text" />
        </div>
    </div>
    
    {/* DEBUG */}
    {/*<div className="grid-x grid-margin-x">
        <UnitInfoCard unitInfo={unitData[0]} />
    </div>*/}

    <UnitEditorTable 
        unitDataSet={unitData} 
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