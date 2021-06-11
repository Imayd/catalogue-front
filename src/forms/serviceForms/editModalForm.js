import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Form, Button, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { UpdateServiceAction } from "../../redux/service/serviceActions";

const validationSchema = Yup.object({
  libelle: Yup.string()
    .min(3, "Le libellé doit comporter au moins 3 caractères")
    .max(80, "Le libellé ne doit pas dépasser 20 caractères")
    .matches(
      /^[aA-zZ1-9À-ÿ-._\s]+$/,
      "Le libellé ne doit pas contenir des caractères spéciaux"
    )
    .required("Le libellé du service est obligatoire!"),
  code: Yup.string()
    .min(3, "Le code doit comporter au moins 3 caractères")
    .max(5, "Le code ne doit pas dépasser 5 caractères")
    .matches(
      /^[aA-zZ1-9-._\s]+$/,
      "Le libellé ne doit pas contenir des caractères spéciaux"
    )
    .required("Le libellé du service est obligatoire!"),
  categorieService: Yup.string().required(
    "La catégorie de service est obligatoire!"
  ),
  carte: Yup.string().required(
    "Le produit associé au service est obligatoire!"
  ),
  groupementMotifs: Yup.string().required(
    "Le groupement de motifs du service est obligatoire!"
  ),
  groupementStatuts: Yup.string().required(
    "Le groupement de statuts du service est obligatoire!"
  ),
  dateEffectivite: Yup.string().required(
    "La date d'effectivité est obligatoire!"
  ),
  dateFinEffectivite: Yup.string().required(
    "La date de fin d'effectivité est obligatoire!"
  ),
  description: Yup.string().required(
    "Une description du service est obligatoire!"
  ),
});

