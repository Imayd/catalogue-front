import { TypeServiceActionType } from "./types";

const initialState = {
  typesService: [],
  errors: "",
  success: false,
};

const typeServiceReducer = (state = initialState, action) => {
  switch (action.type) {
    case TypeServiceActionType.ANNULER_ACTION_TS:
      console.log("inside typeServiceReducer ANNULER_ACTION_TS");
      return {
        ...state,
        errors: "",
      };
    case TypeServiceActionType.GET_TYPES_SERVICE:
      return {
        ...state,
        typesService: action.payload,
      };

    case TypeServiceActionType.ADD_TYPE_SERVICE_SUCCESS:
      console.log("inside typeServiceReducer SUCCESS Add_" + action.payload);
      //window.location.reload();
      return {
        ...state,
        success: true,
        errors: "",
      };
    case TypeServiceActionType.ADD_TYPE_SERVICE_FAILED:
      console.log("inside typeServiceReducer FAILED Add_");
      console.log(action.payload);
      return {
        ...state,
        errors: action.payload,
      };
    case TypeServiceActionType.UPDATE_TYPE_SERVICE_SUCCESS:
      console.log("inside typeServiceReducer SUCCESS Update_");
      console.log(action.payload);
      //window.location.reload();
      return {
        ...state,
        errors: "",
        success: true,
      };
    case TypeServiceActionType.UPDATE_TYPE_SERVICE_FAILED:
      console.log("inside typeServiceReducer FAILED Update_");
      console.log(action.payload);

      return {
        ...state,
        errors: action.payload,
      };
    case TypeServiceActionType.DELETE_TYPE_SERVICE_SUCCESS:
      console.log("inside typeServiceReducer SUCCESS delete_" + action.payload);
      return {
        ...state,
        errors: "",
        success: true,
      };
    case TypeServiceActionType.DELETE_TYPE_SERVICE_FAILED:
      console.log("inside typeServiceReducer FAILED DELETE_" + action.payload);
      return {
        ...state,
        errors: action.payload,
      };
    default:
      return state;
  }
};

export default typeServiceReducer;
