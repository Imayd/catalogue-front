import React from "react";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import { Form, Button } from "react-bootstrap";
import { connect } from "react-redux";

import { AddCategorieServiceAction } from "../../redux/categorieService/categorieServiceActions";

const validationSchema = Yup.object({
  description: Yup.string()
    .min(1, "La description doit comporter au moins 1 caractère")
    .matches(
      /^[aA-zZÀ-ÿ.-\s]+$/,
      "Le code ne doit pas contenir de caractères spéciaux"
    )
    .required("La description de la catégorie de service est obligatoire!"),
  libelle: Yup.string()
    .min(3, "Le libellé doit comporter au moins 3 caractères")
    .max(20, "Le libellé ne doit pas dépasser 20 caractères")
    .matches(
      /^[aA-zZÀ-ÿ\s]+$/,
      "Le libellé ne doit pas contenir des caractères spéciaux"
    )
    .required("Le libellé de la catégorie de service est obligatoire!"),
  familleProduits: Yup.string(),
});

const initialValues = {
  description: "",
  libelle: "",
  typeService: "",
};

function AddModalForm({
  annuler,
  AddCategorieServiceAction,
  error,
  typeService,
}) {
  const formik = useFormik({
    initialValues,
    onSubmit: (values, onSubmitProps) => {
      AddCategorieServiceAction(values);
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
          <Form.Label>Libellé de la Catégorie de Service</Form.Label>
          <Form.Control
            type="text"
            placeholder="Entrer le libelle de la catégorie service"
            name="libelle"
            id="libelle"
            {...formik.getFieldProps("libelle")}
          />

          {formik.touched.libelle && formik.errors.libelle ? (
            <div className="error-message">{formik.errors.libelle}</div>
          ) : null}
        </Form.Group>
        <Form.Group>
          <Form.Label>Description de la Catégorie Service</Form.Label>
          <Form.Control
            type="text"
            placeholder="Entrer la description de la catégorie service"
            name="description"
            id="description"
            {...formik.getFieldProps("description")}
          />

          {formik.touched.description && formik.errors.description ? (
            <div className="error-message">{formik.errors.description}</div>
          ) : null}
        </Form.Group>

        <Form.Group>
          <Form.Label>Type de service associé</Form.Label>
          <Form.Control
            as="select"
            name="typeService"
            id="typeService"
            {...formik.getFieldProps("typeService")}
          >
            <option>Selectionner un type de service</option>
            {typeService.map((ts) => (
              <option value={ts.libelle}>{ts.libelle}</option>
            ))}
          </Form.Control>
          {formik.touched.typeService && formik.errors.typeService ? (
            <div className="error-message"> {formik.errors.typeService} </div>
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
    error: state.categorieService.errors,
    typeService: state.typeService.typesService,
  };
};

/*
TO MAP ACTION CREATORS TO PROPS
*/
const mapDispatchToProps = (dispatch) => {
  return {
    AddCategorieServiceAction: (values) =>
      dispatch(AddCategorieServiceAction(values)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddModalForm);
