import React from "react";
import NavBar from "./NavBar";
import SideBar from "./SideBar";
import { NavLink } from "react-router-dom";
import Nav from "react-bootstrap/Nav";

/**
 * defaultActiveKey is the solution!!!!!
 */
export default function Template() {
  return (
    <div>
      <NavBar />
      <SideBar />
      <br></br>
      <div className="data">
        <h3 style={{ marginBottom: "15px" }}>
          <strong>Paramètres généraux</strong>
        </h3>
        <Nav
          fill
          variant="tabs"
          defaultActiveKey="/administration/markets-maintenance"
          style={{ marginBottom: "15px" }}
        >
          <Nav.Item>
            <Nav.Link>
              <NavLink
                to="/administration/markets-maintenance"
                activeClassName="actived"
                style={{
                  textDecoration: "none",
                  color: "#777575",
                  fontStyle: "oblique",
                }}
              >
                Maintenance des marchés
              </NavLink>
            </Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link>
              <NavLink
                exact
                to="/administration/famille-produits"
                activeClassName="actived"
                style={{
                  textDecoration: "none",
                  fontStyle: "oblique",
                  color: "#777575",
                }}
              >
                {" "}
                Famille de produits
              </NavLink>
            </Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link>
              <NavLink
                to="/administration/type-client"
                activeClassName="actived"
                style={{
                  textDecoration: "none",
                  fontStyle: "oblique",
                  color: "#777575",
                }}
              >
                {" "}
                Type des clients
              </NavLink>
            </Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link>
              <NavLink
                exact
                to="/administration/bilans"
                activeClassName="actived"
                style={{
                  textDecoration: "none",
                  fontStyle: "oblique",
                  color: "#777575",
                }}
              >
                {" "}
                Bilans
              </NavLink>
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </div>
    </div>
  );
}
