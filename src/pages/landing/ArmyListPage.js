import React from "react";
import NavBar from "../../components/NavBar";

export default function ArmyListPage({props}){


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
            <a className="btn--green ui-icon-white" href="http://localhost:3000/editor/army" target="_blank" rel="noopener noreferrer">Created, edit, upload, download army list .csv</a>
        </div>
    </div>
</div>  
);
};