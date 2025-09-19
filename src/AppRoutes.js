import React from "react";
import Login from "./container/Login";
import { Route, Routes } from "react-router-dom";
import Journal from "./container/Journal";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path='/' Component={Login} />
            <Route path='/journal' Component={Journal} />
        </Routes>
    )
}

export default AppRoutes;