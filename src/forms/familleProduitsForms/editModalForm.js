import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Form, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import { UpdateFamilleProduitsAction } from "../../redux/familleProduits/actions/familleProduitsActions";

const validationSchema = Yup.object({
  code: Yup.string()
    .min(1, "Le code doit comporter au moins 1 caractère")
    .max(20, "Le code ne doit pas dépasser 20 caractères")
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
});

function EditModalForm(props) {
  const history = useHistory();
  const { familleProduits, UpdateFamilleProduitsAction, onHide, error } = props;
  const familleProduitsId = familleProduits.id;
  const familleProduitsCode = familleProduits.code;
  const familleProduitsLibelle = familleProduits.libelle;

  const initialValues = {
    code: familleProduitsCode,
    libelle: familleProduitsLibelle,
  };

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      console.log("inside onSubmit in familleProduits editModalForm");
      console.log(values);
      UpdateFamilleProduitsAction(familleProduitsId, values);
      if (error === "") {
        window.location.reload();
        history.push("/administration/famille-produits");
      }
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
        <Form.Label>Code de la famille de produits</Form.Label>
        <Form.Control
          type="text"
          placeholder="Entrer le code de la famille de produits"
          name="code"
          id="code"
          {...formik.getFieldProps("code")}
        />

        {formik.touched.code && formik.errors.code ? (
          <div className="error-message"> {formik.errors.code} </div>
        ) : null}
      </Form.Group>

      <Form.Group controlId="libelle">
        <Form.Label>Libelle</Form.Label>
        <Form.Control
          type="text"
          placeholder="Entrer le libelle de la famille de produits"
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
    UpdateFamilleProduitsAction: (familleProduitsId, values) =>
      dispatch(UpdateFamilleProduitsAction(familleProduitsId, values)),
  };
};

const mapStateToProps = (state) => {
  return {
    error: state.familleProduits.errors,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditModalForm);
