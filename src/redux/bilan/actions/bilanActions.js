import axios from "axios";
import { BilanActionType } from "./types";
import authHeader from "../../../helpers/authHeader";

const GetBilansAction = () => {
  return async (dispatch) => {
    try {
      console.log("inside GetBilansAction");
      const resp = await axios.get("/bilans/", {
        headers: authHeader(),
      });
      console.log(resp);
      dispatch({
        type: BilanActionType.GET_BILANS,
        payload: resp.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

const AddBilanAction = (values) => {
  console.log("inside AddBilanAction");
  return async (dispatch) => {
    try {
      console.log("inside AddBilanAction tryyy");
      const resp = await axios.post("/bilans/", values, {
        headers: authHeader(),
      });
      console.log("Api response");
      console.log(resp);
      dispatch({
        type: BilanActionType.ADD_BILAN_SUCCESS,
        payload: resp.data,
      });
    } catch (error) {
      console.log("catched error inside AddBilanAction ");
      console.log(error);
      dispatch({
        type: BilanActionType.ADD_BILAN_FAILED,
        payload: error.response.data,
      });
    }
  };
};

const UpdateBilanAction = (bilanId, bilan) => {
  return async (dispatch) => {
    try {
      const resp = await axios.put(`/bilans/${bilanId}`, bilan, {
        headers: authHeader(),
      });
      console.log("resp" + resp.data);
      dispatch({
        type: BilanActionType.UPDATE_BILAN_SUCCESS,
        payload: resp.data,
      });
    } catch (error) {
      console.log("catched error inside UpdateBilansAction ");
      dispatch({
        type: BilanActionType.UPDATE_BILAN_FAILED,
        payload: error.response.data,
      });
    }
  };
};

const DeleteBilanAction = (id) => {
  console.log("inside DeleteBilanAction");
  console.log("id " + id);
  return async (dispatch) => {
    try {
      console.log("inside try DeleteBilanAction");
      const resp = await axios.delete(`/bilans/${id}`, {
        headers: authHeader(),
      });
      console.log(resp);
      dispatch({
        type: BilanActionType.DELETE_BILAN_SUCCESS,
        payload: resp.data,
      });
    } catch (error) {
      console.log("catched error inside DeleteBilanAction " + error);
      dispatch({
        type: BilanActionType.DELETE_BILAN_FAILED,
        payload: error,
      });
    }
  };
};

const AnnulerActionForBilan = () => {
  return (dispatch) => {
    dispatch({
      type: BilanActionType.ANNULER_ACTION,
    });
  };
};

export {
  AnnulerActionForBilan,
  DeleteBilanAction,
  UpdateBilanAction,
  AddBilanAction,
  GetBilansAction,
};
