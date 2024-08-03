import React from "react";


function RulebooksPage(){


    return (

<div className="grd">
<div className="grd-row">
        <div className="grd-row-col-3--sm grd-row-col-2--md grd-row-col-1--lg txt-center" >
            <h2>Rulebooks and Info</h2>
        </div>
    </div>
    <div className="grd-row">
        <div className="grd-row-col-3--sm grd-row-col-2--md grd-row-col-1--lg txt-center" >
            <h3>Getting Started</h3>
            <p>First-time players should use any of the <i>BEGINNER</i> unit cards and unit lists supplied with this application. These units do not use the more advanced <i>TAG</i> rules but are there to get you playing quickly.</p>
            <p>After a few games with <i>BEGINNER</i> units, we recommend trying the <i>INTERMEDIATE</i> units; these stats offer 1-2 <i>TAGS</i> per unit to give them some character but keep things easy to remember.</p>
            <p>Finally, when you feel ready, <i>ADVANCED</i> is using <i>LANDWAR</i> to its full potential. Each unit has several or many <i>TAGS</i> to make them play in very unique ways.</p>
        </div>
    </div>
    <div className="grd-row">
        <div className="grd-row-col-3--sm grd-row-col-2--md grd-row-col-1-lg" >
            <p>The minimum rules you will need to play <i>LANDWAR</i> is the <b>Core Rulebook, Quickplay Sheet, </b>and<b> Token Sheet.</b></p>
            <p>Same goes for <b>Scenarios</b>, this are just author suggested ways to setup battles between players, and covers more advanced rules like <i>Objectives</i>, and more detailed win-conditions.</p>
        </div>
        <div className="grd-row-col-3--sm grd-row-col-2--md grd-row-col-1--lg">
            <p>These are extra funsies that add more layers to the core experience of <i>LANDWARD</i>, they are completely optional and highly situational.</p>
        </div>
    </div>

    <div className="grd-row">
        <div className="grd-row-col-1-6-md grd-row-col-1-6--lg"></div>
        <div className="grd-row-col-3-6--sm grd-row-col-2-6--md grd-row-col-2-6--lg ">
            <table className="rulePanel">
                <thead>
                    <tr><th className="txt--right"><h4>Core Rules</h4></th></tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <button id="btnCoreRules" type="text" className="btn--blue">Core Rulebook</button>
                        </td>
                        <td>
                            <button id="btnCoreRulesSave" type="button" className="btn ui-icon-grey" >
                                <span className="ui-icon ui-icon-arrowthickstop-1-s"></span>
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <button type="button" id="btnCoreQuick" className="btn--blue">Quickplay Sheet</button>
                        </td>
                        <td>
                            <button id="btnCoreQuickplaySave" type="button" className="btn ui-icon-grey">
                                <span className="ui-icon ui-icon-arrowthickstop-1-s"></span>
                            </button>
                        </td>
                    </tr>
                    
                    <tr>
                        <td>
                            <button type="button" id="btnCoreScenarios" className="btn--green">Scenarios</button>
                        </td>
                        <td>
                            <button id="btnCoreScenariosSave" type="button" className="btn ui-icon-grey">
                                <span className="ui-icon ui-icon-arrowthickstop-1-s"></span>
                            </button>
                        </td>
                    </tr>
                    
                    <tr>
                        <td>
                            <label><b>Token Sheet</b></label>
                        </td>
                        <td>
                            <p><i>tokens.pdf</i></p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div className="grd-row-col-1--md"></div>
        <div className="grd-row-col-3-6--sm grd-row-col-2-6--md grd-row-col-2-6--lg">
            <table className="rulePanel">
                <thead>
                    <tr><th className="txt--center"><h4>Addons and Modules</h4></th></tr>
                </thead>
               <tbody>
                <tr>
                    <td><h5><b>Unit Base Costs</b></h5></td>
                    <td>
                        <button id="btnCoreUnitCostSave" type="button" className="btn ui-icon-grey">
                            <span className="ui-icon ui-icon-arrowthickstop-1-s"></span>
                        </button>
                    </td>
                </tr>
                <tr>
                    <td>
                        <button type="button" id="btnAdvanceRules" className="btn--green">Advanced <i>CORE</i> Rules</button>
                    </td>
                    <td>
                        <button id="btnAdvanceRulesSave" type="button" className="btn ui-icon-grey">
                            <span className="ui-icon ui-icon-arrowthickstop-1-s"></span>
                        </button>
                    </td>
                </tr>
                <tr>
                    <td>
                        <button type="button" id="btnModuleComposite" className="btn--green">Composite Units</button>
                    </td>
                    <td>
                        <button id="btnModuleCompositeSave" type="button" className="btn ui-icon-grey">
                            <span className="ui-icon ui-icon-arrowthickstop-1-s"></span>
                        </button>
                    </td>
                </tr>
                <tr>
                    <td>
                        <button type="button" id="btnModuleMultiMode" className="btn--green">Multi-Mode Units</button>
                    </td>
                    <td>
                        <button id="btnModuleMultiModeSave" type="button" className="btn ui-icon-grey">
                            <span className="ui-icon ui-icon-arrowthickstop-1-s"></span>
                        </button>
                    </td>
                </tr>
                <tr>
                    <td>
                        <button type="button" id="btnModuleLimitWeapon" className="btn--green">Limited-Use Weapons</button>
                    </td>  
                    <td>
                        <button id="btnModuleLimitWeaponSave" type="button" className="btn ui-icon-grey">
                            <span className="ui-icon ui-icon-arrowthickstop-1-s"></span>
                        </button>
                    </td>
                </tr>
                
                {/*
                <tr><td>
                    <button type="button" class="btn--red">Spells and Magic</button>
                </td></tr>
                <tr><td>
                    <button type="button" class="btn--red">RPG</button>
                </td></tr> 
                */}
               </tbody>
            </table> 
        </div> 
    </div>
</div>

    );


};

export default RulebooksPage;