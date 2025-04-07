import React from "react";
import 'foundation-sites/dist/css/foundation.min.css';
import 'foundation-sites/dist/css/foundation-icons.css';
import { useNavigate } from "react-router";

export default function NavBar({ props }) {

    let navigation = useNavigate();

    return (
<div className="grid-x grid-margin-x navbar">
    <div className="cell auto small-auto medium-10 large-8 medium-offset-1 large-offset-2 ">
        <div className="button-group">
            <button id="navHome" type="button" className="button primary" onClick={() => { navigation("/") }}><i className="fi-home"></i> <b>Home</b></button>
            <button id="navRulebooks" type="button" className="button primary" onClick={() => { navigation("/info/rules") }}><i className="fi-book"></i> <b>Rules</b></button>
            <button id="navTagRules" type="button" className="button primary" onClick={() => { navigation("/info/tags") }}><i className="fi-price-tag"></i> <b>Tags</b></button>
            <button id="navUnitBuild" type="button" className="button primary" onClick={() => { navigation("/info/units") }}><i className="fi-wrench"></i> <b>Unit Editor</b></button>
            <button id="navArmyList" type="button" className="button primary" onClick={() => { navigation("/info/army") }}><i className="fi-results"></i> <b>Force Editor</b></button>
            <button id="navCardGen" type="button" className="button primary" onClick={() => { navigation("/info/cardgen") }}><i className="fi-thumbnails"></i> <b>Blank Cards</b></button>
            <button id="navMorePage" type="button" className="button primary" onClick={() => { navigation("/info/more") }}><i className="fi-info"></i> <b>I Want More!</b></button>
        </div> 
    
            
            {/*<div className="cell shrink small-3 medium-3 large-3">
                user: {usename}
                <button id="login" type="button" className="btn--green">Login</button>
                <button id="login" type="button" className="btn--red">Logout</button>
            </div>*/}
   
    </div>
</div>
    );
};