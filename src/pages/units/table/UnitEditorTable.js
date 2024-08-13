import React, {useState, useEffect, useCallback} from "react";
import UnitEditorBar from "./UnitEditorBar";
import UnitTableRow from "./UnitTableRow.js";
import UnitTagWindow from "../tagWindow/UnitTagWindow.js";

import {calculateUnitBaseCost, calculateUnitTagCost} from "./../../../components/data/UnitCalculator.js";
import TagList from "../tagWindow/TagList.js";
import {tagInfo} from '../../../components/data/tagInfo.js';

function UnitEditorTable(){

    const unitColumns = ['name', 'size', 'move', 'evade', 'dmg_m', 'dmg_r', 'range', 'armor', 'tags', 'baseCost', 'tagCost', 'total']

    const [totalCosts, setTotalCosts] = useState([0,0,0]);    
    const [selectedRows, setSelectedRows] = useState([]);
    const [unitRows, setUnitRows] = 
        useState([{'id':0, 'name':"", 'size':0, 'move':0, 'evade':0, 'dmg_m':0, 'dmg_r':0, 'range':0, 'armor':0, 'tags':['FRLS'], 'baseCost':0, 'tagCost':0, 'total':0}]);

    const [selectUnitId, setSelectUnitId] = useState(0);
    const [disableAdd, setDisableAdd] = useState(false);
    const [disableRemove, setDisableRemove] = useState(false);
    const [disableCopy, setDisableCopy] = useState(false);

    const [showTagEdit, setShowTagEdit] = useState(false);

    function onSelectAll(){
        setSelectedRows(unitRows.map(item => item.id));
    }

    function onDeselectAll(){
        setSelectedRows([]);
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


    function RowAddNew() {
        if(disableCopy){
            setDisableCopy(false);
        }
        if(disableRemove){
            setDisableRemove(false);
        }
        const row = {id : unitRows.length, 'name':"", 'size':0, 'move':0, 'evade':0, 'dmg-m':0, 'dmg-r':0, 'range':0, 'armor':0, 'tags':[], 'baseCost':0, 'tagCost':0, 'total':0};
        setUnitRows([...unitRows, row]);
    }

    function RowRemoveLast(){
        if(unitRows.length < 2){
            setDisableCopy(true);
            setDisableRemove(true);
        }
        const unitId = unitRows.pop().id;
        setSelectedRows(selectedRows.filter(item => item !== unitId));
        setUnitRows(unitRows.filter(item => item.id !== unitId));
        
    }
    function RowCopyUnits(){

    }


    function onUnitRowTags(rowId){
        console.log(rowId);
    }

    //ROW CONTROLLERS
    function handleRowClickCheck(e){
        const { id, checked } = e.target;
        const idx = Number(id); //grumble - weakly typed langs...
        if(checked && !selectedRows.includes(idx)){
            setSelectedRows([...selectedRows, idx]);   
        }
        if (!checked){
            setSelectedRows(selectedRows.filter(item => item !== idx));
        }
      };

    function updateRowData(unitRowId, columnName, val){
        
        const tmpRows = [...unitRows];
        let tmpUnit = unitRows[unitRowId];


        tmpUnit[columnName] = val;
        
        //update costs
        if(columnName === "name"){
            tmpUnit[columnName] = val;
        }
        else{
            tmpUnit[columnName] = Number(val);
            tmpUnit = calculateUnitBaseCost(tmpUnit);

            let removeTag = [];

            tmpUnit['tags'].forEach(tag => {
                if(tagInfo['data'].find(item => item.abrv === tag).reqs(tmpUnit).length > 0 ){
                    removeTag = [...removeTag, tag];
                }
            });

            let cleanExclusion = [];
            removeTag.forEach(tag => {
                tmpUnit['tags'] = tmpUnit['tags'].filter(item => item !== tag);
            });

            tmpUnit = calculateUnitTagCost(tmpUnit);
        }
        
        //bind changes
        tmpRows[unitRowId] = tmpUnit;
        
        //update table data
        setUnitRows(tmpRows);
    }


    function onClickTags(rowId){
        setSelectUnitId(rowId);
        setShowTagEdit(true);
    }

    function onCloseTagWindow(){
        setShowTagEdit(false);
    }

    useEffect(() => {

    }, [unitRows, selectedRows, showTagEdit, selectUnitId]) 

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
    {showTagEdit &&     
        <div className="grid-x grid-margin-x" >
            <div className="cell small-10 medium-8 large-6">
                <UnitTagWindow unitData={unitRows[selectUnitId]} handleWindowClose={onCloseTagWindow} handleWindowSave={onCloseTagWindow}/>
            </div>
        </div>
    }

    <div className="grid-x grid-margin-x">
        <div className="cell auto">
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
                        <UnitTableRow key={idx} rowId={idx} rowData={unitRows} handleRowDataUpdate={updateRowData} hasCheck={selectedRows.includes(idx)} handleRowClickCheck={handleRowClickCheck} handleRowTagsClick={onClickTags}/>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
    <div className="grid-x grid-margin-x">
        <div className="cell shrink">
            <button type="button" id="btnAddUnit" title="Add row to bottom" className="button sucesss" onClick={RowAddNew} disabled={disableAdd}>ADD UNIT<span className="ui-icon ui-icon-plusthick"></span></button>
            <button type="button" id="btnRemoveUnit" title="Delete LAST row" className="button alert" onClick={RowRemoveLast} disabled={disableRemove}>DELETE LAST<span className="ui-icon ui-icon-minusthick"></span></button>
            <button type="button" id="btnCopyUnit" title="Copy LAST row" className="button secondary" onClick={RowCopyUnits} disabled={disableCopy}>COPY LAST<span className="ui-icon ui-icon-copy"></span></button>
        </div>
    </div> 
</div>
    );
};

export default UnitEditorTable;