import React from "react";
import {NavLink} from "react-router";

export default function Navigation({props}){

return(
    <nav>
        <NavLink to={"/"} end>
            Home
        </NavLink>
        <NavLink to={"/editor"} end>
            Unit Editor
        </NavLink>
    </nav>
);

};