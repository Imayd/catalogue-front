import React from "react";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import { Form, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { useHistory } from "react-router";

import { AddTypeClientAction } from "../../redux/typeClient/actions/typeClientActions";

const validationSchema = Yup.object({
  code: Yup.string()
    .min(1, "Le code doit comporter au moins 1 caractère")
    .max(20, "Le code ne doit pas dépasser 20 caractères")
    .matches(
      /^[aA-zZ]+$/,
      "Le code ne doit pas contenir de caractères spéciaux"
    )
    .required("Le code du type de client est obligatoire!"),
  libelle: Yup.string()
    .min(3, "Le libellé doit comporter au moins 3 caractères")
    .max(20, "Le libellé ne doit pas dépasser 20 caractères")
    .matches(
      /^[aA-zZÀ-ÿ\s]+$/,
      "Le libellé ne doit pas contenir des caractères spéciaux"
    )
    .required("Le libellé du type de client est obligatoire!"),
});

const initialValues = {
  code: "",
  libelle: "",
};

function AddModalForm({ annuler, AddTypeClientAction, error }) {
  const history = useHistory();

  const formik = useFormik({
    initialValues,
    onSubmit: (values, onSubmitProps) => {
      AddTypeClientAction(values);
      if (error === "") {
        window.location.reload();
        history.push("/administration/type-client");
        console.log(values);
      }
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
          <Form.Label>Code du Type client</Form.Label>
          <Form.Control
            type="text"
            placeholder="Entrer le code du type client"
            name="code"
            id="code"
            {...formik.getFieldProps("code")}
          />

          {formik.touched.code && formik.errors.code ? (
            <div className="error-message">{formik.errors.code}</div>
          ) : null}
        </Form.Group>

        <Form.Group controlId="libelle">
          <Form.Label>Libellé</Form.Label>
          <Form.Control
            type="text"
            placeholder="Entrer le libellé du Type client"
            name="libelle"
            {...formik.getFieldProps("libelle")}
          />

          {formik.touched.libelle && formik.errors.libelle ? (
            <div className="error-message"> {formik.errors.libelle} </div>
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
    error: state.typeClient.errors,
  };
};

/*
TO MAP ACTION CREATORS TO PROPS
*/
const mapDispatchToProps = (dispatch) => {
  return {
    AddTypeClientAction: (values) => dispatch(AddTypeClientAction(values)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddModalForm);
