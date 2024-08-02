import React from "react";

function NavBar(){

    const buttonStyle = {
        fontWeight: '400px',
        backgroundColor: '#ffffff'
    }

    return (
<div className="grd-row">
    <div className="grd-row-col-6">
        <div className="grd navbar">
            <div className="grd-row">
                <div className="grd-row-col-4-6">
                    <button id="navHome" type="button" className="btn" style={buttonStyle} >Home</button>
                    <button id="navRulebooks" type="button" className="btn" style={buttonStyle}>Core Rules</button>
                    <button id="navTagRules" type="button" className="btn" style={buttonStyle}>Tag Rules</button>
                    <button id="navUnitBuild" type="button" className="btn" style={buttonStyle}>Unit Editor</button>
                    <button id="navArmyList" type="button" className="btn" style={buttonStyle}>Army List</button>
                    <button id="navCardGen" type="button" className="btn" style={buttonStyle}>Unit Card Gen</button>
                </div>
                <div className="grd-row-col-1-6">
                    user: <button id="login">Login</button>
                </div>
                <div className="grd-row-col-1-6">
                    <button id="navExit" type="button" className=" btn--red ui-icon-white "><span className="ui-icon ui-icon-close txt--right"></span></button>
                </div>
            </div>
            <div className="row-fill row-fill-s row-fill-l"></div>
        </div>
    </div>
</div>
    );
};


export default NavBar;