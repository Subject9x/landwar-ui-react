import React, {useEffect, useCallback} from "react";


function UnitEditorBar({onSelectAll, onDeselectAll, onDeleteSelectRow, onSaveSelectRow, onLoadCSV, onPrintPDF}){

    return(
<div className="grd">
    <div className="grd-row">
        <div class="grd-row-col-4-6--sm grd-row-col-4-6--md grd-row-col-3-6--lg">

            {/*<button type="button" title="Select All rows" onclick="ub_control_select_all(true);" class="btn--blue ui-icon-white"><span class="ui-icon ui-icon-check"></span></button>
            <button type="button" title="Deselect All rows" onclick="ub_control_select_all(false);" class="btn ui-icon-grey"><span class="ui-icon ui-icon-squaresmall-minus"></span></button>
            <button type="button" title="Delete Selected rows" onclick="ub_control_delete_select();" class="btn--red ui-icon-white"><span class="ui-icon ui-icon-trash"></span></button>
            <button type="button" title="Save Selected rows" onclick="ub_control_save_select(event)" class="btn--green ui-icon-white"><span class="ui-icon ui-icon-disk"></span></button>
            <button type="button" title="Load .csv file" onclick="ub_control_loadfile(event)" class="btn--green ui-icon-white"><span class="ui-icon ui-icon-folder-open"></span></button>
            <button type="button" title="Print Selected to PDF" onclick="ub_control_new_print(event)" class="btn--green ui-icon-white"><span class="ui-icon ui-icon-print"></span></button>
            <button type="button" title="Select All rows" onclick="ub_control_help(event)" class="btn--blue ui-icon-white"><span class="ui-icon ui-icon-help"></span></button>*/}
        
            <button type="button" title="Select All rows" onClick={onSelectAll} class="btn--blue ui-icon-white"><span className="ui-icon ui-icon-check"></span></button>
            <button type="button" title="Deselect All rows" onClick={onDeselectAll} class="btn ui-icon-grey"><span className="ui-icon ui-icon-squaresmall-minus"></span></button>
            <button type="button" title="Delete Selected rows" onClick={onDeleteSelectRow} class="btn--red ui-icon-white"><span className="ui-icon ui-icon-trash"></span></button>
            <button type="button" title="Save Selected rows" onClick={onSaveSelectRow} class="btn--green ui-icon-white"><span className="ui-icon ui-icon-disk"></span></button>
            <button type="button" title="Load .csv file" onClick={onLoadCSV} class="btn--green ui-icon-white"><span className="ui-icon ui-icon-folder-open"></span></button>
            <button type="button" title="Print Selected to PDF" onClick={onPrintPDF} class="btn--green ui-icon-white"><span className="ui-icon ui-icon-print"></span></button>
        </div>
        <div class="grd-row-col-2-6--sm grd-row-col-2-6--md grd-row-col-3-6--lg">
           <table><tbody>
                <tr>
                    <td><b>Base:</b><label id="totalBase"></label></td>
                    <td><b>TAGS</b><label id="totalTags"></label></td>
                    <td><b>Total:</b><label id="totalAll"></label></td>
                </tr>
            </tbody></table>
        </div>
    </div>
</div>

    );

};

export default UnitEditorBar;