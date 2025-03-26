import React from "react";
import '../../css/unitcard.css';

export default function BlankUnitCard({}) {

return (
    <div className="main" >
        <div className="header-row">
            <div className="title">
                <div className="name"></div>
                <div className="subName"></div>
            </div>
            <div className="points"></div>
        </div>
        <div className="row-top">
            <div className="stat-column-core">
                <div className="stat-core-val"></div>
                <div className="stat-core-val"></div>
            </div>
            <div className="stat-attacks">
                <div className="ranges-row">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <div className="stat-dmg-row">
                    <div ></div>
                    <div ></div>
                    <div ></div>
                </div>
            </div>
        </div>
        <div className="row-bottom">
            <div className="row-bottom-left">
                <div className="stat-column-core-bottom">
                    <div className="stat-core-val"></div>
                    <div className="stat-core-val"></div>
                </div>
                <div className="tag-panel">
                </div>
            </div>
            <div className="row-bottom-right" >
            </div>
        </div>
    </div>
);
}