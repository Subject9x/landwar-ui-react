import React, { useEffect, useState, useRef} from "react";
import UnitInfoCard from "../../components/printUnits/UnitInfoCard";
import { useParams } from "react-router";
import "../../css/unitcard.css";
import "../../css/styles.css";
import { useReactToPrint } from "react-to-print";
import { tags_getByName } from "../../components/data/tagInfo";
import TagInfoCard from "../../components/unitEditor/tagWindow/TagInfoCard";
import { roundUsing } from "../../components/Utils";



export default function UnitPrintedPage({props}){
 
    const {listName} = useParams();
    const [unitData, setUnitData] = useState([]);
    const [tagList, setTagList] = useState([]);
    const [pointsData, setPointsData] = useState({"units": 0.0, "tags" : 0.0, "total" : 0.0});
    const contentRef = useRef(null);
    
    const reactToPrintFn = useReactToPrint(
        {
            documentTitle : listName,
            contentRef: contentRef,
            copyShadowRoots : true,
            onAfterPrint : ()=>{
                
                localStorage.removeItem(listName);  //important cleanup
                window.close();
            }
        }
    );

    function buildUnitListData(unitList){
        let tags = [];
        let costUnits = 0.0;
        let costTags = 0.0;
        let costTotal = 0.0;
        unitList.forEach((unit) => {
            if(unit.tags.length > 0){
                unit.tags.forEach((tagAbbr)=>{
                    let tag = tags_getByName(tagAbbr, unit.tags);
                    if(!tags.includes(tag)){
                        tags.push(tag);
                    }
                });
            }
            costUnits = costUnits + unit.points;
            costTags = costTags + unit.tagTotal;
            costTotal = costTotal + unit.completeTotal;
        });
        setPointsData({...pointsData, 
                    units : roundUsing(Math.ceil, costUnits, 0), 
                    tags : roundUsing(Math.ceil, costTags, 0), 
                    total : roundUsing(Math.ceil, costTotal, 0)});
        tags.sort((a, b) => { return (a.abrv > b.abrv ? 1 : (a.abrv === b.abrv? 0 : -1))});

        let tagEntries = [];
        tags.forEach((tag)=>{
            let tagEntry =  {};
            tagEntry["tag"] = tag;
            tagEntries.push(tagEntry);
        })

        setTagList(tagEntries);
    }

    useEffect(()=>{
        let data = localStorage.getItem(listName);
        if(data === null || data === undefined){
            return
        }
        let parsed = JSON.parse(data)
        setUnitData(parsed);
        buildUnitListData(parsed);
        //disable for debug
        setTimeout(()=>{
            reactToPrintFn();
        }, 250);
    },[setUnitData, listName]);

return(
<div ref={contentRef} className="uic-main">
    <div className="grid-container">
        <div className="grid-x" style={{pageBreakAfter:"always"}}>
            <div className="cell auto" >
                {unitData.map(unit => (
                    <UnitInfoCard unitInfo={unit} />
                ))}
            </div>
        </div>
        <div className="grid-x">
            <div className="cell auto small-6 medium-5 large-4 small-offset-2 medium-offset-1 large-offset-1">
                <h4>{listName}</h4>
            </div>
            <div className="cell auto small-4 medium-6 large-7">
                <table id="tagRulesListPanel">
                    <thead>
                        <tr>
                            <th><b>Base</b></th>
                            <th><b>TAGs</b></th>
                            <th><b>Total</b></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{pointsData.units}</td>
                            <td>{pointsData.tags}</td>
                            <td>{pointsData.total}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        {tagList.map(tag => (
            <TagInfoCard tagItem={tag} showCostEquation={false} showRequirements={false}/>
        ))}
    </div>
</div>
);
};