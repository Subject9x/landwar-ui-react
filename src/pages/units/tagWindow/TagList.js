import React, {useState, useEffect} from "react";
import Checkbox from "../../../components/CheckBox.js";

export default function TagList({tagList, unitTags, tagExclusions, handleCheckedTag, handleRowClick }){

    const [selectedTags, setSelectedTags] = useState([...unitTags]);
    const [tagCosts] = useState([]);


    function handleTagCheck(e){
        const { id, checked } = e.target;
        let checkedTags = [...selectedTags];

        if(checked){
            checkedTags = [...checkedTags, id];
            unitTags = [...unitTags, id];
        }
        else{
            checkedTags = checkedTags.filter(item => item !== id);
            unitTags = unitTags.filter(item => item !== id);
        }
        setSelectedTags(checkedTags);
        handleCheckedTag(checkedTags);
    }

    function tagRowDisplay(tag){
        if(tagExclusions.includes(tag)){
            return 'tagRuleLineDisable';
        }
        if(unitTags.includes(tag)){
            return 'tagRuleLineActive';
        }
        return '';
    }

    useEffect(()=>{

    }, [tagList]);


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
                            <td><Checkbox key={idx} id={tag.abrv} type={"checkbox"} handleOnChange={handleTagCheck} isChecked={selectedTags.includes(tag.abrv)} disable={tagExclusions.includes(tag.abrv) ? true : false}/></td>
                            <td>{tag.title}</td>
                            <td>{tagCosts[tag.abrv]}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
</div>
    );

};