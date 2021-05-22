import React from "react";
import * as FaIcons from "react-icons/fa";
export const SidebarData = [
  {
    title: "Administration",
    path: "/administration/",
    icon: <FaIcons.FaCog></FaIcons.FaCog>,
    cName: "nav-text",
  },
  {
    title: "Produits",
    path: "/produits/monetique/themes",
    icon: <FaIcons.FaBoxOpen />,
    cName: "nav-text",
    subNav: [
      {
        title: "Prérequis",
        path: "/produits/maintenance-prerequis",
      },
      {
        title: "Monétique",
        path: "/produits/monetique/themes",
      },

      {
        title: "Package",
        path: "/produits/package",
      },
    ],
  },
  {
    title: "Reporting",
    path: "/reporting",
    icon: <FaIcons.FaChartBar />,
    cName: "nav-text",
  },
];
