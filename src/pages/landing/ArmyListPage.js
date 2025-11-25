import React from "react";
import NavBar from "../../components/NavBar";
import { parseCSVFileInput, basicImportUnits } from "../../components/Utils";

export default function ArmyListPage({props}){

    const printURL = process.env.REACT_APP_DOMAIN + "/print/units/";
    const templateURL = process.env.REACT_APP_DOMAIN + "/editor/army/0/";

    async function fetchTemplateFile (fileName){
        fetch("/data/units/"+fileName+".csv")
            .then(response => response.text() )
            .then((text)=>{
                
                let csvData = parseCSVFileInput(text);
                let parsedUnits = basicImportUnits(csvData);

                localStorage.setItem(fileName, parsedUnits);
                let editTemplateLink = document.getElementById("editATemplate");
                editTemplateLink.href = templateURL + fileName;
                editTemplateLink.click();
            });
    };

    async function printExampleList(e, fileName) {
        fetch("/data/lists/"+fileName+".csv")
            .then(response => response.text() )
            .then((text)=>{
                e.preventDefault();

                let csvData = parseCSVFileInput(text);
                let parsedUnits = basicImportUnits(csvData);

                let jsondat = JSON.stringify(parsedUnits);
                localStorage.setItem(fileName, jsondat);
                let printLink = document.getElementById("printUnits");
                printLink.href = printURL + fileName;
                printLink.click();
            });
    }

return(
<div className="grid-container fluid">
    <NavBar />
    <div className="grid-x grid-margin-x">
        <div className="cell auto small-12 medium-10 large-8 medium-offset-1 large-offset-2" >
            <h2>Army List Editor</h2>
        </div>
    </div>
    <div className="grid-x grid-margin-x">
        <div className="cell auto small-12 medium-10 large-8 medium-offset-1 large-offset-2" >
            <p>This tool will assist in making Army Lists for playing Scenarios in <i>LANDWAR</i></p>
            <p>
                Army Lists are built by loading Unit Data created by the <i>Unit Editor</i> tool, and then
                importing them to the Army List Editor.

                From there you can select which Units and how many of them to add to your force.

                Once satisfied, you can save the list to a new .csv, and/or print out a copy.
            </p>
            <p>*<i>.csv</i> files must have been written by the ArmyBuilder tool or formatted to its expected template.</p>
        </div>
    </div>
    <div className="grid-x grid-margin-x">
        <div className="cell auto small-12 medium-8 large-5 medium-offset-1 large-offset-2" >
            <a className="button success" href={process.env.REACT_APP_DOMAIN + "/editor/army"} target="_blank" rel="noopener noreferrer">Created, edit, upload, download army list .csv</a>
        </div>
    </div>
     
    <div className="grid-x grid-margin-x">
        <div className="cell auto small-12 medium-6 large-4 medium-offset-1 large-offset-2" >
            <h4>OR</h4>
        </div>
    </div>
    <div className="grid-x grid-margin-x">
        <div className="cell auto small-12 medium-6 large-4 medium-offset-1 large-offset-2 " >
            <h5>Example Lists</h5>
            <p>Click an example list to open a copy of the list in the Force Editor.</p>
        </div>
    </div>
    <div className="grid-x grid-margin-x">
        <div className="cell auto small-12 medium-10 large-8 medium-offset-1 large-offset-2 ">
            <div className="grid-x">
                <div className="cell auto small-4 medium-3 large-3 rulePanel" style={{textAlign:"center"}}>
                    <b>Beginner</b>
                    <p>units have no <i>TAGS</i>(special rules and abilities), we recommend using these for your first game of <i>LANDWAR</i>.</p>
                </div>
                <div className="cell auto small-4 medium-3 large-3 medium-offset-1 large-offset-1 rulePanel"  style={{textAlign:"center"}}>
                    <b>Intermediate</b>
                    <p>units have 1-2 <i>TAGS</i> to add some flavor while keeping things lightweight.</p>
                </div>
                <div className="cell auto small-4 medium-3 large-3 medium-offset-1 large-offset-1 rulePanel"  style={{textAlign:"center"}}>
                    <b>Advanced</b>
                    <p>units have 2-5+ <i>TAGS</i> to fully simulate unit types, weapons, and limitations.</p>
                </div>
            </div>
        </div>
    </div>
    <a id="editATemplate" style={{display:"none"}} href={templateURL} target="_blank" rel="noopener noreferrer" ></a>
    <a id="printUnits" style={{display:"none"}} href={printURL} target="_blank" rel="noopener noreferrer" ></a>
    <div className="grid-x ">
        <div className="cell auto small-10 medium-8 large-6 small-offset-1 medium-offset-2 large-offset-3" >
            <table>
                <thead>
                    <tr>
                        <th style={{textAlign : "center"}}>Army List</th>
                        <th style={{textAlign : "center"}}>Basic</th>
                        <th style={{textAlign : "center"}}>Intermediate</th>
                        <th style={{textAlign : "center"}}>Advanced</th>
                    </tr>
                </thead>
                <tbody style={{textAlign : "center"}}>
                    <tr>
                        <td><b>ShipWar</b>: Capital ship units, naval or space</td>
                        <td>
                            <button type='button' className='button primary' onClick={(e)=>{fetchTemplateFile("ShipWar_Basic")}}><icon className="fi-magnifying-glass"></icon></button> 
                            <button type='button' className='button secondary' onClick={(e)=>{printExampleList(e, "ShipWar_Basic")}}><icon className="fi-print"></icon></button>
                        </td>
                        <td>
                            <button type='button' className='button success' onClick={(e)=>{fetchTemplateFile("ShipWar_Intermediate")}}><icon className="fi-magnifying-glass"></icon></button>
                            <button type='button' className='button secondary' onClick={(e)=>{printExampleList(e, "ShipWar_Intermediate")}}><icon className="fi-print"></icon></button>
                        </td>
                        <td>
                            <button type='button' className='button warning' onClick={(e)=>{fetchTemplateFile("ShipWar_Advanced")}}><icon className="fi-magnifying-glass"></icon></button>
                            <button type='button' className='button secondary' onClick={(e)=>{printExampleList(e, "ShipWar_Advanced")}}><icon className="fi-print"></icon></button>
                        </td>
                    </tr>
                    <tr>
                        <td><b>MechWar</b>: Giant robots, tanks, etc.</td>
                        <td>
                            <button type='button' className='button primary' onClick={(e)=>{fetchTemplateFile("MekWar_Basic")}}><icon className="fi-magnifying-glass"></icon></button>
                            <button type='button' className='button secondary' onClick={(e)=>{printExampleList(e, "MekWar_Basic")}}><icon className="fi-print"></icon></button>
                        </td>
                        <td>
                            <button type='button' className='button success' onClick={(e)=>{fetchTemplateFile("MekWar_Intermediate")}}><icon className="fi-magnifying-glass"></icon></button>
                            <button type='button' className='button secondary' onClick={(e)=>{printExampleList(e, "MekWar_Intermediate")}}><icon className="fi-print"></icon></button>
                        </td>
                        <td>
                            <button type='button' className='button warning' onClick={(e)=>{fetchTemplateFile("MekWar_Advanced")}}><icon className="fi-magnifying-glass"></icon></button>
                            <button type='button' className='button secondary' onClick={(e)=>{printExampleList(e, "MekWar_Advanced")}}><icon className="fi-print"></icon></button>
                        </td>
                    </tr>
                    <tr> 
                        <td ><b>TankWar</b>: WW2 tanks and AFVs.</td>
                        <td>
                            <button type='button' className='button primary' onClick={(e)=>{fetchTemplateFile("TankWar_Basic")}}><icon className="fi-magnifying-glass"></icon></button>
                            <button type='button' className='button secondary' onClick={(e)=>{printExampleList(e, "TankWar_Basic")}}><icon className="fi-print"></icon></button>
                        </td>
                        <td>
                            <button type='button' className='button success' onClick={(e)=>{fetchTemplateFile("TankWar_Intermediate")}}><icon className="fi-magnifying-glass"></icon></button>
                            <button type='button' className='button secondary' onClick={(e)=>{printExampleList(e, "TankWar_Intermediate")}}><icon className="fi-print"></icon></button>
                        </td>
                        <td>
                            <button type='button' className='button warning' onClick={(e)=>{fetchTemplateFile("TankWar_Advanced")}}><icon className="fi-magnifying-glass"></icon></button>
                            <button type='button' className='button secondary' onClick={(e)=>{printExampleList(e, "TankWar_Advanced")}}><icon className="fi-print"></icon></button>
                        </td>
                    </tr>
                    <tr>
                        <td><b>GrimWar</b>: 15mm-32mm dismal future warfare</td>
                        <td>
                            <button type='button' className='button primary' onClick={(e)=>{fetchTemplateFile("GrimWar_Basic")}}><icon className="fi-magnifying-glass"></icon></button>
                            <button type='button' className='button secondary' onClick={(e)=>{printExampleList(e, "GrimWar_Basic")}}><icon className="fi-print"></icon></button>
                        </td>
                        <td>
                            <button type='button' className='button success' onClick={(e)=>{fetchTemplateFile("GrimWar_Intermediate")}}><icon className="fi-magnifying-glass"></icon></button>
                            <button type='button' className='button secondary' onClick={(e)=>{printExampleList(e, "GrimWar_Intermediate")}}><icon className="fi-print"></icon></button>
                        </td>
                        <td>
                            <button type='button' className='button warning' onClick={(e)=>{fetchTemplateFile("GrimWar_Advanced")}}><icon className="fi-magnifying-glass"></icon></button>
                            <button type='button' className='button secondary' onClick={(e)=>{printExampleList(e, "GrimWar_Advanced")}}><icon className="fi-print"></icon></button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>  
);
};