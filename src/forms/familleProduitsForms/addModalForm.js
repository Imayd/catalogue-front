import React from "react";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import { Form, Button } from "react-bootstrap";
import { connect } from "react-redux";

import { AddFamilleProduitsAction } from "../../redux/familleProduits/actions/familleProduitsActions";

const validationSchema = Yup.object({
  code: Yup.string()
    .min(1, "Le code doit comporter au moins 1 caractère")
    .max(5, "Le code ne doit pas dépasser 5 caractères")
    .matches(
      /^[aA-zZ1-9]+$/,
      "Le code ne doit pas contenir de caractères spéciaux"
    )
    .required("Le code de la famille de produits est obligatoire!"),
  libelle: Yup.string()
    .min(3, "Le libellé doit comporter au moins 3 caractères")
    .max(20, "Le libellé ne doit pas dépasser 20 caractères")
    .matches(
      /^[aA-zZÀ-ÿ\s]+$/,
      "Le libellé ne doit pas contenir des caractères spéciaux"
    )
    .required("Le libellé de la famille de produits est obligatoire!"),
  dateEffectivite: Yup.string().required(
    "La date d'effectivité est obligatoire!"
  ),
  dateFinEffectivite: Yup.string().required(
    "La date de fin d'effectivité est obligatoire!"
  ),
  market: Yup.string(),
});

const initialValues = {
  code: "",
  libelle: "",
  market: "",
  dateEffectivite: "",
  dateFinEffectivite: "",
};

function AddModalForm({ annuler, AddFamilleProduitsAction, error, markets }) {
  //const date = new Date().toISOString().split("T")[0];
  const today = new Date();
  const tomorrow = new Date(today.setDate(today.getDate() + 1))
    .toISOString()
    .split("T")[0];

  const formik = useFormik({
    initialValues,
    onSubmit: (values, onSubmitProps) => {
      AddFamilleProduitsAction(values);
      if (error === "") {
        //window.location.reload();
        //history.push("/administration/famille-produits");
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
          <Form.Label>Code</Form.Label>
          <Form.Control
            type="text"
            placeholder="Entrer le code de la famille de produits"
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
            placeholder="Entrer le libellé de la famille de produits"
            name="libelle"
            {...formik.getFieldProps("libelle")}
          />

          {formik.touched.libelle && formik.errors.libelle ? (
            <div className="error-message"> {formik.errors.libelle} </div>
          ) : null}
        </Form.Group>
        <Form.Group>
          <Form.Label>Marché associé</Form.Label>
          <Form.Control
            as="select"
            name="market"
            id="market"
            {...formik.getFieldProps("market")}
          >
            <option>Selectionner un marché</option>
            {markets.map((m) => (
              <option value={m.nom}>{m.nom}</option>
            ))}
          </Form.Control>
          {formik.touched.market && formik.errors.market ? (
            <div className="error-message"> {formik.errors.market} </div>
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
    error: state.familleProduits.errors,
    markets: state.market.markets,
  };
};

/*
TO MAP ACTION CREATORS TO PROPS
*/
const mapDispatchToProps = (dispatch) => {
  return {
    AddFamilleProduitsAction: (values) =>
      dispatch(AddFamilleProduitsAction(values)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddModalForm);
