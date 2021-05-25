import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  GetThemesAction,
  DeleteThemeAction,
  CancelAction,
} from "../redux/theme/themeActions";
import { Table, Modal, Button } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import EditModalForm from "../forms/themeForms/editModalForm";
import { useHistory } from "react-router";

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
            Modifier le thème
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditModalForm {...props} />
        </Modal.Body>
      </Modal>
    </div>
  );
}

function DeleteModal({ theme, onHide, show, DeleteThemeAction }) {
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
            Supprimer le thème
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Souhaitez-vous supprimer le thème '
            <strong>
              <i>{theme.designation}</i>
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
              const id = theme.id;
              DeleteThemeAction(id);
              history.push("/produits/monetique/themes");
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

function Theme({ themes, GetThemesAction, DeleteThemeAction, CancelAction }) {
  const [showEditModal, setShowEditModal] = React.useState(false);
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const [themeData, setThemeData] = React.useState({});
  const [editModalShow, setEditModalShow] = React.useState(false);
  const [deleteModalShow, setDeleteModalShow] = React.useState(false);

  useEffect(() => {
    GetThemesAction();
  }, [GetThemesAction]);

  return (
    <div className="data">
      <br></br>

      <Table hover responsive="md" borderless>
        <thead>
          <tr style={{ textAlign: "center", whiteSpace: "nowrap" }}>
            <th>Code</th>
            <th>Désignation</th>
            <th>Description du thème</th>
            <th>Date d'éffectivité</th>
            <th>Date fin d'éffectivité</th>
            <th>Date d'ajout</th>
            <th>Date de modification</th>
            <th>Statut</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {themes.map((theme) => (
            <tr key={theme.id} style={{ textAlign: "center" }}>
              <td> {theme.code}</td>
              <td> {theme.designation}</td>
              <td> {theme.description}</td>
              <td>{theme.dateEffectivite}</td>
              <td>{theme.dateFinEffectivite}</td>
              <td> {theme.dateCreation}</td>
              <td> {theme.dateModification}</td>
              <td>
                {theme.statut ? (
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
                      setThemeData(theme);
                      setShowEditModal(true);
                    }}
                  />
                  <FaTrash
                    style={{ marginLeft: "19px" }}
                    onClick={() => {
                      setDeleteModalShow(true);
                      setThemeData(theme);
                      setShowDeleteModal(true);
                    }}
                  />
                </div>
                {showEditModal ? (
                  <EditModal
                    show={editModalShow}
                    onHide={() => {
                      CancelAction();
                      setEditModalShow(false);
                    }}
                    theme={themeData}
                  />
                ) : null}
                {showDeleteModal ? (
                  <DeleteModal
                    show={deleteModalShow}
                    onHide={() => setDeleteModalShow(false)}
                    theme={themeData}
                    DeleteThemeAction={DeleteThemeAction}
                  />
                ) : null}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

/*
TO ACCESS THE REDUX STATE IN THIS COMPONENT
*/
const mapStateToProps = (state) => {
  return {
    themes: state.theme.themes,
  };
};

/*
  TO MAP ACTION CREATORS TO PROPS
  */
const mapDispatchToProps = (dispatch) => ({
  GetThemesAction: () => dispatch(GetThemesAction()),
  DeleteThemeAction: (id) => dispatch(DeleteThemeAction(id)),
  CancelAction: () => dispatch(CancelAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Theme);
