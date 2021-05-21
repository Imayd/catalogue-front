import React from "react";
import { NavLink } from "react-router-dom";

function SubMenu({ item }) {
  return (
    <div>
      <NavLink to={item.subNav.path}>
        <span>{item.subNav.title}</span>
      </NavLink>
    </div>
  );
}

export default SubMenu;
