import React from "react";



export default function UnitEditorPointStats({totalBase, totalTags, totalAll}){

return(
<table><tbody>
    <tr>
        <td><b>Base:</b><label id="totalBase">{totalBase}</label></td>
        <td><b>TAGS</b><label id="totalTags">{totalTags}</label></td>
        <td><b>Total:</b><label id="totalAll">{totalAll}</label></td>
    </tr>
</tbody></table>
);
};