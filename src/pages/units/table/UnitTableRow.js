import React from "react";
import Checkbox from "../../../components/CheckBox";

export default function UnitTableRow({rowId, rowData, handleRowDataUpdate, hasCheck, handleRowClickCheck, handleRowTagsClick}){

    //isChecked={debugInclude(idx)
    function rowOnChange(idx, e){
        let col = e.target.id;
        let val = e.target.value;
        handleRowDataUpdate(idx, col, val); //call to parent
    }

    return (
        <tr key={rowId} id={rowId}>
            <td><Checkbox key={rowId} type="checkbox" id={rowId} handleOnChange={handleRowClickCheck} isChecked={hasCheck}/> </td>
            <td><input id={"name"} type="text" minLength={1} maxLength={32} onChange={(e)=>{rowOnChange(rowId,e);}} defaultValue={""} placeholder="Enter name..."/></td>
            <td><input id={"size"} type="number" maxLength="4" min="0" onChange={(e)=>{rowOnChange(rowId,e);}} defaultValue={0}/></td>
            <td><input id={"move"} type="number" maxLength="4" min="0" onChange={(e)=>{rowOnChange(rowId,e);}} defaultValue={0}/></td>
            <td><input id={"evade"} type="number" maxLength="4" min="0" max="3" onChange={(e)=>{rowOnChange(rowId,e);}} defaultValue={0}/></td>
            <td><input id={"dmg_m"} type="number" maxLength="4" min="0" onChange={(e)=>{rowOnChange(rowId,e);}} defaultValue={0}/></td>
            <td><input id={"dmg_r"} type="number" maxLength="4" min="0" onChange={(e)=>{rowOnChange(rowId,e);}} defaultValue={0}/></td>
            <td><input id={"range"} type="number" maxLength="4" min="0" onChange={(e)=>{rowOnChange(rowId,e);}} defaultValue={0}/></td>
            <td><input id={"armor"} type="number" maxLength="4" min="0" onChange={(e)=>{rowOnChange(rowId,e);}} defaultValue={0}/></td>
            <td><label id={"points"}>{rowData[rowId]['baseCost']}</label></td>
            <td><label id={"tagTotal"} >{rowData[rowId]['tagCost']}</label></td>
            <td><label id={"total"} >{rowData[rowId]['total']}</label></td>
            <td><button id={"tags"} type="button" className="button secondary" onClick={(e)=>{handleRowTagsClick(rowId)}}>TAGS</button></td>
        </tr> 
    );
}