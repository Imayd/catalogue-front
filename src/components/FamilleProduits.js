import React, { useEffect } from "react";
import { connect } from "react-redux";
import Template from "./layout/Template";
import { Table, Modal, Button } from "react-bootstrap";
import AddModalForm from "../forms/familleProduitsForms/addModalForm";

import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import EditModalForm from "../forms/familleProduitsForms/editModalForm";
import { useHistory } from "react-router";

import {
  GetFamilleProduitsAction,
  DeleteFamilleProduitsAction,
  AnnulerActionForFP,
} from "../redux/familleProduits/actions/familleProduitsActions";

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
            Ajouter une famille de produits
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
            Modifier la famille de produits
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditModalForm {...props} />
        </Modal.Body>
      </Modal>
    </div>
  );
}

function DeleteModal({
  familleProduits,
  onHide,
  show,
  DeleteFamilleProduitsAction,
}) {
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
            Supprimer la famille de produits
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Souhaitez-vous supprimer la famille de produits '
            <strong>
              <i>{familleProduits.libelle}</i>
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
              const id = familleProduits.id;
              DeleteFamilleProduitsAction(id);
              history.push("/administration/famille-produits");
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

function FamilleProduits(props) {
  const {
    familleProduits,
    GetFamilleProduitsAction,
    DeleteFamilleProduitsAction,
    AnnulerActionForFP,
  } = props;

  const [addModalShow, setAddModalShow] = React.useState(false);
  const [showEditModal, setShowEditModal] = React.useState(false);
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const [editModalShow, setEditModalShow] = React.useState(false);
  const [deleteModalShow, setDeleteModalShow] = React.useState(false);
  const [familleProduitsData, setFamilleProduitsData] = React.useState({});

  useEffect(() => {
    GetFamilleProduitsAction();
  }, [GetFamilleProduitsAction]);

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
          + Ajouter une famille de produits
        </Button>
        <AddModal
          show={addModalShow}
          onHide={() => {
            AnnulerActionForFP();
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

          <tbody>
            {familleProduits.map((familleProduits) => (
              <tr key={familleProduits.id} style={{ textAlign: "center" }}>
                <td> {familleProduits.id}</td>
                <td> {familleProduits.code}</td>
                <td> {familleProduits.libelle}</td>
                <td>{familleProduits.dateCreation}</td>
                <td>{familleProduits.dateModification}</td>
                <td>
                  <div className="row">
                    <FaEdit
                      style={{ marginLeft: "19px" }}
                      onClick={() => {
                        setEditModalShow(true);
                        setFamilleProduitsData(familleProduits);
                        setShowEditModal(true);
                      }}
                    />
                    <FaTrash
                      style={{ marginLeft: "19px" }}
                      onClick={() => {
                        setDeleteModalShow(true);
                        setFamilleProduitsData(familleProduits);
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
                      familleProduits={familleProduits}
                    />
                  ) : null}
                  {showDeleteModal ? (
                    <DeleteModal
                      show={deleteModalShow}
                      onHide={() => setDeleteModalShow(false)}
                      familleProduits={familleProduitsData}
                      DeleteFamilleProduitsAction={DeleteFamilleProduitsAction}
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
    familleProduits: state.familleProduits.fp,
  };
};

/*
    TO MAP ACTION CREATORS TO PROPS
    */
const mapDispatchToProps = (dispatch) => ({
  GetFamilleProduitsAction: () => dispatch(GetFamilleProduitsAction()),
  DeleteFamilleProduitsAction: (id) =>
    dispatch(DeleteFamilleProduitsAction(id)),
  AnnulerActionForFP: () => dispatch(AnnulerActionForFP()),
});

export default connect(mapStateToProps, mapDispatchToProps)(FamilleProduits);
