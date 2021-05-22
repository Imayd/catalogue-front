import React from "react";
import NavBar from "./layout/NavBar";
import SideBar from "./layout/SideBar";
import { NavLink } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import AddModalForm from "../forms/themeForms/addModalForm";
import { Modal } from "react-bootstrap";
import { connect } from "react-redux";
import { CancelAction } from "../redux/theme/themeActions";
import Theme from "./Theme";

function AddModal(props) {
  return (
    <div>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Ajouter un thème
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddModalForm annuler={props.onHide} />
        </Modal.Body>
      </Modal>
    </div>
  );
}

function Monetique(props) {
  const { CancelAction } = props;
  const [addModalShow, setAddModalShow] = React.useState(false);
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
          defaultActiveKey="/produits/markets-maintenance"
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

        <Button
          variant="light"
          style={{
            color: "black",
            float: "right",
            marginBottom: "17px",
            backgroundColor: "#eceaea",
            borderRadius: "10px",
          }}
          onClick={() => setAddModalShow(true)}
        >
          {" "}
          + Nouveau thème
        </Button>
      </div>

      <AddModal
        show={addModalShow}
        onHide={() => {
          CancelAction();
          setAddModalShow(false);
        }}
      />

      <Theme />
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  CancelAction: () => dispatch(CancelAction()),
});

export default connect(null, mapDispatchToProps)(Monetique);
