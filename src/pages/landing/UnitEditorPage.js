import React from 'react';


function UnitEditorPage(){

    return(
    <div className="grd">
        <div className="grd-row">
            <div className="grd-row-col-4--sm grd-row-col-4--md grd-row-col-5-lg txt--center">
                <h3>Unit Editor - Core</h3>
            </div>
        </div>
        
        <div className="grd-row">
            <div className="grd-row-col-4--sm grd-row-col-3--md grd-row-col-2--lg">
                <p>
                    The Unit Editor is a spread-sheet style tool that allows players to generate game stats for any type of unit they can think of.
                </p>
                <p>
                    Starting a new sheet or opening an existing <i>.csv*</i> file will open a new window for editing.
                    Template unit lists can be found with the folder this app came in, or on the LANDWAR itch.io site.
                </p>
                <p>
                    *<i>.csv</i> files must have been written by the UnitBuilder tool or formatted to its expected template.
                </p>
            </div>
        </div>
        
        <div className="grd-row row-fill-s row-fill row-fill-l"></div>
        
        <div className="grd-row">
            <div className="grd-row-col-4-6--sm grd-row-col-3-6--md grd-row-col-2-6--lg">
                <button type="button" title="Create blank Unit Editor Sheet" onclick="ub_control_sheet_new();" className="btn--green ui-icon-white"><span className="ui-icon ui-icon-document"></span></button>
                <button type="button" title="Open a valid Unit Editor or Army List CSV." onclick="ub_control_sheet_import();" className="btn--blue ui-icon-white"><span className="ui-icon ui-icon-folder-open"></span></button>
            </div>
        </div>
    </div>
    )
};


export default UnitEditorPage;