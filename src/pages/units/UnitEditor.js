import React from "react";

import UserInfoBar from "../../components/UserInfoBar";
import UnitEditorTable from "./UnitEditorTable";

function UnitEditor(){

    return(
<div className="grid-container fluid">
    <div className="grid-x grid-margin-x">
        <div className="cell small-4"><UserInfoBar /></div>
    </div>

    <div className="grid-x grid-margin-x">
        <div className="cell small-8">
            Unit Set:<input type="text" />
        </div>
    </div>
    
    <div className="grid-x grid-margin-x">
            <UnitEditorTable />
    </div>
</div>
    );  
};


export default UnitEditor;