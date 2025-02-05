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
    .required("L'abréviation du marché est obligatoire!"),
    version : Yup.string()
    .min(1,'La version du marché doit comporter au moins 1 caractère')
    .max(9,'La version ne doit pas dépasser 9 caractères')
    .matches(/^(?:(\d+)\.)?(?:(\d+)\.)?(\*|\d+)$/,'La version doit avoir un format valide')
    .required('La version du marché est obligatoire!'),
    dateEffectivite : Yup.string()
    .required("La date d'effectivité du marché est obligatoire!")
})



function EditModalForm(props) {

    const date = new Date().toISOString().split('T')[0];
    const history = useHistory();
    const {market,UpdateMarketAction, onHide, error } = props;
    const marketId = market.id;
    const marketNom = market.nom;
    const marketVersion = market.version;
    const marketAbreviation = market.abreviation;
    const marketDateEffectivite = market.dateEffectivite.split("-").reverse().join("-");
    const initialValues = {
        nom: marketNom,
        abreviation: marketAbreviation,
        version:marketVersion,
        dateEffectivite: marketDateEffectivite
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
                
            {formik.touched.nom && formik.errors.nom ? <div className='error-message'> {formik.errors.nom} </div> : null }

            </Form.Group>
            
            <Form.Group controlId="abreviation">
                <Form.Label>Abréviation</Form.Label>
                <Form.Control type="text"
                placeholder="Entrer l'abréviation du marché"
                name='abreviation'
                onChange={formik.handleChange}
                value={formik.values.abreviation}
                onBlur={formik.handleBlur} />
            
            {formik.touched.abreviation && formik.errors.abreviation ? <div className='error-message'> {formik.errors.abreviation} </div> : null }

            </Form.Group>

                
            <Form.Group controlId="abreviation">
                <Form.Label>Version</Form.Label>
                <Form.Control type="text"
                placeholder="Entrer la version du marché"
                name='version'
                onChange={formik.handleChange}
                value={formik.values.version}
                onBlur={formik.handleBlur} />
            
            {formik.touched.version && formik.errors.version ? <div className='error-message'> {formik.errors.version} </div> : null }

            </Form.Group>
           
            <Form.Group controlId="dateEffectivite">
                <Form.Label>Date d'éffectivité</Form.Label>
                
                    <Form.Control
                    type='date'
                    name='dateEffectivite'
                    min={date}
                    onChange={formik.handleChange}
                    value={formik.values.dateEffectivite}
                    onBlur={formik.handleBlur}/>

                {formik.touched.dateEffectivite && formik.errors.dateEffectivite 
                ? <div className='error-message'> {formik.errors.dateEffectivite} </div> : null }
                    
                
            </Form.Group>

                
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