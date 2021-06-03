import axios from "axios";
import { CarteActionType } from "./types";
import authHeader from "../../helpers/authHeader";

const GetCartesAction = () => {
  return async (dispatch) => {
    try {
      console.log("inside GetCartesAction");
      const resp = await axios.get("/monetique/cartes/", {
        headers: authHeader(),
      });
      console.log(resp);
      dispatch({
        type: CarteActionType.GET_CARTES,
        payload: resp.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

const AddCarteAction = (values) => {
  console.log("inside AddCarteAction");
  return async (dispatch) => {
    try {
      console.log("inside AddCarteAction tryyy");
      const resp = await axios.post("/monetique/cartes/", values, {
        headers: authHeader(),
      });
      console.log("Api response");
      console.log(resp);
      dispatch({
        type: CarteActionType.ADD_CARTE_SUCCESS,
        payload: resp.data,
      });
    } catch (error) {
      console.log("catched error inside CarteAction ");
      console.log(error.response.data);
      dispatch({
        type: CarteActionType.ADD_CARTE_FAILED,
        payload: error.response.data,
      });
    }
  };
};

const UpdateCarteAction = (carteId, carte) => {
  return async (dispatch) => {
    try {
      const resp = await axios.put(`/monetique/cartes/${carteId}`, carte, {
        headers: authHeader(),
      });
      console.log("resp" + resp.data);
      dispatch({
        type: CarteActionType.UPDATE_CARTE_SUCCESS,
        payload: resp.data,
      });
    } catch (error) {
      console.log("catched error inside UpdateCarteAction ");
      console.log(error);
      dispatch({
        type: CarteActionType.UPDATE_CARTE_FAILED,
        payload: error.response.data,
      });
    }
  };
};

const DeleteCarteAction = (id) => {
  console.log("inside DeleteCarteAction");
  console.log("id " + id);
  return async (dispatch) => {
    try {
      console.log("inside try DeleteCarteAction");
      const resp = await axios.delete(`/monetique/cartes/${id}`, {
        headers: authHeader(),
      });
      console.log(resp);
      dispatch({
        type: CarteActionType.DELETE_CARTE_SUCCESS,
        payload: resp.data,
      });
    } catch (error) {
      console.log("catched error inside DeleteCarteAction " + error);
      dispatch({
        type: CarteActionType.DELETE_CARTE_FAILED,
        payload: error,
      });
    }
  };
};

const AnnulerAction = () => {
  return (dispatch) => {
    dispatch({
      type: CarteActionType.ANNULER_ACTION_C,
    });
  };
};

export {
  AnnulerAction,
  DeleteCarteAction,
  UpdateCarteAction,
  AddCarteAction,
  GetCartesAction,
};
