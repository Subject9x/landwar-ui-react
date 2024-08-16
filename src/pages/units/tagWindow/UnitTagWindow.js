import React, {useState, useEffect} from "react";
import { mergePrimitiveArrs } from "../../../components/Utils.js";
import {initializeSortedTagList, tags_validateExclusion} from '../../../components/data/tagInfo.js';
import TagList from "./TagList";

export default function UnitTagWindow({rowId, unitData, handleWindowClose, handleUnitDataUpdate}){

    const [tagList] = useState([...initializeSortedTagList()]);
    const [excludedTags, setExcludedTags] = useState([]);
    const [invalidTags, setInvalidTags] = useState([]);
    const [selectedTag, setSelectedTag] = useState({});

    const [tagWarn, setTagWarn] = useState("");

    function handleSelectTag(tagArr){

        unitData['tags'] = [...tagArr];

        let exclTag = [];
        tagArr.forEach(tag => {
            let exclude =  tagList.find(item => item.abrv === tag).excl.map(t => t);
            exclTag = mergePrimitiveArrs(exclTag, exclude);
        });

        setExcludedTags(exclTag);



        handleUnitDataUpdate(rowId);
    };

    function onTagRowClick(tag){

        let warn = tag.reqs(unitData);
        warn = tags_validateExclusion(tag, unitData['tags'], warn);

        setTagWarn(warn);
        setSelectedTag(tag);
    }

    useEffect(()=>{
        let exclTag = [];
        unitData['tags'].forEach(tag => {
            let exclude =  tagList.find(item => item.abrv === tag).excl.map(t => t);
            exclTag = mergePrimitiveArrs(exclTag, exclude);
        });

        let invalidTags = [];
        tagList.forEach(item => {
            if(item.reqs(unitData).length > 0){
                invalidTags = [...invalidTags, item.abrv];
            }
        });

        setExcludedTags(exclTag);
        setInvalidTags(invalidTags)
        setSelectedTag(tagList[0]); //default to select top tag.

    }, [tagList, unitData]);

    return (
        <div id="tagWindow" className="grid-x reveal-modal" role="dialog">
            <div className="cell shrink">
                <TagList tagList={tagList} unitData={unitData} tagExclusions={excludedTags} invalidTags={invalidTags} handleCheckedTag={handleSelectTag} handleRowClick={onTagRowClick}/>
            </div>

            <div className="cell auto">
                <div className="grid-x grid-margin-x">
                    <div className="cell">
                        <div className="grid-x">
                            <div className="cell small-3 medium-3 large-3">
                                Base: <b>{unitData['baseCost']}</b>
                            </div>
                            <div className="cell small-3 medium-3 large-3">
                                Tag total:<i>{unitData['tagCost']}</i>
                            </div>
                            <div className="cell small-3 medium-3 large-3">
                                Total Cost:<b>{unitData['total']}</b>
                            </div>
                            {/*<div className="cell shrink"><button className="button success" onClick={(e)=>{handleWindowSave()}}>Save</button></div>*/}
                            <div className="cell small-3 medium-3 large-3">
                                <button name={rowId} className="button alert" onClick={(e)=>{handleWindowClose()}}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid-x">
                    <div id="tagRulesDescPanel" className="cell auto">
                        <div className="grid-x grid-margin-x">
                            <div className="cell auto" >
                                <div id="tagWindow_descTitle"><h3>{selectedTag.title}</h3></div>
                            </div>
                        </div>
                        <div className="grid-x grid-margin-x">
                            <div className="cell auto">
                                <div id="tagWindow_descText" dangerouslySetInnerHTML={{ __html: selectedTag.desc }}></div>
                            </div>
                        </div>
                        <div className="grid-x grid-margin-x">
                            <div className="cell auto">
                                <div id="tagWindow_descWarn" dangerouslySetInnerHTML={{ __html:tagWarn }}></div>
                            </div>
                        </div>
                        <div className="grid-x grid-margin-x">
                            <div className="cell auto">
                                <div id="tagWindow_equation" dangerouslySetInnerHTML={{ __html: selectedTag.eqt }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
