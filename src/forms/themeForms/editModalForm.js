import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Form, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { UpdateThemeAction } from "../../redux/theme/themeActions";

const validationSchema = Yup.object({
  code: Yup.string()
    .min(1, "Le code doit comporter au moins 1 caractère")
    .max(20, "Le code ne doit pas dépasser 20 caractères")
    .matches(
      /^[aA-zZ1-9]+$/,
      "Le code ne doit pas contenir de caractères spéciaux"
    )
    .required("Le code est obligatoire!"),
  designation: Yup.string()
    .min(3, "La désignation doit comporter au moins 3 caractères")
    .max(20, "La désignation ne doit pas dépasser 20 caractères")
    .matches(
      /^[aA-zZÀ-ÿ\s]+$/,
      "La désignation ne doit pas contenir des caractères spéciaux"
    )
    .required("La désignation est obligatoire!"),
  dateEffectivite: Yup.string().required(
    "La date d'effectivité est obligatoire!"
  ),
  dateFinEffectivite: Yup.string().required(
    "La date de fin d'effectivité est obligatoire!"
  ),
  description: Yup.string()
    .min(3, "La description doit comporter au moins 3 caractères")
    .max(20, "La description ne doit pas dépasser 20 caractères")
    .matches(
      /^[aA-zZÀ-ÿ\s]+$/,
      "La description ne doit pas contenir des caractères spéciaux"
    )
    .required("La description est obligatoire!"),
});

function EditModalForm(props) {
  const today = new Date();
  const tomorrow = new Date(today.setDate(today.getDate() + 1))
    .toISOString()
    .split("T")[0];
  const { theme, UpdateThemeAction, onHide, error } = props;
  const themeId = theme.id;
  const themeCode = theme.code;
  const themeDescription = theme.description;
  const themeDesignation = theme.designation;
  const themeDateEffectivite = theme.dateEffectivite
    .split("-")
    .reverse()
    .join("-");
  const themeDateFinEffectivite = theme.dateFinEffectivite
    .split("-")
    .reverse()
    .join("-");

  const initialValues = {
    code: themeCode,
    description: themeDescription,
    designation: themeDesignation,
    dateEffectivite: themeDateEffectivite,
    dateFinEffectivite: themeDateFinEffectivite,
  };

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      console.log("inside onSubmit in theme editModalForm");
      console.log(values);
      UpdateThemeAction(themeId, values);
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
        <Form.Label>Code du Thème</Form.Label>
        <Form.Control
          type="text"
          placeholder="Entrer le code du bilan"
          name="code"
          id="code"
          {...formik.getFieldProps("code")}
        />

        {formik.touched.code && formik.errors.code ? (
          <div className="error-message"> {formik.errors.code} </div>
        ) : null}
      </Form.Group>

      <Form.Group controlId="designation">
        <Form.Label>Désignation</Form.Label>
        <Form.Control
          type="text"
          placeholder="Entrer la désignation du thème"
          name="designation"
          {...formik.getFieldProps("designation")}
        />

        {formik.touched.designation && formik.errors.designation ? (
          <div className="error-message"> {formik.errors.designation} </div>
        ) : null}
      </Form.Group>
      <Form.Group controlId="description">
        <Form.Label>Description</Form.Label>
        <Form.Control
          type="text"
          placeholder="Entrer la description du thème"
          name="description"
          {...formik.getFieldProps("description")}
        />

        {formik.touched.description && formik.errors.description ? (
          <div className="error-message"> {formik.errors.description} </div>
        ) : null}
      </Form.Group>
      <Form.Group controlId="dateEffectivite">
        <Form.Label>Date d'éffectivité</Form.Label>

        <Form.Control
          type="date"
          name="dateEffectivite"
          min={themeDateEffectivite}
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
    UpdateThemeAction: (themeId, values) =>
      dispatch(UpdateThemeAction(themeId, values)),
  };
};

const mapStateToProps = (state) => {
  return {
    error: state.theme.errors,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditModalForm);
