import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {GetMarketsAction} from "../redux/market.maintenance/actions/marketActions";
import { Table,Modal } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import EditModalForm from '../forms/editModalForm';

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
                     <EditModalForm annuler={props.onHide}/>
                </Modal.Body>
            </Modal>
        </div>
    );
}


function MarketsMaintenance({markets, GetMarketsAction}) {


    const [editModalShow, setEditModalShow] = React.useState(false);
    const [deleteModalShow, setDeleteModalShow] = React.useState(false);

    useEffect(() => {
        GetMarketsAction()
    }, [])
    return (
        <div  className="data">
            <br></br>
            
                <Table  hover size="sm" responsive bordered>
                {/*<div className="row">
                    <table className = "table table-striped table-bordered tablo">*/}
                        <thead>
                            <tr>

                                <th>Abréviation</th>
                                <th>Nom du marché</th>
                                <th>Date d'ajout</th>
                                <th>Date de modification</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                markets.map(
                                    market => 
                                    <tr key= {market.id}>
                                        <td> {market.abreviation}</td>
                                        <td> {market.nom}</td>
                                        <td> {market.dateAjout}</td>
                                        <td> {market.dateModification}</td>
                                        <td>
                                            <div className="row">
                                                <FaEdit style={{marginLeft: "19px"}} onClick={() => setEditModalShow(true)}/>
                                                <FaTrash style={{marginLeft: "19px"}} onClick={() => setDeleteModalShow(true)}/>
                                            </div>
                                            <EditModal
                                                show={editModalShow}
                                                onHide={() => setEditModalShow(false)}
                                            />
                                           { /*<DeleteModal
                                                show={deleteModalShow}
                                                onHide={() => setDeleteModalShow(false)}
                                           />*/}
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    {/*</table>
                    </div>*/}
                    </Table>
        </div>
            
    )
}


/*
TO ACCESS THE REDUX STATE IN THIS COMPONENT
*/ 
const mapStateToProps = (state) => {
    return {
        markets : state.market.markets
    }
}

/*
TO MAP ACTION CREATORS TO PROPS
*/
const mapDispatchToProps = dispatch => {
    return {
        GetMarketsAction : () => dispatch(GetMarketsAction())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(MarketsMaintenance)