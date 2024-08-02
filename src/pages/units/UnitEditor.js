import React from "react";

import UserInfoBar from "../../components/UserInfoBar";
import UnitEditorTable from "./UnitEditorTable";

function UnitEditor(){

    return(
<div className="grd">
    <div className="grd-row">
        <div className="grd-row-col-6"><UserInfoBar /></div>
    </div>

    <div className="grd-row">
        <div className="grd-row-col-3-6">
            Unit Set:<input type="text" />
        </div>
    </div>
    
    <div className="grd-row">
        <div className="grd-row-col-6">
            <UnitEditorTable />
        </div>
    </div>
</div>
    );  
};


export default UnitEditor;