import React, {useState, useEffect, useCallback} from "react";

import UnitEditorBar from "./UnitEditorBar";
import UnitTableRow from "./UnitTableRow";
import DataTable from "react-data-table-component";

function UnitEditorTable(){

    const unitColumns = ['select','name', 'size', 'move', 'evade', 'dmg_m', 'dmg_r', 'range', 'armor', 'tags', 'baseCost', 'tagCost', 'total']

    const [totalCosts, setTotalCosts] = useState([0,0,0]);    
    const [unitRows, setUnitRows] = useState([{'select':false, 'name':"", 'size':0, 'move':0, 'evade':0, 'dmg_m':0, 'dmg_r':0, 'range':0, 'armor':0, 'tags':[], 'baseCost':0, 'tagCost':0, 'total':0}]);
    const [rowCount, setRowCount] = useState(0);

    const [disableAdd, setDisableAdd] = useState(false);
    const [disableRemove, setDisableRemove] = useState(false);
    const [disableCopy, setDisableCopy] = useState(false);

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


    const btnAddRow = () =>{
        if(disableCopy){
            setDisableCopy(false);
        }
        if(disableRemove){
            setDisableRemove(false);
        }
        const row = {'select':false, 'name':"", 'size':0, 'move':0, 'evade':0, 'dmg-m':0, 'dmg-r':0, 'range':0, 'armor':0, 'tags':[], 'baseCost':0, 'tagCost':0, 'total':0};
        setUnitRows([...unitRows, row]);
    }
    function btnRemoveRow(){
        if(unitRows.length < 2){
            setDisableCopy(true);
            setDisableRemove(true);
        }
        setUnitRows(unitRows.slice(0, unitRows.length-1));
        
    }
    function btnCopyUnits(){

    }

    function onUnitRowChange(rowId, col, value){
        const tmpRows = [...unitRows];
        const tmpUnit = unitRows[rowId-1];
        tmpUnit[col] = value
        
        tmpRows[rowId-1] = tmpUnit;
        setUnitRows(tmpRows);
    }

    function onUnitRowTags(rowId){
        console.log(rowId);
    }

    useEffect(() => {}, [unitRows]) 

    return (
<div className="grid-container fluid">
    <div className="grid-x grid-margin-x">
        <div className="cell medium-10 large-8">
            <UnitEditorBar onSelectAll={onSelectAll}
                onDeselectAll={onDeselectAll}
                onDeleteSelectRow={onDeleteSelectRow}
                onSaveSelectRow={onSaveSelectRow}
                onLoadCSV={onLoadCSV}
                onPrintPDF={onPrintPDF}
                totalCosts={totalCosts}
            />
        </div>
    </div>

    <div className="grid-x grid-margin-x">
        <div className="cell">
            <table id="unitTable">
                <thead>
                    <tr key={0} className="unitTableHead">
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
                    {unitRows.map((item, idx)=>(
                        <UnitTableRow key={idx + 1} rowId={idx + 1} rowData={item} onRowChange={onUnitRowChange} onRowTagsClick={onUnitRowTags}/>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
    <div className="grid-x grid-margin-x">
        <div className="cell shrink">
            <button type="button" id="btnAddUnit" title="Add row to bottom" className="button sucesss" onClick={btnAddRow} disabled={disableAdd}>ADD UNIT<span className="ui-icon ui-icon-plusthick"></span></button>
            <button type="button" id="btnRemoveUnit" title="Delete LAST row" className="button alert" onClick={btnRemoveRow} disabled={disableRemove}>DELETE LAST<span className="ui-icon ui-icon-minusthick"></span></button>
            <button type="button" id="btnCopyUnit" title="Copy LAST row" className="button secondary" onClick={btnCopyUnits} disabled={disableCopy}>COPY LAST<span className="ui-icon ui-icon-copy"></span></button>
        </div>
    </div> 
</div>
    );
};

export default UnitEditorTable;