import React from "react";
import { NavLink } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import "./sidebar.css";
import { FaHome } from "react-icons/fa";
import * as FaIcons from "react-icons/fa";

function SideBar() {
  return (
    <>
      <nav className="nav-menu active">
        <ul className="nav-menu-items">
          <li className="nav-text">
            <NavLink to="/home" activeStyle={{ color: "#e29c32" }}>
              <FaHome></FaHome> <span>Home</span>
            </NavLink>
          </li>
          {SidebarData.map((item, index) => {
            return (
              <>
                <li key={index} className={item.cName}>
                  <NavLink to={item.path} activeStyle={{ color: "#e29c32" }}>
                    {item.icon}
                    <span>{item.title}</span>
                    <div>
                      {item.subNav ? (
                        <FaIcons.FaCaretDown className="menu-bars2"></FaIcons.FaCaretDown>
                      ) : null}
                    </div>
                  </NavLink>
                </li>

                {item.subNav &&
                  item.subNav.map((item, index) => {
                    return (
                      <li className="liSubMenu">
                        <NavLink
                          to={item.path}
                          key={index}
                          activeClassName="activeSubMenu"
                          className="subMenu"
                        >
                          <div>
                            {" "}
                            <FaIcons.FaAngleRight />
                            <span>{item.title}</span>
                          </div>
                        </NavLink>
                      </li>
                    );
                  })}
              </>
            );
          })}
        </ul>
      </nav>
    </>
  );
}

export default SideBar;
