import axios from "axios";
import { ServiceFacturableActionType } from "./types";
import authHeader from "../../helpers/authHeader";

const GetServicesFacturablesAction = () => {
  return async (dispatch) => {
    try {
      console.log("inside GetServiceFacturableAction");
      const resp = await axios.get("/services/services-facturables/", {
        headers: authHeader(),
      });
      console.log(resp);
      dispatch({
        type: ServiceFacturableActionType.GET_SERVICES_FACTURABLES,
        payload: resp.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

const AddServiceFacturableAction = (values) => {
  console.log("inside AddServiceFacturableAction");
  return async (dispatch) => {
    try {
      console.log("inside AddServiceFacturableAction tryyy");
      const resp = await axios.post("/services/services-facturables/", values, {
        headers: authHeader(),
      });
      console.log("Api response");
      console.log(resp);
      dispatch({
        type: ServiceFacturableActionType.ADD_SERVICE_FACTURABLE_SUCCESS,
        payload: resp.data,
      });
    } catch (error) {
      console.log("catched error inside AddServiceFacturableAction ");
      console.log(error);
      dispatch({
        type: ServiceFacturableActionType.ADD_SERVICE_FACTURABLE_FAILED,
        payload: error.response.data,
      });
    }
  };
};

const UpdateServiceFacturableAction = (
  serviceFacturableId,
  serviceFacturable
) => {
  console.log("inside UpdateServiceFacturableAction");
  return async (dispatch) => {
    try {
      console.log("inside try UpdateServiceFacturableAction");
      console.log(serviceFacturable);
      const resp = await axios.put(
        `/services/services-facturables/${serviceFacturableId}`,
        serviceFacturable,
        {
          headers: authHeader(),
        }
      );
      dispatch({
        type: ServiceFacturableActionType.UPDATE_SERVICE_FACTURABLE_SUCCESS,
        payload: resp.data,
      });
    } catch (error) {
      console.log("catched error inside UpdateServiceFacturableAction ");
      dispatch({
        type: ServiceFacturableActionType.UPDATE_SERVICE_FACTURABLE_FAILED,
        payload: error.response.data,
      });
    }
  };
};

const DeleteServiceFacturableAction = (id) => {
  console.log("inside DeleteServiceFacturableAction");
  return async (dispatch) => {
    try {
      console.log("inside try DeleteServiceFacturableAction");
      const resp = await axios.delete(`/services/services-facturables/${id}`, {
        headers: authHeader(),
      });
      console.log(resp);
      dispatch({
        type: ServiceFacturableActionType.DELETE_SERVICE_FACTURABLE_SUCCESS,
        payload: resp.data,
      });
    } catch (error) {
      console.log(
        "catched error inside DeleteServiceFacturableAction " + error
      );
      dispatch({
        type: ServiceFacturableActionType.DELETE_SERVICE_FACTURABLE_FAILED,
        payload: error,
      });
    }
  };
};

const AnnulerAction = () => {
  return (dispatch) => {
    dispatch({
      type: ServiceFacturableActionType.ANNULER_ACTION_SF,
    });
  };
};

export {
  AnnulerAction,
  DeleteServiceFacturableAction,
  UpdateServiceFacturableAction,
  AddServiceFacturableAction,
  GetServicesFacturablesAction,
};
