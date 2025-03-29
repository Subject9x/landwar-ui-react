import React from "react";
import NavBar from "../../components/NavBar";

export default function ArmyListPage({props}){

    async function fetchTemplateFile (fileName){
        fetch("/data/units/"+fileName+".csv")
            .then(response => response.text() )
            .then((text)=>{
                localStorage.setItem(fileName, text);
                let editTemplateLink = document.getElementById("editATemplate");
                editTemplateLink.href = "http://landwargame.net/editor/unit/0/"+fileName;
                editTemplateLink.click();
            });
    };

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
            <a className="button success" href="http://landwargame.net/editor/army" target="_blank" rel="noopener noreferrer">Created, edit, upload, download army list .csv</a>
        </div>
    </div>
    {/* 
    <div className="grid-x grid-margin-x">
        <div className="cell auto small-12 medium-6 large-4 medium-offset-1 large-offset-2" >
            <h4>OR</h4>
        </div>
    </div>
    <div className="grid-x grid-margin-x">
        <div className="cell auto small-12 medium-6 large-4 medium-offset-1 large-offset-2 " >
            <h5>Starter Templates</h5>
            <p>Click a template to open a copy of the template in the Unit Editor.</p>
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
    <div className="grid-x grid-margin-x">
        <div className="cell auto small-10 medium-8 large-6 small-offset-1 medium-offset-2 large-offset-3" >
            <table>
                <thead>
                    <tr>
                        <th style={{textAlign : "center"}}>Unit Set</th>
                        <th style={{textAlign : "center"}}>Basic</th>
                        <th style={{textAlign : "center"}}>Intermediate</th>
                        <th style={{textAlign : "center"}}>Advanced</th>
                    </tr>
                </thead>
                <tbody style={{textAlign : "center"}}>
                    <tr>
                        <td><b>ShipWar</b>: Capital ship units, naval or space</td>
                        <td><button type='button' className='button primary' onClick={(e)=>{fetchTemplateFile("ShipWar_Beginner")}}><icon className="fi-die-one"></icon></button></td>
                        <td><button type='button' className='button success' onClick={(e)=>{fetchTemplateFile("ShipWar_Intermediate")}}><icon className="fi-die-three"></icon></button></td>
                        <td><button type='button' className='button warning' onClick={(e)=>{fetchTemplateFile("ShipWar_Advanced")}}><icon className="fi-die-six"></icon></button></td>
                    </tr>
                    <tr>
                        <td><b>MechWar</b>: Giant robots, tanks, etc.</td>
                        <td><button type='button' className='button primary' onClick={(e)=>{fetchTemplateFile("MekWar_Beginner")}}><icon className="fi-die-one"></icon></button></td>
                        <td><button type='button' className='button success' onClick={(e)=>{fetchTemplateFile("MekWar_Intermediate")}}><icon className="fi-die-three"></icon></button></td>
                        <td><button type='button' className='button warning' onClick={(e)=>{fetchTemplateFile("MekWar_Advanced")}}><icon className="fi-die-six"></icon></button></td>
                    </tr>
                    <tr> 
                        <td ><b>TankWar</b>: WW2 tanks and AFVs.</td>
                        <td><button type='button' className='button primary' onClick={(e)=>{fetchTemplateFile("TankWar_Beginner")}}><icon className="fi-die-one"></icon></button></td>
                        <td><button type='button' className='button success' onClick={(e)=>{fetchTemplateFile("TankWar_Intermediate")}}><icon className="fi-die-three"></icon></button></td>
                        <td><button type='button' className='button warning' onClick={(e)=>{fetchTemplateFile("TankWar_Advanced")}}><icon className="fi-die-six"></icon></button></td>
                    </tr>
                    <tr>
                        <td><b>GrimWar</b>: 15mm-32mm dismal future warfare</td>
                        <td><button type='button' className='button primary' onClick={(e)=>{fetchTemplateFile("GrimWar_Beginner")}}><icon className="fi-die-one"></icon></button></td>
                        <td><button type='button' className='button success' onClick={(e)=>{fetchTemplateFile("GrimWar_Intermediate")}}><icon className="fi-die-three"></icon></button></td>
                        <td><button type='button' className='button warning' onClick={(e)=>{fetchTemplateFile("GrimWar_Advanced")}}><icon className="fi-die-six"></icon></button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>*/}
</div>  
);
};