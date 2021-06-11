import React from "react";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import { Form, Button } from "react-bootstrap";
import { connect } from "react-redux";

import { AddThemeAction } from "../../redux/theme/themeActions";

const validationSchema = Yup.object({
  code: Yup.string()
    .min(1, "Le code doit comporter au moins 1 caractère")
    .max(20, "Le code ne doit pas dépasser 20 caractères")
    .matches(
      /^[aA-zZ1-9]+$/,
      "Le code ne doit pas contenir de caractères spéciaux"
    )
    .required("Le code est obligatoire!"),
  designation: Yup.string()
    .min(3, "La désignation doit comporter au moins 3 caractères")
    .max(40, "La désignation ne doit pas dépasser 40 caractères")
    .matches(
      /^[aA-zZÀ-ÿ\s]+$/,
      "La désignation ne doit pas contenir des caractères spéciaux"
    )
    .required("La désignation est obligatoire!"),
  dateEffectivite: Yup.string().required(
    "La date d'effectivité est obligatoire!"
  ),
  dateFinEffectivite: Yup.string().required(
    "La date de fin d'effectivité est obligatoire!"
  ),
  description: Yup.string()
    .min(3, "La description doit comporter au moins 3 caractères")
    .max(80, "La description ne doit pas dépasser 80 caractères")
    .matches(
      /^[aA-zZÀ-ÿ\s]+$/,
      "La description ne doit pas contenir des caractères spéciaux"
    )
    .required("La description est obligatoire!"),
});

const initialValues = {
  code: "",
  designation: "",
  description: "",
  dateEffectivite: "",
  dateFinEffectivite: "",
};

function AddModalForm({ annuler, AddThemeAction, error }) {
  const today = new Date();
  const tomorrow = new Date(today.setDate(today.getDate() + 1))
    .toISOString()
    .split("T")[0];

  const formik = useFormik({
    initialValues,
    onSubmit: (values, onSubmitProps) => {
      AddThemeAction(values);
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
          <Form.Label>Code</Form.Label>
          <Form.Control
            type="text"
            placeholder="Entrer le code du thème"
            name="code"
            id="code"
            {...formik.getFieldProps("code")}
          />

          {formik.touched.code && formik.errors.code ? (
            <div className="error-message">{formik.errors.code}</div>
          ) : null}
        </Form.Group>

        <Form.Group controlId="designation">
          <Form.Label>Désignation</Form.Label>
          <Form.Control
            type="text"
            placeholder="Entrer la désignation du thème"
            name="designation"
            {...formik.getFieldProps("designation")}
          />

          {formik.touched.designation && formik.errors.designation ? (
            <div className="error-message"> {formik.errors.designation} </div>
          ) : null}
        </Form.Group>
        <Form.Group controlId="description">
          <Form.Label>Déscription</Form.Label>
          <Form.Control
            type="text"
            placeholder="Entrer la description du thème"
            name="description"
            {...formik.getFieldProps("description")}
          />

          {formik.touched.description && formik.errors.description ? (
            <div className="error-message"> {formik.errors.description} </div>
          ) : null}
        </Form.Group>
        <Form.Group controlId="dateEffectivite">
          <Form.Label>Date d'éffectivité</Form.Label>
          <Form.Control
            type="date"
            name="dateEffectivite"
            min={tomorrow}
            format="DD-MM-YYYY"
            {...formik.getFieldProps("dateEffectivite")}
          />

          {formik.touched.dateEffectivite && formik.errors.dateEffectivite ? (
            <div className="error-message">
              {" "}
              {formik.errors.dateEffectivite}{" "}
            </div>
          ) : null}
        </Form.Group>

        <Form.Group controlId="dateFinEffectivite">
          <Form.Label>Date de fin d'éffectivité</Form.Label>
          <Form.Control
            type="date"
            name="dateFinEffectivite"
            min={tomorrow}
            format="DD-MM-YYYY"
            {...formik.getFieldProps("dateFinEffectivite")}
          />

          {formik.touched.dateFinEffectivite &&
          formik.errors.dateFinEffectivite ? (
            <div className="error-message">
              {" "}
              {formik.errors.dateFinEffectivite}{" "}
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
    error: state.theme.errors,
  };
};

/*
  TO MAP ACTION CREATORS TO PROPS
  */
const mapDispatchToProps = (dispatch) => {
  return {
    AddThemeAction: (values) => dispatch(AddThemeAction(values)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddModalForm);
