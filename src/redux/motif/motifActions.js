import axios from "axios";
import { MotifActionType } from "./types";
import authHeader from "../../helpers/authHeader";

const GetMotifsAction = () => {
  return async (dispatch) => {
    try {
      console.log("inside GetMotifsAction");
      const resp = await axios.get("/prerequis/motifs/", {
        headers: authHeader(),
      });
      console.log(resp);
      dispatch({
        type: MotifActionType.GET_MOTIFS,
        payload: resp.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

const AddMotifAction = (values) => {
  console.log("inside AddMotifAction");
  return async (dispatch) => {
    try {
      console.log("inside AddMotifAction tryyy");
      const resp = await axios.post("/prerequis/motifs/", values, {
        headers: authHeader(),
      });
      console.log("Api response");
      console.log(resp);
      dispatch({
        type: MotifActionType.ADD_MOTIF_SUCCESS,
        payload: resp.data,
      });
    } catch (error) {
      console.log("catched error inside AddMotifAction ");
      console.log(error);
      dispatch({
        type: MotifActionType.ADD_MOTIF_FAILED,
        payload: error.response.data,
      });
    }
  };
};

const UpdateMotifAction = (motifId, motif) => {
  console.log("inside UpdateMotifAction");
  return async (dispatch) => {
    try {
      console.log("inside try UpdateMotifAction");
      const resp = await axios.put(`/prerequis/motifs/${motifId}`, motif, {
        headers: authHeader(),
      });
      dispatch({
        type: MotifActionType.UPDATE_MOTIF_SUCCESS,
        payload: resp.data,
      });
    } catch (error) {
      console.log("catched error inside UpdateMotifAction ");
      dispatch({
        type: MotifActionType.UPDATE_MOTIF_FAILED,
        payload: error.response.data,
      });
    }
  };
};

const DeleteMotifAction = (id) => {
  console.log("inside DeleteMotifAction");
  return async (dispatch) => {
    try {
      console.log("inside try DeleteMotifAction");
      const resp = await axios.delete(`/prerequis/motifs/${id}`, {
        headers: authHeader(),
      });
      console.log(resp);
      dispatch({
        type: MotifActionType.DELETE_MOTIF_SUCCESS,
        payload: resp.data,
      });
    } catch (error) {
      console.log("catched error inside DeleteMotifAction " + error);
      dispatch({
        type: MotifActionType.DELETE_MOTIF_FAILED,
        payload: error,
      });
    }
  };
};

const AnnulerAction = () => {
  return (dispatch) => {
    dispatch({
      type: MotifActionType.ANNULER_ACTION_M,
    });
  };
};

export {
  AnnulerAction,
  DeleteMotifAction,
  UpdateMotifAction,
  AddMotifAction,
  GetMotifsAction,
};
