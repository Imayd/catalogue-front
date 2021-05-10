import React from "react";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import { Form, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import "react-datepicker/dist/react-datepicker.css";

import { AddMarketAction } from "../redux/market.maintenance/actions/marketActions";

const validationSchema = Yup.object({
  nom: Yup.string()
    .min(3, "Le nom doit dépasser 2 caractères")
    .max(20, "Le nom ne doit pas dépasser 20 caractères")
    .matches(
      /^[aA-zZ\s]+$/,
      "Le nom ne doit pas contenir de caractères spéciaux"
    )
    .required("Le nom du marché est obligatoire!"),
  abreviation: Yup.string()
    .min(1, "L’abréviation doit comporter au moins 1 caractère")
    .max(5, "L’abréviation ne doit pas dépasser 5 caractères")
    .matches(
      /^[aA-zZ]+$/,
      "L'abréviation ne doit pas contenir des caractères spéciaux"
    )
    .required("L'abréviation du marché est obligatoire!"),
  dateEffectivite: Yup.date()
    .required("La date d'effectivité du marché est obligatoire!")
    .nullable(),
  dateFinEffectivite: Yup.date()
    .required("La date de fin d'effectivité du marché est obligatoire!")
    .nullable(),
});

const initialValues = {
  nom: "",
  abreviation: "",
  dateEffectivite: "",
  dateFinEffectivite: "",
};

function AddModalForm({ annuler, AddMarketAction, error }) {
  const history = useHistory();
  //const today = new Date().toISOString().split("T")[0];
  const today = new Date();
  const tomorrow = new Date(today.setDate(today.getDate() + 1))
    .toISOString()
    .split("T")[0];

  const formik = useFormik({
    initialValues,
    onSubmit: (values, onSubmitProps) => {
      AddMarketAction(values);
      if (error === "") {
        history.push("/administration/markets-maintenance");
        window.location.reload();
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
          <Form.Label>Nom du marché</Form.Label>
          <Form.Control
            type="text"
            placeholder="Entrer le nom du marché"
            name="nom"
            id="nom"
            {...formik.getFieldProps("nom")}
          />

          {formik.touched.nom && formik.errors.nom ? (
            <div className="error-message">{formik.errors.nom}</div>
          ) : null}
        </Form.Group>

        <Form.Group controlId="abreviation">
          <Form.Label>Abréviation</Form.Label>
          <Form.Control
            type="text"
            placeholder="Entrer l'abréviation du marché"
            name="abreviation"
            {...formik.getFieldProps("abreviation")}
          />

          {formik.touched.abreviation && formik.errors.abreviation ? (
            <div className="error-message"> {formik.errors.abreviation} </div>
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
    error: state.market.errors,
  };
};

/*
TO MAP ACTION CREATORS TO PROPS
*/
const mapDispatchToProps = (dispatch) => {
  return {
    AddMarketAction: (values) => dispatch(AddMarketAction(values)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddModalForm);
