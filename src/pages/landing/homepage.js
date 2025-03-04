import React from "react";
import NavBar from "../../components/NavBar.js";
import 'foundation-sites/dist/css/foundation.min.css';
function HomePage() {

    return (
        <div className="grid-container fluid">
            <NavBar />
            <div className="grid-x grid-margin-x">
                <div className="cell auto small-6 medium-4 large-2 small-offset-3 medium-offset-4 large-offset-5">
                    <img src="/img/logo.png" alt="LANDWAR" />
                </div>
            </div>
            <div className="grid-x grid-margin-x">
                <div className="cell auto small-12 medium-8 large-6 medium-offset-2 large-offset-3">
                    <p>
                    <i>LANDWAR</i> is a free and open-source, miniatures-agnostic set of rules for tabletop wargaming. This website provides everything players need to
                    play the game, generate custom units, organize force lists, refer to / read up on rules.</p>
                    <ul className="list--unstyled">
                        <li>Core Rules section</li>
                        <li>TAG library</li>
                        <li>Generate custom unit cards.</li>
                        <li>Calculate unit point costs.</li>
                        <li>Create custom armies.</li>
                    </ul>
                </div>
            </div>
            <div className="grid-x grid-margin-x">
                <div className="cell auto small-12 medium-8 large-6 medium-offset-2 large-offset-3">
                    <h5>You can also find the rules and documents for free on itch.io!</h5>
                </div>
            </div>
            <div className="grid-x grid-margin-x">
                <div className="cell auto small-12 medium-8 large-6 medium-offset-2 large-offset-3">
                    <iframe title="itch.io page" frameborder="0" src="https://itch.io/embed/1636645" width="552" height="167"><a href="https://subject9x.itch.io/landwar">LANDWAR by Subject9x</a></iframe>
                </div>
            </div>
        </div>
    );
};

export default HomePage;