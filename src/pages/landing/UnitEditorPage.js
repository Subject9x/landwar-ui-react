import React from 'react';
import NavBar from '../../components/NavBar';


function UnitEditorPage({props}){

    return(
    <div className="grid-container fluid">
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
        
        <div className="grid-x grid-margin-x row-fill-s row-fill row-fill-l"></div>
        <div className="grid-x grid-margin-x">
            <div className="cell auto small-12 medium-6 large-4 medium-offset-1 large-offset-2" >
                <a className="btn--green ui-icon-white" href="http://localhost:3000/editor/unit" target="_blank" rel="noopener noreferrer">
                    Create, edit, import, export Unit stats.
                </a>
            </div>
        </div>
    </div>
    )
};


export default UnitEditorPage;