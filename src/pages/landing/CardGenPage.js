import React, {useState} from "react";
import NavBar from "../../components/NavBar";


export default function CardGenPage({props}){

    const [cardCopies, setCardCopies] = useState(0);


return(
<div className="grid-container fluid">
    <NavBar />
    <div className="grid-x grid-margin-x">
        <div className="cell auto small-12 medium-10 large-8 medium-offset-1 large-offset-2" >
            <h2>Unit Card generator</h2>
        </div>
    </div>
    <div className="grid-x grid-margin-x">
        <div className="cell auto small-12 medium-10 large-8 medium-offset-1 large-offset-2" >
            <p>This tool will generate the Unit Cards you will need to use for each unit.</p>
            <p>
                Unit Info can be loaded from .csv files that were created by the Unit Builder tool.
                OR
                an Army List file.
                
                At this time, image upload for unit cards is disabled.
            </p>
        </div>
    </div>

    
    <div className="grid-x grid-margin-x">
        <div className="cell auto small-9 medium-8 large-7 medium-offset-1 large-offset-2">
            <button type="button" title="Open a valid CSV file for printing." onclick="ucg_control_sheet_import();" className="btn--blue ui-icon-white">
                Open army or unit .csv
            </button>
        </div>
        <div className="cell auto small-3 medium-2 large-1">
            
        </div>
    </div>

    <div className="grid-x grid-margin-x">
        <div className="cell auto small-8 medium-4 large-2 medium-offset-1 large-offset-2">
            <p><b>OR</b> you can select the amount of <b>blank</b> cards you'd like to print.</p>
        </div>
        <div className="cell auto small-1 medium-1 large-1">
            <input id="uicBlankCopies" type="number" title="copies of blank template to print"/>
        </div>
        <div className="cell auto small-2 medium-1 large-1">
            <button type="button" onclick="ucg_print_blanks_pdf(event);" class="btn--green ui-icon-white">
                Print
            </button>
        </div>
    </div>
</div>
);
};