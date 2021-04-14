import React from "react";
import { connect } from "react-redux";
import Template from "./layout/Template";
import { Table, Modal, Button } from "react-bootstrap";
import AddModalForm from "../forms/typeClientForms/addModalForm";

import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import EditModalForm from "../forms/editModalForm";
import { useHistory } from "react-router";

import {
  GetTypesClientAction,
  DeleteTypeClientAction,
  AnnulerActionForTC,
} from "../redux/typeClient/actions/typeClientActions";

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
            Ajouter un Type de client
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddModalForm annuler={props.onHide} />
        </Modal.Body>
      </Modal>
    </div>
  );
}

function TypeClient(props) {
  const { AnnulerActionForTC } = props;
  const [addModalShow, setAddModalShow] = React.useState(false);

  return (
    <>
      <Template />
      <div style={{ marginBottom: "45px" }}></div>

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
          + Ajouter un type de client
        </Button>
        <AddModal
          show={addModalShow}
          onHide={() => {
            AnnulerActionForTC();
            setAddModalShow(false);
          }}
        />
        <Table hover responsive="md" borderless>
          <thead>
            <tr style={{ textAlign: "center" }}>
              <th>ID</th>
              <th>Code</th>
              <th>Libellé</th>
              <th>Date de création</th>
              <th>Date de modification</th>
              <th>Actions</th>
            </tr>
          </thead>
        </Table>
      </div>
    </>
  );
}

/*
TO ACCESS THE REDUX STATE IN THIS COMPONENT
*/
const mapStateToProps = (state) => {
  return {
    typesClient: state.typeClient.typesClient,
  };
};

/*
  TO MAP ACTION CREATORS TO PROPS
  */
const mapDispatchToProps = (dispatch) => ({
  GetTypesClientAction: () => dispatch(GetTypesClientAction()),
  DeleteTypeClientAction: (id) => dispatch(DeleteTypeClientAction(id)),
  AnnulerActionForTC: () => dispatch(AnnulerActionForTC()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TypeClient);

/**
 * 
 * 
 * 
function EditModal(props) {
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
            Modifier le Type de client
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditModalForm {...props} />
        </Modal.Body>
      </Modal>
    </div>
  );
}





function DeleteModal({ typeClient, onHide, show, DeleteTypeClientAction }) {
  const history = useHistory();
  return (
    <div>
      <Modal
        show={show}
        onHide={onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Supprimer le Type de client
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Souhaitez-vous supprimer le Type de client '
            <strong>
              <i>{typeClient.nom}</i>
            </strong>
            ' ?
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            type="reset"
            variant="secondary"
            style={{ borderRadius: "20px" }}
            onClick={onHide}
          >
            Annuler
          </Button>
          <Button
            type="submit"
            variant="warning"
            style={{ marginLeft: "8px", borderRadius: "20px" }}
            onClick={() => {
              const id = typeClient.id;
              DeleteTypeClientAction(id);
              history.push("/administration/type-client");
              window.location.reload();
            }}
          >
            Supprimer
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
 * 
 * 
 */
