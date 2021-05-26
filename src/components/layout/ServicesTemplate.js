import React from "react";
import NavBar from "./NavBar";
import SideBar from "./SideBar";
import { NavLink } from "react-router-dom";
import Nav from "react-bootstrap/Nav";

export default function Services() {
  return (
    <div>
      <NavBar />
      <SideBar />
      <br></br>
      <div className="data">
        <h3 style={{ marginBottom: "15px" }}>
          <strong>Maintenance des services </strong>
        </h3>
        <Nav fill variant="tabs" style={{ marginBottom: "15px" }}>
          <Nav.Item>
            <Nav.Link>
              <NavLink
                to="/produits/services/type-service"
                activeClassName="actived"
                style={{
                  textDecoration: "none",
                  color: "#777575",
                  fontStyle: "oblique",
                }}
              >
                Maintenance des types de services
              </NavLink>
            </Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link>
              <NavLink
                exact
                to="/produits/services/categorie-service"
                activeClassName="actived"
                style={{
                  textDecoration: "none",
                  fontStyle: "oblique",
                  color: "#777575",
                }}
              >
                {" "}
                Maintenance des catégories de services
              </NavLink>
            </Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link>
              <NavLink
                to="/produits/services/services-facturables"
                activeClassName="actived"
                style={{
                  textDecoration: "none",
                  fontStyle: "oblique",
                  color: "#777575",
                }}
              >
                {" "}
                Maintenance des services facturables
              </NavLink>
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </div>
    </div>
  );
}
