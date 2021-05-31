import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Form, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { UpdateStatutAction } from "../../redux/statut/statutActions";

const validationSchema = Yup.object({
  code: Yup.string()
    .min(1, "Le code doit comporter au moins 1 caractère")
    .max(20, "Le code ne doit pas dépasser 20 caractères")
    .matches(
      /^[aA-zZ1-9]+$/,
      "Le code ne doit pas contenir de caractères spéciaux"
    )
    .required("Le code du statut est obligatoire!"),
  description: Yup.string()
    .min(1, "La description doit comporter au moins 1 caractère")
    .matches(
      /^[aA-zZÀ-ÿ,.-_'\s]+$/,
      "Le code ne doit pas contenir de caractères spéciaux"
    )
    .required("La description du statut est obligatoire!"),
  libelle: Yup.string()
    .min(3, "Le libellé doit comporter au moins 3 caractères")
    .max(20, "Le libellé ne doit pas dépasser 20 caractères")
    .matches(
      /^[aA-zZÀ-ÿ\s]+$/,
      "Le libellé ne doit pas contenir des caractères spéciaux"
    )
    .required("Le libellé du statut est obligatoire!"),
  groupementStatuts: Yup.string(),
});

function EditModalForm(props) {
  const { statut, UpdateStatutAction, onHide, grpStatuts, error } = props;
  const statutId = statut.id;
  const statutDescription = statut.description;
  const statutLibelle = statut.libelle;
  const statutCode = statut.code;
  const statutGrpStatuts = statut.groupementStatuts;

  const initialValues = {
    description: statutDescription,
    libelle: statutLibelle,
    code: statutCode,
    groupementStatuts: statutGrpStatuts,
  };

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      console.log("inside onSubmit in statut editModalForm");
      console.log(values);
      UpdateStatutAction(statutId, values);
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
        <Form.Label>Code du statut</Form.Label>
        <Form.Control
          type="text"
          placeholder="Entrer le libelle du statut"
          name="code"
          id="code"
          {...formik.getFieldProps("code")}
        />

        {formik.touched.code && formik.errors.code ? (
          <div className="error-message">{formik.errors.code}</div>
        ) : null}
      </Form.Group>
      <Form.Group>
        <Form.Label>Libellé du statut</Form.Label>
        <Form.Control
          type="text"
          placeholder="Entrer le libelle du statut"
          name="libelle"
          id="libelle"
          {...formik.getFieldProps("libelle")}
        />

        {formik.touched.libelle && formik.errors.libelle ? (
          <div className="error-message">{formik.errors.libelle}</div>
        ) : null}
      </Form.Group>
      <Form.Group>
        <Form.Label>Groupement de statuts associé</Form.Label>
        <Form.Control
          as="select"
          name="groupementStatuts"
          id="groupementStatuts"
          {...formik.getFieldProps("groupementStatuts")}
        >
          <option>Selectionner un groupement de statuts</option>
          {grpStatuts.map((gs) => (
            <option value={gs.libelle}>{gs.libelle}</option>
          ))}
        </Form.Control>
        {formik.touched.groupementStatuts && formik.errors.groupementStatuts ? (
          <div className="error-message">
            {" "}
            {formik.errors.groupementStatuts}{" "}
          </div>
        ) : null}
      </Form.Group>
      <Form.Group>
        <Form.Label>Description du statut</Form.Label>
        <Form.Control
          type="text"
          placeholder="Entrer la description du type service"
          name="description"
          id="description"
          {...formik.getFieldProps("description")}
        />

        {formik.touched.description && formik.errors.description ? (
          <div className="error-message">{formik.errors.description}</div>
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
    UpdateStatutAction: (statutid, values) =>
      dispatch(UpdateStatutAction(statutid, values)),
  };
};

const mapStateToProps = (state) => {
  return {
    error: state.statut.errors,
    grpStatuts: state.grpStatuts.grpsStatuts,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditModalForm);
