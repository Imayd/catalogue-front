import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Form, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import { UpdateBilanAction } from "../../redux/bilan/actions/bilanActions";

const validationSchema = Yup.object({
  code: Yup.string()
    .min(1, "Le code doit comporter au moins 1 caractère")
    .max(20, "Le code ne doit pas dépasser 20 caractères")
    .matches(
      /^[aA-zZ1-9]+$/,
      "Le code ne doit pas contenir de caractères spéciaux"
    )
    .required("Le code est obligatoire!"),
  libelle: Yup.string()
    .min(3, "Le libellé doit comporter au moins 3 caractères")
    .max(20, "Le libellé ne doit pas dépasser 20 caractères")
    .matches(
      /^[aA-zZÀ-ÿ\s]+$/,
      "Le libellé ne doit pas contenir des caractères spéciaux"
    )
    .required("Le libellé est obligatoire!"),
  dateEffectivite: Yup.string().required(
    "La date d'effectivité est obligatoire!"
  ),
  dateFinEffectivite: Yup.string().required(
    "La date de fin d'effectivité est obligatoire!"
  ),
});

function EditModalForm(props) {
  const today = new Date();
  const tomorrow = new Date(today.setDate(today.getDate() + 1))
    .toISOString()
    .split("T")[0];
  const history = useHistory();
  const { bilan, UpdateBilanAction, onHide, error } = props;
  const bilanId = bilan.id;
  const bilanCode = bilan.code;
  const bilanLibelle = bilan.libelle;
  const bilanDateEffectivite = bilan.dateEffectivite
    .split("-")
    .reverse()
    .join("-");
  const bilanDateFinEffectivite = bilan.dateFinEffectivite
    .split("-")
    .reverse()
    .join("-");

  const initialValues = {
    code: bilanCode,
    libelle: bilanLibelle,
    dateEffectivite: bilanDateEffectivite,
    dateFinEffectivite: bilanDateFinEffectivite,
  };

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      console.log("inside onSubmit in bilan editModalForm");
      console.log(values);
      UpdateBilanAction(bilanId, values);
      if (error === "") {
        window.location.reload();
        history.push("/administration/bilans");
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
        <Form.Label>Code du bilan</Form.Label>
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

      <Form.Group controlId="libelle">
        <Form.Label>Libelle</Form.Label>
        <Form.Control
          type="text"
          placeholder="Entrer le libelle du bilan"
          name="libelle"
          {...formik.getFieldProps("libelle")}
        />

        {formik.touched.libelle && formik.errors.libelle ? (
          <div className="error-message"> {formik.errors.libelle} </div>
        ) : null}
      </Form.Group>
      <Form.Group controlId="dateEffectivite">
        <Form.Label>Date d'éffectivité</Form.Label>

        <Form.Control
          type="date"
          name="dateEffectivite"
          min={tomorrow}
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
    UpdateBilanAction: (bilanId, values) =>
      dispatch(UpdateBilanAction(bilanId, values)),
  };
};

const mapStateToProps = (state) => {
  return {
    error: state.bilan.errors,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditModalForm);