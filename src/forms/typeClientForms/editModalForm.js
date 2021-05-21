import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Form, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { UpdateTypeClientAction } from "../../redux/typeClient/actions/typeClientActions";

const validationSchema = Yup.object({
  code: Yup.string()
    .min(1, "Le code doit comporter au moins 1 caractère")
    .max(20, "Le code ne doit pas dépasser 20 caractères")
    .matches(
      /^[aA-zZ]+$/,
      "Le code ne doit pas contenir de caractères spéciaux"
    )
    .required("Le code du type de client est obligatoire!"),
  libelle: Yup.string()
    .min(3, "Le libellé doit comporter au moins 3 caractères")
    .max(20, "Le libellé ne doit pas dépasser 20 caractères")
    .matches(
      /^[aA-zZÀ-ÿ\s]+$/,
      "Le libellé ne doit pas contenir des caractères spéciaux"
    )
    .required("Le libellé du type de client est obligatoire!"),
  familleProduits: Yup.string(),
});

function EditModalForm(props) {
  const {
    typeClient,
    UpdateTypeClientAction,
    onHide,
    error,
    familleProduits,
  } = props;
  const typeClientId = typeClient.id;
  const typeClientCode = typeClient.code;
  const typeClientLibelle = typeClient.libelle;
  const typeClientFP = typeClient.familleProduits;

  const initialValues = {
    code: typeClientCode,
    libelle: typeClientLibelle,
    familleProduits: typeClientFP,
  };

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      console.log("inside onSubmit in TypeClient editModalForm");
      console.log(values);
      UpdateTypeClientAction(typeClientId, values);
      if (error === "") {
        //window.location.reload();
        //history.push("/administration/type-client");
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
        <Form.Label>Code du Type client</Form.Label>
        <Form.Control
          type="text"
          placeholder="Entrer le code du type client"
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
          placeholder="Entrer le libelle du Type client"
          name="libelle"
          {...formik.getFieldProps("libelle")}
        />

        {formik.touched.libelle && formik.errors.libelle ? (
          <div className="error-message"> {formik.errors.libelle} </div>
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
    UpdateTypeClientAction: (typeClientid, values) =>
      dispatch(UpdateTypeClientAction(typeClientid, values)),
  };
};

const mapStateToProps = (state) => {
  return {
    error: state.typeClient.errors,
    familleProduits: state.familleProduits.familleProduits,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditModalForm);
