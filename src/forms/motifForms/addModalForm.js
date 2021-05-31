import React from "react";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import { Form, Button } from "react-bootstrap";
import { connect } from "react-redux";

import { AddMotifAction } from "../../redux/motif/motifActions";

const validationSchema = Yup.object({
  code: Yup.string()
    .min(1, "Le code doit comporter au moins 1 caractère")
    .max(20, "Le code ne doit pas dépasser 20 caractères")
    .matches(
      /^[aA-zZ1-9]+$/,
      "Le code ne doit pas contenir de caractères spéciaux"
    )
    .required("Le code du motif est obligatoire!"),
  description: Yup.string()
    .min(1, "La description doit comporter au moins 1 caractère")
    .matches(
      /^[aA-zZÀ-ÿ,.-_'\s]+$/,
      "Le code ne doit pas contenir de caractères spéciaux"
    )
    .required("La description du motif est obligatoire!"),
  groupementMotifs: Yup.string(),
});

const initialValues = {
  code: "",
  description: "",
  groupementMotifs: "",
};

function AddModalForm({ annuler, AddMotifAction, grpMotifs, error }) {
  const formik = useFormik({
    initialValues,
    onSubmit: (values, onSubmitProps) => {
      AddMotifAction(values);
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
          <Form.Label>Code du motif</Form.Label>
          <Form.Control
            type="text"
            placeholder="Entrer le code du motif"
            name="code"
            id="code"
            {...formik.getFieldProps("code")}
          />

          {formik.touched.code && formik.errors.code ? (
            <div className="error-message">{formik.errors.code}</div>
          ) : null}
        </Form.Group>

        <Form.Group>
          <Form.Label>Groupement de motifs associé</Form.Label>
          <Form.Control
            as="select"
            name="groupementMotifs"
            id="groupementMotifs"
            {...formik.getFieldProps("groupementMotifs")}
          >
            <option>Selectionner un groupement de motifs</option>
            {grpMotifs.map((gm) => (
              <option value={gm.code}>{gm.code}</option>
            ))}
          </Form.Control>
          {formik.touched.groupementMotifs && formik.errors.groupementMotifs ? (
            <div className="error-message">
              {" "}
              {formik.errors.groupementMotifs}{" "}
            </div>
          ) : null}
        </Form.Group>
        <Form.Group>
          <Form.Label>Description du motif</Form.Label>
          <Form.Control
            type="text"
            placeholder="Entrer la description du motif"
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
    error: state.motif.errors,
    grpMotifs: state.grpMotifs.grpsMotifs,
  };
};

/*
TO MAP ACTION CREATORS TO PROPS
*/
const mapDispatchToProps = (dispatch) => {
  return {
    AddMotifAction: (values) => dispatch(AddMotifAction(values)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddModalForm);
