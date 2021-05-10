import React, { useEffect } from "react";
import { connect } from "react-redux";
import Template from "./layout/Template";
import { Table, Modal, Button } from "react-bootstrap";
import AddModalForm from "../forms/bilanForms/addModalForm";
import EditModalForm from "../forms/bilanForms/editModalForm";

import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { useHistory } from "react-router";

import {
  GetBilansAction,
  DeleteBilanAction,
  AnnulerActionForBilan,
} from "../redux/bilan/actions/bilanActions";

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
            Ajouter un bilan
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
            Modifier le bilan
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditModalForm {...props} />
        </Modal.Body>
      </Modal>
    </div>
  );
}

function DeleteModal({ bilan, onHide, show, DeleteBilanAction }) {
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
            Supprimer le bilan
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Souhaitez-vous supprimer le bilan '
            <strong>
              <i>{bilan.libelle}</i>
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
              const id = bilan.id;
              DeleteBilanAction(id);
              history.push("/administration/bilans");
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

function Bilan(props) {
  const {
    bilans,
    GetBilansAction,
    DeleteBilanAction,
    AnnulerActionForBilan,
  } = props;

  const [addModalShow, setAddModalShow] = React.useState(false);
  const [showEditModal, setShowEditModal] = React.useState(false);
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const [editModalShow, setEditModalShow] = React.useState(false);
  const [deleteModalShow, setDeleteModalShow] = React.useState(false);
  const [bilanData, setBilanData] = React.useState({});

  useEffect(() => {
    GetBilansAction();
  }, [GetBilansAction]);

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
          + Nouveau bilan
        </Button>
        <AddModal
          show={addModalShow}
          onHide={() => {
            AnnulerActionForBilan();
            setAddModalShow(false);
          }}
        />
        <Table hover responsive="md" borderless>
          <thead>
            <tr style={{ textAlign: "center" }}>
              <th>Code</th>
              <th>Libellé</th>
              <th>Date d'effectivité</th>
              <th>Date de fin d'effectivité</th>
              <th>Date de création</th>
              <th>Date de modification</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {bilans.map((bilan) => (
              <tr key={bilan.id} style={{ textAlign: "center" }}>
                <td> {bilan.code}</td>
                <td> {bilan.libelle}</td>
                <td>{bilan.dateEffectivite}</td>
                <td>{bilan.dateFinEffectivite}</td>
                <td>{bilan.dateCreation}</td>
                <td>{bilan.dateModification}</td>
                <td>
                  {bilan.statut ? (
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
                        setBilanData(bilan);
                        setShowEditModal(true);
                      }}
                    />
                    <FaTrash
                      style={{ marginLeft: "19px" }}
                      onClick={() => {
                        setDeleteModalShow(true);
                        setBilanData(bilan);
                        setShowDeleteModal(true);
                      }}
                    />
                  </div>
                  {showEditModal ? (
                    <EditModal
                      show={editModalShow}
                      onHide={() => {
                        AnnulerActionForBilan();
                        setEditModalShow(false);
                      }}
                      bilan={bilan}
                    />
                  ) : null}
                  {showDeleteModal ? (
                    <DeleteModal
                      show={deleteModalShow}
                      onHide={() => setDeleteModalShow(false)}
                      bilan={bilanData}
                      DeleteBilanAction={DeleteBilanAction}
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
    bilans: state.bilan.bilans,
  };
};

/*
      TO MAP ACTION CREATORS TO PROPS
      */
const mapDispatchToProps = (dispatch) => ({
  GetBilansAction: () => dispatch(GetBilansAction()),
  DeleteBilanAction: (id) => dispatch(DeleteBilanAction(id)),
  AnnulerActionForBilan: () => dispatch(AnnulerActionForBilan()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Bilan);
