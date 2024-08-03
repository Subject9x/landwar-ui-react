import React from "react";
//import "../../components/data/tagInfo.js"

export default function UnitTableRow({rowId, rowData, onRowChange, onRowTagsClick}){

    function onClickTags(){
        onRowTagsClick(rowId);
    }


    function onInputChange(e){
        const item = e.target;
        onRowChange(rowId, item.id, item.value);
    }

return(
<tr id={rowId}>
    <td><input id={"select"} type="checkbox" onChange={onInputChange} defaultValue={false}/></td>
    <td><input id={"name"} type="text" minLength={1} maxLength={32} onChange={onInputChange} defaultValue={""}/></td>
    <td><input id={"size"} type="number" maxLength="4" min="0" onChange={onInputChange} defaultValue={0}/></td>
    <td><input id={"move"} type="number" maxLength="4" min="0" onChange={onInputChange} defaultValue={0}/></td>
    <td><input id={"evade"} type="number" maxLength="4" min="0" max="3" onChange={onInputChange} defaultValue={0}/></td>
    <td><input id={"dmg_m"} type="number" maxLength="4" min="0" onChange={onInputChange} defaultValue={0}/></td>
    <td><input id={"dmg_r"} type="number" maxLength="4" min="0" onChange={onInputChange} defaultValue={0}/></td>
    <td><input id={"range"} type="number" maxLength="4" min="0" onChange={onInputChange} defaultValue={0}/></td>
    <td><input id={"armor"} type="number" maxLength="4" min="0" onChange={onInputChange} defaultValue={0}/></td>
    <td><label id={"points"}>{rowData['baseCost']}</label></td>
    <td><button id={"tags"} type="button" className="button secondary" onClick={onClickTags}><span className="ui-icon ui-icon-tag"></span></button><input type="hidden" /></td>
    <td><label id={"tagTotal"} >{rowData['tagCost']}</label></td>
    <td><label id={"total"} >{rowData['total']}</label></td>
</tr>
)
};