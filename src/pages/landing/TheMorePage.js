import React, {useState} from "react";
import NavBar from "../../components/NavBar";

export default function TheMorePage({props}){

    // const [oldMin, setOldMin] = useState(0);
    // const [oldMax, setOldMax] = useState(0);
    // const [newMin, setNewMin] = useState(0);
    // const [newMax, setNewMax] = useState(0);
    // const [oldVal, setOldVal] = useState(0);
    // const [newVal, setNewVal] = useState(0)

    // function calcValue(ov, om, ox, nm, nx){

    //     let oldRange = (ox - om);
    //     let newRange = (nx - nm);
    //     let val = (((ov - om) * newRange) / oldRange) + nm;

    //     setNewVal(val);
    // }

return(
<div className="grid-container fluid">
    <NavBar />
    <div className="grid-x grid-margin-x">
        <div className="cell auto small-12 medium-10 large-8 medium-offset-1 large-offset-2" >
            <h2>Want more?</h2>
        </div>
    </div>
    <div className="grid-x grid-margin-x">
        <div className="cell auto small-12 medium-10 large-8 medium-offset-1 large-offset-2" >
            <p>This page contains more resources for your <i>LANDWAR</i> sessions.</p>
        </div>
    </div>
    {/* <div className="grid-x grid-margin-x">
        <div className="cell auto small-12 medium-10 large-8 medium-offset-1 large-offset-2">
            <label>old min</label>
            <input type="number" onChange={(e)=>{setOldMin(e.target.value); calcValue(oldVal, e.target.value, oldMax, newMin, newMax);}}></input>
            
            <label>old max</label>
            <input type="number" onChange={(e)=>{setOldMax(e.target.value); calcValue(oldVal, oldMin, e.target.value, newMin, newMax);}}></input>
            
            <label>new min</label>
            <input type="number" onChange={(e)=>{setNewMin(e.target.value); calcValue(oldVal, oldMin, oldMax, e.target.value, newMax);}}></input>
            
            <label>new max</label>
            <input type="number" onChange={(e)=>{setNewMax(e.target.value); calcValue(oldVal, oldMin, oldMax, newMin, e.target.value);}}></input>

            <label>Old Value</label>
            <input type="number" onChange={(e)=>{setOldVal(e.target.value); calcValue(e.target.value, oldMin, oldMax, newMin, newMax);}}></input>

            <label>Result = {newVal}</label>
        </div>
    </div> */}
    <div>

    </div>
</div>
);
};