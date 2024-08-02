import React, {useEffect, useCallback, useState} from "react";


function UnitTableRow({rowId}){



    return(
    <tr id={rowId}>
        <td><input id={rowId + "_select"} type="checkbox" /></td>
        <td><input id={rowId + "_name"} type="text"/></td>
        <td><input id={rowId + "_size"} type="number" maxLength="4" min="0"/></td>
        <td><input id={rowId + "_move"} type="number" maxLength="4" min="0"/></td>
        <td><input id={rowId + "_evade"} type="number" maxLength="4" min="0" max="3"/></td>
        <td><input id={rowId + "_dmg_m"} type="number" maxLength="4" min="0"/></td>
        <td><input id={rowId + "_dmg_r"} type="number" maxLength="4" min="0"/></td>
        <td><input id={rowId + "_range"} type="number" maxLength="4" min="0"/></td>
        <td><input id={rowId + "_armor"} type="number" maxLength="4" min="0"/></td>
        <td><label id={rowId + "_points"} ></label></td>
        <td><button id={rowId + "_tags"} type="button" className="btn ui-icon-grey"><span className="ui-icon ui-icon-tag"></span></button><input type="hidden" /></td>
        <td><label id={rowId + "_tagTotal"} ></label></td>
        <td><label id={rowId + "_total"} ></label></td>
    </tr>
    )
}

export default UnitTableRow;