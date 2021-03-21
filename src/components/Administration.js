import React from 'react';
import NavBar from './layout/NavBar';
import SideBar from "./layout/SideBar";

function Administration() {
    return (
        <div >
            <NavBar/>
            <SideBar/>
            <h4 className="data"><strong>Maintenance des marchés</strong></h4>
            
        </div>
    )
}

export default Administration;