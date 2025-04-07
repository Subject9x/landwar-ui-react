import React, {useState, useEffect, useCallback} from "react";
import { useParams } from "react-router";
import 'foundation-sites/dist/css/foundation.min.css';
import 'foundation-sites/dist/css/foundation-icons.css';
import '../../css/rulebook.css';
import UserInfoBar from "../../components/UserInfoBar";
import ArmyUnitPool from "../../components/armyEditor/ArmyUnitPool";
import ArmyUnitTable from "../../components/armyEditor/ArmyUnitTable";
import { utilCheckMatchUnit, parseCSVFileInput } from "../../components/Utils";
import { convertCSVUnitToRaw } from "../../components/data/unitInfo";

export default function ArmyEditor({props}){

    const [pageLoaded, setPageLoaded] = useState(0);
    const {userId, userListId} = useParams();
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
        unitsArr.forEach((unit, unitId)=>{
            let duplicate = false;
            importedUnits.forEach((existingUnit,idx)=>{
                if(duplicate !== true){
                    duplicate = utilCheckMatchUnit(unit, existingUnit);
                }
            });

            if(!duplicate){
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
        unitEntry["imgUrl"] = unit.imgUrl;

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

    function addImageUnitPoolentry(unitId, url){
        const arrIdx = importedUnits.findIndex(unit => {
            return unit.id === unitId;
        });
        let tmpUnit = importedUnits[arrIdx];
        tmpUnit["imgUrl"] = url;
        importedUnits[arrIdx] = tmpUnit
        setImportedUnits([...importedUnits]);
    }

    useEffect(()=>{
        if(pageLoaded === 0){
            if(userId === "0" && (userListId !== null && userListId !== undefined && userListId !== "")){
                let setData = localStorage.getItem(userListId);
                if(setData !== undefined && setData !== null){
                    let parseData = parseCSVFileInput(setData);
                    onImportUnits(parseData);

                    localStorage.removeItem(userListId);
                }
            }
            setPageLoaded(1);
        }
    },[pageLoaded, setPageLoaded, userId, userListId, onImportUnits]);

return(
<div className="grid-container fluid">
    <UserInfoBar />
    <div className="grid-x grid-margin-x">
        <div className="cell auto small-12 medium-10 large-8 medium-offset-1 large-offset-2" >
            <ArmyUnitPool unitList={importedUnits} onUnitImport={onImportUnits} onAddUnitToList={addUnitToList} onAddUnitImage={addImageUnitPoolentry}/>
        </div>
        <div className="cell auto small-12 medium-10 large-8 medium-offset-1 large-offset-2" >
            <ArmyUnitTable unitList={unitList} onRemoveUnit={unitListRemoveEntry}/>

        </div>
    </div>
    
</div>
);
};