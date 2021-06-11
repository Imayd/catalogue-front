import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Form, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { UpdateTypeServiceAction } from "../../redux/typeService/typeServiceActions";

const validationSchema = Yup.object({
  description: Yup.string()
    .min(1, "La description doit comporter au moins 1 caractère")
    .matches(
      /^[aA-zZÀ-ÿ\s]+$/,
      "Le code ne doit pas contenir de caractères spéciaux"
    )
    .required("La description du type de service est obligatoire!"),
  libelle: Yup.string()
    .min(3, "Le libellé doit comporter au moins 3 caractères")
    .max(40, "Le libellé ne doit pas dépasser 40 caractères")
    .matches(
      /^[aA-zZÀ-ÿ\s]+$/,
      "Le libellé ne doit pas contenir des caractères spéciaux"
    )
    .required("Le libellé du type de service est obligatoire!"),
  familleProduits: Yup.string(),
});

function EditModalForm(props) {
  const {
    typeService,
    UpdateTypeServiceAction,
    onHide,
    error,
    familleProduits,
  } = props;
  const typeServiceId = typeService.id;
  const typeServiceDescription = typeService.description;
  const typeServiceLibelle = typeService.libelle;
  const typeServiceFP = typeService.familleProduits;

  const initialValues = {
    description: typeServiceDescription,
    libelle: typeServiceLibelle,
    familleProduits: typeServiceFP,
  };

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      console.log("inside onSubmit in TypeService editModalForm");
      console.log(values);
      UpdateTypeServiceAction(typeServiceId, values);
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

      <Form.Group controlId="libelle">
        <Form.Label>Libelle</Form.Label>
        <Form.Control
          type="text"
          placeholder="Entrer le libelle du Type Service"
          name="libelle"
          {...formik.getFieldProps("libelle")}
        />

        {formik.touched.libelle && formik.errors.libelle ? (
          <div className="error-message"> {formik.errors.libelle} </div>
        ) : null}
      </Form.Group>
      <Form.Group>
        <Form.Label>Description du Type Service</Form.Label>
        <Form.Control
          type="text"
          placeholder="Entrer le code du type Service"
          name="description"
          id="description"
          {...formik.getFieldProps("description")}
        />

        {formik.touched.description && formik.errors.description ? (
          <div className="error-message"> {formik.errors.description} </div>
        ) : null}
      </Form.Group>
      <Form.Group>
        <Form.Label>Famille de produits associée</Form.Label>
        <Form.Control
          as="select"
          name="familleProduits"
          id="familleProduits"
          {...formik.getFieldProps("familleProduits")}
        >
          <option>Selectionner une famille de produits</option>
          {familleProduits.map((fp) => (
            <option value={fp.libelle}>{fp.libelle}</option>
          ))}
        </Form.Control>
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
    UpdateTypeServiceAction: (typeServiceid, values) =>
      dispatch(UpdateTypeServiceAction(typeServiceid, values)),
  };
};

const mapStateToProps = (state) => {
  return {
    error: state.typeService.errors,
    familleProduits: state.familleProduits.familleProduits,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditModalForm);
