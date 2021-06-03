import React from "react";
import { Form, Col, Button } from "react-bootstrap";
import { useFormik } from "formik";

function InfoModalForm(props) {
  const { carte, annuler } = props;
  const carteCode = carte.code;
  const carteLibelle = carte.libelle;
  const carteVersion = carte.version;
  const carteAgeMax = carte.ageMax;
  const carteAgeMin = carte.ageMin;
  const carteMaxAllowed = carte.maxAllowed;
  const carteMinAllowed = carte.minAllowed;
  const carteStep = carte.step;
  const carteDescription = carte.description;
  const carteCodeHost = carte.codeHost;
  const carteValidite = carte.validite;
  const carteStatut = carte.statut;
  const carteServInternational = carte.servInternational;
  const carteProdUnitaire = carte.prodUnitaire;

  const carteDateEffectivite = carte.dateEffectivite
    .split("-")
    .reverse()
    .join("-");

  const carteTheme = carte.theme;

  const initialValues = {
    code: carteCode,
    libelle: carteLibelle,
    codeHost: carteCodeHost,
    validite: carteValidite,
    version: carteVersion,
    prodUnitaire: carteProdUnitaire,
    servInternational: carteServInternational,
    statut: carteStatut,
    ageMin: carteAgeMin,
    ageMax: carteAgeMax,
    description: carteDescription,
    maxAllowed: carteMaxAllowed,
    minAllowed: carteMinAllowed,
    step: carteStep,
    theme: carteTheme,
    familleProduits: "Monetique",
    dateEffectivite: carteDateEffectivite,
  };

  const formik = useFormik({
    initialValues,
  });
  return (
    <>
      <Form>
        <Form.Row>
          <Form.Group as={Col}>
            <Form.Label>Code</Form.Label>
            <Form.Control
              type="text"
              name="code"
              id="code"
              readOnly
              {...formik.getFieldProps("code")}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="libelle">
            <Form.Label>Libellé</Form.Label>
            <Form.Control
              type="text"
              name="libelle"
              readOnly
              {...formik.getFieldProps("libelle")}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="codeHost">
            <Form.Label>Code Host</Form.Label>
            <Form.Control
              type="text"
              name="codeHost"
              readOnly
              {...formik.getFieldProps("codeHost")}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="validite">
            <Form.Label>Validité [AN(s)] </Form.Label>
            <Form.Control
              type="number"
              name="validite"
              readOnly
              {...formik.getFieldProps("validite")}
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col}>
            <Form.Label>Theme associé</Form.Label>
            <Form.Control
              as="select"
              name="theme"
              readOnly
              disabled
              id="theme"
              custom
              {...formik.getFieldProps("theme")}
            >
              <option>{carteTheme}</option>
            </Form.Control>
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Famille de produits associée</Form.Label>
            <Form.Control
              as="select"
              name="familleProduits"
              id="familleProduits"
              readOnly
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
              readOnly
              {...formik.getFieldProps("version")}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="ageMin">
            <Form.Label>L'âge minimum</Form.Label>
            <Form.Control
              type="number"
              name="ageMin"
              readOnly
              {...formik.getFieldProps("ageMin")}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="ageMax">
            <Form.Label>L'âge maximum</Form.Label>
            <Form.Control
              type="number"
              name="ageMax"
              readOnly
              {...formik.getFieldProps("ageMax")}
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId="maxAllowed">
            <Form.Label>Plafond maximum [Dhs] </Form.Label>
            <Form.Control
              type="number"
              name="maxAllowed"
              readOnly
              {...formik.getFieldProps("maxAllowed")}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="minAllowed">
            <Form.Label>Plafond minimum [Dhs]</Form.Label>
            <Form.Control
              type="number"
              name="minAllowed"
              readOnly
              {...formik.getFieldProps("minAllowed")}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="step">
            <Form.Label>Step</Form.Label>
            <Form.Control
              type="number"
              name="step"
              readOnly
              {...formik.getFieldProps("step")}
            />
          </Form.Group>
        </Form.Row>
        <Form.Group controlId="dateEffectivite">
          <Form.Label>Date d'éffectivité</Form.Label>
          <Form.Control
            type="date"
            name="dateEffectivite"
            readOnly
            min={carteDateEffectivite}
            format="DD-MM-YYYY"
            {...formik.getFieldProps("dateEffectivite")}
          />
        </Form.Group>
        <Form.Group controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            readOnly
            rows={1}
            {...formik.getFieldProps("description")}
          />
        </Form.Group>
        <Form.Row>
          <Form.Group as={Col} controlId="servInternational">
            <Form.Check
              type="checkbox"
              name="servInternational"
              label="Service International"
              disabled
              {...formik.getFieldProps("servInternational")}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="prodUnitaire">
            <Form.Check
              type="checkbox"
              name="prodUnitaire"
              label="Produit unitaire"
              disabled
              {...formik.getFieldProps("prodUnitaire")}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="statut">
            <Form.Check
              type="switch"
              name="statut"
              disabled
              label="Activer / Désactiver le statut"
              {...formik.getFieldProps("statut")}
            />
          </Form.Group>
        </Form.Row>
        <hr></hr>
        <div style={{ float: "right" }}>
          <Button
            type="reset"
            variant="warning"
            style={{ borderRadius: "20px" }}
            onClick={annuler}
          >
            Fermer
          </Button>
        </div>
      </Form>
    </>
  );
}

export default InfoModalForm;
