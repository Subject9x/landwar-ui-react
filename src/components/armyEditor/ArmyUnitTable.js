import React, { useEffect, useState } from "react";
import { unitCSVColumns } from "../data/unitInfo";
import { CSVLink } from "react-csv";

export default function ArmyUnitTable({ idExt, unitList, onRemoveUnit }) {

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
        let total = 0;

        unitList.forEach((unit, idx) => {
            basePoints += Number(unit.points, 100);
            tagPoints += Number(unit.tagTotal, 100);
            total += Number(unit.completeTotal, 100);
        });

        setCostValues([basePoints, tagPoints, total]);
        setTableUnitList(unitList);
    }, [unitList]);

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
                <span>List name:</span><input type="text" placeholder="army list name" onChange={(e)=>{setArmyListName(e.target.value)}}/>
            </div>
            <div className="cell auto small-5 medium-4 large-3">
                <button type="button" className="btn btn--green">SV</button>
                <CSVLink filename={armyListName} 
                        data={unitList} 
                        enclosingCharacter={""}
                        headers={unitCSVColumns} 
                        separator={","} 
                        className="btn btn--blue">.CSV</CSVLink>
                <button type="button" className="btn btn--green">PRNT</button>
            </div>
        </div>
        <div className="grid-x grid-margin-x">
            <div className="cell auto small-4 medium-4 large-4">
                <b><u>Total Unit points :</u>  </b>{costValues[0]}
            </div>
            <div className="cell auto small-4 medium-4 large-4">
                <b><u>Total TAG points :</u>  </b>{costValues[1]}
            </div>
            <div className="cell auto small-4 medium-4 large-4">
                <b><u>Complete Army total :</u>  </b>{costValues[2]}
            </div>
        </div>
        <div className="grid-x">
            <div className="cell auto">
                <table id={"armyUnitTable" + idExt} className="hover">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name<button type="button" className="btn btn--s btn--white" onClick={() => { sortOnColumnTxt("size") }}>^</button></th>
                            <th>SZ<button type="button" className="btn btn--s btn--white" onClick={() => { sortOnColumnNum("size") }}>^</button></th>
                            <th>MV<button type="button" className="btn btn--s btn--white" onClick={() => { sortOnColumnNum("move") }}>^</button></th>
                            <th>EV<button type="button" className="btn btn--s btn--white" onClick={() => { sortOnColumnNum("evade") }}>^</button></th>
                            <th>MEL<button type="button" className="btn btn--s btn--white" onClick={() => { sortOnColumnNum("dmgMelee") }}>^</button></th>
                            <th>SH<button type="button" className="btn btn--s btn--white" onClick={() => { sortOnColumnNum("dmgRange") }}>^</button></th>
                            <th>RNG<button type="button" className="btn btn--s btn--white" onClick={() => { sortOnColumnNum("range") }}>^</button></th>
                            <th>ARM<button type="button" className="btn btn--s btn--white" onClick={() => { sortOnColumnNum("armor") }}>^</button></th>
                            <th>TAG<button type="button" className="btn btn--s btn--white" onClick={() => { sortOnColumnTxt("size") }}>^</button></th>
                            <th>PTS<button type="button" className="btn btn--s btn--white" onClick={() => { sortOnColumnNum("completeTotal") }}>^</button></th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableUnitList.length > 0 &&
                            tableUnitList.map((row, idx) => (
                                <tr key={idx} id={idx}>
                                    <td><button type="button" className="btn btn--red" onClick={() => { onRemoveUnit(row.id) }}>-</button></td>
                                    <td>{row.unitName}</td>
                                    <td>{row.size}</td>
                                    <td>{row.move}</td>
                                    <td>{row.evade}</td>
                                    <td>{row.dmgMelee}</td>
                                    <td>{row.dmgRange}</td>
                                    <td>{row.range}</td>
                                    <td>{row.armor}</td>
                                    <td>{row.tagList.length > 0 &&
                                        <ul style={{listStyle : "none"}}>
                                            {
                                                row.tagList.map((tag, idx)=>(<li>{tag}</li>))
                                            }
                                        </ul>
                                        }
                                    </td>
                                    <td>{row.completeTotal}</td>
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