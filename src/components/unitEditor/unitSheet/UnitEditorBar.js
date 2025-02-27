import React, {useRef} from "react";
import { parseCSVFileInput } from "../../Utils";


function UnitEditorBar({onSelectAll, onDeselectAll, onDeleteSelectRow, onSaveSelectRow, onLoadCSV, onPrintPDF, disableDelete, disableSave, disablePrint}){

    const importCSVRef = useRef(null);

    function handleImportClick(){
        importCSVRef.current.click();
    };

    async function handleImportCSVFileChange(event){
        const fileObj = event.target.files && event.target.files[0];
        if (!fileObj) {
            return;
        }

        event.target.value = null;

        const csv = await fileObj.text();
        let result = parseCSVFileInput(csv);
        
        onLoadCSV(result);
    }; 

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
            <button type="button" className="button primary" onClick={handleImportClick}>Import unit .csv</button>
            <input style={{ display: 'none' }} ref={importCSVRef} type="file" onChange={handleImportCSVFileChange} />
        </div>
    </div>
</div>
    );
};

export default UnitEditorBar;