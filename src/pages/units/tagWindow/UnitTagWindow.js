import React, {useState, useEffect} from "react";
import { mergePrimitiveArrs } from "../../../components/Utils.js";
import {getTagData, initializeSortedTagList, tagInfo, tags_checkExclusions} from '../../../components/data/tagInfo.js';
import TagList from "./TagList";

export default function UnitTagWindow({rowId, unitData, handleWindowSave, handleWindowClose}){

    const [tagList] = useState([...initializeSortedTagList()]);
    const [excludedTags, setExcludedTags] = useState([]);
    const [selectedTag, setSelectedTag] = useState({});

    const [tagWarn, setTagWarn] = useState("");

    function handleSelectTag(tagArr){

        unitData['tags'] = [...tagArr];

        let exclTag = [];
        tagArr.forEach(tag => {
            let exclude = tagList.find(item => item.abrv === tag).excl.map(t => t);
            exclTag = mergePrimitiveArrs(exclTag, exclude);
        });

        setExcludedTags(exclTag);
    };

    function onTagRowClick(tag){

        let warn = tag.reqs(unitData);

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
        tagList.forEach(tag => {
            let warn = tag.reqs(unitData);
            if(warn.length > 0){
                invalidTags = [...invalidTags, tag.abrv];
            }
        });
        exclTag = mergePrimitiveArrs(exclTag, invalidTags);

        setExcludedTags(exclTag);
        setSelectedTag(tagList[0]);

    }, [tagList, unitData]);

    return (
        <div id="tagWindow" className="grid-x">
            <div className="cell shrink">
                <TagList tagList={tagList} unitTags={unitData['tags']} tagExclusions={excludedTags} handleCheckedTag={handleSelectTag} handleRowClick={onTagRowClick}/>
            </div>

            <div className="cell auto">
                <div className="grid-x grid-margin-x">
                    <div className="cell">
                        <div className="grid-x">
                            <div className="cell shrink">
                                <b>Base Cost:</b>
                            </div>
                            <div className="cell shrink">
                                <b>Tag Costs:</b>
                            </div>
                            <div className="cell shrink">
                                <b>Unit Total Cost:</b>
                            </div>
                            <div className="cell shrink">
                                <button className="button success" onClick={(e)=>{handleWindowSave()}}>Save</button>
                            </div>
                            <div className="cell  shrink">
                                <button className="button alert" onClick={(e)=>{handleWindowClose()}}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grid-x">
                    <div id="tagRulesDescPanel" className="cell auto">
                        <div className="grid-x grid-margin-x">
                            <div className="cell auto" >
                                <div id="tagWindow_descTitle"><label>{selectedTag.title}</label></div>
                            </div>
                        </div>
                        <div className="grid-x grid-margin-x">
                            <div className="cell auto">
                                <div id="tagWindow_descWarn" dangerouslySetInnerHTML={{ __html:tagWarn }}></div>
                            </div>
                        </div>
                        <div className="grid-x grid-margin-x">
                            <div className="cell auto">
                                <div id="tagWindow_descText" dangerouslySetInnerHTML={{ __html: selectedTag.desc }}></div>
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
