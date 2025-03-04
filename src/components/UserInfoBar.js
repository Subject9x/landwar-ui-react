import React from "react";


export default function UserInfoBar(){

return (
<div className="grid-x grid-margin-x navbar">
    <div className="cell auto small-12 medium-10 large-8 medium-offset-1 large-offset-2 ">
        <div className="grid-x">
            <div className="cell shrink small-8 medium-8 large-8">
            user: username
            </div>
            <div className="cell shrink small-3 medium-3 large-3">
                <button id="login" type="button" className="button success">Login</button>
                <button id="login" type="button" className="alert button">Logout</button>
            </div>
        </div>
    </div>
</div>
);
};