import React from 'react';
import NavBar from './layout/NavBar';
import SideBar from "./layout/SideBar";
import MarketsMaintenance from "./MarketsMaintenance";
import Button from 'react-bootstrap/Button';
import AddModalForm from "../forms/addModalForm";
import { Modal } from "react-bootstrap";
import {connect} from 'react-redux';
import {AnnulerAction} from "../redux/market.maintenance/actions/marketActions";



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
                    Ajouter un marché
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                     <AddModalForm annuler={props.onHide} />
                </Modal.Body>
            </Modal>
        </div>
    );
}


function Administration({AnnulerAction}) {

    const [addModalShow, setAddModalShow] = React.useState(false);

    return (
        <div >
            <NavBar/>
            <SideBar/>
            <br></br>
            <div className="data">
                <h4 ><strong>Administration</strong></h4>
                <br></br>
                <Button variant="light" 
                style={{color: "black", 
                float: 'right', 
                marginBottom:'17px', 
                backgroundColor:'#eceaea', 
                borderRadius:'10px'}}
                onClick={() => setAddModalShow(true)}
                > + Nouveau marché
                </Button>
            </div>
            <AddModal
                show={addModalShow}
                onHide={() => {
                    AnnulerAction();
                    setAddModalShow(false);
                }
            }
            />
            <MarketsMaintenance/>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    
    AnnulerAction : () => dispatch(AnnulerAction())

})

export default connect(null,mapDispatchToProps)(Administration);