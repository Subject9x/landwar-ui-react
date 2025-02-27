import React, {useEffect} from "react";

import '../../css/unitcard.css';

export default function UnitInfoCard({unitInfo}){



    return(
<div className="uic-main-sm" >
    <div className="uic-header-row-sm">
        <div className="uic-info-panel-sm">
            <div className="uic-name-sm" id="ucName"><label id="ucName">{unitInfo['name']}</label></div>
            <div className="uic-stat-row-sm">
                <div className="uic-stat-row-label-sm"><label id="ucSize">{unitInfo['size']}</label></div>
                <div className="uic-stat-row-fill-sm"></div>
                <div className="uic-stat-row-label-sm"><label id="ucMove">{unitInfo['move']}</label></div>
                <div className="uic-stat-row-fill-sm"></div>
                <div className="uic-stat-row-label-sm"><label id="ucEvade">{unitInfo['evade']}</label></div>
                <div className="uic-stat-row-fill-sm"></div>
                <div className="uic-stat-row-label-sm"><label id="ucArmor">{unitInfo['armor']}</label></div>
            </div>
        </div>
        <div className="uic-points-sm" ><label id="ucPoints" >{Math.round(unitInfo['completeTotal'] + Number.EPSILON)}</label></div>
    </div>
    <div className="uic-atk-tag-row-sm">
        <div className="uic-attack-panel-sm">
            <div className="uic-stat-row-label-sm"><label id="ucMel">{unitInfo['dmgMelee']}</label></div>
            <div className="uic-atk-row-fill-sm-mid"></div>
            <div className="uic-stat-row-label-sm"><label id="ucRange">{unitInfo['dmgRange']}</label></div>
            <div className="uic-stat-row-fill-sm"></div>
            <div className="uic-stat-row-label-sm"><label id="ucDist">{unitInfo['range']}"</label></div>
        </div>
        <div className="uic-tag-panel-sm">
            <ul id="ucKeywords" className="uic-keyword-word-sm">
                {unitInfo['tags'].map((tag, id) => (<li key={tag}>{tag}</li>))}
            </ul>
        </div>
    </div>
</div>
    );
}