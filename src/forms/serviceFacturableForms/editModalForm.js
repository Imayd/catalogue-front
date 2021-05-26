import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Form, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { UpdateServiceFacturableAction } from "../../redux/serviceFacturable/serviceFacturableActions";

const validationSchema = Yup.object({
  libelle: Yup.string()
    .min(3, "Le libellé doit comporter au moins 3 caractères")
    .max(80, "Le libellé ne doit pas dépasser 20 caractères")
    .matches(
      /^[aA-zZÀ-ÿ-._\s]+$/,
      "Le libellé ne doit pas contenir des caractères spéciaux"
    )
    .required("Le libellé du type de service est obligatoire!"),
  categorieService: Yup.string().required(
    "La catégorie de service est obligatoire!"
  ),
  dateEffectivite: Yup.string().required(
    "La date d'effectivité est obligatoire!"
  ),
  dateFinEffectivite: Yup.string().required(
    "La date de fin d'effectivité est obligatoire!"
  ),
});

function EditModalForm(props) {
  const {
    serviceFacturable,
    UpdateServiceFacturableAction,
    onHide,
    error,
    categorieService,
  } = props;
  const today = new Date();
  const tomorrow = new Date(today.setDate(today.getDate() + 1))
    .toISOString()
    .split("T")[0];

  const serviceFacturableId = serviceFacturable.id;
  const serviceFacturableServInternational =
    serviceFacturable.servInternational;
  const serviceFacturableLibelle = serviceFacturable.libelle;
  const serviceFacturableCS = serviceFacturable.categorieService;
  const serviceFacturableDateEffectivite = serviceFacturable.dateEffectivite
    .split("-")
    .reverse()
    .join("-");
  const serviceFacturableDateFinEffectivite = serviceFacturable.dateFinEffectivite
    .split("-")
    .reverse()
    .join("-");
  const initialValues = {
    servInternational: serviceFacturableServInternational,
    libelle: serviceFacturableLibelle,
    categorieService: serviceFacturableCS,
    dateEffectivite: serviceFacturableDateEffectivite,
    dateFinEffectivite: serviceFacturableDateFinEffectivite,
    typeService: "Service facturable",
  };

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      console.log("inside onSubmit in serviceFacturable editModalForm");
      console.log(values);
      UpdateServiceFacturableAction(serviceFacturableId, values);
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
      <Form.Group>
        <Form.Label>Type de Service associé</Form.Label>
        <Form.Control
          disabled
          as="select"
          name="typeService"
          id="typeService"
          {...formik.getFieldProps("typeService")}
        >
          <option>Service facturable</option>
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="libelle">
        <Form.Label>Libelle</Form.Label>
        <Form.Control
          type="text"
          placeholder="Entrer le libelle du Service Facturable"
          name="libelle"
          {...formik.getFieldProps("libelle")}
        />

        {formik.touched.libelle && formik.errors.libelle ? (
          <div className="error-message"> {formik.errors.libelle} </div>
        ) : null}
      </Form.Group>
      <Form.Group>
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
      <Form.Group controlId="dateEffectivite">
        <Form.Label>Date d'éffectivité</Form.Label>
        <Form.Control
          type="date"
          name="dateEffectivite"
          min={serviceFacturableDateEffectivite}
          format="DD-MM-YYYY"
          {...formik.getFieldProps("dateEffectivite")}
        />

        {formik.touched.dateEffectivite && formik.errors.dateEffectivite ? (
          <div className="error-message"> {formik.errors.dateEffectivite} </div>
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

      <Form.Group controlId="servInternational">
        <Form.Check
          type="checkbox"
          name="servInternational"
          label="Service International"
          {...formik.getFieldProps("servInternational")}
        />
      </Form.Group>
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
    UpdateServiceFacturableAction: (serviceFacturableid, values) =>
      dispatch(UpdateServiceFacturableAction(serviceFacturableid, values)),
  };
};

const mapStateToProps = (state) => {
  return {
    error: state.typeService.errors,
    categorieService: state.categorieService.categoriesService,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditModalForm);
