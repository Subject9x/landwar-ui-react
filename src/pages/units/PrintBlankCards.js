import React, {useEffect, useRef} from "react";
import { useParams } from "react-router";
import { useReactToPrint } from "react-to-print";
import "../../css/unitcard.css";
import "../../css/styles.css";
import BlankUnitCard from "../../components/printUnits/BlankUnitCard";


export default function PrintBlankCards({props}){

    const {total} = useParams();
    const contentRef = useRef(null);
    // const amount = [total];

    const reactToPrintFn = useReactToPrint(
        {
            documentTitle : "cards",
            contentRef: contentRef,
            copyShadowRoots : true,
            onAfterPrint : ()=>{
                window.close();
            }
        }
    );

    function generateCards(){
        var elements = [];
        for(let i = 0; i < total; i++){
            elements.push( <BlankUnitCard key={i} />);
        }
        return elements;
    }

    useEffect(()=>{
        //disable for debug
        setTimeout(()=>{
            reactToPrintFn();
        }, 250);
    },[reactToPrintFn]);

    return(
<div ref={contentRef} className="uic-page">
    <div className="grid-container">
        <div className="grid-x" style={{pageBreakAfter:"always"}}>
            <div className="cell auto" >
                {generateCards()}
            </div>
        </div>
    </div>
</div>
    );
};