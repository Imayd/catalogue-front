import { StatutActionType } from "./types";

const initialState = {
  statuts: [],
  errors: "",
  success: false,
};

const StatutReducer = (state = initialState, action) => {
  switch (action.type) {
    case StatutActionType.ANNULER_ACTION_S:
      console.log("inside StatutReducer ANNULER_ACTION_S");
      return {
        ...state,
        errors: "",
      };
    case StatutActionType.GET_STATUTS:
      return {
        ...state,
        statuts: action.payload,
      };

    case StatutActionType.ADD_STATUT_SUCCESS:
      console.log("inside StatutReducer SUCCESS Add_" + action.payload);
      window.location.reload();
      return {
        ...state,
        success: true,
        errors: "",
      };
    case StatutActionType.ADD_STATUT_FAILED:
      console.log("inside StatutReducer FAILED Add_");
      console.log(action.payload);
      return {
        ...state,
        errors: action.payload,
      };
    case StatutActionType.UPDATE_STATUT_SUCCESS:
      console.log("inside StatutReducer SUCCESS Update_");
      console.log(action.payload);
      window.location.reload();
      return {
        ...state,
        errors: "",
        success: true,
      };
    case StatutActionType.UPDATE_STATUT_FAILED:
      console.log("inside StatutReducer FAILED Update_");
      console.log(action.payload);

      return {
        ...state,
        errors: action.payload,
      };
    case StatutActionType.DELETE_STATUT_SUCCESS:
      console.log("inside StatutReducer SUCCESS delete_" + action.payload);
      return {
        ...state,
        errors: "",
        success: true,
      };
    case StatutActionType.DELETE_STATUT_FAILED:
      console.log("inside GrpStatutsReducer FAILED DELETE_" + action.payload);
      return {
        ...state,
        errors: action.payload,
      };
    default:
      return state;
  }
};

export default StatutReducer;
