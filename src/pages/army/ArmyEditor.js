import React, {useState, useEffect, useCallback, useRef} from "react";
import { useParams } from "react-router";
import 'foundation-sites/dist/css/foundation.min.css';
import 'foundation-sites/dist/css/foundation-icons.css';
import '../../css/rulebook.css';
import UserInfoBar from "../../components/UserInfoBar";
import ArmyUnitPool from "../../components/armyEditor/ArmyUnitPool";
import ArmyUnitTable from "../../components/armyEditor/ArmyUnitTable";
import { utilCheckMatchUnit, parseCSVFileInput, basicUUID } from "../../components/Utils";
import { convertCSVUnitToRaw } from "../../components/data/unitInfo";

export default function ArmyEditor({props}){

    const [listUID, setListUID] = useState();
    const pageLoaded = useRef(null);
    const {userId, userListId} = useParams();
    const [unitPoolIdx, setUnitPoolIdx] = useState(0);
    const [unitListIdx, setUnitListIdx] = useState(0);
    const [importedUnits, setImportedUnits] = useState([]);
    const [unitList, setUnitList] = useState([]);

    const handleBeforeUnload = (event) => {
        //cleans up image cache
        localStorage.removeItem(listUID);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    function onImportUnits(unitsArr){
        if(unitsArr.length === 0){
            return;
        }

        const cache = JSON.parse(localStorage.getItem(listUID));
        let unitPoolCache = cache["pool"];

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
                unit["imgLocal"] = null;
                unit["tags"] = unit.tags.split(" ");
                unit["tags"].pop();
                unitCount += 1;
                addUnits = [...addUnits, unit];
                unitPoolCache = [...unitPoolCache, ""];
            }
        });
        localStorage.setItem(listUID, JSON.stringify({...cache, pool : unitPoolCache}));
        setImportedUnits(addUnits);
        setUnitPoolIdx(unitCount);
    }

    function addUnitToList(unitId){
        let unitListIdxUp = unitListIdx;
        let unit = importedUnits[unitId];
        let unitEntry = structuredClone(unit);
        unitEntry["imgUrl"] = unit.imgUrl;
        unitEntry["poolId"] = unitId;

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

    function addImageUnitPoolentryURL(unitId, url){
        const arrIdx = importedUnits.findIndex(unit => {
            return unit.id === unitId;
        });

        let tmpUnit = importedUnits[arrIdx];
        tmpUnit["imgUrl"] = url;
        importedUnits[arrIdx] = tmpUnit
        setImportedUnits([...importedUnits]);
    }

    function addImageUnitUpload(unitIdx, e) {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            const base64String = reader.result
                .replace('data:', '')
                .replace(/^.+,/, '');

            let cache = JSON.parse(localStorage.getItem(listUID));
            let unitPoolCache = cache["pool"];

            unitPoolCache[unitIdx] = base64String.toString();
            cache = {...cache, pool : unitPoolCache};

            localStorage.setItem(listUID, JSON.stringify(cache));
        };

        reader.readAsDataURL(file);
    }

    useEffect(()=>{
        if(pageLoaded.current === null){
            
            let uid = basicUUID (12);
            uid = uid + Date.now().toString();
            setListUID(uid);
            localStorage.setItem(uid, JSON.stringify({"pool" : [], "force" : []}));
            
            if(userId === "0" && (userListId !== null && userListId !== undefined && userListId !== "")){
                let setData = localStorage.getItem(userListId);
                if(setData !== undefined && setData !== null){
                    let parseData = parseCSVFileInput(setData);
                    onImportUnits(parseData);
                    localStorage.removeItem(userListId);
                }
            }
            pageLoaded.current = 1;
        }
    },[pageLoaded, userId, userListId, onImportUnits]);

return(
<div className="grid-container fluid">
    <UserInfoBar />
    <div className="grid-x grid-margin-x">
        <div className="cell auto small-12 medium-10 large-8 medium-offset-1 large-offset-2" >
            Uploaded images are only stored in your browser's local session, and are removed when tab is closed.
            Image size limited to 165px X 145px!
        </div>
    </div>
    <div className="grid-x grid-margin-x">
        <div className="cell auto small-12 medium-10 large-8 medium-offset-1 large-offset-2" >
            <ArmyUnitPool unitList={importedUnits} listUUID={listUID} onUnitImport={onImportUnits} onAddUnitToList={addUnitToList} onAddUnitImageURL={addImageUnitPoolentryURL} onAddUnitImageUpload={addImageUnitUpload}/>
        </div>
        <div className="cell auto small-12 medium-10 large-8 medium-offset-1 large-offset-2" >
            <ArmyUnitTable unitList={unitList} listUUID={listUID} onRemoveUnit={unitListRemoveEntry}/>

        </div>
    </div>
    
</div>
);
};