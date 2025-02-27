import React from "react";
import UnitInfoCard from "../../components/printUnits/UnitInfoCard";

export default function UnitPrintedPage({unitData}){
 
    return(
        <div className="grid-x">
            {unitData.map((unit, id) => (
                <UnitInfoCard unitInfo={unit} />
            ))}
        </div>
    );
};