import React from "react";

function UnitEditorBar({onSelectAll, onDeselectAll, onDeleteSelectRow, onSaveSelectRow, onLoadCSV, onPrintPDF, disableDelete, disableSave, disablePrint}){

    return(
<div className="grid-container fluid">
    <div className="grid-x grid-margin-x">
        <div className="cell shrink small-1 medium-1 large-1">
            <button type="button" title="Delete" onClick={onDeleteSelectRow} className="button alert" disabled={disableDelete}>DELETE<span className="ui-icon ui-icon-trash"></span></button>
        </div>
        <div className="cell auto small-3 medium-3 large-3">
            <button type="button" title="Select +" onClick={onSelectAll} className="button primary">SELECT +<span className="ui-icon ui-icon-check"></span></button>
            <button type="button" title="Deselect" onClick={onDeselectAll} className="button secondary">DESELECT<span className="ui-icon ui-icon-squaresmall-minus"></span></button>
        </div>

        <div className="cell auto small-5 medium-5 large-5">
            <button type="button" title="Save Selected rows" onClick={onSaveSelectRow} className="button success" disabled={disableSave}>SAVE SELECT<span className="ui-icon ui-icon-disk"></span></button>    
            <button type="button" title="Print Selected to PDF" onClick={onPrintPDF} className="button primary" disabled={disablePrint}>PRINT SELECTED<span className="ui-icon ui-icon-print"></span></button>
        </div>

        <div className="cell shrink small-1 medium-1 large-1">
            <button type="button" title="Load .csv file" onClick={onLoadCSV} className="button primary">LOAD CSV<span className="ui-icon ui-icon-folder-open"></span></button>
        </div>
    </div>
</div>
    );
};

export default UnitEditorBar;