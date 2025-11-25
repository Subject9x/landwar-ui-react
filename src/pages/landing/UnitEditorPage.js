import React from 'react';
import NavBar from '../../components/NavBar';


function UnitEditorPage({props}){

    async function fetchTemplateFile (fileName){
        fetch("/data/units/"+fileName+".csv", {headers:{
            'Content-Type' : 'application/csv',
            'Accept' : 'application/csv'
        }})
            .then(response => response.text() )
            .then((text)=>{
                localStorage.setItem(fileName, text);
                let editTemplateLink = document.getElementById("editATemplate");
                editTemplateLink.href = process.env.REACT_APP_DOMAIN + "/editor/unit/0/"+fileName;
                editTemplateLink.click();
            });
    };

    return(
    <div className="grid-container fluid">
        <a id="editATemplate" style={{display:"none"}} href={process.env.REACT_APP_DOMAIN +"/editor/unit"} target="_blank" rel="noopener noreferrer" ></a>
        <NavBar />
        <div className="grid-x grid-margin-x">
            <div className="cell auto small-12 medium-10 large-8 medium-offset-1 large-offset-2" >
                <h2>Unit Editor</h2>
            </div>
        </div>
        
        <div className="grid-x grid-margin-x">
            <div className="cell auto small-12 medium-10 large-8 medium-offset-1 large-offset-2">
                <p>The Unit Editor is a spread-sheet style tool that allows players to generate game stats for any type of unit they can think of.</p>
                <p>
                    Starting a new sheet or opening an existing <i>.csv*</i> file will open a new window for editing.
                    Template unit lists can be found with the folder this app came in, or on the LANDWAR itch.io site.
                </p>
                <p>*<i>.csv</i> files must have been written by the UnitBuilder tool or formatted to its expected template.</p>
            </div>
        </div>
        
        <div className="grid-x grid-margin-x">
            <div className="cell auto small-12 medium-6 large-4 medium-offset-1 large-offset-2" >
                <a className="button success" href={process.env.REACT_APP_DOMAIN + "/editor/unit"} target="_blank" rel="noopener noreferrer">
                    Create, edit, import, export Unit stats.
                </a>
            </div>
        </div>
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
                            <td><button type='button' className='button primary' onClick={(e)=>{fetchTemplateFile("ShipWar_Basic")}}><icon className="fi-die-one"></icon></button></td>
                            <td><button type='button' className='button success' onClick={(e)=>{fetchTemplateFile("ShipWar_Intermediate")}}><icon className="fi-die-three"></icon></button></td>
                            <td><button type='button' className='button warning' onClick={(e)=>{fetchTemplateFile("ShipWar_Advanced")}}><icon className="fi-die-six"></icon></button></td>
                        </tr>
                        <tr>
                            <td><b>MechWar</b>: Giant robots, tanks, etc.</td>
                            <td><button type='button' className='button primary' onClick={(e)=>{fetchTemplateFile("MekWar_Basic")}}><icon className="fi-die-one"></icon></button></td>
                            <td><button type='button' className='button success' onClick={(e)=>{fetchTemplateFile("MekWar_Intermediate")}}><icon className="fi-die-three"></icon></button></td>
                            <td><button type='button' className='button warning' onClick={(e)=>{fetchTemplateFile("MekWar_Advanced")}}><icon className="fi-die-six"></icon></button></td>
                        </tr>
                        <tr> 
                            <td ><b>TankWar</b>: WW2 tanks and AFVs.</td>
                            <td><button type='button' className='button primary' onClick={(e)=>{fetchTemplateFile("TankWar_Basic")}}><icon className="fi-die-one"></icon></button></td>
                            <td><button type='button' className='button success' onClick={(e)=>{fetchTemplateFile("TankWar_Intermediate")}}><icon className="fi-die-three"></icon></button></td>
                            <td><button type='button' className='button warning' onClick={(e)=>{fetchTemplateFile("TankWar_Advanced")}}><icon className="fi-die-six"></icon></button></td>
                        </tr>
                        <tr>
                            <td><b>GrimWar</b>: 15mm-32mm dismal future warfare</td>
                            <td><button type='button' className='button primary' onClick={(e)=>{fetchTemplateFile("GrimWar_Basic")}}><icon className="fi-die-one"></icon></button></td>
                            <td><button type='button' className='button success' onClick={(e)=>{fetchTemplateFile("GrimWar_Intermediate")}}><icon className="fi-die-three"></icon></button></td>
                            <td><button type='button' className='button warning' onClick={(e)=>{fetchTemplateFile("GrimWar_Advanced")}}><icon className="fi-die-six"></icon></button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    )
};


export default UnitEditorPage;