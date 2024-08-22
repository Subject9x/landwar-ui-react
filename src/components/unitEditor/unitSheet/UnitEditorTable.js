
import React, {useState, useEffect, useCallback} from "react";
import UnitEditorBar from "./UnitEditorBar";
import UnitTableRow from "./UnitTableRow.js";
import UnitTagWindow from "../tagWindow/UnitTagWindow.js";

import {numRound2Decimal} from '../../Utils.js';
import {file_exportUnit_csv} from '../FileHandler.js';

import { CSVLink } from "react-csv";

function UnitEditorTable({unitDataSet, unitRowDataChange, unitRowTagChange, handleDeleteUnits, handleAddNewUnit, handleRemoveRowLast, handleCopyUnits}){
    
    
    
    //CSV download column-mappings
    const unitColumns = [{label : 'unitName', key : 'unitName'}, {label : 'size', key : 'unitName'}, {label : 'move', key : 'unitName'}, 
        {label : 'evade', key : 'unitName'},{label : 'dmgMelee', key : 'unitName'}, {label : 'dmgRange', key : 'unitName'}, {label : 'range', key : 'unitName'},
        {label : 'armor', key : 'unitName'}, {label : 'tags', key : 'unitName'}, {label : 'points', key : 'unitName'}, {label : 'tagTotal', key : 'unitName'},
        {label : 'completeTotal', key : 'unitName'}];
    
    const [totalTagCost, setTotalTagCost] = useState(0);
    const [totalBaseCost, setTotalBaseCost] = useState(0);
    const [totalCosts, setTotalCosts] = useState(0);

    const [selectedRows, setSelectedRows] = useState([]);
    const [selectUnitId, setSelectUnitId] = useState(-1);
    const [disableAdd, setDisableAdd] = useState(false);
    const [disableRemove, setDisableRemove] = useState(true);
    const [disableCopy, setDisableCopy] = useState(false);

    const [downloadUnits, setDownloadUnits] = useState(null);
    const [downloadReady, setDownloadReady] = useState(false);

    const [disabledSave, setDisabledSave] = useState(true);
    const [disabledPrint, setDisabledPrint] = useState(true);
    const [disabledDelete, setDisabledDelete] = useState(true);

    function onSelectAll(){
        setSelectedRows(unitDataSet.map(item => item.id));
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
        let saveUnits = [];
        selectedRows.forEach(id => {
            saveUnits = [...saveUnits, file_exportUnit_csv(unitDataSet[id])];
        });
        
        setDownloadUnits(saveUnits);
    };

    function onDeleteRows(){
        handleDeleteUnits(selectedRows);
        setSelectedRows([]);
    }

    function onLoadCSV(){
        console.log("onLoadCSV");
    };

    function onPrintPDF(){
        console.log("onPrintPDF");
    };

    function onAddNewUnit(){

        handleAddNewUnit();
        setDisableRemove(false);
    }

    function onRemoveLastRow(){
        if(unitDataSet.length === 1){
            setDisableRemove(true);
        }
        setSelectedRows(selectedRows.filter(item => item !== unitDataSet.length));
        handleRemoveRowLast();
    };

    function onCopyUnits(){
        let unitsCopy = [];
        if(selectedRows.length > 0){
            selectedRows.forEach(rid => {
                unitsCopy = [...unitsCopy, unitDataSet[rid]];
            });
        }
        else{
            unitsCopy = [...unitsCopy, unitDataSet[unitDataSet.length - 1]];
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

    }, [unitDataSet, selectedRows, selectUnitId, downloadUnits]) 

    return (
<div className="cell auto">
    <div className="grid-x grid-margin-x" >
        <div className="cell auto small-10 medium-10 large-8 small-offset-1 medium-offset-1 large-offset-2" >
            <div className="grid-x" >
                <div className="cell shrink small-5 medium-4 large-2 small-offset-1 medium-offset-1 large-offset-1">
                    <h4>Total costs</h4>
                </div>
                <div className="cell auto small-5 medium-5 large-5">
                    <table id="tagRulesListPanel">
                        <thead></thead>
                        <tbody>
                            <tr>
                                <td><b>Base : </b>{totalBaseCost}</td>
                                <td><b>TAGs : </b>{totalTagCost}</td>
                                <td><b>Complete : </b>{totalCosts}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        
    </div>
    {(selectUnitId !== -1) && (downloadReady === true) &&
        <div className="grid-x grid-margin-x">
            {(downloadUnits !== null) && 
            <div className="cell small-auto medium-auto large-10 large-offset-1">
                <CSVLink data={downloadUnits} headers={unitColumns} separator={","} className="button primary" onClick={(e)=>{setDownloadUnits(null);}}>Download Ready</CSVLink>
            </div>
            }
        </div>
    }
    {/* 
        Tag Editor replaces unit editor DURING tag editing user operations.
    */}
    {(selectUnitId !== -1) &&     
        <div className="grid-x grid-margin-x" >
            <div className="cell small-auto medium-10 large-8 large-offset-2 medium-offset-1">
                <UnitTagWindow rowId={selectUnitId} unitData={unitDataSet[selectUnitId]} handleWindowClose={onCloseTagWindow} handleWindowSave={onCloseTagWindow} handleUnitDataUpdate={unitRowTagChange}/>
            </div>
        </div>
    }
    {/* 
        Show Unit Editor table when NOT viewing tags
    */}
    {(selectUnitId === -1) &&
    (<div className="grid-x grid-margin-x">
        <div className="cell small-auto medium-auto large-10 large-offset-1">
            <UnitEditorBar onSelectAll={onSelectAll}
                onDeselectAll={onDeselectAll}
                onDeleteSelectRow={onDeleteRows}
                onSaveSelectRow={onSaveSelectRow}
                onLoadCSV={onLoadCSV}
                onPrintPDF={onPrintPDF}
                disableSave={disabledSave}
                disablePrint={disabledPrint}
                disableDelete={disabledDelete}
            />
        </div>
    </div>
    )}
    {(selectUnitId === -1) &&
    (<div className="grid-x grid-margin-x">
        <div className="cell small-auto medium-auto large-10 large-offset-1">
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
                        <th>Base Cost</th>
                        <th>TAG Cost</th>
                        <th>Total</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>  
                    {unitDataSet.map((item, idx)=>(
                        <UnitTableRow key={idx} rowId={idx} rowData={item} handleRowDataUpdate={unitRowDataChange} hasCheck={selectedRows.includes(idx)} handleRowClickCheck={handleRowClickCheck} handleRowTagsClick={onClickTags}/>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
    )}
    {(selectUnitId === -1) && 
    <div className="grid-x grid-margin-x">
        <div className="cell shrink small-1 medium-1 large-1 medium-offset-1 large-offset-2">
            <button type="button" id="btnAddUnit" title="Add row to bottom" className="button sucesss" onClick={(e)=>{onAddNewUnit();}} disabled={disableAdd}>ADD UNIT<span className="ui-icon ui-icon-plusthick"></span></button>
        </div>
        <div className="cell shrink small-1 medium-1 large-1">
            <button type="button" id="btnRemoveUnit" title="Delete LAST row" className="button alert" onClick={(e)=>{onRemoveLastRow();}} disabled={disableRemove}>DELETE LAST<span className="ui-icon ui-icon-minusthick"></span></button>
        </div>
        <div className="cell shrink small-1 medium-1 large-1">
            <button type="button" id="btnCopyUnit" title="Copy LAST row" className="button secondary" onClick={(e)=>{onCopyUnits();}} disabled={disableCopy}>COPY LAST<span className="ui-icon ui-icon-copy"></span></button>
        </div>
    </div> }
</div>
    );
};

export default UnitEditorTable;