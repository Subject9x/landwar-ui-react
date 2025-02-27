import React, {useState} from "react";
import UserInfoBar from "../../components/UserInfoBar";
import ArmyUnitPool from "../../components/armyEditor/ArmyUnitPool";
import ArmyUnitTable from "../../components/armyEditor/ArmyUnitTable";
import { utilCheckMatchUnit } from "../../components/Utils";

export default function ArmyEditor({props}){

    const [unitPoolIdx, setUnitPoolIdx] = useState(0);
    const [unitListIdx, setUnitListIdx] = useState(0);
    const [importedUnits, setImportedUnits] = useState([]);
    const [unitList, setUnitList] = useState([]);

    function onImportUnits(unitsArr){
        if(unitsArr.length === 0){
            return;
        }
        let addUnits = [...importedUnits];
        let unitCount = unitPoolIdx;
        console.log(unitsArr);
        unitsArr.forEach((unit, unitId)=>{
            let duplicate = false;
            importedUnits.forEach((existingUnit,idx)=>{
                if(duplicate !== true){
                    duplicate = utilCheckMatchUnit(unit, existingUnit);
                }
            });

            if(!duplicate){
                unit["id"] = unitCount;
                unit["name"] = unit.unitName;
                unit["tagList"] = unit.tags.split(" ");
                unit["tagList"].pop();
                unitCount += 1;
                addUnits = [...addUnits, unit];
            }
        });
        setImportedUnits(addUnits);
        setUnitPoolIdx(unitCount);
    }

    function addUnitToList(unitId){
        let unitListIdxUp = unitListIdx;
        let unit = importedUnits[unitId];
        let unitEntry = structuredClone(unit);

        unitEntry["id"] = unitListIdxUp
        unitListIdxUp += 1;
        
        let updateArr = [...unitList, unitEntry];

        setUnitList(updateArr);
        setUnitListIdx(unitListIdxUp);
    }

    function unitListRemoveEntry(id){
        let updateArr = unitList.filter(unit => unit.id !== id);
        setUnitList([...updateArr]);
    }

return(
<div className="grid-container fluid">
    <UserInfoBar />
    <div className="grid-x grid-margin-x">
        <div className="cell auto small-6 medium-6 large-5 large-offset-1 rulesPanel">
            <ArmyUnitPool unitList={importedUnits} onUnitImport={onImportUnits} onAddUnitToList={addUnitToList}/>
        </div>
        <div className="cell auto small-6 medium-6 large-5">
            <ArmyUnitTable unitList={unitList} onRemoveUnit={unitListRemoveEntry}/>
        </div>
    </div>
</div>
);
};