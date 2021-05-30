import React from "react";
import NavBar from "./NavBar";
import SideBar from "./SideBar";
import { NavLink } from "react-router-dom";
import Nav from "react-bootstrap/Nav";

export default function PrerequisTemplate() {
  return (
    <div>
      <NavBar />
      <SideBar />
      <br></br>
      <div className="data">
        <h3 style={{ marginBottom: "15px" }}>
          <strong>Maintenance des pré-requis </strong>
        </h3>
        <Nav fill variant="tabs" style={{ marginBottom: "15px" }}>
          <Nav.Item>
            <Nav.Link>
              <NavLink
                to="/produits/maintenance-prerequis/groupement-statuts"
                activeClassName="actived"
                style={{
                  textDecoration: "none",
                  color: "#777575",
                  fontStyle: "oblique",
                }}
              >
                Groupements de statuts
              </NavLink>
            </Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link>
              <NavLink
                exact
                to="/produits/maintenance-prerequis/statuts"
                activeClassName="actived"
                style={{
                  textDecoration: "none",
                  fontStyle: "oblique",
                  color: "#777575",
                }}
              >
                {" "}
                Statuts
              </NavLink>
            </Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link>
              <NavLink
                to="/produits/maintenance-prerequis/groupement-motifs"
                activeClassName="actived"
                style={{
                  textDecoration: "none",
                  fontStyle: "oblique",
                  color: "#777575",
                }}
              >
                {" "}
                Groupements de motifs
              </NavLink>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link>
              <NavLink
                to="/produits/maintenance-prerequis/motifs"
                activeClassName="actived"
                style={{
                  textDecoration: "none",
                  fontStyle: "oblique",
                  color: "#777575",
                }}
              >
                {" "}
                Motifs
              </NavLink>
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </div>
    </div>
  );
}
