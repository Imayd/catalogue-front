import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Form, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { UpdateCategorieServiceAction } from "../../redux/categorieService/categorieServiceActions";

const validationSchema = Yup.object({
  description: Yup.string()
    .min(1, "La description doit comporter au moins 1 caractère")
    .matches(
      /^[aA-zZÀ-ÿ.-\s]+$/,
      "Le code ne doit pas contenir de caractères spéciaux"
    )
    .required("La description de la catégorie de service est obligatoire!"),
  libelle: Yup.string()
    .min(3, "Le libellé doit comporter au moins 3 caractères")
    .max(20, "Le libellé ne doit pas dépasser 20 caractères")
    .matches(
      /^[aA-zZÀ-ÿ\s]+$/,
      "Le libellé ne doit pas contenir des caractères spéciaux"
    )
    .required("Le libellé de la catégorie de service est obligatoire!"),
  familleProduits: Yup.string(),
});

function EditModalForm(props) {
  const {
    categorieService,
    UpdateCategorieServiceAction,
    onHide,
    error,
    typeService,
  } = props;
  const categorieServiceId = categorieService.id;
  const categorieServiceDescription = categorieService.description;
  const categorieServiceLibelle = categorieService.libelle;
  const categorieServiceTS = categorieService.typeService;

  const initialValues = {
    description: categorieServiceDescription,
    libelle: categorieServiceLibelle,
    typeService: categorieServiceTS,
  };

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      console.log("inside onSubmit in CategorieService editModalForm");
      console.log(values);
      UpdateCategorieServiceAction(categorieServiceId, values);
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
          placeholder="Entrer le libelle de la Catégorie Service"
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
          placeholder="Entrer le code de la Catégorie Service"
          name="description"
          id="description"
          {...formik.getFieldProps("description")}
        />

        {formik.touched.description && formik.errors.description ? (
          <div className="error-message"> {formik.errors.description} </div>
        ) : null}
      </Form.Group>
      <Form.Group>
        <Form.Label>Type de services associé</Form.Label>
        <Form.Control
          as="select"
          name="typeService"
          id="typeService"
          {...formik.getFieldProps("typeService")}
        >
          <option>Selectionner une famille de produits</option>
          {typeService.map((ts) => (
            <option value={ts.libelle}>{ts.libelle}</option>
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
    UpdateCategorieServiceAction: (categorieServiceid, values) =>
      dispatch(UpdateCategorieServiceAction(categorieServiceid, values)),
  };
};

const mapStateToProps = (state) => {
  return {
    error: state.typeService.errors,
    typeService: state.typeService.typesService,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditModalForm);
