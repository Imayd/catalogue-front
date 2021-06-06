import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Form, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { UpdateGrpMotifsAction } from "../../redux/grpMotifs/grpMotifsActions";

const validationSchema = Yup.object({
  code: Yup.string()
    .min(1, "Le code doit comporter au moins 1 caractère")
    .max(20, "Le code ne doit pas dépasser 20 caractères")
    .matches(
      /^[aA-zZ1-9]+$/,
      "Le code ne doit pas contenir de caractères spéciaux"
    )
    .required("Le code du groupement de motifs est obligatoire!"),
  libelle: Yup.string()
    .min(1, "Le libellé doit comporter au moins 1 caractère")
    .max(20, "Le libellé ne doit pas dépasser 20 caractères")
    .matches(
      /^[aA-zZ1-9]+$/,
      "Le libellé ne doit pas contenir de caractères spéciaux"
    )
    .required("Le libellé du groupement de motifs est obligatoire!"),
  description: Yup.string()
    .min(1, "La description doit comporter au moins 1 caractère")
    .matches(
      /^[aA-zZÀ-ÿ,.-_'\s]+$/,
      "Le code ne doit pas contenir de caractères spéciaux"
    )
    .required("La description du groupement de motifs est obligatoire!"),
});

function EditModalForm(props) {
  const { grpMotifs, UpdateGrpMotifsAction, onHide, error } = props;
  const grpMotifsId = grpMotifs.id;
  const grpMotifsDescription = grpMotifs.description;
  const grpMotifsCode = grpMotifs.code;
  const grpMotifsLibelle = grpMotifs.libelle;

  const initialValues = {
    description: grpMotifsDescription,
    code: grpMotifsCode,
    libelle: grpMotifsLibelle,
  };

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      console.log("inside onSubmit in grpMotifs editModalForm");
      console.log(values);
      UpdateGrpMotifsAction(grpMotifsId, values);
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
        <Form.Label>Code du Groupement de statuts</Form.Label>
        <Form.Control
          type="text"
          placeholder="Entrer le libelle du Groupement de statuts"
          name="code"
          id="code"
          {...formik.getFieldProps("code")}
        />

        {formik.touched.code && formik.errors.code ? (
          <div className="error-message">{formik.errors.code}</div>
        ) : null}
      </Form.Group>
      <Form.Group>
        <Form.Label>Libellé du Groupement de motifs</Form.Label>
        <Form.Control
          type="text"
          placeholder="Entrer le libelle du Groupement de motifs"
          name="libelle"
          id="libelle"
          {...formik.getFieldProps("libelle")}
        />

        {formik.touched.libelle && formik.errors.libelle ? (
          <div className="error-message">{formik.errors.libelle}</div>
        ) : null}
      </Form.Group>

      <Form.Group>
        <Form.Label>Description du Type Service</Form.Label>
        <Form.Control
          type="text"
          placeholder="Entrer le code du Groupement de statuts"
          name="description"
          id="description"
          {...formik.getFieldProps("description")}
        />

        {formik.touched.description && formik.errors.description ? (
          <div className="error-message"> {formik.errors.description} </div>
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
    UpdateGrpMotifsAction: (grpMotifsid, values) =>
      dispatch(UpdateGrpMotifsAction(grpMotifsid, values)),
  };
};

const mapStateToProps = (state) => {
  return {
    error: state.grpMotifs.errors,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditModalForm);
