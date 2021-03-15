import React from 'react'

export default function Navbar2(props) {
    return (
        <nav className="navbar">
            <ul className="navbar-nav">
                {props.children}
            </ul>
        </nav>
    )
}

export function NavItem(props) {
    return(
        <li className="nav-item">
            <a href="" className="icon-button">
                {props.icon}
            </a>
        </li>
    );
}
