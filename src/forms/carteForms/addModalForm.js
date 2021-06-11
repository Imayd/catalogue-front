import React from "react";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import { Form, Button, Col } from "react-bootstrap";
import { connect } from "react-redux";

import { AddCarteAction } from "../../redux/carte/carteActions";

const validationSchema = Yup.object({
  code: Yup.string()
    .min(1, "Le code doit comporter au moins 1 caractère")
    .max(10, "Le code ne doit pas dépasser 10 caractères")
    .matches(
      /^[aA-zZ1-9]+$/,
      "Le code ne doit pas contenir de caractères spéciaux"
    )
    .required("Obligatoire!"),
  libelle: Yup.string()
    .min(3, "Le libellé doit comporter au moins 3 caractères")
    .max(40, "Le libellé ne doit pas dépasser 40 caractères")
    .matches(
      /^[aA-zZÀ-ÿ\s]+$/,
      "Le libellé ne doit pas contenir des caractères spéciaux"
    )
    .required("Obligatoire!"),
  dateEffectivite: Yup.string().required("Obligatoire!"),
  familleProduits: Yup.string(),
  theme: Yup.string().required("Obligatoire!"),
  codeHost: Yup.string().required("Obligatoire!"),
  version: Yup.string().matches(
    /^(?:(\d+)\.)?(?:(\d+)\.)?(\*|\d+)$/,
    "Format invalid!"
  ),
});

const initialValues = {
  code: "",
  libelle: "",
  codeHost: "",
  validite: 0,
  version: "",
  prodUnitaire: false,
  servInternational: false,
  statut: false,
  ageMin: 0,
  ageMax: 0,
  description: "",
  maxAllowed: 0,
  minAllowed: 0,
  step: 0,
  theme: "",
  familleProduits: "Monetique",
  dateEffectivite: "",
};

