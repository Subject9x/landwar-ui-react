import React, { useState} from "react";
import 'foundation-sites/dist/css/foundation.min.css';
import { initializeSortedTagList } from "../../components/data/tagInfo";
import NavBar from "../../components/NavBar";
import TagInfoCard from "../../components/unitEditor/tagWindow/TagInfoCard";

export default function TagLibPage({ props }) {

    const [tagList] = useState([...initializeSortedTagList()]);
    const [selectedTag, setSelectedTag] = useState({"tag" : {}, "warnMsg":""});

    const dummyUnit = {
        'name' : "",
        'size' : 0,
        'move' : 0,
        'evade' : 0,
        'dmgMelee' : 0,
        'dmgRange' : 0,
        'range' : 0,
        'armor' : 0,
        'tags' : [],
        'points' :0,
    }

    function selectATag(tagId){
        let tag = tagList.find(({abrv}) => (abrv === tagId));
        setSelectedTag({...selectedTag, tag : tag, warnMsg : tag.reqs(dummyUnit)});
    }

    return (
<div className="grid-container fluid">
    <NavBar />
    <div className="grid-x grid-margin-x">
        <div className="cell auto small-12 medium-10 large-8 medium-offset-1 large-offset-2" >
            <h2>TAG Reference Library.</h2>
        </div>
    </div>
    <div className="grid-x grid-margin-x">
        <div className="cell auto small-12 medium-10 large-8 medium-offset-1 large-offset-2">
            <h4>Core Rules</h4>
            <ul>
                <li><p>TAG (Talents, Abilities, Gear) are unique rules that can be given to Units during <i>Unit Building</i></p></li>
                <li><p>These rules have their own conditions on use, activation, stat modifications, and requirements.</p></li>
                <li><p>TAGs are optional, players can agree to use them <i>or not</i>!</p></li>
            </ul>
        </div>
    </div>

    <div className="grid-x grid-margin-x row-fill-s row-fill row-fill-l"></div>

        <div className="grid-x grid-margin-x">
            <div className="cell auto small-10 medium-8 large-6 small-offset-1 medium-offset-2 large-offset-3">
    {(Object.keys(selectedTag.tag).length !== 0)
        && (    
                <TagInfoCard tagItem={selectedTag} showCostEquation={true} showRequirements={true}/>
        )
    }
            </div>
        </div>

    {/* disabling modules until we can figure out how to make them work. */}
    {/* <button id="tagLibBtnRPG" type="button" disabled>RPG Tags</button> */}
    {/* <button id="tagLibBtnMultiWep" type="button" disabled>Multi-Weapon Tags</button> */}

    {/* <div className="grid-x grid-margin-x">
        <div className="cell auto small-10 medium-10 large-8">
            <button id="tagLibBtnCore" type="button" className="btn--blue ui-icon-white">
                Core TAGS
                <span className="ui-icon ui-icon-arrowthickstop-1-s"></span>
            </button>
        </div>
    </div> */}
    <div className="grid-x grid-margin-x row-fill-s row-fill row-fill-l">
    </div>
    <div className="grid-x">
        <div className="cell auto small-12 medium-10 large-8 medium-offset-1 large-offset-2">
            <div className="grid-x">
                {tagList.map((tag)=>(
                    <div className="cell shrink large-2 medium-3 small-4">
                        <button id={tag.abrv} type="button" className="button primary hollow" onClick={()=>{ selectATag(tag.abrv)}}>{tag.title}</button>
                    </div>
                ))}
            </div>
        </div>
    </div>
</div>
    );
};