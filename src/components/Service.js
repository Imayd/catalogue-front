import React, { useEffect } from "react";
import { connect } from "react-redux";
import ServicesTemplate from "./layout/ServicesTemplate";
import { Table, Modal, Button } from "react-bootstrap";
import AddModalForm from "../forms/serviceForms/addModalForm";
import InfoModalForm from "../forms/serviceForms/infoModalForm";

import { FaEdit, FaInfoCircle } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import EditModalForm from "../forms/serviceForms/editModalForm";
import { useHistory } from "react-router";

import {
  DeleteServiceAction,
  GetServicesAction,
  AnnulerAction,
} from "../redux/service/serviceActions";
import { GetCategoriesServiceAction } from "../redux/categorieService/categorieServiceActions";
import { GetCartesAction } from "../redux/carte/carteActions";
import { GetGrpsStatutsAction } from "../redux/grpStatuts/grpStatutsActions";
import { GetGrpsMotifsAction } from "../redux/grpMotifs/grpMotifsActions";

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
            Ajouter un Service
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
            Modifier le Service
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditModalForm {...props} />
        </Modal.Body>
      </Modal>
    </div>
  );
}

function DeleteModal({ service, onHide, show, DeleteServiceAction }) {
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
            Supprimer le Service
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Souhaitez-vous supprimer le Service '
            <strong>
              <i>{service.libelle}</i>
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
              const id = service.id;
              DeleteServiceAction(id);
              history.push("/produits/services/maintenance-services");
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
            Détails du service
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InfoModalForm service={props.service} annuler={props.onHide} />
        </Modal.Body>
      </Modal>
    </div>
  );
}

function Service(props) {
  const {
    services,
    GetServicesAction,
    GetCartesAction,
    GetGrpsStatutsAction,
    GetGrpsMotifsAction,
    GetCategoriesServiceAction,
    DeleteServiceAction,
    AnnulerAction,
  } = props;

  const [addModalShow, setAddModalShow] = React.useState(false);
  const [showEditModal, setShowEditModal] = React.useState(false);
  const [infoModalShow, setInfoModalShow] = React.useState(false);
  const [showInfoModal, setShowInfoModal] = React.useState(false);
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const [editModalShow, setEditModalShow] = React.useState(false);
  const [deleteModalShow, setDeleteModalShow] = React.useState(false);
  const [serviceData, setServiceData] = React.useState({});

  useEffect(() => {
    GetServicesAction();
    GetCartesAction();
    GetGrpsStatutsAction();
    GetGrpsMotifsAction();
    GetCategoriesServiceAction();
  }, [
    GetServicesAction,
    GetCategoriesServiceAction,
    GetCartesAction,
    GetGrpsStatutsAction,
    GetGrpsMotifsAction,
  ]);
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
          + Ajouter un Service
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
              <th>Catégorie de service</th>
              <th>Produit associé</th>
              <th>Date d'effectivité</th>
              <th>Serv. International</th>
              <th>Date création</th>
              <th>Date de modification</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {services.map((service) => (
              <tr key={service.id} style={{ textAlign: "center" }}>
                <td> {service.code}</td>
                <td> {service.libelle}</td>
                <td> {service.categorieService}</td>
                <td>{service.carte}</td>
                <td> {service.dateEffectivite}</td>
                <td>
                  {service.servInternational ? (
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
                <td>{service.dateCreation}</td>
                <td>{service.dateModification}</td>
                <td>
                  <div className="row">
                    <FaInfoCircle
                      style={{ marginLeft: "9px" }}
                      onClick={() => {
                        setInfoModalShow(true);
                        setServiceData(service);
                        setShowInfoModal(true);
                      }}
                    />
                    <FaEdit
                      style={{ marginLeft: "9px" }}
                      onClick={() => {
                        setEditModalShow(true);
                        setServiceData(service);
                        setShowEditModal(true);
                      }}
                    />
                    <FaTrash
                      style={{ marginLeft: "9px" }}
                      onClick={() => {
                        setDeleteModalShow(true);
                        setServiceData(service);
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
                      service={serviceData}
                    />
                  ) : null}
                  {showEditModal ? (
                    <EditModal
                      show={editModalShow}
                      onHide={() => {
                        AnnulerAction();
                        setEditModalShow(false);
                      }}
                      service={serviceData}
                    />
                  ) : null}
                  {showDeleteModal ? (
                    <DeleteModal
                      show={deleteModalShow}
                      onHide={() => setDeleteModalShow(false)}
                      service={serviceData}
                      DeleteServiceAction={DeleteServiceAction}
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
    services: state.service.services,
  };
};

/*
  TO MAP ACTION CREATORS TO PROPS
  */
const mapDispatchToProps = (dispatch) => ({
  GetServicesAction: () => dispatch(GetServicesAction()),
  GetCategoriesServiceAction: () => dispatch(GetCategoriesServiceAction()),
  GetCartesAction: () => dispatch(GetCartesAction()),
  GetGrpsStatutsAction: () => dispatch(GetGrpsStatutsAction()),
  GetGrpsMotifsAction: () => dispatch(GetGrpsMotifsAction()),
  DeleteServiceAction: (id) => dispatch(DeleteServiceAction(id)),
  AnnulerAction: () => dispatch(AnnulerAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Service);
