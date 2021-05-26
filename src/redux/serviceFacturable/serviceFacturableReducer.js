import { ServiceFacturableActionType } from "./types";

const initialState = {
  servicesFacturables: [],
  errors: "",
  success: false,
};

const serviceFacturableReducer = (state = initialState, action) => {
  switch (action.type) {
    case ServiceFacturableActionType.ANNULER_ACTION_SF:
      console.log("inside ServiceFacturable ANNULER_ACTION_SF");
      return {
        ...state,
        errors: "",
      };
    case ServiceFacturableActionType.GET_SERVICES_FACTURABLES:
      return {
        ...state,
        servicesFacturables: action.payload,
      };

    case ServiceFacturableActionType.ADD_SERVICE_FACTURABLE_SUCCESS:
      console.log(
        "inside ServiceFacturableReducer SUCCESS Add_" + action.payload
      );
      window.location.reload();
      return {
        ...state,
        success: true,
        errors: "",
      };
    case ServiceFacturableActionType.ADD_SERVICE_FACTURABLE_FAILED:
      console.log("inside ServiceFacturableReducer FAILED Add_");
      console.log(action.payload);
      return {
        ...state,
        errors: action.payload,
      };
    case ServiceFacturableActionType.UPDATE_SERVICE_FACTURABLE_SUCCESS:
      console.log("inside ServiceFacturableReducer SUCCESS Update_");
      console.log(action.payload);
      window.location.reload();
      return {
        ...state,
        errors: "",
        success: true,
      };
    case ServiceFacturableActionType.UPDATE_SERVICE_FACTURABLE_FAILED:
      console.log("inside ServiceFacturableReducer FAILED Update_");
      console.log(action.payload);

      return {
        ...state,
        errors: action.payload,
      };
    case ServiceFacturableActionType.DELETE_SERVICE_FACTURABLE_SUCCESS:
      console.log(
        "inside ServiceFacturableReducer SUCCESS delete_" + action.payload
      );
      return {
        ...state,
        errors: "",
        success: true,
      };
    case ServiceFacturableActionType.DELETE_SERVICE_FACTURABLE_FAILED:
      console.log(
        "inside ServiceFacturableReducer FAILED DELETE_" + action.payload
      );
      return {
        ...state,
        errors: action.payload,
      };
    default:
      return state;
  }
};

export default serviceFacturableReducer;
