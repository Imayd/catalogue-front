import React, { useEffect } from "react";
import { connect } from "react-redux";
import ServicesTemplate from "./layout/ServicesTemplate";
import { Table, Modal, Button } from "react-bootstrap";
import AddModalForm from "../forms/typeServiceForms/addModalForm";

import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import EditModalForm from "../forms/typeServiceForms/editModalForm";
import { useHistory } from "react-router";

import {
  GetTypesServiceAction,
  DeleteTypeServiceAction,
  AnnulerAction,
} from "../redux/typeService/typeServiceActions";

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
            Ajouter un Type de Service
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
            Modifier le Type de Service
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditModalForm {...props} />
        </Modal.Body>
      </Modal>
    </div>
  );
}

function DeleteModal({ typeService, onHide, show, DeleteTypeServiceAction }) {
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
            Supprimer le Type de Service
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Souhaitez-vous supprimer le Type de Service '
            <strong>
              <i>{typeService.libelle}</i>
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
              const id = typeService.id;
              DeleteTypeServiceAction(id);
              history.push("/produits/services/type-service");
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

function TypeService(props) {
  const {
    typesService,
    GetTypesServiceAction,
    DeleteTypeServiceAction,
    AnnulerAction,
  } = props;

  const [addModalShow, setAddModalShow] = React.useState(false);
  const [showEditModal, setShowEditModal] = React.useState(false);
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const [editModalShow, setEditModalShow] = React.useState(false);
  const [deleteModalShow, setDeleteModalShow] = React.useState(false);
  const [typeServiceData, setTypeServiceData] = React.useState({});

  useEffect(() => {
    GetTypesServiceAction();
  }, [GetTypesServiceAction]);
  return (
    <>
      <ServicesTemplate />
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
          + Ajouter un Type de Service
        </Button>
        <AddModal
          show={addModalShow}
          onHide={() => {
            AnnulerAction();
            setAddModalShow(false);
          }}
        />
        <Table hover responsive borderless>
          <thead>
            <tr style={{ textAlign: "center", whiteSpace: "nowrap" }}>
              <th>ID Famille</th>
              <th>Famille de produits</th>
              <th>Libellé</th>
              <th>Description</th>
              <th>Date de création</th>
              <th>Date de modification</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {typesService.map((typeService) => (
              <tr key={typeService.id} style={{ textAlign: "center" }}>
                <td> {typeService.familleProduitsId}</td>
                <td>{typeService.familleProduits}</td>
                <td> {typeService.libelle}</td>
                <td> {typeService.description}</td>
                <td>{typeService.dateCreation}</td>
                <td>{typeService.dateModification}</td>
                <td>
                  <div className="row">
                    <FaEdit
                      style={{ marginLeft: "19px" }}
                      onClick={() => {
                        setEditModalShow(true);
                        setTypeServiceData(typeService);
                        setShowEditModal(true);
                      }}
                    />
                    <FaTrash
                      style={{ marginLeft: "19px" }}
                      onClick={() => {
                        setDeleteModalShow(true);
                        setTypeServiceData(typeService);
                        setShowDeleteModal(true);
                      }}
                    />
                  </div>
                  {showEditModal ? (
                    <EditModal
                      show={editModalShow}
                      onHide={() => {
                        AnnulerAction();
                        setEditModalShow(false);
                      }}
                      typeService={typeServiceData}
                    />
                  ) : null}
                  {showDeleteModal ? (
                    <DeleteModal
                      show={deleteModalShow}
                      onHide={() => setDeleteModalShow(false)}
                      typeService={typeServiceData}
                      DeleteTypeServiceAction={DeleteTypeServiceAction}
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
    typesService: state.typeService.typesService,
  };
};

/*
  TO MAP ACTION CREATORS TO PROPS
  */
const mapDispatchToProps = (dispatch) => ({
  GetTypesServiceAction: () => dispatch(GetTypesServiceAction()),
  DeleteTypeServiceAction: (id) => dispatch(DeleteTypeServiceAction(id)),
  AnnulerAction: () => dispatch(AnnulerAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TypeService);
