import React, {useState, useEffect} from "react";
import Checkbox from "../../../components/CheckBox.js";
import { numRound2Decimal } from "../../../components/Utils.js";

export default function TagList({tagList, unitData, tagExclusions, invalidTags, handleCheckedTag, handleRowClick }){

    const [selectedTags, setSelectedTags] = useState([...unitData['tags']]);

    function handleTagCheck(e){
        const { id, checked } = e.target;
        let checkedTags = [...selectedTags];

        if(checked){
            checkedTags = [...checkedTags, id];
        }
        else{
            checkedTags = checkedTags.filter(item => item !== id);
        }
        setSelectedTags(checkedTags);
        handleCheckedTag(checkedTags);
    }

    function tagRowDisplay(tag){
        if(tagExclusions.includes(tag) || invalidTags.includes(tag)){
            return 'tagRuleLineDisable';
        }
        else if(unitData['tags'].includes(tag)){
            return 'tagRuleLineActive';
        }
        return '';
    }

    function displayCost(tag){
        if(unitData['tags'].includes(tag.abrv)){
            return numRound2Decimal(tag.func(unitData));
        }
        return '';
    }

    useEffect(()=>{

    }, [tagList, unitData['tags']]);


    return (
<div id="tagRulesDescPanel">
    <div className="grid-y shrink">
        <div className="cell" >
            <table id="tagList">
                <thead>
                    <tr>
                        <td></td>
                        <td>Name</td>
                        <td>Cost</td>
                    </tr>
                </thead>
                <tbody>
                    {tagList.map((tag,idx)=>(
                        <tr key={idx} id={idx} className={tagRowDisplay(tag.abrv)} onClick={()=>{handleRowClick(tag)}}>
                            <td><Checkbox key={idx} id={tag.abrv} type={"checkbox"} handleOnChange={handleTagCheck} isChecked={selectedTags.includes(tag.abrv)} disable={(tagExclusions.includes(tag.abrv) || invalidTags.includes(tag.abrv))? true : false}/></td>
                            <td>{tag.title}</td>
                            <td>{displayCost(tag)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
</div>
    );

};