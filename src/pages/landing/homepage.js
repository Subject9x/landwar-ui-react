import React from "react";

import NavBar from "../../components/NavBar.js";

function HomePage(){

    return (
<div className="grd">
    <NavBar />
    <div className="grd-row">
        <div className="grd-row-col-6">
            <div className="grd">
                <div className="grd-row">
                    <div className="grd-row-col-6--sm grd-row-col-6--md grd-row-col-6--lg txt--center">
                        <h1>LANDWAR</h1>
                    </div>
                </div>
                <div className="grd-row">
                    <div className="grd-row-col-6--sm grd-row-col-6--md grd-row-col-6--lg txt--center">
                        <h2><i>Game Development Kit</i></h2>
                    </div>
                </div>
                <div className="grd-row">
                    <div className="grd-row-col-6--sm grd-row-col-6--md grd-row-col-6--lg txt--center">
                        <p><i>LANDWAR</i> is primarily a rules-set or framework for tabletop wargaming. This application empowers Players and Game Masters
                        to acces and utilize the following:</p>
                        <ul className="list--unstyled">
                            <li>Core Rules section</li>
                            <li>TAG library</li>
                            <li>Generate custom unit cards.</li>
                            <li>Calculate unit point costs.</li>
                            <li>Create custom armies.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
    );
};

export default HomePage;




