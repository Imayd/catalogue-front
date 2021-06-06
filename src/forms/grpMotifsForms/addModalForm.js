import React from "react";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import { Form, Button } from "react-bootstrap";
import { connect } from "react-redux";

import { AddGrpMotifsAction } from "../../redux/grpMotifs/grpMotifsActions";

const validationSchema = Yup.object({
  code: Yup.string()
    .min(1, "Le code doit comporter au moins 1 caractère")
    .max(5, "Le code ne doit pas dépasser 5 caractères")
    .matches(
      /^[aA-zZ1-9]+$/,
      "Le code ne doit pas contenir de caractères spéciaux"
    )
    .required("Le code du groupement de motifs est obligatoire!"),
  libelle: Yup.string()
    .min(1, "Le libellé doit comporter au moins 1 caractère")
    .max(20, "Le libellé ne doit pas dépasser 20 caractères")
    .matches(
      /^[aA-zZ1-9]+$/,
      "Le libellé ne doit pas contenir de caractères spéciaux"
    )
    .required("Le libellé du groupement de motifs est obligatoire!"),
  description: Yup.string()
    .min(1, "La description doit comporter au moins 1 caractère")
    .matches(
      /^[aA-zZÀ-ÿ,.-_'\s]+$/,
      "Le code ne doit pas contenir de caractères spéciaux"
    )
    .required("La description du groupement de motifs est obligatoire!"),
});

const initialValues = {
  libelle: "",
  code: "",
  description: "",
};

function AddModalForm({ annuler, AddGrpMotifsAction, error }) {
  const formik = useFormik({
    initialValues,
    onSubmit: (values, onSubmitProps) => {
      AddGrpMotifsAction(values);
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
          <Form.Label>Code du Groupement de motifs</Form.Label>
          <Form.Control
            type="text"
            placeholder="Entrer le code du Groupement de motifs"
            name="code"
            id="code"
            {...formik.getFieldProps("code")}
          />

          {formik.touched.code && formik.errors.code ? (
            <div className="error-message">{formik.errors.code}</div>
          ) : null}
        </Form.Group>
        <Form.Group>
          <Form.Label>Libellé du Groupement de motifs</Form.Label>
          <Form.Control
            type="text"
            placeholder="Entrer le libelle du Groupement de motifs"
            name="libelle"
            id="libelle"
            {...formik.getFieldProps("libelle")}
          />

          {formik.touched.libelle && formik.errors.libelle ? (
            <div className="error-message">{formik.errors.libelle}</div>
          ) : null}
        </Form.Group>

        <Form.Group>
          <Form.Label>Description du Groupement de motifs</Form.Label>
          <Form.Control
            type="text"
            placeholder="Entrer la description du groupement de motifs"
            name="description"
            id="description"
            {...formik.getFieldProps("description")}
          />

          {formik.touched.description && formik.errors.description ? (
            <div className="error-message">{formik.errors.description}</div>
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
    error: state.grpMotifs.errors,
  };
};

/*
TO MAP ACTION CREATORS TO PROPS
*/
const mapDispatchToProps = (dispatch) => {
  return {
    AddGrpMotifsAction: (values) => dispatch(AddGrpMotifsAction(values)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddModalForm);
