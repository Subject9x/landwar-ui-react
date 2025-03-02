import React from "react";
import "../css/furtive_ext.css";
import { useNavigate } from "react-router";

export default function NavBar({ props }) {

    let navigation = useNavigate();

    return (
<div className="grid-x grid-margin-x navbar">
    <div className="cell auto small-12 medium-10 large-8 medium-offset-1 large-offset-2 ">
        <div className="grid-x">
            <div className="cell shrink small-8 medium-8 large-8">
                <button id="navHome" type="button" className="btn btn--white" onClick={() => { navigation("/") }}>Home</button>
                <button id="navRulebooks" type="button" className="btn btn--white" onClick={() => { navigation("/info/rules") }}>Core Rules</button>
                <button id="navTagRules" type="button" className="btn btn--white" onClick={() => { navigation("/info/tags") }}>Tag Rules</button>
                <button id="navUnitBuild" type="button" className="btn btn--white" onClick={() => { navigation("/info/units") }}>Unit Editor</button>
                <button id="navArmyList" type="button" className="btn btn--white" onClick={() => { navigation("/info/army") }}>Army List</button>
                <button id="navCardGen" type="button" className="btn btn--white" onClick={() => { navigation("/info/cardgen") }}>Unit Card Gen</button>
            </div>
            
            {/*<div className="cell shrink small-3 medium-3 large-3">
                user: {usename}
                <button id="login" type="button" className="btn--green">Login</button>
                <button id="login" type="button" className="btn--red">Logout</button>
            </div>*/}
        </div>
    </div>
</div>
    );
};