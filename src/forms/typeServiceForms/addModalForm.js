import React from "react";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import { Form, Button } from "react-bootstrap";
import { connect } from "react-redux";

import { AddTypeServiceAction } from "../../redux/typeService/typeServiceActions";

const validationSchema = Yup.object({
  description: Yup.string()
    .min(1, "La description doit comporter au moins 1 caractère")
    .matches(
      /^[aA-zZÀ-ÿ\s]+$/,
      "Le code ne doit pas contenir de caractères spéciaux"
    )
    .required("La description du type de service est obligatoire!"),
  libelle: Yup.string()
    .min(3, "Le libellé doit comporter au moins 3 caractères")
    .max(40, "Le libellé ne doit pas dépasser 40 caractères")
    .matches(
      /^[aA-zZÀ-ÿ\s]+$/,
      "Le libellé ne doit pas contenir des caractères spéciaux"
    )
    .required("Le libellé du type de service est obligatoire!"),
  familleProduits: Yup.string(),
});

const initialValues = {
  description: "",
  libelle: "",
  familleProduits: "",
};

function AddModalForm({
  annuler,
  AddTypeServiceAction,
  error,
  familleProduits,
}) {
  const formik = useFormik({
    initialValues,
    onSubmit: (values, onSubmitProps) => {
      AddTypeServiceAction(values);
      console.log(values);
      onSubmitProps.setSubmitting(false);
    },
    validationSchema,
  });
  return (
    <Formik validateOnChange={false}>
      <Form onSubmit={formik.handleSubmit}>
        {error ? (
          <div className="alert alert-danger" role="alert">
            {" "}
            {error}{" "}
          </div>
        ) : null}
        <Form.Group>
          <Form.Label>Libellé du Type Service</Form.Label>
          <Form.Control
            type="text"
            placeholder="Entrer le libelle du type service"
            name="libelle"
            id="libelle"
            {...formik.getFieldProps("libelle")}
          />

          {formik.touched.libelle && formik.errors.libelle ? (
            <div className="error-message">{formik.errors.libelle}</div>
          ) : null}
        </Form.Group>
        <Form.Group>
          <Form.Label>Description du Type Service</Form.Label>
          <Form.Control
            type="text"
            placeholder="Entrer la description du type service"
            name="description"
            id="description"
            {...formik.getFieldProps("description")}
          />

          {formik.touched.description && formik.errors.description ? (
            <div className="error-message">{formik.errors.description}</div>
          ) : null}
        </Form.Group>

        <Form.Group>
          <Form.Label>Famille de produits associée</Form.Label>
          <Form.Control
            as="select"
            name="familleProduits"
            id="familleProduits"
            {...formik.getFieldProps("familleProduits")}
          >
            <option>Selectionner une famille de produits</option>
            {familleProduits.map((fp) => (
              <option value={fp.libelle}>{fp.libelle}</option>
            ))}
          </Form.Control>
          {formik.touched.familleProduits && formik.errors.familleProduits ? (
            <div className="error-message">
              {" "}
              {formik.errors.familleProduits}{" "}
            </div>
          ) : null}
        </Form.Group>

        <hr></hr>
        <div style={{ float: "right" }}>
          <Button
            type="reset"
            variant="secondary"
            style={{ borderRadius: "20px" }}
            onClick={annuler}
          >
            Annuler
          </Button>
          <Button
            type="submit"
            variant="warning"
            disabled={!(formik.dirty && formik.isValid) || formik.isSubmitting}
            style={{ marginLeft: "8px", borderRadius: "20px" }}
          >
            Enregistrer
          </Button>
        </div>
      </Form>
    </Formik>
  );
}

const mapStateToProps = (state) => {
  return {
    error: state.typeService.errors,
    familleProduits: state.familleProduits.familleProduits,
  };
};

/*
TO MAP ACTION CREATORS TO PROPS
*/
const mapDispatchToProps = (dispatch) => {
  return {
    AddTypeServiceAction: (values) => dispatch(AddTypeServiceAction(values)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddModalForm);
