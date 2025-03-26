import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import HomePage from "../pages/landing/homepage";
import UnitEditor from "../pages/units/UnitEditor";
import UnitEditorPage from "../pages/landing/UnitEditorPage";
import RulebooksPage from "../pages/landing/RulebooksPage";
import TagLibPage from "../pages/landing/TagLibPage";
import ArmyListPage from "../pages/landing/ArmyListPage";
import CardGenPage from "../pages/landing/CardGenPage";
import ArmyEditor from "../pages/army/ArmyEditor";
import UnitPrintedPage from "../pages/units/UnitPrintedPage";
import PrintBlankCards from "../pages/units/PrintBlankCards";

export default function SiteRouter({props}){

    return(
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<HomePage />}/>
                <Route exact path="/editor/unit" element={<UnitEditor />}/>
                <Route extact path="/editor/army" element={<ArmyEditor />}/>

                <Route exact path="/info/rules" element={<RulebooksPage />}/>
                <Route exact path="/info/units" element={<UnitEditorPage />}/>
                <Route exact path="/info/tags" element={<TagLibPage />}/>
                <Route exact path="/info/army" element={<ArmyListPage />}/>
                <Route exact path="/info/cardgen" element={<CardGenPage />}/>

                <Route exact path="/print/units/:listName" element={<UnitPrintedPage />}/>
                <Route exact path="print/cards/:total" element={<PrintBlankCards />}/>
            </Routes>
        </BrowserRouter>
    );
};