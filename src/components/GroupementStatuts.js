import React, { useEffect } from "react";
import { connect } from "react-redux";
import PrerequisTemplate from "./layout/PrerequisTemplate";
import { Table, Modal, Button } from "react-bootstrap";
import AddModalForm from "../forms/grpStatutsForms/addModalForm";

import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import EditModalForm from "../forms/grpStatutsForms/editModalForm";
import { useHistory } from "react-router";

import {
  GetGrpsStatutsAction,
  DeleteGrpStatutsAction,
  AnnulerAction,
} from "../redux/grpStatuts/grpStatutsActions";

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
            Ajouter un Groupement de Statuts
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
            Modifier le Groupement de Statuts
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditModalForm {...props} />
        </Modal.Body>
      </Modal>
    </div>
  );
}

function DeleteModal({ grpStatuts, onHide, show, DeleteGrpStatutsAction }) {
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
            Supprimer le Groupement de Statuts
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Souhaitez-vous supprimer le Groupement de Statuts '
            <strong>
              <i>{grpStatuts.libelle}</i>
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
              const id = grpStatuts.id;
              DeleteGrpStatutsAction(id);
              history.push(
                "/produits/maintenance-prerequis/groupement-statuts"
              );
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

function GroupementStatuts(props) {
  const {
    grpStatuts,
    GetGrpsStatutsAction,
    DeleteGrpStatutsAction,
    AnnulerAction,
  } = props;

  const [addModalShow, setAddModalShow] = React.useState(false);
  const [showEditModal, setShowEditModal] = React.useState(false);
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const [editModalShow, setEditModalShow] = React.useState(false);
  const [deleteModalShow, setDeleteModalShow] = React.useState(false);
  const [grpStatutsData, setGrpStatutsData] = React.useState({});

  useEffect(() => {
    GetGrpsStatutsAction();
  }, [GetGrpsStatutsAction]);
  return (
    <>
      <PrerequisTemplate />
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
          + Ajouter un Groupement de Statuts
        </Button>
        <AddModal
          show={addModalShow}
          onHide={() => {
            AnnulerAction();
            setAddModalShow(false);
          }}
        />
        <Table hover responsive="xl" borderless>
          <thead>
            <tr style={{ textAlign: "center", whiteSpace: "nowrap" }}>
              <th>Code</th>
              <th>Libellé</th>
              <th>Description</th>
              <th>Date de création</th>
              <th>Date de modification</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {grpStatuts.map((gs) => (
              <tr key={gs.id} style={{ textAlign: "center" }}>
                <td> {gs.code}</td>
                <td> {gs.libelle}</td>
                <td> {gs.description}</td>
                <td>{gs.dateCreation}</td>
                <td>{gs.dateModification}</td>
                <td>
                  <div className="row">
                    <FaEdit
                      style={{ marginLeft: "19px" }}
                      onClick={() => {
                        setEditModalShow(true);
                        setGrpStatutsData(gs);
                        setShowEditModal(true);
                      }}
                    />
                    <FaTrash
                      style={{ marginLeft: "19px" }}
                      onClick={() => {
                        setDeleteModalShow(true);
                        setGrpStatutsData(gs);
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
                      grpStatuts={grpStatutsData}
                    />
                  ) : null}
                  {showDeleteModal ? (
                    <DeleteModal
                      show={deleteModalShow}
                      onHide={() => setDeleteModalShow(false)}
                      grpStatuts={grpStatutsData}
                      DeleteGrpStatutsAction={DeleteGrpStatutsAction}
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
    grpStatuts: state.grpStatuts.grpsStatuts,
  };
};

/*
  TO MAP ACTION CREATORS TO PROPS
  */
const mapDispatchToProps = (dispatch) => ({
  GetGrpsStatutsAction: () => dispatch(GetGrpsStatutsAction()),
  DeleteGrpStatutsAction: (id) => dispatch(DeleteGrpStatutsAction(id)),
  AnnulerAction: () => dispatch(AnnulerAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(GroupementStatuts);
