
import React, {useState, useEffect} from "react";
import UnitEditorBar from "./UnitEditorBar";
import UnitTableRow from "./UnitTableRow.js";
import UnitTagWindow from "../tagWindow/UnitTagWindow.js";

import {numRound2Decimal} from '../../Utils.js';
import { exportUnitToCSVRow, unitCSVColumns } from "../../data/unitInfo.js";

import { CSVLink } from "react-csv";

function UnitEditorTable({unitDataSet, worksheetName, unitRowDataChange, unitRowTagChange, handleDeleteUnits, handleAddNewUnit, handleRemoveRowLast, handleCopyUnits, handleImportCSV}){
    
    const [totalTagCost, setTotalTagCost] = useState(0);
    const [totalBaseCost, setTotalBaseCost] = useState(0);
    const [totalCosts, setTotalCosts] = useState(0);

    const [selectedRows, setSelectedRows] = useState([]);
    const [selectUnitId, setSelectUnitId] = useState(-1);
    const [disableAdd, setDisableAdd] = useState(false);
    const [disableRemove, setDisableRemove] = useState(true);
    const [disableCopy, setDisableCopy] = useState(false);

    const [downloadUnits, setDownloadUnits] = useState(null);

    const [disabledSave, setDisabledSave] = useState(true);
    const [disabledPrint, setDisabledPrint] = useState(true);
    const [disabledDelete, setDisabledDelete] = useState(true);

    function onSelectAll(){
        let selected = unitDataSet.map(item => item.id);
        if(selected.length === 0){
            return;
        }
        setSelectedRows(selected);
        setDisabledSave(false);
        setDisabledDelete(false);
        setDisabledPrint(false);
    };

    function onDeselectAll(){
        setSelectedRows([]);
        setDisabledSave(true);
        setDisabledDelete(true);
        setDisabledPrint(true);
    };

    function onSaveSelectRow(){
        let saveUnits = unitDataSet.filter(({id}) => (selectedRows.includes(id)));
        let exportUnits = [];
        saveUnits.forEach((unit)=>{
            exportUnits = [...exportUnits, exportUnitToCSVRow(unit)];
        })
        
        setTimeout(()=>{setDownloadUnits(exportUnits);}, 200);
    };

    function onDeleteRows(){
        handleDeleteUnits(selectedRows);
        setSelectedRows([]);
    }

    function onPrintPDF(e){
        e.preventDefault();
        if(worksheetName === undefined || worksheetName === null || worksheetName.length === 0 || worksheetName === ""){
            console.log("error, missing worksheet name for printing!");
            //TODO
            return;
        }
        if(unitDataSet.length <= 0){
            console.log("error, no units to print!");
            //TODO
            return;
        }
        localStorage.setItem(worksheetName, JSON.stringify(unitDataSet));
        let printLink = document.getElementById("printUnits");
        printLink.click();
    };

    function onAddNewUnit(){

        handleAddNewUnit();
        setDisableRemove(false);
    }

    function onRemoveLastRow(){
        //FIXME
        handleRemoveRowLast();
    };

    function onCopyUnits(){
        let unitsCopy = [];
        if(selectedRows.length > 0){
            unitsCopy = [...unitsCopy, unitDataSet.filter(({id})=>(selectedRows.includes(id)))];
        }
        else{
            if(unitDataSet.length !== 0){
                unitsCopy = [...unitsCopy, unitDataSet[unitDataSet.length - 1]];
            }
            
        }
        handleCopyUnits(unitsCopy);
    };

    //ROW CONTROLLERS
    function handleRowClickCheck(e){
        const { id, checked } = e.target;
        const idx = Number(id); //grumble - weakly typed langs...
        let updateChecks = [...selectedRows];
        if(checked && !selectedRows.includes(idx)){
            updateChecks = [...updateChecks, idx];
        }
        if (!checked){
            updateChecks = updateChecks.filter(item => item !== idx);
        }

        if(updateChecks.length === 0){
            setDisabledSave(true);
            setDisabledDelete(true);
            setDisabledPrint(true);
        }
        else{
            setDisabledSave(false);
            setDisabledDelete(false);
            setDisabledPrint(false);
        }
        setSelectedRows(updateChecks);
    };
    function onClickTags(rowId){
        setSelectUnitId(rowId);
    };
    function onCloseTagWindow(){
        setSelectUnitId(-1);
    };

    useEffect(() => {
        let base = 0;
        let tags = 0;
        let total = 0;
        unitDataSet.forEach(unit => {
            base += unit['points'];
            tags += unit['tagTotal'];
            total += unit['completeTotal'];
        });
        setTotalBaseCost(numRound2Decimal(base));
        setTotalTagCost(numRound2Decimal(tags));
        setTotalCosts(numRound2Decimal(total));

        if(unitDataSet.length === 0){
            setDisabledSave(true);
            setDisabledDelete(true);
            setDisabledPrint(true);
        }
    }, [unitDataSet, selectedRows, selectUnitId, downloadUnits]) 

    return (
<div className="grid-x grid-margin-x">
    <div className="cell auto">
        <div className="grid-x">
            <div className="cell auto">
                <a id="printUnits" style={{display:"none"}} href={"http://localhost:3000/print/units/" + worksheetName}target="_blank" rel="noopener noreferrer" />
            </div>
        </div>

        {(downloadUnits !== null) &&
            <div className="grid-x grid-margin-x">
                <div className="cell small-auto medium-auto large-10 large-offset-1">
                    <CSVLink 
                        data={downloadUnits} 
                        headers={unitCSVColumns} 
                        enclosingCharacter={""}
                        separator={","}
                        filename={worksheetName}
                        className="button primary" 
                        onClick={(e)=>{setDownloadUnits(null);}}>Download {worksheetName}.csv</CSVLink>
                </div>
            </div>
        }
        {/* 
            Tag Editor replaces unit editor DURING tag editing user operations.
        */}
        {(selectUnitId !== -1) &&     
            <div className="grid-x grid-margin-x" >
                <div className="cell small-auto medium-10 large-8 large-offset-2 medium-offset-1">
                    <UnitTagWindow rowId={selectUnitId} unitData={unitDataSet.find(({id})=>(id===selectUnitId))} handleWindowClose={()=>{onCloseTagWindow()}} handleWindowSave={()=>{onCloseTagWindow()}} handleUnitDataUpdate={unitRowTagChange}/>
                </div>
            </div>
        }
        {/* 
            Show Unit Editor table when NOT viewing tags
        */}
        {(selectUnitId === -1) &&
        (<div className="grid-x grid-margin-x">
            <div className="cell small-9 medium-8 large-5 large-offset-1">
                <UnitEditorBar onSelectAll={onSelectAll}
                    onDeselectAll={onDeselectAll}
                    onDeleteSelectRow={onDeleteRows}
                    onSaveSelectRow={onSaveSelectRow}
                    onLoadCSV={handleImportCSV}
                    onPrintPDF={onPrintPDF}
                    disableSave={disabledSave}
                    disablePrint={disabledPrint}
                    disableDelete={disabledDelete}
                />
            </div>
            <div className="cell shrink small-3 medium-4 large-3 large-offset-2">
                <table id="tagRulesListPanel">
                    <thead>
                        <tr>
                            <th><b>Base</b></th>
                            <th><b>TAGs</b></th>
                            <th><b>Total</b></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{totalBaseCost}</td>
                            <td>{totalTagCost}</td>
                            <td>{totalCosts}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        )}
        {(selectUnitId === -1) &&
        (<div className="grid-x grid-margin-x">
            <div className="cell small-auto medium-auto large-10 large-offset-1">
                <table id="unitTable" className="hover">
                    <thead>
                        <tr key={0} className="unitTableHead">
                            <th></th>
                            <th>Name</th>
                            <th>Size</th>
                            <th>Move</th>
                            <th>Evade</th>
                            <th>DMG Melee </th>
                            <th>DMG Range</th>
                            <th>Range</th>
                            <th>Armor</th>
                            <th>Base Cost</th>
                            <th>TAG Cost</th>
                            <th>Total</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>  
                        {unitDataSet.map((item, idx)=>(
                            <UnitTableRow key={item.id} rowId={item.id} rowData={item} handleRowDataUpdate={unitRowDataChange} hasCheck={selectedRows.includes(item.id)} handleRowClickCheck={handleRowClickCheck} handleRowTagsClick={onClickTags}/>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
        )}
        {(selectUnitId === -1) && 
        <div className="grid-x grid-margin-x">
            <div className="cell auto small-3 medium-2 large-1 large-offset-1">
                <table>
                    <tbody>
                        <tr>
                            <td><button type="button" id="btnAddUnit" title="Add row to bottom" className="button success" onClick={(e)=>{onAddNewUnit();}} disabled={disableAdd}><i className="fi-plus"></i></button></td>
                            <td><button type="button" id="btnRemoveUnit" title="Delete LAST row" className="button alert" onClick={(e)=>{onRemoveLastRow();}} disabled={disableRemove}><i className="fi-x"></i></button></td>
                            <td><button type="button" id="btnCopyUnit" title="Copy LAST row" className="button secondary" onClick={(e)=>{onCopyUnits();}} disabled={disableCopy}><i className="fi-clipboard"></i></button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div> }
    </div>
</div>
    );
};

export default UnitEditorTable;