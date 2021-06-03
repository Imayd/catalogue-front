import React from "react";
import NavBar from "./NavBar";
import SideBar from "./SideBar";
import { NavLink } from "react-router-dom";
import Nav from "react-bootstrap/Nav";

function MonetiqueTemplate(props) {
  return (
    <div>
      <NavBar />
      <SideBar />
      <br></br>
      <div className="data">
        <h3 style={{ marginBottom: "15px" }}>
          <strong
            style={
              {
                /*textDecorationLine: "underline",
                textDecorationColor: "#f1bd7c",
                textDecorationThickness: "2px",
                textUnderlineOffset: "5px",*/
              }
            }
          >
            La famille de produits Monétique
          </strong>
        </h3>
        <Nav
          fill
          variant="tabs"
          defaultActiveKey="/produits/monetique/themes"
          style={{ marginBottom: "15px" }}
        >
          <Nav.Item>
            <Nav.Link>
              <NavLink
                to="/produits/monetique/themes"
                activeClassName="actived"
                style={{
                  textDecoration: "none",
                  color: "#777575",
                  fontStyle: "oblique",
                }}
              >
                Maintenance des Thèmes des cartes
              </NavLink>
            </Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link>
              <NavLink
                exact
                to="/produits/monetique/cartes"
                activeClassName="actived"
                style={{
                  textDecoration: "none",
                  fontStyle: "oblique",
                  color: "#777575",
                }}
              >
                {" "}
                Maintenance du Produit 'Carte'
              </NavLink>
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </div>
    </div>
  );
}

export default MonetiqueTemplate;
