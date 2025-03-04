import React, { useEffect, useState } from "react";
import { unitCSVColumns } from "../data/unitInfo";
import { CSVLink } from "react-csv";
import { roundUsing } from "../Utils";

export default function ArmyUnitTable({ idExt, unitList, onRemoveUnit }) {

    const [validateList, setValidateList] = useState({listNameNotEmpty:false, listNotEmpty:false});
    const [armyListName, setArmyListName] = useState("");
    const [tableUnitList, setTableUnitList] = useState([]);
    const [costValues, setCostValues] = useState([]);
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
        let basePoints = 0;
        let tagPoints = 0;
        // let total = 0;

        unitList.forEach((unit, idx) => {
            basePoints += Number(unit.points, 100);
            tagPoints += Number(unit.tagTotal, 100);
            // total += Number(unit.completeTotal, 100);
        });


        setCostValues([
            roundUsing(Math.ceil, basePoints, 0),
            roundUsing(Math.ceil, tagPoints, 0),
            roundUsing(Math.ceil, basePoints, 0) + roundUsing(Math.ceil, tagPoints, 0)
        ]);

        if(unitList.length === 0){
            setValidateList({...validateList, listNotEmpty : false});
        }
        else{
            setValidateList({...validateList, listNotEmpty : true});
        }
        setTableUnitList(unitList);
    }, [unitList, setValidateList]);

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

    function onClickPrint(e){
        e.preventDefault();
        let jsondat = JSON.stringify(tableUnitList);
        localStorage.setItem(armyListName, jsondat);
        let printLink = document.getElementById("printUnits");
        printLink.click();
    }

    function validForPrint(){
        return validateList.listNameNotEmpty && validateList.listNotEmpty;
    }

    function onArmyNameChange(text){

        setArmyListName(text);
        if(text === null || text === "" || text.length === 0){
            setValidateList({...validateList, listNameNotEmpty : false});
        }
        else{
            setValidateList({...validateList, listNameNotEmpty : true});
        }
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
                <h4>Force worksheet</h4>
            </div>
        </div>
        <div className="grid-x grid-margin-x">
            <div className="cell auto small-7 medium-8 large-9">
                <span>List name:</span><input type="text" placeholder="army list name" onChange={(e)=>{onArmyNameChange(e.target.value)}}/>
            </div>
            <div className="cell auto small-5 medium-4 large-3">
                <div className="button-group">
                    <button type="button" className="button secondary" disabled={!validForPrint()}><i className="fi-save"></i></button>{validForPrint() && 
                    <CSVLink filename={armyListName} 
                            data={unitList} 
                            enclosingCharacter={""}
                            headers={unitCSVColumns} 
                            separator={","} 
                            className="button warning"><i className="fi-download"></i></CSVLink>
                    }
                    <button type="button" className="button success" onClick={(e)=>{onClickPrint(e);}} disabled={!validForPrint()}><i className="fi-print"></i></button>
                    <a id="printUnits" style={{display:"none"}} href={"http://localhost:3000/print/units/" + armyListName} target="_blank" rel="noopener noreferrer" ></a>
                </div>

            </div>
        </div>
        <div className="grid-x">
            <div className="cell auto">
                <table>
                        <tr>
                            <th><b><u>Total Unit points</u></b></th>
                            <th><b><u>Total TAG points</u></b></th>
                            <th><b><u>Army total</u></b></th>
                        </tr>

                        <tr>
                            <td>{costValues[0]}</td>
                            <td>{costValues[1]}</td>
                            <td>{costValues[2]}</td>
                        </tr>
                </table>
            </div>

        </div>
        <div className="grid-x">
            <div className="cell auto">
                <table id={"armyUnitTable" + idExt} className="hover">
                    <thead>
                        <tr>
                            <th></th>
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
                        </tr>
                    </thead>
                    <tbody>
                        {tableUnitList.length > 0 &&
                            tableUnitList.map((row, idx) => (
                                <tr key={idx} id={idx}>
                                    <td><button type="button" className="btn btn--red" onClick={() => { onRemoveUnit(row.id) }}><i className="fi-minus"></i></button></td>
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
                                    <td>{roundUsing(Math.ceil, row.completeTotal, 0) }</td>
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