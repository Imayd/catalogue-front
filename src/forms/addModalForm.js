import React from 'react';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import { Form, Button } from "react-bootstrap";


    
const validationSchema = Yup.object({
    name : Yup.string()
    .min(3,'Le nom du marché ne peut pas être moins de 3 caractères')
    .max(20,'Le nom du marché ne peut pas être plus que 20 caractères')
    .matches(/^[aA-zZ\s]+$/,'Le nom du marché ne doit pas contenir des caractères spéciaux')
    .required('Le nom du marché est obligatoire!'),
    abreviation : Yup.string()
    .min(1,"L'abréviation ne peut pas être moins de 1 caractère")
    .max(5,"L'abréviation ne peut pas être plus que 5 caractères")
    .matches(/^[aA-zZ]+$/,"L'abréviation ne doit pas contenir des caractères spéciaux")
    .required("L'abréviation du marché est obligatoire!")
})

const initialValues = {
    name: '',
    abreviation:''
}

const onSubmit = values => {
    console.log(values);
}

function AddModalForm(props) {
    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema
    })
    return (
        <div>
            <Form onSubmit={formik.handleSubmit}>
            <Form.Group>
                <Form.Label>Nom du marché</Form.Label>
                <Form.Control type="text"
                placeholder="Entrer le nom du marché"
                name='name'
                id='name' 
                onChange={formik.handleChange} 
                value={formik.values.name}
                onBlur={formik.handleBlur} />
            </Form.Group>
                {formik.touched.name && formik.errors.name ? <div style={{color : "red"}}> {formik.errors.name} </div> : null }
            
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
                <Button type='reset' variant="secondary" onClick={props.annuler}>Annuler</Button>
                <Button type='submit' variant="warning" style={{marginLeft: "10px", color:'white'}} >Enregistrer</Button>
                </div>
            </Form>
            
        </div>
    )
}
export default AddModalForm;