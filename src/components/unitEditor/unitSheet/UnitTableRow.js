import React, {useState, useEffect} from "react";
import Checkbox from "../../CheckBox";

export default function UnitTableRow({rowId, rowData, handleRowDataUpdate, hasCheck, handleRowClickCheck, handleRowTagsClick}){

    const [values, setValues] = useState(rowData);

    function rowOnChange(unitId, e){
        let {id, value} = e.target;
        handleRowDataUpdate(unitId, id, value); //call to parent
    }

    useEffect(()=>{
        setValues(rowData);
    }, [rowData]);


    return (
        <tr key={rowId} id={rowId}>
            <td><Checkbox key={rowId} type="checkbox" id={rowId} handleOnChange={handleRowClickCheck} isChecked={hasCheck}/> </td>
            <td><input id={"name"} type="text" minLength={1} maxLength={32} onChange={(e)=>{rowOnChange(rowId,e);}} placeholder="Enter name..." value={values['name']}/></td>
            <td><input id={"size"} type="number" maxLength="4" min="0" onChange={(e)=>{rowOnChange(rowId,e);}} value={values['size']}/></td>
            <td><input id={"move"} type="number" maxLength="4" min="0" onChange={(e)=>{rowOnChange(rowId,e);}} value={values['move']}/></td>
            <td><input id={"evade"} type="number" maxLength="4" min="0" max="3" onChange={(e)=>{rowOnChange(rowId,e);}} value={values['evade']}/></td>
            <td><input id={"dmgMelee"} type="number" maxLength="4" min="0" onChange={(e)=>{rowOnChange(rowId,e);}} value={values['dmgMelee']}/></td>
            <td><input id={"dmgRange"} type="number" maxLength="4" min="0" onChange={(e)=>{rowOnChange(rowId,e);}} value={values['dmgRange']}/></td>
            <td><input id={"range"} type="number" maxLength="4" min="0" onChange={(e)=>{rowOnChange(rowId,e);}} value={values['range']}/></td>
            <td><input id={"armor"} type="number" maxLength="4" min="0" onChange={(e)=>{rowOnChange(rowId,e);}} value={values['armor']}/></td>
            <td><label id={"points"}>{rowData['points']}</label></td>
            <td><label id={"tagTotal"} >{rowData['tagTotal']}</label></td>
            <td><label id={"completeTotal"} >{rowData['completeTotal']}</label></td>
            <td><button id={"tags"} type="button" className="button secondary" onClick={(e)=>{handleRowTagsClick(rowId)}}>TAGS</button></td>
        </tr> 
    );
}