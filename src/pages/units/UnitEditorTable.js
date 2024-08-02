import React, {useState, useEffect, useCallback} from "react";

import UnitEditorBar from "./UnitEditorBar";
import UnitTableRow from "./UnitTableRow";

function UnitEditorTable(){


    function onSelectAll(){
        console.log("onSelectAll");
    }

    function onDeselectAll(){
        console.log("onDeselectAll");
    }

    function onDeleteSelectRow(){
        console.log("onDeleteSelectRow");
    }

    function onSaveSelectRow(){
        console.log("onSaveSelectRow");
    }

    function onLoadCSV(){
        console.log("onLoadCSV");
    }

    function onPrintPDF(){
        console.log("onPrintPDF");
    }

    


    return (
<div className="grd">
    <div className="grd-row">
        <div className="grd-row-col-6">
            <UnitEditorBar onSelectAll={onSelectAll}
                onDeselectAll={onDeselectAll}
                onDeleteSelectRow={onDeleteSelectRow}
                onSaveSelectRow={onSaveSelectRow}
                onLoadCSV={onLoadCSV}
                onPrintPDF={onPrintPDF}
            />
        </div>
    </div>

    <div className="grd-row">
        <div className="grd-row-col-6">
            <table id="unitTable">
                <thead>
                    <tr className="unitTableHead">
                        <th>Select</th>
                        <th>Name</th>
                        <th>Size</th>
                        <th>Move</th>
                        <th>Evade</th>
                        <th>DMG Melee </th>
                        <th>DMG Range</th>
                        <th>Range</th>
                        <th>Armor</th>
                        <th>Points</th>
                        <th>TAGs</th>
                        <th>TAG total</th>
                        <th>TOTAL</th>
                    </tr>
                </thead>
                <tbody>
                    <UnitTableRow rowId={1}/>
                </tbody>
            </table>
        </div>
    </div>
    <div className="grd-row">
        <div className="grd-row-col-2--sm grd-row-col-2--md grd-row-col-1--lg  ">
            <button type="button" id="btnAddUnit" title="Add row to bottom" className="btn btn--green ui-icon-white"><span className="ui-icon ui-icon-plusthick"></span></button>
            <button type="button" id="btnRemoveUnit" title="Delete LAST row" className="btn btn--red ui-icon-white"><span className="ui-icon ui-icon-minusthick"></span></button>
            <button type="button" id="btnCopyUnit" title="Copy LAST row" className="btn btn--blue ui-icon-white"><span className="ui-icon ui-icon-copy"></span></button>
        </div>
    </div>  
    <div className="row-fill-s row-fill row-fill-l"></div>
</div>
    );
};

export default UnitEditorTable;