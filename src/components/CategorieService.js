import React, { useEffect } from "react";
import { connect } from "react-redux";
import ServicesTemplate from "./layout/ServicesTemplate";
import { Table, Modal, Button } from "react-bootstrap";
import AddModalForm from "../forms/categorieServiceForms/addModalForm";

import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import EditModalForm from "../forms/categorieServiceForms/editModalForm";
import { useHistory } from "react-router";

import {
  GetCategoriesServiceAction,
  DeleteCategorieServiceAction,
  AnnulerAction,
} from "../redux/categorieService/categorieServiceActions";
import { GetTypesServiceAction } from "../redux/typeService/typeServiceActions";

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
            Ajouter une Catégorie de Service
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
            Modifier la Catégorie de Service
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
  categorieService,
  onHide,
  show,
  DeleteCategorieServiceAction,
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
            Supprimer la Catégorie de Service
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Souhaitez-vous supprimer la Catégorie de Service '
            <strong>
              <i>{categorieService.libelle}</i>
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
              const id = categorieService.id;
              DeleteCategorieServiceAction(id);
              history.push("/produits/services/categorie-service");
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

function CategorieService(props) {
  const {
    categoriesService,
    GetCategoriesServiceAction,
    GetTypesServiceAction,
    DeleteCategorieServiceAction,
    AnnulerAction,
  } = props;

  const [addModalShow, setAddModalShow] = React.useState(false);
  const [showEditModal, setShowEditModal] = React.useState(false);
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const [editModalShow, setEditModalShow] = React.useState(false);
  const [deleteModalShow, setDeleteModalShow] = React.useState(false);
  const [categorieServiceData, setCategorieServiceData] = React.useState({});

  useEffect(() => {
    GetCategoriesServiceAction();
    GetTypesServiceAction();
  }, [GetCategoriesServiceAction, GetTypesServiceAction]);
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
          + Ajouter une Catégorie de Service
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
              <th>Type service</th>
              <th>ID Catégorie</th>
              <th>Libellé</th>
              <th>Description</th>
              <th>Date de création</th>
              <th>Date de modification</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {categoriesService.map((categorieService) => (
              <tr key={categorieService.id} style={{ textAlign: "center" }}>
                <td> {categorieService.typeService}</td>
                <td>{categorieService.id}</td>
                <td> {categorieService.libelle}</td>
                <td> {categorieService.description}</td>
                <td>{categorieService.dateCreation}</td>
                <td>{categorieService.dateModification}</td>
                <td>
                  <div className="row">
                    <FaEdit
                      style={{ marginLeft: "19px" }}
                      onClick={() => {
                        setEditModalShow(true);
                        setCategorieServiceData(categorieService);
                        setShowEditModal(true);
                      }}
                    />
                    <FaTrash
                      style={{ marginLeft: "19px" }}
                      onClick={() => {
                        setDeleteModalShow(true);
                        setCategorieServiceData(categorieService);
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
                      categorieService={categorieServiceData}
                    />
                  ) : null}
                  {showDeleteModal ? (
                    <DeleteModal
                      show={deleteModalShow}
                      onHide={() => setDeleteModalShow(false)}
                      categorieService={categorieServiceData}
                      DeleteCategorieServiceAction={
                        DeleteCategorieServiceAction
                      }
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
    categoriesService: state.categorieService.categoriesService,
  };
};

/*
  TO MAP ACTION CREATORS TO PROPS
  */
const mapDispatchToProps = (dispatch) => ({
  GetCategoriesServiceAction: () => dispatch(GetCategoriesServiceAction()),
  GetTypesServiceAction: () => dispatch(GetTypesServiceAction()),
  DeleteCategorieServiceAction: (id) =>
    dispatch(DeleteCategorieServiceAction(id)),
  AnnulerAction: () => dispatch(AnnulerAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CategorieService);
