import React from "react";
//import "../../components/data/tagInfo.js"

export default function UnitTableRow({rowId, rowData, onRowChange, onRowTagsClick}){

    function onClickTags(){
        onRowTagsClick(rowId);
    }

return(
<tr key={rowId} id={rowId}>
    <td><input id={rowId + "_select"} type="checkbox" onChange={onRowChange}/></td>
    <td><input id={rowId + "_name"} type="text" minLength={1} maxLength={32} onChange={onRowChange}/></td>
    <td><input id={rowId + "_size"} type="number" maxLength="4" min="0" onChange={onRowChange}/></td>
    <td><input id={rowId + "_move"} type="number" maxLength="4" min="0" onChange={onRowChange}/></td>
    <td><input id={rowId + "_evade"} type="number" maxLength="4" min="0" max="3" onChange={onRowChange}/></td>
    <td><input id={rowId + "_dmg_m"} type="number" maxLength="4" min="0" onChange={onRowChange}/></td>
    <td><input id={rowId + "_dmg_r"} type="number" maxLength="4" min="0" onChange={onRowChange}/></td>
    <td><input id={rowId + "_range"} type="number" maxLength="4" min="0" onChange={onRowChange}/></td>
    <td><input id={rowId + "_armor"} type="number" maxLength="4" min="0" onChange={onRowChange}/></td>
    <td><label id={rowId + "_points"} ></label></td>
    <td><button id={rowId + "_tags"} type="button" className="btn ui-icon-grey" onClick={onClickTags}><span className="ui-icon ui-icon-tag"></span></button><input type="hidden" /></td>
    <td><label id={rowId + "_tagTotal"} ></label></td>
    <td><label id={rowId + "_total"} ></label></td>
</tr>
)
};