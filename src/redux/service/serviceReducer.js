import { ServiceActionType } from "./types";

const initialState = {
  services: [],
  errors: "",
  success: false,
};

const serviceReducer = (state = initialState, action) => {
  switch (action.type) {
    case ServiceActionType.ANNULER_ACTION_SE:
      console.log("inside ServiceFacturable ANNULER_ACTION_SE");
      return {
        ...state,
        errors: "",
      };
    case ServiceActionType.GET_SERVICES:
      return {
        ...state,
        services: action.payload,
      };

    case ServiceActionType.ADD_SERVICE_SUCCESS:
      console.log("inside ServiceReducer SUCCESS Add_" + action.payload);
      window.location.reload();
      return {
        ...state,
        success: true,
        errors: "",
      };
    case ServiceActionType.ADD_SERVICE_FAILED:
      console.log("inside ServiceReducer FAILED Add_");
      console.log(action.payload);
      return {
        ...state,
        errors: action.payload,
      };
    case ServiceActionType.UPDATE_SERVICE_SUCCESS:
      console.log("inside ServiceReducer SUCCESS Update_");
      console.log(action.payload);
      window.location.reload();
      return {
        ...state,
        errors: "",
        success: true,
      };
    case ServiceActionType.UPDATE_SERVICE_FAILED:
      console.log("inside ServiceReducer FAILED Update_");
      console.log(action.payload);

      return {
        ...state,
        errors: action.payload,
      };
    case ServiceActionType.DELETE_SERVICE_SUCCESS:
      console.log("inside ServiceReducer SUCCESS delete_" + action.payload);
      return {
        ...state,
        errors: "",
        success: true,
      };
    case ServiceActionType.DELETE_SERVICE_FAILED:
      console.log("inside ServiceReducer FAILED DELETE_" + action.payload);
      return {
        ...state,
        errors: action.payload,
      };
    default:
      return state;
  }
};

export default serviceReducer;
