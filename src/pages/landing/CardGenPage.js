import React, {useState} from "react";
import '../../../node_modules/foundation-sites/dist/css/foundation.min.css';
import NavBar from "../../components/NavBar";


export default function CardGenPage({props}){

    const [cardCopies, setCardCopies] = useState(0);

    function updateAmount(val){
        setCardCopies(val);
    }

    function printCards(e){
        e.preventDefault();
        let printLink = document.getElementById("printUnits");
        printLink.click();
    }

return(
<div className="grid-container fluid">
    <NavBar />
    <div className="grid-x grid-margin-x">
        <div className="cell auto small-12 medium-10 large-8 medium-offset-1 large-offset-2" >
            <h2>Blank Unit Card generator</h2>
        </div>
    </div>
    <div className="grid-x grid-margin-x">
        <div className="cell auto small-12 medium-10 large-8 medium-offset-1 large-offset-2" >
            <p>This allows you to generate empty Unit Cards to be filled in after printing out.</p>
            <p>If you are looking to quickly create custom units we recommend using the Unit Editor.</p>
        </div>
    </div>

    <div className="grid-x grid-margin-x">
        <div className="cell auto small-8 medium-4 large-2 medium-offset-1 large-offset-2">
            <p>Select the amount of <b>blank</b> cards you'd like to print.</p>
        </div>
        <div className="cell auto small-1 medium-1 large-1">
            <input id="uicBlankCopies" type="number" title="copies of blank template to print" value={cardCopies} onChange={(e)=>{updateAmount(e.target.value)}}/>
        </div>
        <div className="cell auto small-2 medium-1 large-1">
            <button type="button" className="button success" onClick={(e)=>{printCards(e)}}><i className="fi-print"></i></button>
        </div>
        <a id="printUnits" style={{display:"none"}} href={process.env.REACT_APP_DOMAIN +"/print/cards/" + cardCopies} target="_blank" rel="noopener noreferrer" ></a>
    </div>
</div>
);
};