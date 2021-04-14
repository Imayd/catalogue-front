import axios from "axios";
import { TypeClientActionType } from "./types";
import authHeader from "../../../helpers/authHeader";

const GetTypesClientAction = () => {
  return async (dispatch) => {
    try {
      console.log("inside GetTypesClientAction");
      const resp = await axios.get("/type-client/", { headers: authHeader() });
      console.log(resp);
      dispatch({
        type: TypeClientActionType.GET_TYPES_CLIENT,
        payload: resp.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

const AddTypeClientAction = (values) => {
  console.log("inside AddTypeClientAction");
  return async (dispatch) => {
    try {
      console.log("inside AddTypeClientAction tryyy");
      const resp = await axios.post("/type-client/", values, {
        headers: authHeader(),
      });
      console.log("Api response");
      console.log(resp);
      dispatch({
        type: TypeClientActionType.ADD_TYPE_CLIENT_SUCCESS,
        payload: resp.data,
      });
    } catch (error) {
      console.log("catched error inside AddTypeClientAction ");
      console.log(error);
      dispatch({
        type: TypeClientActionType.ADD_TYPE_CLIENT_FAILED,
        payload: error.response.data,
      });
    }
  };
};

const UpdateTypeClientAction = (typeClientId, typeClient) => {
  console.log("inside UpdateTypeClientAction");
  return async (dispatch) => {
    try {
      console.log("inside try UpdateTypeClientAction");
      const resp = await axios.put(`/type-client/${typeClientId}`, typeClient, {
        headers: authHeader(),
      });
      dispatch({
        type: TypeClientActionType.UPDATE_TYPE_CLIENT_SUCCESS,
        payload: resp.data,
      });
    } catch (error) {
      console.log("catched error inside UpdateTypeClientAction ");
      dispatch({
        type: TypeClientActionType.UPDATE_TYPE_CLIENT_FAILED,
        payload: error.response.data,
      });
    }
  };
};

const DeleteTypeClientAction = (id) => {
  console.log("inside DeleteTypeClientAction");
  return async (dispatch) => {
    try {
      console.log("inside try DeleteTypeClientAction");
      const resp = await axios.delete(`/type-client/${id}`, {
        headers: authHeader(),
      });
      console.log(resp);
      dispatch({
        type: TypeClientActionType.DELETE_TYPE_CLIENT_SUCCESS,
        payload: resp.data,
      });
    } catch (error) {
      console.log("catched error inside DeleteTypeClientAction " + error);
      dispatch({
        type: TypeClientActionType.DELETE_TYPE_CLIENT_FAILED,
        payload: error,
      });
    }
  };
};

const AnnulerActionForTC = () => {
  return (dispatch) => {
    dispatch({
      type: TypeClientActionType.ANNULER_ACTION,
    });
  };
};

export {
  AnnulerActionForTC,
  DeleteTypeClientAction,
  UpdateTypeClientAction,
  AddTypeClientAction,
  GetTypesClientAction,
};
