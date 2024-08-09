import React, {useState, useEffect} from "react";
import { mergePrimitiveArrs } from "../../../components/Utils.js";
import {getTagData, initializeSortedTagList, tagInfo, tags_checkExclusions} from '../../../components/data/tagInfo.js';
import TagList from "./TagList";
import TagDetails from "./TagDetails.js";

export default function UnitTagWindow({rowId, unitData, handleWindowSave, handleWindowClose}){

    const [tagList] = useState([...initializeSortedTagList()]);
    const [excludedTags, setExcludedTags] = useState([]);
    const [selectedTag, setSelectedTag] = useState({});

    function handleSelectTag(tagArr){

        unitData['tags'] = [...tagArr];

        //mergePrimitiveArrs(tagExcl, tagList.find(item => item.abrv === tag).excl);
        let exclTag = [];
        tagArr.forEach(tag => {
            let exclude = tagList.find(item => item.abrv === tag).excl.map(t => t);
            exclTag = mergePrimitiveArrs(exclTag, exclude);
        });

        setExcludedTags(exclTag);
    };

    function onTagRowClick(tag){
        setSelectedTag(tag);
    }

    useEffect(()=>{
        let exclTag = [];
        unitData['tags'].forEach(tag => {
            let exclude =  tagList.find(item => item.abrv === tag).excl.map(t => t);
            exclTag = mergePrimitiveArrs(exclTag, exclude);
        });
        setExcludedTags(exclTag);
        setSelectedTag(tagList[0]);

    }, [tagList, unitData]);

    return (
        <div id="tagWindow" className="grid-container fluid">
            <div className="grid-x grid-margin-x">
                <div className="cell shrink">
                    <TagList tagList={tagList} unitTags={unitData['tags']} tagExclusions={excludedTags} handleCheckedTag={handleSelectTag} handleRowClick={onTagRowClick}/>
                </div>

                <div className="cell auto">
                    <TagDetails tagData={selectedTag}/>
                </div>
            </div>
        </div>
    );
}
