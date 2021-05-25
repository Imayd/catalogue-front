import React, { useEffect } from "react";
import { connect } from "react-redux";
import Template from "./layout/Template";
import { Table, Modal, Button } from "react-bootstrap";
import AddModalForm from "../forms/typeClientForms/addModalForm";

import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import EditModalForm from "../forms/typeClientForms/editModalForm";
import { useHistory } from "react-router";
import { GetFamillesProduitsAction } from "../redux/familleProduits/actions/familleProduitsActions";
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
              <i>{typeClient.libelle}</i>
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

function TypeClient(props) {
  const {
    typesClient,
    GetTypesClientAction,
    GetFamillesProduitsAction,
    DeleteTypeClientAction,
    AnnulerActionForTC,
  } = props;

  const [addModalShow, setAddModalShow] = React.useState(false);
  const [showEditModal, setShowEditModal] = React.useState(false);
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const [editModalShow, setEditModalShow] = React.useState(false);
  const [deleteModalShow, setDeleteModalShow] = React.useState(false);
  const [typeClientData, setTypeClientData] = React.useState({});

  useEffect(() => {
    GetTypesClientAction();
    GetFamillesProduitsAction();
  }, [GetTypesClientAction, GetFamillesProduitsAction]);
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
        <Table hover responsive borderless>
          <thead>
            <tr style={{ textAlign: "center" }}>
              <th>ID</th>
              <th>Code</th>
              <th>Libellé</th>
              <th>Famille de produits associée</th>
              <th>Date de création</th>
              <th>Date de modification</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {typesClient.map((typeClient) => (
              <tr key={typeClient.id} style={{ textAlign: "center" }}>
                <td> {typeClient.id}</td>
                <td> {typeClient.code}</td>
                <td> {typeClient.libelle}</td>
                <td>{typeClient.familleProduits}</td>
                <td>{typeClient.dateCreation}</td>
                <td>{typeClient.dateModification}</td>
                <td>
                  {typeClient.statut ? (
                    <div
                      style={{
                        textAlign: "center",
                        fontWeight: "450",
                        color: "#e29c32",
                      }}
                    >
                      Actif
                    </div>
                  ) : (
                    <div style={{ textAlign: "center", fontWeight: "400" }}>
                      Inactif
                    </div>
                  )}
                </td>
                <td>
                  <div className="row">
                    <FaEdit
                      style={{ marginLeft: "19px" }}
                      onClick={() => {
                        setEditModalShow(true);
                        setTypeClientData(typeClient);
                        setShowEditModal(true);
                      }}
                    />
                    <FaTrash
                      style={{ marginLeft: "19px" }}
                      onClick={() => {
                        setDeleteModalShow(true);
                        setTypeClientData(typeClient);
                        setShowDeleteModal(true);
                      }}
                    />
                  </div>
                  {showEditModal ? (
                    <EditModal
                      show={editModalShow}
                      onHide={() => {
                        AnnulerActionForTC();
                        setEditModalShow(false);
                      }}
                      typeClient={typeClientData}
                    />
                  ) : null}
                  {showDeleteModal ? (
                    <DeleteModal
                      show={deleteModalShow}
                      onHide={() => setDeleteModalShow(false)}
                      typeClient={typeClientData}
                      DeleteTypeClientAction={DeleteTypeClientAction}
                    />
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
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
  GetFamillesProduitsAction: () => dispatch(GetFamillesProduitsAction()),
  DeleteTypeClientAction: (id) => dispatch(DeleteTypeClientAction(id)),
  AnnulerActionForTC: () => dispatch(AnnulerActionForTC()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TypeClient);
