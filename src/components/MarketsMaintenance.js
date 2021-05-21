import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  GetMarketsAction,
  DeleteMarketAction,
  AnnulerAction,
} from "../redux/market.maintenance/actions/marketActions";
import { Table, Modal, Button } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import EditModalForm from "../forms/marketForms/editModalForm";
import { useHistory } from "react-router";

/**
 *
 * to fix the error ' Warning: findDOMNode is deprecated in StrictMode.'
 * just add animation={false} to the Modal
 */

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
            Modifier le marché
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditModalForm {...props} />
        </Modal.Body>
      </Modal>
    </div>
  );
}

function DeleteModal({ market, onHide, show, DeleteMarketAction }) {
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
            Supprimer le marché
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Souhaitez-vous supprimer le marché '
            <strong>
              <i>{market.nom}</i>
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
              const id = market.id;
              DeleteMarketAction(id);
              history.push("/administration/markets-maintenance");
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

function MarketsMaintenance({
  markets,
  GetMarketsAction,
  DeleteMarketAction,
  AnnulerAction,
}) {
  const [showEditModal, setShowEditModal] = React.useState(false);
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const [marketData, setMarketData] = React.useState({});
  const [editModalShow, setEditModalShow] = React.useState(false);
  const [deleteModalShow, setDeleteModalShow] = React.useState(false);

  useEffect(() => {
    GetMarketsAction();
  }, [GetMarketsAction]);
  return (
    <div className="data">
      <br></br>

      <Table hover responsive="md" borderless>
        <thead>
          <tr style={{ textAlign: "center" }}>
            <th>Abréviation</th>
            <th>Nom du marché</th>
            <th>Date d'éffectivité</th>
            <th>Date fin d'éffectivité</th>
            <th>Date d'ajout</th>
            <th>Date de modification</th>
            <th>Statut</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {markets.map((market) => (
            <tr key={market.id} style={{ textAlign: "center" }}>
              <td> {market.abreviation}</td>
              <td> {market.nom}</td>
              <td>{market.dateEffectivite}</td>
              <td>{market.dateFinEffectivite}</td>
              <td> {market.dateAjout}</td>
              <td> {market.dateModification}</td>
              <td>
                {market.statut ? (
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
                      setMarketData(market);
                      setShowEditModal(true);
                    }}
                  />
                  <FaTrash
                    style={{ marginLeft: "19px" }}
                    onClick={() => {
                      setDeleteModalShow(true);
                      setMarketData(market);
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
                    market={marketData}
                  />
                ) : null}
                {showDeleteModal ? (
                  <DeleteModal
                    show={deleteModalShow}
                    onHide={() => setDeleteModalShow(false)}
                    market={marketData}
                    DeleteMarketAction={DeleteMarketAction}
                  />
                ) : null}
              </td>
            </tr>
          ))}
        </tbody>

        {/*</table>
                    </div>*/}
      </Table>
    </div>
  );
}

/*
TO ACCESS THE REDUX STATE IN THIS COMPONENT
*/
const mapStateToProps = (state) => {
  return {
    markets: state.market.markets,
  };
};

/*
TO MAP ACTION CREATORS TO PROPS
*/
const mapDispatchToProps = (dispatch) => ({
  GetMarketsAction: () => dispatch(GetMarketsAction()),
  DeleteMarketAction: (id) => dispatch(DeleteMarketAction(id)),
  AnnulerAction: () => dispatch(AnnulerAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MarketsMaintenance);
