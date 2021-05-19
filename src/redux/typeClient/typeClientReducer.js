import { TypeClientActionType } from "./actions/types";

const initialState = {
  typesClient: [],
  errors: "",
  success: false,
};

const typeClientReducer = (state = initialState, action) => {
  switch (action.type) {
    case TypeClientActionType.ANNULER_ACTION:
      console.log("inside typeClientReducer ANNULER_ACTION");
      return {
        ...state,
        errors: "",
      };
    case TypeClientActionType.GET_TYPES_CLIENT:
      return {
        ...state,
        typesClient: action.payload,
      };

    case TypeClientActionType.ADD_TYPE_CLIENT_SUCCESS:
      console.log("inside typeClientReducer SUCCESS Add_" + action.payload);
      window.location.reload();
      return {
        ...state,
        success: true,
        errors: "",
      };
    case TypeClientActionType.ADD_TYPE_CLIENT_FAILED:
      console.log("inside typeClientReducer FAILED Add_");
      console.log(action.payload);
      return {
        ...state,
        errors: action.payload,
      };
    case TypeClientActionType.UPDATE_TYPE_CLIENT_SUCCESS:
      console.log("inside typeClientReducer SUCCESS Update_");
      console.log(action.payload);
      window.location.reload();
      return {
        ...state,
        errors: "",
        success: true,
      };
    case TypeClientActionType.UPDATE_TYPE_CLIENT_FAILED:
      console.log("inside typeClientReducer FAILED Update_");
      console.log(action.payload);

      return {
        ...state,
        errors: action.payload,
      };
    case TypeClientActionType.DELETE_TYPE_CLIENT_SUCCESS:
      console.log("inside typeClientReducer SUCCESS delete_" + action.payload);
      return {
        ...state,
        errors: "",
        success: true,
      };
    case TypeClientActionType.DELETE_TYPE_CLIENT_FAILED:
      console.log("inside typeClientReducer FAILED DELETE_" + action.payload);
      return {
        ...state,
        errors: action.payload,
      };
    default:
      return state;
  }
};

export default typeClientReducer;
