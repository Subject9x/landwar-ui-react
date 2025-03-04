import React, { useRef, useEffect, useState } from "react";
import { initializeSortedTagList } from "../../components/data/tagInfo";
import { parseCSVFileInput, roundUsing} from "../Utils";

export default function ArmyUnitPool({unitList, onUnitImport, onAddUnitToList }) {

    const inputRef = useRef(null);
    const [tagList] = useState([...initializeSortedTagList()]);
    const [tableUnitList, setTableUnitList] = useState([]);
    const [columnSortStates, setColumnSortStates] = useState({
        "unitName": false,
        "size": false,
        "move": false,
        "evade": false,
        "dmgMelee": false,
        "dmgRange": false,
        "range": false,
        "armor": false,
        "tags": false,
        "points": false,
        "tagTotal": false,
        "completeTotal": false
    });

    useEffect(() => {
        setTableUnitList(unitList);
    }, [unitList]);

    const handleImportClick = () => {
        inputRef.current.click();
    };

    async function handleFileChange(event) {
        const fileObj = event.target.files && event.target.files[0];
        if (!fileObj) {
            return;
        }

        event.target.value = null;

        const csv = await fileObj.text();

        let result = parseCSVFileInput(csv);

        onUnitImport(result);
    };

    function sortOnColumnNum(colId) {
        let updateArr = tableUnitList;
        let sortColState = columnSortStates[colId];

        if (sortColState) {
            updateArr = tableUnitList.sort((a, b) => { return Number(a[colId]) >= Number(b[colId]) });
            sortColState = false;
        }
        else {
            updateArr = tableUnitList.sort((a, b) => { return Number(a[colId]) <= Number(b[colId]) });
            sortColState = true
        }
        let state = { ...columnSortStates };
        state[colId] = sortColState;
        setColumnSortStates(state);
        setTableUnitList(updateArr);
    }

    function sortOnColumnTxt(colId) {
        let updateArr = tableUnitList;
        let sortColState = columnSortStates[colId];

        if (sortColState) {
            updateArr = tableUnitList.sort((a, b) => { return a[colId] >= b[colId] });
            sortColState = false;
        }
        else {
            updateArr = tableUnitList.sort((a, b) => { return a[colId] <= b[colId] });
            sortColState = true
        }
        let state = { ...columnSortStates };
        state[colId] = sortColState;
        setColumnSortStates(state);
        setTableUnitList(updateArr);
    }

    function setSortIcon(boolVal){
        if(columnSortStates[boolVal]){
            return (
                <i className="fi-arrow-up"></i>
            );
        }
        return (
            <i className="fi-arrow-down"></i>
        );
    }    

return (
<div className="grid-x">
    <div className="cell auto">
        <div className="grid-x grid-margin-x">
            <div className="cell auto">
                <h4>Available units</h4>
            </div>
        </div>
        <div className="grid-x">
            <div className="cell auto">
                <button type="button" className="button primary" onClick={handleImportClick}><i className="fi-upload"></i></button>
                <input style={{ display: 'none' }} ref={inputRef} type="file" onChange={handleFileChange} />
            </div>
        </div>
        <div className="grid-x">
            <div className="cell auto">
                <table id="armyUnitTable" className="hover">
                    <thead>
                        <tr>
                            <th>Name<button type="button" className="button secondary clear" onClick={() => { sortOnColumnTxt("unitName") }}>{setSortIcon("unitName")}</button></th>
                            <th>SZ<button type="button" className="button secondary clear" onClick={() => { sortOnColumnNum("size") }}>{setSortIcon("size")}</button></th>
                            <th>MV<button type="button" className="button secondary clear" onClick={() => { sortOnColumnNum("move") }}>{setSortIcon("move")}</button></th>
                            <th>EV<button type="button" className="button secondary clear" onClick={() => { sortOnColumnNum("evade") }}>{setSortIcon("evade")}</button></th>
                            <th>MEL<button type="button" className="button secondary clear" onClick={() => { sortOnColumnNum("dmgMelee") }}>{setSortIcon("dmgMelee")}</button></th>
                            <th>SH<button type="button" className="button secondary clear" onClick={() => { sortOnColumnNum("dmgRange") }}>{setSortIcon("dmgRange")}</button></th>
                            <th>RNG<button type="button" className="button secondary clear" onClick={() => { sortOnColumnNum("range") }}>{setSortIcon("range")}</button></th>
                            <th>ARM<button type="button" className="button secondary clear" onClick={() => { sortOnColumnNum("armor") }}>{setSortIcon("armor")}</button></th>
                            <th>TAG<button type="button" className="button secondary clear" onClick={() => { sortOnColumnTxt("size") }}>{setSortIcon("size")}</button></th>
                            <th>PTS<button type="button" className="button secondary clear" onClick={() => { sortOnColumnNum("completeTotal") }}>{setSortIcon("completeTotal")}</button></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableUnitList.map((row, idx) => (
                                <tr key={idx} id={idx}>
                                    <td>{row.unitName}</td>
                                    <td>{row.size}</td>
                                    <td>{row.move}</td>
                                    <td>{row.evade}</td>
                                    <td>{row.dmgMelee}</td>
                                    <td>{row.dmgRange}</td>
                                    <td>{row.range}</td>
                                    <td>{row.armor}</td>
                                    <td>{row.tags.length > 0 &&
                                        <ul style={{listStyle : "none"}}>
                                            {
                                                row.tags.map((tag, idx)=>(<li>{tag}</li>))
                                            }
                                        </ul>
                                        }
                                    </td>
                                    <td>{ roundUsing(Math.ceil, row.completeTotal, 0)}</td>
                                    <td><button type="button" className="btn btn--green" onClick={() => { onAddUnitToList(row.id) }}><i className="fi-arrow-right"></i></button></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
);
};