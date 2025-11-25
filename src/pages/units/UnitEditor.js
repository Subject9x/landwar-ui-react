import React, {useEffect, useRef, useState} from "react";
import { useParams } from "react-router";
import 'foundation-sites/dist/css/foundation.min.css';
import 'foundation-sites/dist/css/foundation-icons.css';

import UserInfoBar from "../../components/UserInfoBar";
import UnitEditorTable from "../../components/unitEditor/unitSheet/UnitEditorTable";

import { unitObj, convertCSVUnitToRaw } from "../../components/data/unitInfo";
import { calculateUnitBaseCost, calculateUnitTagCost } from "../../components/data/UnitCalculator";
import { tagInfo } from "../../components/data/tagInfo";
import { numRound2Decimal, utilCheckMatchUnit, parseCSVFileInput } from "../../components/Utils";

function UnitEditor({props}){

    const pageLoaded = useRef(null);
    const {userId, userListId} = useParams();
    const [unitListName, setUnitListName] = useState("");
    const [unitDataIndex, setUnitDataIndex] = useState(0);
    const [unitData, setUnitData] = useState([]);
  
    const [totalTagCost, setTotalTagCost] = useState(0);
    const [totalBaseCost, setTotalBaseCost] = useState(0);
    const [totalCosts, setTotalCosts] = useState(0);

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
        let updateData = [...unitData];
        updateData = updateData.filter(({id}) => !selectedUnits.includes(id));
        setUnitData(updateData);
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
                if(!Object.keys(unit).includes("subName")){
                    unit["subName"] = "";
                }
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
        if(columnName === "name" || columnName === "subName"){
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

    useEffect(()=>{
        if(pageLoaded.current === null){
            if(userId === "0" && (userListId !== null && userListId !== undefined && userListId !== "")){
                let setData = localStorage.getItem(userListId);
                if(setData !== undefined && setData !== null){
                    let parseData = parseCSVFileInput(setData);
                    onImportCSV(parseData);
                    localStorage.removeItem(userListId);
                }
            }
            pageLoaded.current = 1;
        }

        let base = 0;
        let tags = 0;
        let total = 0;
        unitData.forEach(unit => {
            base += unit['points'];
            tags += unit['tagTotal'];
            total += unit['completeTotal'];
        });
        setTotalBaseCost(numRound2Decimal(base));
        setTotalTagCost(numRound2Decimal(tags));
        setTotalCosts(numRound2Decimal(total));

    },[unitData, pageLoaded, userListId, userId]);

    return(
<div className="grid-container fluid">
    {/*<UserInfoBar /> */}

    <div className="grid-x grid-margin-x">
        <div className="cell auto small-7 medium-7 large-6 large-offset-1">
            <span> Unit Set:</span><input type="text" placeholder="worksheet name" onChange={(e)=>{setUnitListName(e.target.value)}}/>
        </div>
        <div className="cell auto small-4 medium-4 large-3 ">
            <table id="tagRulesListPanel">
                <thead>
                    <tr>
                        <th><b>Base</b></th>
                        <th><b>TAG</b></th>
                        <th><b>Total</b></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{totalBaseCost}</td>
                        <td>{totalTagCost}</td>
                        <td>{totalCosts}</td>
                    </tr>
                </tbody>
            </table>
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