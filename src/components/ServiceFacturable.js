import React, { useEffect } from "react";
import { connect } from "react-redux";
import ServicesTemplate from "./layout/ServicesTemplate";
import { Table, Modal, Button } from "react-bootstrap";
import AddModalForm from "../forms/serviceFacturableForms/addModalForm";

import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import EditModalForm from "../forms/serviceFacturableForms/editModalForm";
import { useHistory } from "react-router";

import {
  DeleteServiceFacturableAction,
  GetServicesFacturablesAction,
  AnnulerAction,
} from "../redux/serviceFacturable/serviceFacturableActions";
import { GetCategoriesServiceAction } from "../redux/categorieService/categorieServiceActions";
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
            Ajouter un Service Facturable
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
            Modifier le Service Facturable
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
  serviceFacturable,
  onHide,
  show,
  DeleteServiceFacturableAction,
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
            Supprimer le Service Facturable
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Souhaitez-vous supprimer le Service Facturable '
            <strong>
              <i>{serviceFacturable.libelle}</i>
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
              const id = serviceFacturable.id;
              DeleteServiceFacturableAction(id);
              history.push("/produits/services/services-facturables");
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

function ServiceFacturable(props) {
  const {
    servicesFacturables,
    GetServicesFacturablesAction,
    GetCategoriesServiceAction,
    DeleteServiceFacturableAction,
    AnnulerAction,
  } = props;

  const [addModalShow, setAddModalShow] = React.useState(false);
  const [showEditModal, setShowEditModal] = React.useState(false);
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const [editModalShow, setEditModalShow] = React.useState(false);
  const [deleteModalShow, setDeleteModalShow] = React.useState(false);
  const [serviceFacturableData, setServiceFacturableData] = React.useState({});

  useEffect(() => {
    GetServicesFacturablesAction();
    GetTypesServiceAction();
    GetCategoriesServiceAction();
  }, [GetServicesFacturablesAction, GetCategoriesServiceAction]);
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
          + Ajouter un Service Facturable
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
              <th>Libellé</th>
              <th>Type de service</th>
              <th>Catégorie de service</th>
              <th>Date d'effectivité</th>
              <th>Serv. International</th>
              <th>Date création</th>
              <th>Date de modification</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {servicesFacturables.map((serviceFacturable) => (
              <tr key={serviceFacturable.id} style={{ textAlign: "center" }}>
                <td> {serviceFacturable.libelle}</td>
                <td>{serviceFacturable.typeService}</td>
                <td> {serviceFacturable.categorieService}</td>
                <td> {serviceFacturable.dateEffectivite}</td>
                <td>
                  {serviceFacturable.servInternational ? (
                    <div
                      style={{
                        textAlign: "center",
                        fontWeight: "450",
                        color: "#e29c32",
                      }}
                    >
                      OUI
                    </div>
                  ) : (
                    <div style={{ textAlign: "center", fontWeight: "400" }}>
                      NON
                    </div>
                  )}
                </td>
                <td>{serviceFacturable.dateCreation}</td>
                <td>{serviceFacturable.dateModification}</td>
                <td>
                  <div className="row">
                    <FaEdit
                      style={{ marginLeft: "19px" }}
                      onClick={() => {
                        setEditModalShow(true);
                        setServiceFacturableData(serviceFacturable);
                        setShowEditModal(true);
                      }}
                    />
                    <FaTrash
                      style={{ marginLeft: "19px" }}
                      onClick={() => {
                        setDeleteModalShow(true);
                        setServiceFacturableData(serviceFacturable);
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
                      serviceFacturable={serviceFacturableData}
                    />
                  ) : null}
                  {showDeleteModal ? (
                    <DeleteModal
                      show={deleteModalShow}
                      onHide={() => setDeleteModalShow(false)}
                      serviceFacturable={serviceFacturableData}
                      DeleteServiceFacturableAction={
                        DeleteServiceFacturableAction
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
    servicesFacturables: state.serviceFacturable.servicesFacturables,
  };
};

/*
  TO MAP ACTION CREATORS TO PROPS
  */
const mapDispatchToProps = (dispatch) => ({
  GetServicesFacturablesAction: () => dispatch(GetServicesFacturablesAction()),
  GetCategoriesServiceAction: () => dispatch(GetCategoriesServiceAction()),
  DeleteServiceFacturableAction: (id) =>
    dispatch(DeleteServiceFacturableAction(id)),
  AnnulerAction: () => dispatch(AnnulerAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ServiceFacturable);