function EditModalForm(props) {
  const {
    service,
    UpdateServiceAction,
    onHide,
    error,
    categorieService,
    carte,
    grpStatuts,
    grpMotifs,
  } = props;
  const today = new Date();
  const tomorrow = new Date(today.setDate(today.getDate() + 1))
    .toISOString()
    .split("T")[0];

  const serviceId = service.id;
  const serviceServInternational = service.servInternational;
  const serviceLibelle = service.libelle;
  const serviceCode = service.code;
  const serviceDescription = service.description;
  const serviceCS = service.categorieService;
  const serviceCarte = service.carte;
  const serviceGrpStatuts = service.groupementStatuts;
  const serviceGrpMotifs = service.groupementMotifs;
  const serviceDateEffectivite = service.dateEffectivite
    .split("-")
    .reverse()
    .join("-");
  const serviceDateFinEffectivite = service.dateFinEffectivite
    .split("-")
    .reverse()
    .join("-");
  const initialValues = {
    servInternational: serviceServInternational,
    libelle: serviceLibelle,
    code: serviceCode,
    description: serviceDescription,
    categorieService: serviceCS,
    carte: serviceCarte,
    groupementMotifs: serviceGrpMotifs,
    groupementStatuts: serviceGrpStatuts,
    dateEffectivite: serviceDateEffectivite,
    dateFinEffectivite: serviceDateFinEffectivite,
  };

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      console.log("inside onSubmit in service editModalForm");
      console.log(values);
      UpdateServiceAction(serviceId, values);
    },
    validationSchema,
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      {error ? (
        <div className="alert alert-danger" role="alert">
          {" "}
          {error}{" "}
        </div>
      ) : null}
      <Form.Row>
        <Form.Group as={Col}>
          <Form.Label>Code du Service</Form.Label>
          <Form.Control
            type="text"
            placeholder="Entrer le libelle du Service "
            name="code"
            id="code"
            {...formik.getFieldProps("code")}
          />

          {formik.touched.code && formik.errors.code ? (
            <div className="error-message">{formik.errors.code}</div>
          ) : null}
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Label>Libellé du Service </Form.Label>
          <Form.Control
            type="text"
            placeholder="Entrer le libelle du Service "
            name="libelle"
            id="libelle"
            {...formik.getFieldProps("libelle")}
          />

          {formik.touched.libelle && formik.errors.libelle ? (
            <div className="error-message">{formik.errors.libelle}</div>
          ) : null}
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col}>
          <Form.Label>Catégorie de services associée</Form.Label>
          <Form.Control
            as="select"
            name="categorieService"
            id="categorieService"
            {...formik.getFieldProps("categorieService")}
          >
            <option>Selectionner une catégorie de services</option>
            {categorieService.map((cs) => (
              <option value={cs.libelle}>{cs.libelle}</option>
            ))}
          </Form.Control>
          {formik.touched.categorieService && formik.errors.categorieService ? (
            <div className="error-message">
              {" "}
              {formik.errors.categorieService}{" "}
            </div>
          ) : null}
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Label>Produit associé</Form.Label>
          <Form.Control
            as="select"
            name="carte"
            id="carte"
            {...formik.getFieldProps("carte")}
          >
            <option>--- Sélectionner le produit associé ---</option>
            {carte.map((c) => (
              <option value={c.libelle}>{c.libelle}</option>
            ))}
          </Form.Control>
          {formik.touched.carte && formik.errors.carte ? (
            <div className="error-message"> {formik.errors.carte} </div>
          ) : null}
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col}>
          <Form.Label>Groupement de statuts associé</Form.Label>
          <Form.Control
            as="select"
            name="groupementStatuts"
            id="groupementStatuts"
            {...formik.getFieldProps("groupementStatuts")}
          >
            <option>--- Sélectionner ---</option>
            {grpStatuts.map((c) => (
              <option value={c.libelle}>{c.libelle}</option>
            ))}
          </Form.Control>
          {formik.touched.groupementStatuts &&
          formik.errors.groupementStatuts ? (
            <div className="error-message">
              {" "}
              {formik.errors.groupementStatuts}{" "}
            </div>
          ) : null}
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Label>Groupement de motifs associé</Form.Label>
          <Form.Control
            as="select"
            name="groupementMotifs"
            id="groupementMotifs"
            {...formik.getFieldProps("groupementMotifs")}
          >
            <option>--- Sélectionner ---</option>
            {grpMotifs.map((c) => (
              <option value={c.libelle}>{c.libelle}</option>
            ))}
          </Form.Control>
          {formik.touched.groupementMotifs && formik.errors.groupementMotifs ? (
            <div className="error-message">
              {" "}
              {formik.errors.groupementMotifs}{" "}
            </div>
          ) : null}
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col} controlId="dateEffectivite">
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

        <Form.Group as={Col} controlId="dateFinEffectivite">
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
      </Form.Row>
      <Form.Row className="align-items-center">
        <Form.Group as={Col} controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={1}
            {...formik.getFieldProps("description")}
          />
          {formik.touched.description && formik.errors.description ? (
            <div className="error-message"> {formik.errors.description} </div>
          ) : null}
        </Form.Group>
        <Form.Group controlId="servInternational">
          <Col xs="auto">
            <Form.Check
              type="switch"
              name="servInternational"
              label="Service International"
              {...formik.getFieldProps("servInternational")}
            />
          </Col>
        </Form.Group>
      </Form.Row>
      <hr></hr>
      <div style={{ float: "right" }}>
        <Button
          type="reset"
          variant="secondary"
          style={{ borderRadius: "20px" }}
          onClick={onHide}
        >
          Annuler
        </Button>
        <Button
          type="submit"
          variant="warning"
          style={{ marginLeft: "8px", borderRadius: "20px" }}
        >
          Enregistrer
        </Button>
      </div>
    </Form>
  );
}
const mapDispatchToProps = (dispatch) => {
  return {
    UpdateServiceAction: (serviceid, values) =>
      dispatch(UpdateServiceAction(serviceid, values)),
  };
};

const mapStateToProps = (state) => {
  return {
    error: state.service.errors,
    categorieService: state.categorieService.categoriesService,
    grpStatuts: state.grpStatuts.grpsStatuts,
    grpMotifs: state.grpMotifs.grpsMotifs,
    carte: state.carte.cartes,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditModalForm);
