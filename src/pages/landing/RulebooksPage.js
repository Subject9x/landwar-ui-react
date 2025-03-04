import React from "react";
import { Link } from "react-router";
import NavBar from "../../components/NavBar";
import 'foundation-sites/dist/css/foundation.min.css';
import 'foundation-sites/dist/css/foundation-icons.css';


function RulebooksPage({ props }) {
    return (
        <div className="grid-container fluid">
            <NavBar />
            <div className="grid-x grid-margin-x">
                <div className="cell auto small-12 medium-10 large-8 medium-offset-1 large-offset-2" >
                    <h2>Rulebooks and Info</h2>
                </div>
            </div>
            <div className="grid-x grid-margin-x">
                <div className="cell auto small-12 medium-10 large-8 medium-offset-1 large-offset-2" >
                    <h3>Getting Started</h3>
                    <p>First-time players should use any of the <i>BEGINNER</i> unit cards and unit lists. These units do not use the more advanced <i>TAG</i> rules but are there to get you playing quickly.</p>
                    <p>After a few games with <i>BEGINNER</i> units, we recommend trying the <i>INTERMEDIATE</i> units; these stats offer 1-2 <i>TAGS</i> per unit to give them some character but keep things easy to remember.</p>
                    <p>Finally, when you feel ready, <i>ADVANCED</i> is using <i>LANDWAR</i> to its full potential. Each unit has several or many <i>TAGS</i> to make them play in very unique ways.</p>
                </div>
            </div>
            <div className="grid-x grid-margin-x">
                <div className="cell auto small-6 medium-5 large-4 medium-offset-1 large-offset-2" >
                    <p>The minimum rules you will need to play <i>LANDWAR</i> is the <b>Core Rulebook, Quickplay Sheet, </b>and<b> Token Sheet.</b></p>
                    <p>Same goes for <b>Scenarios</b>, this are just author suggested ways to setup battles between players, and covers more advanced rules like <i>Objectives</i>, and more detailed win-conditions.</p>
                </div>
                <div className="cell auto small-6 medium-5 large-4">
                    <p>These are extra funsies that add more layers to the core experience of <i>LANDWARD</i>, they are completely optional and highly situational.</p>
                </div>
            </div>

            <div className="grid-x grid-margin-x">
                <div className="cell auto small-5 medium-4 large-3 small-offset-2 medium-offset-3 large-offset-3">
                    <table className="rulePanel">
                        <thead>
                            <tr><th><h4>Core Rules</h4></th></tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><u>Rulebook</u></td>
                                <td><a rel="noopener noreferrer" className="button primary" href={require("../../assets/rules_core_b1.4.pdf")} target="_blank"><i className="fi-download"></i></a></td>
                            </tr>
                            <tr>
                                <td><u>Quickplay Sheet</u></td>
                                <td><a rel="noopener noreferrer" className="button primary" href={require("../../assets/rules_quick_b1.4.pdf")} target="_blank"><i className="fi-download"></i></a></td>
                            </tr>
                            <tr>
                                <td><u>Scenarios</u></td>
                                <td><a rel="noopener noreferrer" className="button primary" href={require("../../assets/rules_scenario_b1.4.pdf")} target="_blank"><i className="fi-download"></i></a></td>
                            </tr>
                            <tr>
                                <td><label><b>Token Sheet</b> optional</label></td>
                                <td><a rel="noopener noreferrer" className="button primary" href={require("../../assets/tokens.pdf")} target="_blank"><i className="fi-download"></i></a></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="cell auto small-5 medium-4 large-3 ">
                    <table className="rulePanel">
                        <thead>
                            <tr><th><h4>Addons and Modules</h4></th></tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Advanced <i>CORE</i> Rules</td>
                                <td><a rel="noopener noreferrer" className="button warning" href={require("../../assets/rules_adv_b1.4.pdf")} target="_blank"><i className="fi-download"></i></a></td>
                            </tr>
                            <tr>
                                <td><i>Composite Units</i></td>
                                <td><a rel="noopener noreferrer" className="button warning" href={require("../../assets/rules_module_compunit_b1.4.pdf")} target="_blank"><i className="fi-download"></i></a></td>
                            </tr>
                            <tr>
                                <td><i>Multi-Mode Units</i></td>
                                <td><a rel="noopener noreferrer" className="button warning" href={require("../../assets/rules_module_multiunit_b1.4.pdf")} target="_blank"><i className="fi-download"></i></a></td>
                            </tr>
                            <tr>
                                <td><i>Limited-Use Weapons</i></td>
                                <td><a rel="noopener noreferrer" className="button warning" href={require("../../assets/rules_module_limited_item_b1.4.pdf")} target="_blank"><i className="fi-download"></i></a></td>
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