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
<div className="grid-x">
    <div className="cell shrink">
        <table>
            <tbody>
                <tr>
                    <td><button type="button" title="Delete" onClick={()=>{onDeleteSelectRow()}} className="button alert" disabled={disableDelete}><i className="fi-trash"></i></button></td>
                    <td><button type="button" title="Select +" onClick={()=>{onSelectAll()}} className="button primary"><i className="fi-check"></i></button></td>
                    <td><button type="button" title="Deselect" onClick={()=>{onDeselectAll()}} className="button secondary"><i className="fi-minus"></i></button></td>
                    <td><button type="button" title="Save Selected rows" onClick={()=>{onSaveSelectRow()}} className="button success" disabled={disableSave}><i className="fi-download"></i></button>    </td>
                    <td><button type="button" title="Print Selected to PDF" onClick={(e)=>{onPrintPDF(e)}} className="button primary" disabled={disablePrint}><i className="fi-print"></i></button></td>
                    <td><button type="button" className="button primary" onClick={()=>{handleImportClick()}}><i className="fi-upload"></i></button>
                    <input style={{ display: 'none' }} ref={importCSVRef} type="file" onChange={(event)=>{handleImportCSVFileChange(event)}} /></td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
    );
};

export default UnitEditorBar;