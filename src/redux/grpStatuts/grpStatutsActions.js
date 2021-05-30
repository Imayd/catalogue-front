import axios from "axios";
import { GrpStatutsActionType } from "./types";
import authHeader from "../../helpers/authHeader";

const GetGrpsStatutsAction = () => {
  return async (dispatch) => {
    try {
      console.log("inside GetGrpsStatutsAction");
      const resp = await axios.get("/prerequis/groupements-statuts/", {
        headers: authHeader(),
      });
      console.log(resp);
      dispatch({
        type: GrpStatutsActionType.GET_GRPS_STATUTS,
        payload: resp.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

const AddGrpStatutsAction = (values) => {
  console.log("inside AddGrpStatutsAction");
  return async (dispatch) => {
    try {
      console.log("inside AddGrpStatutsAction tryyy");
      const resp = await axios.post("/prerequis/groupements-statuts/", values, {
        headers: authHeader(),
      });
      console.log("Api response");
      console.log(resp);
      dispatch({
        type: GrpStatutsActionType.ADD_GRP_STATUTS_SUCCESS,
        payload: resp.data,
      });
    } catch (error) {
      console.log("catched error inside AddGrpStatutsAction ");
      console.log(error);
      dispatch({
        type: GrpStatutsActionType.ADD_GRP_STATUTS_FAILED,
        payload: error.response.data,
      });
    }
  };
};

const UpdateGrpStatutsAction = (grpStatutsId, grpStatuts) => {
  console.log("inside UpdateGrpStatutsAction");
  return async (dispatch) => {
    try {
      console.log("inside try UpdateGrpStatutsAction");
      const resp = await axios.put(
        `/prerequis/groupements-statuts/${grpStatutsId}`,
        grpStatuts,
        {
          headers: authHeader(),
        }
      );
      dispatch({
        type: GrpStatutsActionType.UPDATE_GRP_STATUTS_SUCCESS,
        payload: resp.data,
      });
    } catch (error) {
      console.log("catched error inside UpdateGrpStatutsAction ");
      dispatch({
        type: GrpStatutsActionType.UPDATE_GRP_STATUTS_FAILED,
        payload: error.response.data,
      });
    }
  };
};

const DeleteGrpStatutsAction = (id) => {
  console.log("inside DeleteGrpStatutsAction");
  return async (dispatch) => {
    try {
      console.log("inside try DeleteGrpStatutsAction");
      const resp = await axios.delete(`/prerequis/groupements-statuts/${id}`, {
        headers: authHeader(),
      });
      console.log(resp);
      dispatch({
        type: GrpStatutsActionType.DELETE_GRP_STATUTS_SUCCESS,
        payload: resp.data,
      });
    } catch (error) {
      console.log("catched error inside DeleteGrpStatutsAction " + error);
      dispatch({
        type: GrpStatutsActionType.DELETE_GRP_STATUTS_FAILED,
        payload: error,
      });
    }
  };
};

const AnnulerAction = () => {
  return (dispatch) => {
    dispatch({
      type: GrpStatutsActionType.ANNULER_ACTION_GS,
    });
  };
};

export {
  AnnulerAction,
  DeleteGrpStatutsAction,
  UpdateGrpStatutsAction,
  AddGrpStatutsAction,
  GetGrpsStatutsAction,
};
