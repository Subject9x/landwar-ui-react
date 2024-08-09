import React, {useRef, useEffect} from "react";
import DOMPurify from "dompurify";

export default function TagDetails({tagData, unitTagCosts}){
    return(
        <div id="tagRulesDescPanel" className="container fluid ">
            <div className="grid-x grid-margin-x">
                <div className="cell shrink">
                    <b>Base Cost:</b>
                </div>
                <div className="cell shrink">
                    <b>Tag Costs:</b>
                </div>
                <div className="cell shrink">
                    <b>Unit Total Cost:</b>
                </div>
            </div>
            <div className="grid-x grid-margin-x">
                <div className="cell auto" >
                    <div id="tagWindow_descTitle"><label>{tagData.title}</label></div>
                </div>
            </div>
            <div className="grid-x grid-margin-x">
                <div className="cell auto">
                    <div id="tagWindow_descWarn"><label>{"WARN"}</label></div>
                </div>
            </div>
            <div className="grid-x grid-margin-x">
                <div className="cell auto">
                    <div id="tagWindow_descText" dangerouslySetInnerHTML={{ __html: tagData.desc }}></div>
                </div>
            </div>
            <div className="grid-x grid-margin-x">
                <div className="cell auto">
                    <div id="tagWindow_equation" dangerouslySetInnerHTML={{ __html: tagData.eqt }}></div>
                </div>
            </div>

        </div>
    );

};