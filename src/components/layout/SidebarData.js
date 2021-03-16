import React from "react";
import * as FaIcons from 'react-icons/fa';
export const SidebarData = [
    {
        title:'Administration',
        path:'/administration',        
        icon:<FaIcons.FaCog></FaIcons.FaCog>,
        cName: 'nav-text'
    },
    {
        title:'Produits',
        path:'/produits',
        icon:<FaIcons.FaBoxOpen/>,
        cName: 'nav-text'
    },
    {
        title:'Reporting',
        path:'/reporting',
        icon:<FaIcons.FaChartBar/>,
        cName: 'nav-text'
    }
]