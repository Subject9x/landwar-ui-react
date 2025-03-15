import React from "react";
import "../../../css/styles.css";

export default function TagInfoCard({tagItem, showRequirements, showCostEquation}){

    return(             
    <div id="tagRulesPanel" className="grid-x grid-margin-x">
        <div id="tagRulesDescPanel" className="cell auto">
            <div className="grid-x grid-margin-x">
                <div className="cell auto small-12 medium-10 large-8 medium-offset-1 large-offset-1" >
                    <div id="tagWindow_descTitle"><h5>{tagItem.tag.title}</h5></div>
                </div>
            </div>
            <div className="grid-x grid-margin-x">
                <div className="cell auto small-10 medium-10 large-10 small-offset-1 medium-offset-1 large-offset-1">
                    <div id="tagWindow_descText" dangerouslySetInnerHTML={{ __html: tagItem.tag.desc }}></div>
                </div>
            </div>
            {showRequirements && 
            <div className="grid-x grid-margin-x">

                <div className="cell auto small-2 medium-2 large-2 small-offset-1 medium-offset-1 large-offset-1">
                    <u>Requirements:</u>
                </div>
                <div className="cell auto small-4 medium-4 large-4">
                    <div id="tagWindow_descWarn" dangerouslySetInnerHTML={{ __html: tagItem.warnMsg }}></div>
                </div>
            </div>
            }

            {showCostEquation && 
            <div className="grid-x grid-margin-x">
                <div className="cell auto small-2 medium-2 large-2 small-offset-1 medium-offset-1 large-offset-1">
                    <u>Cost equation:</u>
                </div>
                <div className="cell auto small-8 medium-8 large-8">
                    <div id="tagWindow_equation" dangerouslySetInnerHTML={{ __html: tagItem.tag.eqt }}></div>
                </div>
            </div>
            }
        </div>
    </div>
    );
}