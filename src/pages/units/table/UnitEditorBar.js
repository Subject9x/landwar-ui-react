import React from "react";

function UnitEditorBar({onSelectAll, onDeselectAll, onDeleteSelectRow, onSaveSelectRow, onLoadCSV, onPrintPDF, totalCosts}){

    return(
<div className="grid-container fluid">
    <div className="grid-x grid-margin-x">
        <div className="cell shrink small-8 medium-8 large-8">
            <button type="button" title="Select All rows" onClick={onSelectAll} className="button primary">SELECT ALL<span className="ui-icon ui-icon-check"></span></button>
            <button type="button" title="Deselect All rows" onClick={onDeselectAll} className="button secondary">DESELECT ALL<span className="ui-icon ui-icon-squaresmall-minus"></span></button>
            <button type="button" title="Delete Selected rows" onClick={onDeleteSelectRow} className="button alert">DELETE SELECT<span className="ui-icon ui-icon-trash"></span></button>
            <button type="button" title="Save Selected rows" onClick={onSaveSelectRow} className="button success">SAVE SELECT<span className="ui-icon ui-icon-disk"></span></button>
            <button type="button" title="Load .csv file" onClick={onLoadCSV} className="button primary">LOAD CSV<span className="ui-icon ui-icon-folder-open"></span></button>
            <button type="button" title="Print Selected to PDF" onClick={onPrintPDF} className="button primary">PRINT SELECTED<span className="ui-icon ui-icon-print"></span></button>
        </div>
        <div className="cell auto small-4 medium-4 large-4">
            <table>
                <thead></thead>
                <tbody>
                    <tr>
                        <td><b>Base : </b>{totalCosts[0]}</td>
                        <td><b>TAGs : </b>{totalCosts[1]}</td>
                        <td><b>Complete : </b>{totalCosts[2]}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>
    );
};

export default UnitEditorBar;