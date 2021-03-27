import React from 'react';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import { Form, Button } from "react-bootstrap";
import {connect} from 'react-redux';
import { useHistory } from 'react-router';
import {UpdateMarketAction} from "../redux/market.maintenance/actions/marketActions";

const validationSchema = Yup.object({
    nom : Yup.string()
    .min(3,'Le nom doit dépasser 2 caractères')
    .max(20,'Le nom ne doit pas dépasser 20 caractères')
    .matches(/^[aA-zZ\s]+$/,'Le nom ne doit pas contenir de caractères spéciaux')
    .required('Le nom du marché est obligatoire!'),
    abreviation : Yup.string()
    .min(1,"L’abréviation doit comporter au moins 1 caractère")
    .max(5,"L’abréviation ne doit pas dépasser 5 caractères")
    .matches(/^[aA-zZ]+$/,"L'abréviation ne doit pas contenir des caractères spéciaux")
    .required("L'abréviation du marché est obligatoire!")
})



function EditModalForm(props) {

    const history = useHistory();
    const {market,UpdateMarketAction, onHide, error } = props;
    const marketId = market.id;
    const marketNom = market.nom;
    const marketAbreviation = market.abreviation;

    const initialValues = {
        nom: marketNom,
        abreviation: marketAbreviation
    }
    

    const formik = useFormik({
        initialValues,
        onSubmit : values => {
            console.log('inside onSubmit in editModalForm');
            console.log(values);
            UpdateMarketAction(marketId,values);
            if(error === ''){
                history.push('/administration');
                window.location.reload();
            }
        },
        validationSchema
    })
    return (
        <div>
            <Form onSubmit={formik.handleSubmit}>
            { error ? <div className="alert alert-danger" role="alert"> {error} </div> : null}
            <Form.Group>
                <Form.Label>Nom du marché</Form.Label>
                <Form.Control type="text"
                placeholder="Entrer le nom du marché"
                name='nom'
                id='nom' 
                onChange={formik.handleChange} 
                value={formik.values.nom}
                onBlur={formik.handleBlur} />
            </Form.Group>
                {formik.touched.nom && formik.errors.nom ? <div style={{color : "red"}}> {formik.errors.nom} </div> : null }
            
            <Form.Group controlId="abreviation">
                <Form.Label>Abréviation</Form.Label>
                <Form.Control type="text"
                placeholder="Entrer l'abréviation du marché"
                name='abreviation'
                onChange={formik.handleChange}
                value={formik.values.abreviation}
                onBlur={formik.handleBlur} />
            </Form.Group>

                {formik.touched.abreviation && formik.errors.abreviation ? <div style={{color : "red"}}> {formik.errors.abreviation} </div> : null }
                
                <hr></hr>
                <div  style={{float: 'right'}}>
                <Button type='reset' variant="secondary"
                style={{borderRadius:'20px'}} 
                onClick={onHide}>Annuler</Button>
                <Button type='submit' variant="warning" 
                style={{marginLeft: "8px" , borderRadius:'20px'}} >Enregistrer</Button>
                </div>
            </Form>
            
        </div>
    )
}
const mapDispatchToProps = dispatch => {
    return {
        UpdateMarketAction : (marketId, values) => dispatch(UpdateMarketAction(marketId,values))
    }
}

const mapStateToProps = (state) => {
    return {
        error : state.market.errors
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(EditModalForm);