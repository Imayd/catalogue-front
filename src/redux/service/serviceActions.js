import axios from "axios";
import { ServiceActionType } from "./types";
import authHeader from "../../helpers/authHeader";

const GetServicesAction = () => {
  return async (dispatch) => {
    try {
      console.log("inside GetServiceAction");
      const resp = await axios.get("/services/maintenance-services/", {
        headers: authHeader(),
      });
      console.log(resp);
      dispatch({
        type: ServiceActionType.GET_SERVICES,
        payload: resp.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

const AddServiceAction = (values) => {
  console.log("inside AddServiceAction");
  return async (dispatch) => {
    try {
      console.log("inside AddServiceAction tryyy");
      const resp = await axios.post("/services/maintenance-services/", values, {
        headers: authHeader(),
      });
      console.log("Api response");
      console.log(resp);
      dispatch({
        type: ServiceActionType.ADD_SERVICE_SUCCESS,
        payload: resp.data,
      });
    } catch (error) {
      console.log("catched error inside AddServiceAction ");
      console.log(error);
      dispatch({
        type: ServiceActionType.ADD_SERVICE_FAILED,
        payload: error.response.data,
      });
    }
  };
};

const UpdateServiceAction = (serviceId, service) => {
  console.log("inside UpdateServiceAction");
  return async (dispatch) => {
    try {
      console.log("inside try UpdateServiceAction");
      console.log(service);
      const resp = await axios.put(
        `/services/maintenance-services/${serviceId}`,
        service,
        {
          headers: authHeader(),
        }
      );
      dispatch({
        type: ServiceActionType.UPDATE_SERVICE_SUCCESS,
        payload: resp.data,
      });
    } catch (error) {
      console.log("catched error inside UpdateServiceAction ");
      dispatch({
        type: ServiceActionType.UPDATE_SERVICE_FAILED,
        payload: error.response.data,
      });
    }
  };
};

const DeleteServiceAction = (id) => {
  console.log("inside DeleteServiceAction");
  return async (dispatch) => {
    try {
      console.log("inside try DeleteServiceAction");
      const resp = await axios.delete(`/services/maintenance-services/${id}`, {
        headers: authHeader(),
      });
      console.log(resp);
      dispatch({
        type: ServiceActionType.DELETE_SERVICE_SUCCESS,
        payload: resp.data,
      });
    } catch (error) {
      console.log("catched error inside DeleteServiceAction " + error);
      dispatch({
        type: ServiceActionType.DELETE_SERVICE_FAILED,
        payload: error,
      });
    }
  };
};

const AnnulerAction = () => {
  return (dispatch) => {
    dispatch({
      type: ServiceActionType.ANNULER_ACTION_SE,
    });
  };
};

export {
  AnnulerAction,
  DeleteServiceAction,
  UpdateServiceAction,
  AddServiceAction,
  GetServicesAction,
};