function AddModalForm({ annuler, AddCarteAction, error, themes }) {
  const today = new Date();
  const tomorrow = new Date(today.setDate(today.getDate() + 1))
    .toISOString()
    .split("T")[0];

  const formik = useFormik({
    initialValues,
    onSubmit: (values, onSubmitProps) => {
      AddCarteAction(values);
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
        <Form.Row>
          <Form.Group as={Col}>
            <Form.Label>Code</Form.Label>
            <Form.Control
              type="text"
              name="code"
              placeholder="Le code de la carte"
              id="code"
              {...formik.getFieldProps("code")}
            />

            {formik.touched.code && formik.errors.code ? (
              <div className="error-message">{formik.errors.code}</div>
            ) : null}
          </Form.Group>

          <Form.Group as={Col} controlId="libelle">
            <Form.Label>Libellé</Form.Label>
            <Form.Control
              type="text"
              name="libelle"
              placeholder="Le libelle de la carte"
              {...formik.getFieldProps("libelle")}
            />

            {formik.touched.libelle && formik.errors.libelle ? (
              <div className="error-message"> {formik.errors.libelle} </div>
            ) : null}
          </Form.Group>
          <Form.Group as={Col} controlId="codeHost">
            <Form.Label>Code Host</Form.Label>
            <Form.Control
              type="text"
              name="codeHost"
              placeholder="Le code du Host"
              {...formik.getFieldProps("codeHost")}
            />

            {formik.touched.codeHost && formik.errors.codeHost ? (
              <div className="error-message"> {formik.errors.codeHost} </div>
            ) : null}
          </Form.Group>
          <Form.Group as={Col} controlId="validite">
            <Form.Label>Validité [AN(s)] </Form.Label>
            <Form.Control
              type="number"
              name="validite"
              placeholder="AN(s)"
              {...formik.getFieldProps("validite")}
            />
            {formik.touched.validite && formik.errors.validite ? (
              <div className="error-message"> {formik.errors.validite} </div>
            ) : null}
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col}>
            <Form.Label>Theme associé</Form.Label>
            <Form.Control
              as="select"
              name="theme"
              id="theme"
              custom
              {...formik.getFieldProps("theme")}
            >
              <option>-- Selectionner un thème --</option>
              {themes.map((t) => (
                <option value={t.designation}>{t.designation}</option>
              ))}
            </Form.Control>
            {formik.touched.theme && formik.errors.theme ? (
              <div className="error-message"> {formik.errors.theme} </div>
            ) : null}
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Famille de produits associée</Form.Label>
            <Form.Control
              as="select"
              name="familleProduits"
              id="familleProduits"
              custom
              disabled
              {...formik.getFieldProps("familleProduits")}
            >
              <option>Monétique</option>
            </Form.Control>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId="version">
            <Form.Label>Version</Form.Label>
            <Form.Control
              type="text"
              name="version"
              placeholder="La version de la carte"
              {...formik.getFieldProps("version")}
            />

            {formik.touched.version && formik.errors.version ? (
              <div className="error-message"> {formik.errors.version} </div>
            ) : null}
          </Form.Group>
          <Form.Group as={Col} controlId="ageMin">
            <Form.Label>L'âge minimum</Form.Label>
            <Form.Control
              type="number"
              name="ageMin"
              placeholder="AN(s)"
              {...formik.getFieldProps("ageMin")}
            />
            {formik.touched.ageMin && formik.errors.ageMin ? (
              <div className="error-message"> {formik.errors.ageMin} </div>
            ) : null}
          </Form.Group>
          <Form.Group as={Col} controlId="ageMax">
            <Form.Label>L'âge maximum</Form.Label>
            <Form.Control
              type="number"
              name="ageMax"
              placeholder="AN(s)"
              {...formik.getFieldProps("ageMax")}
            />
            {formik.touched.ageMax && formik.errors.ageMax ? (
              <div className="error-message "> {formik.errors.ageMax} </div>
            ) : null}
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId="maxAllowed">
            <Form.Label>Plafond maximum [Dhs] </Form.Label>
            <Form.Control
              type="number"
              name="maxAllowed"
              placeholder="DHs"
              {...formik.getFieldProps("maxAllowed")}
            />
            {formik.touched.maxAllowed && formik.errors.maxAllowed ? (
              <div className="error-message"> {formik.errors.maxAllowed} </div>
            ) : null}
          </Form.Group>
          <Form.Group as={Col} controlId="minAllowed">
            <Form.Label>Plafond minimum [Dhs]</Form.Label>
            <Form.Control
              type="number"
              name="minAllowed"
              placeholder="DHs"
              {...formik.getFieldProps("minAllowed")}
            />
            {formik.touched.minAllowed && formik.errors.minAllowed ? (
              <div className="error-message"> {formik.errors.minAllowed} </div>
            ) : null}
          </Form.Group>
          <Form.Group as={Col} controlId="step">
            <Form.Label>Step</Form.Label>
            <Form.Control
              type="number"
              name="step"
              placeholder="Step"
              {...formik.getFieldProps("step")}
            />
            {formik.touched.step && formik.errors.step ? (
              <div className="error-message"> {formik.errors.step} </div>
            ) : null}
          </Form.Group>
        </Form.Row>
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
        <Form.Group controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={1}
            {...formik.getFieldProps("description")}
          />
          {formik.touched.dateEffectivite && formik.errors.dateEffectivite ? (
            <div className="error-message">
              {" "}
              {formik.errors.dateEffectivite}{" "}
            </div>
          ) : null}
        </Form.Group>
        <Form.Row>
          <Form.Group as={Col} controlId="servInternational">
            <Form.Check
              type="checkbox"
              name="servInternational"
              label="Service International"
              {...formik.getFieldProps("servInternational")}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="prodUnitaire">
            <Form.Check
              type="checkbox"
              name="prodUnitaire"
              label="Produit unitaire"
              {...formik.getFieldProps("prodUnitaire")}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="statut">
            <Form.Check
              type="switch"
              name="statut"
              label="Activer / Désactiver le statut"
              {...formik.getFieldProps("statut")}
            />
          </Form.Group>
        </Form.Row>
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
    error: state.carte.errors,
    themes: state.theme.themes,
  };
};

/*
TO MAP ACTION CREATORS TO PROPS
*/
const mapDispatchToProps = (dispatch) => {
  return {
    AddCarteAction: (values) => dispatch(AddCarteAction(values)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddModalForm);
