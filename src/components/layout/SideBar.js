import React from 'react'
import { NavLink } from 'react-router-dom'
import {SidebarData} from "./SidebarData";
import './sidebar.css';
function SideBar() {
    return (
        <div>
            <nav className="nav-menu active">
                <ul className='nav-menu-items'>
                    {
                        SidebarData.map((item, index) =>{
                            return(
                                <li key={index} className={item.cName}>
                                    <NavLink to={item.path} activeStyle={{ color: '#e29c32' }} >
                                        {item.icon}
                                        <span>
                                            {item.title}
                                        </span>
                                    </NavLink>
                                </li>
                            )
                        })
                    }
                </ul>
            </nav>
        </div>
    )
}

export default SideBar