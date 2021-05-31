import axios from "axios";
import { GrpMotifsActionType } from "./types";
import authHeader from "../../helpers/authHeader";

const GetGrpsMotifsAction = () => {
  return async (dispatch) => {
    try {
      console.log("inside GetGrpsMotifsAction");
      const resp = await axios.get("/prerequis/groupement-motifs/", {
        headers: authHeader(),
      });
      console.log(resp);
      dispatch({
        type: GrpMotifsActionType.GET_GRPS_MOTIFS,
        payload: resp.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

const AddGrpMotifsAction = (values) => {
  console.log("inside AddGrpMotifsAction");
  return async (dispatch) => {
    try {
      console.log("inside AddGrpMotifsAction tryyy");
      const resp = await axios.post("/prerequis/groupement-motifs/", values, {
        headers: authHeader(),
      });
      console.log("Api response");
      console.log(resp);
      dispatch({
        type: GrpMotifsActionType.ADD_GRP_MOTIFS_SUCCESS,
        payload: resp.data,
      });
    } catch (error) {
      console.log("catched error inside AddGrpMotifsAction ");
      console.log(error);
      dispatch({
        type: GrpMotifsActionType.ADD_GRP_MOTIFS_FAILED,
        payload: error.response.data,
      });
    }
  };
};

const UpdateGrpMotifsAction = (grpMotifsId, grpMotifs) => {
  console.log("inside UpdateGrpMotifsAction");
  return async (dispatch) => {
    try {
      console.log("inside try UpdateGrpMotifsAction");
      const resp = await axios.put(
        `/prerequis/groupement-motifs/${grpMotifsId}`,
        grpMotifs,
        {
          headers: authHeader(),
        }
      );
      dispatch({
        type: GrpMotifsActionType.UPDATE_GRP_MOTIFS_SUCCESS,
        payload: resp.data,
      });
    } catch (error) {
      console.log("catched error inside UpdateGrpMotifsAction ");
      dispatch({
        type: GrpMotifsActionType.UPDATE_GRP_MOTIFS_FAILED,
        payload: error.response.data,
      });
    }
  };
};

const DeleteGrpMotifsAction = (id) => {
  console.log("inside DeleteGrpMotifsAction");
  return async (dispatch) => {
    try {
      console.log("inside try DeleteGrpMotifsAction");
      const resp = await axios.delete(`/prerequis/groupement-motifs/${id}`, {
        headers: authHeader(),
      });
      console.log(resp);
      dispatch({
        type: GrpMotifsActionType.DELETE_GRP_MOTIFS_SUCCESS,
        payload: resp.data,
      });
    } catch (error) {
      console.log("catched error inside DeleteGrpMotifsAction " + error);
      dispatch({
        type: GrpMotifsActionType.DELETE_GRP_MOTIFS_FAILED,
        payload: error,
      });
    }
  };
};

const AnnulerAction = () => {
  return (dispatch) => {
    dispatch({
      type: GrpMotifsActionType.ANNULER_ACTION_GM,
    });
  };
};

export {
  AnnulerAction,
  DeleteGrpMotifsAction,
  UpdateGrpMotifsAction,
  AddGrpMotifsAction,
  GetGrpsMotifsAction,
};
