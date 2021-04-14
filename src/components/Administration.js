import React from "react";
import MarketsMaintenance from "./MarketsMaintenance";
import Button from "react-bootstrap/Button";
import AddModalForm from "../forms/addModalForm";
import { Modal } from "react-bootstrap";
import { connect } from "react-redux";
import { AnnulerAction } from "../redux/market.maintenance/actions/marketActions";
import Template from "./layout/Template";

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
            Ajouter un marché
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddModalForm annuler={props.onHide} />
        </Modal.Body>
      </Modal>
    </div>
  );
}

function Administration(props) {
  const { AnnulerAction } = props;
  const [addModalShow, setAddModalShow] = React.useState(false);

  return (
    <div>
      <Template />
      <br></br>
      <div className="data">
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
          + Nouveau marché
        </Button>
      </div>
      <AddModal
        show={addModalShow}
        onHide={() => {
          AnnulerAction();
          setAddModalShow(false);
        }}
      />
      <MarketsMaintenance />
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  AnnulerAction: () => dispatch(AnnulerAction()),
});

export default connect(null, mapDispatchToProps)(Administration);

/**
 * <NavBar/>
            <SideBar/>
            <br></br>
            <div className="data">
                <h4 ><strong>Administration</strong></h4>
                <br></br>
               {/* <Nav justify variant="tabs" defaultActiveKey="/administration" >
                    <Nav.Item >
                        <Nav.Link href="/administration" >Maintenance des marchés</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="link-1" >Loooonger NavLink</Nav.Link>
                    </Nav.Item>
                    <Nav.Item >
                        <Nav.Link eventKey="link-2">Link</Nav.Link>
                    </Nav.Item>
                   
                </Nav>/}
                <Nav justify variant="tabs"  >
                <Nav.Item >
                    <NavLink exact to="/administration/markets-maintenance" activeClassName="actived">Markets Maintenance</NavLink>
                </Nav.Item>
                <Nav.Item>

                <NavLink exact to='/administration/type-client' activeClassName="actived"> Type Client</NavLink>
                </Nav.Item>
                <Nav.Item>

                <NavLink  exact to='/' activeClassName="actived"> Produits</NavLink>
                </Nav.Item>
                </Nav>
 */
