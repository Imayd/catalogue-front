import axios from "axios";
import { TypeServiceActionType } from "./types";
import authHeader from "../../helpers/authHeader";

const GetTypesServiceAction = () => {
  return async (dispatch) => {
    try {
      console.log("inside GetTypesServiceAction");
      const resp = await axios.get("/services/type-service/", {
        headers: authHeader(),
      });
      console.log(resp);
      dispatch({
        type: TypeServiceActionType.GET_TYPES_SERVICE,
        payload: resp.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

const AddTypeServiceAction = (values) => {
  console.log("inside AddTypeServiceAction");
  return async (dispatch) => {
    try {
      console.log("inside AddTypeServiceAction tryyy");
      const resp = await axios.post("/services/type-service/", values, {
        headers: authHeader(),
      });
      console.log("Api response");
      console.log(resp);
      dispatch({
        type: TypeServiceActionType.ADD_TYPE_SERVICE_SUCCESS,
        payload: resp.data,
      });
    } catch (error) {
      console.log("catched error inside AddTypeClientAction ");
      console.log(error);
      dispatch({
        type: TypeServiceActionType.ADD_TYPE_SERVICE_FAILED,
        payload: error.response.data,
      });
    }
  };
};

const UpdateTypeServiceAction = (typeServiceId, typeService) => {
  console.log("inside UpdateTypeServiceAction");
  return async (dispatch) => {
    try {
      console.log("inside try UpdateTypeClientAction");
      const resp = await axios.put(
        `/services/type-service/${typeServiceId}`,
        typeService,
        {
          headers: authHeader(),
        }
      );
      dispatch({
        type: TypeServiceActionType.UPDATE_TYPE_SERVICE_SUCCESS,
        payload: resp.data,
      });
    } catch (error) {
      console.log("catched error inside UpdateTypeServiceAction ");
      dispatch({
        type: TypeServiceActionType.UPDATE_TYPE_SERVICE_FAILED,
        payload: error.response.data,
      });
    }
  };
};

const DeleteTypeServiceAction = (id) => {
  console.log("inside DeleteTypeServiceAction");
  return async (dispatch) => {
    try {
      console.log("inside try DeleteTypeServiceAction");
      const resp = await axios.delete(`/services/type-service/${id}`, {
        headers: authHeader(),
      });
      console.log(resp);
      dispatch({
        type: TypeServiceActionType.DELETE_TYPE_SERVICE_SUCCESS,
        payload: resp.data,
      });
    } catch (error) {
      console.log("catched error inside DeleteTypeServiceAction " + error);
      dispatch({
        type: TypeServiceActionType.DELETE_TYPE_SERVICE_FAILED,
        payload: error,
      });
    }
  };
};

const AnnulerAction = () => {
  return (dispatch) => {
    dispatch({
      type: TypeServiceActionType.ANNULER_ACTION_TS,
    });
  };
};

export {
  AnnulerAction,
  DeleteTypeServiceAction,
  UpdateTypeServiceAction,
  AddTypeServiceAction,
  GetTypesServiceAction,
};
