import React, { useEffect } from "react";
import { connect } from "react-redux";
import MonetiqueTemplate from "./layout/MonetiqueTemplate";
import { Table, Modal, Button } from "react-bootstrap";
import AddModalForm from "../forms/carteForms/addModalForm";
import EditModalForm from "../forms/carteForms/editModalForm";
import InfoModalForm from "../forms/carteForms/infoModalForm";
import { FaEdit, FaInfoCircle } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { useHistory } from "react-router";
import { GetThemesAction } from "../redux/theme/themeActions";
import { GetFamillesProduitsAction } from "../redux/familleProduits/actions/familleProduitsActions";

import {
  GetCartesAction,
  DeleteCarteAction,
  AnnulerAction,
} from "../redux/carte/carteActions";

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
            Ajouter une Carte
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
            Modifier la Carte
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditModalForm {...props} />
        </Modal.Body>
      </Modal>
    </div>
  );
}

function DeleteModal({ carte, onHide, show, DeleteCarteAction }) {
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
            Supprimer la Carte
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Souhaitez-vous supprimer la Carte '
            <strong>
              <i>{carte.libelle}</i>
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
              const id = carte.id;
              DeleteCarteAction(id);
              history.push("/produits/monetique/cartes");
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

function InfoModal(props) {
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
            Détails de la Carte
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InfoModalForm carte={props.carte} annuler={props.onHide} />
        </Modal.Body>
      </Modal>
    </div>
  );
}

function Carte(props) {
  const {
    cartes,
    GetCartesAction,
    GetFamillesProduitsAction,
    GetThemesAction,
    DeleteCarteAction,
    AnnulerAction,
  } = props;

  const [addModalShow, setAddModalShow] = React.useState(false);
  const [showEditModal, setShowEditModal] = React.useState(false);
  const [infoModalShow, setInfoModalShow] = React.useState(false);
  const [showInfoModal, setShowInfoModal] = React.useState(false);
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const [editModalShow, setEditModalShow] = React.useState(false);
  const [deleteModalShow, setDeleteModalShow] = React.useState(false);
  const [carteData, setCarteData] = React.useState({});

  useEffect(() => {
    GetCartesAction();
    GetFamillesProduitsAction();
    GetThemesAction();
  }, [GetFamillesProduitsAction, GetCartesAction, GetThemesAction]);

  return (
    <>
      <MonetiqueTemplate />
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
          + Ajouter une Carte
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
              <th>FamilleProduits associée</th>
              <th>Theme associé</th>
              <th>Date d'effectivité</th>
              <th>Date de création</th>
              <th>Date de modification</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {cartes.map((carte) => (
              <tr key={carte.id} style={{ textAlign: "center" }}>
                <td> {carte.code}</td>
                <td> {carte.libelle}</td>
                <td>{carte.familleProduits}</td>
                <td>{carte.theme}</td>
                <td>{carte.dateEffectivite}</td>
                <td>{carte.dateCreation}</td>
                <td>{carte.dateModification}</td>
                <td>
                  {carte.statut ? (
                    <div
                      style={{
                        textAlign: "center",
                        fontWeight: "450",
                        color: "#e29c32",
                      }}
                    >
                      Active
                    </div>
                  ) : (
                    <div style={{ textAlign: "center", fontWeight: "400" }}>
                      Inactive
                    </div>
                  )}
                </td>
                <td>
                  <div className="row" style={{ whiteSpace: "nowrap" }}>
                    <FaInfoCircle
                      style={{ marginLeft: "10px" }}
                      onClick={() => {
                        setInfoModalShow(true);
                        setCarteData(carte);
                        setShowInfoModal(true);
                      }}
                    />
                    <FaEdit
                      style={{ marginLeft: "8px" }}
                      onClick={() => {
                        setEditModalShow(true);
                        setCarteData(carte);
                        setShowEditModal(true);
                      }}
                    />
                    <FaTrash
                      style={{ marginLeft: "8px" }}
                      onClick={() => {
                        setDeleteModalShow(true);
                        setCarteData(carte);
                        setShowDeleteModal(true);
                      }}
                    />
                  </div>
                  {showInfoModal ? (
                    <InfoModal
                      show={infoModalShow}
                      onHide={() => {
                        AnnulerAction();
                        setInfoModalShow(false);
                      }}
                      carte={carteData}
                    />
                  ) : null}
                  {showEditModal ? (
                    <EditModal
                      show={editModalShow}
                      onHide={() => {
                        AnnulerAction();
                        setEditModalShow(false);
                      }}
                      carte={carteData}
                    />
                  ) : null}
                  {showDeleteModal ? (
                    <DeleteModal
                      show={deleteModalShow}
                      onHide={() => setDeleteModalShow(false)}
                      carte={carteData}
                      DeleteCarteAction={DeleteCarteAction}
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
    cartes: state.carte.cartes,
  };
};

/*
    TO MAP ACTION CREATORS TO PROPS
    */
const mapDispatchToProps = (dispatch) => ({
  GetFamillesProduitsAction: () => dispatch(GetFamillesProduitsAction()),
  GetThemesAction: () => dispatch(GetThemesAction()),
  GetCartesAction: () => dispatch(GetCartesAction()),
  DeleteCarteAction: (id) => dispatch(DeleteCarteAction(id)),
  AnnulerAction: () => dispatch(AnnulerAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Carte);
