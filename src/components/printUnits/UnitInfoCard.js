import React from "react";

import '../../css/unitcard.css';

/*
{unitInfo['name']}
{unitInfo['subName']}
{unitInfo['size']}
{unitInfo['move']}
{unitInfo['evade']}
{unitInfo['armor']}
{unitInfo['dmgMelee']}
{unitInfo['dmgRange']}
{unitInfo['range']}"
{unitInfo['tags'].map((tag, id) => (
                        <li key={unitInfo.id + "_" + tag + id}>{tag}</li>
                    ))}
*/
export default function UnitInfoCard({ unitInfo, imagesUID }) {


    function getTagList(){
        let str = "";
        unitInfo['tags'].map((tag, id) => {
            return str = str + tag + ",  ";
        });
        return str;
    }

    function getImageUpload(){
        let cache = JSON.parse(localStorage.getItem(imagesUID));
        let img = "data:image/png;base64," + cache["pool"][unitInfo.poolId];
        return img;
    }

return (
    <div className="main" >
        <div className="header-row">
            <div className="title">
                <div className="name">{unitInfo['name']}</div>
                <div className="subName">{unitInfo['subName']}</div>
            </div>
            <div className="points">{Math.round(unitInfo['completeTotal'] + Number.EPSILON)}</div>
        </div>
        <div className="row-top">
            <div className="stat-column-core">
                <div className="stat-core-val">{unitInfo['size']}</div>
                <div className="stat-core-val">{unitInfo['move']}</div>
            </div>
            <div className="stat-attacks">
                <div className="ranges-row">
                    <div>0-1"</div>
                    <div>2-{unitInfo['range']}"</div>
                    <div>{unitInfo['range'] + 1}+"</div>
                </div>
                <div className="stat-dmg-row">
                    <div >{unitInfo['dmgMelee']}</div>
                    <div >{unitInfo['dmgRange']}</div>
                    <div >{unitInfo['dmgRange']}</div>
                </div>
            </div>
        </div>
        <div className="row-bottom">
            <div className="row-bottom-left">
                <div className="stat-column-core-bottom">
                    <div className="stat-core-val">{unitInfo['evade']}</div>
                    <div className="stat-core-val">{unitInfo['armor']}</div>
                </div>
                <div className="tag-panel">
                    {getTagList()}
                </div>
            </div>
            <div className="row-bottom-right" >
                {(unitInfo.imgUrl !== undefined && unitInfo.imgUrl !== "" && unitInfo.imgUrl.length >= 0)
                    &&
                    <img className="unit-img" src={unitInfo.imgUrl} alt="..." />
                }
                {(imagesUID !== "-1")
                &&
                <img className="unit-img" src={getImageUpload()} alt="..." />
               

                }
                
                
            </div>
        </div>
    </div>
);
}