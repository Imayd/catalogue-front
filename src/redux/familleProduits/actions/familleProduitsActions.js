import axios from "axios";
import { FamilleProduitsActionType } from "./types";
import authHeader from "../../../helpers/authHeader";

const GetFamillesProduitsAction = () => {
  return async (dispatch) => {
    try {
      console.log("inside GetFamillesProduitsAction");
      const resp = await axios.get("/famille-produits/", {
        headers: authHeader(),
      });
      console.log(resp);
      dispatch({
        type: FamilleProduitsActionType.GET_FAMILLES_PRODUITS,
        payload: resp.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

const AddFamilleProduitsAction = (values) => {
  console.log("inside AddFamilleProduitsAction");
  return async (dispatch) => {
    try {
      console.log("inside AddFamilleProduitsAction tryyy");
      const resp = await axios.post("/famille-produits/", values, {
        headers: authHeader(),
      });
      console.log("Api response");
      console.log(resp);
      dispatch({
        type: FamilleProduitsActionType.ADD_FAMILLE_PRODUIT_SUCCESS,
        payload: resp.data,
      });
    } catch (error) {
      console.log("catched error inside FamilleProduitsAction ");
      console.log(error);
      dispatch({
        type: FamilleProduitsActionType.ADD_FAMILLE_PRODUIT_FAILED,
        payload: error.response.data,
      });
    }
  };
};

const UpdateFamilleProduitsAction = (familleProduitsId, familleProduits) => {
  return async (dispatch) => {
    try {
      const resp = await axios.put(
        `/famille-produits/${familleProduitsId}`,
        familleProduits,
        {
          headers: authHeader(),
        }
      );
      console.log("resp" + resp.data);
      dispatch({
        type: FamilleProduitsActionType.UPDATE_FAMILLE_PRODUIT_SUCCESS,
        payload: resp.data,
      });
    } catch (error) {
      console.log("catched error inside UpdateFamilleProduitsAction ");
      dispatch({
        type: FamilleProduitsActionType.UPDATE_FAMILLE_PRODUIT_FAILED,
        payload: error.response.data,
      });
    }
  };
};

const DeleteFamilleProduitsAction = (id) => {
  console.log("inside DeleteFamilleProduitsAction");
  console.log("id "+id);
  return async (dispatch) => {
    try {
      console.log("inside try DeleteFamilleProduitsAction");
      const resp = await axios.delete(`/famille-produits/${id}`, {
        headers: authHeader(),
      });
      console.log(resp);
      dispatch({
        type: FamilleProduitsActionType.DELETE_FAMILLE_PRODUIT_SUCCESS,
        payload: resp.data,
      });
    } catch (error) {
      console.log("catched error inside DeleteFamilleProduitsAction " + error);
      dispatch({
        type: FamilleProduitsActionType.DELETE_FAMILLE_PRODUIT_FAILED,
        payload: error,
      });
    }
  };
};

const AnnulerActionForFP = () => {
  return (dispatch) => {
    dispatch({
      type: FamilleProduitsActionType.ANNULER_ACTION,
    });
  };
};

export {
  AnnulerActionForFP,
  DeleteFamilleProduitsAction,
  UpdateFamilleProduitsAction,
  AddFamilleProduitsAction,
  GetFamillesProduitsAction,
};
