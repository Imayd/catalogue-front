import axios from "axios";
import { StatutActionType } from "./types";
import authHeader from "../../helpers/authHeader";

const GetStatutsAction = () => {
  return async (dispatch) => {
    try {
      console.log("inside GetStatutsAction");
      const resp = await axios.get("/prerequis/statuts/", {
        headers: authHeader(),
      });
      console.log(resp);
      dispatch({
        type: StatutActionType.GET_STATUTS,
        payload: resp.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

const AddStatutAction = (values) => {
  console.log("inside AddStatutAction");
  return async (dispatch) => {
    try {
      console.log("inside AddStatutAction tryyy");
      const resp = await axios.post("/prerequis/statuts/", values, {
        headers: authHeader(),
      });
      console.log("Api response");
      console.log(resp);
      dispatch({
        type: StatutActionType.ADD_STATUT_SUCCESS,
        payload: resp.data,
      });
    } catch (error) {
      console.log("catched error inside AddStatutAction ");
      console.log(error);
      dispatch({
        type: StatutActionType.ADD_STATUT_FAILED,
        payload: error.response.data,
      });
    }
  };
};

const UpdateStatutAction = (statutId, statut) => {
  console.log("inside UpdateStatutAction");
  return async (dispatch) => {
    try {
      console.log("inside try UpdateStatutAction");
      const resp = await axios.put(
        `/prerequis/statuts/${statutId}`,
        statut,
        {
          headers: authHeader(),
        }
      );
      dispatch({
        type: StatutActionType.UPDATE_STATUT_SUCCESS,
        payload: resp.data,
      });
    } catch (error) {
      console.log("catched error inside UpdateGrpStatutsAction ");
      dispatch({
        type: StatutActionType.UPDATE_STATUT_FAILED,
        payload: error.response.data,
      });
    }
  };
};

const DeleteStatutAction = (id) => {
  console.log("inside DeleteStatutAction");
  return async (dispatch) => {
    try {
      console.log("inside try DeleteStatutAction");
      const resp = await axios.delete(`/prerequis/statuts/${id}`, {
        headers: authHeader(),
      });
      console.log(resp);
      dispatch({
        type: StatutActionType.DELETE_STATUT_SUCCESS,
        payload: resp.data,
      });
    } catch (error) {
      console.log("catched error inside DeleteStatutAction " + error);
      dispatch({
        type: StatutActionType.DELETE_STATUT_FAILED,
        payload: error,
      });
    }
  };
};

const AnnulerAction = () => {
  return (dispatch) => {
    dispatch({
      type: StatutActionType.ANNULER_ACTION_S,
    });
  };
};

export {
  AnnulerAction,
  DeleteStatutAction,
  UpdateStatutAction,
  AddStatutAction,
  GetStatutsAction,
};
