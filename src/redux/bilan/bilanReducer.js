import { BilanActionType } from "./actions/types";

const initialState = {
  bilans: [],
  errors: "",
  success: false,
};

const bilanReducer = (state = initialState, action) => {
  switch (action.type) {
    case BilanActionType.ANNULER_ACTION:
      console.log("inside bilanReducer ANNULER_ACTION");
      return {
        ...state,
        errors: "",
      };
    case BilanActionType.GET_BILANS:
      return {
        ...state,
        bilans: action.payload,
      };

    case BilanActionType.ADD_BILAN_SUCCESS:
      console.log("inside bilanReducer SUCCESS Add_" + action.payload);
      return {
        ...state,
        success: true,
        errors: "",
      };
    case BilanActionType.ADD_BILAN_FAILED:
      console.log("inside bilanReducer FAILED Add_");
      console.log(action.payload);
      return {
        ...state,
        errors: action.payload,
      };
    case BilanActionType.UPDATE_BILAN_SUCCESS:
      console.log("inside bilanReducer SUCCESS Update_");
      console.log(action.payload);
      return {
        ...state,
        errors: "",
        success: true,
      };
    case BilanActionType.UPDATE_BILAN_FAILED:
      console.log("inside bilanReducer FAILED Update_");
      console.log(action.payload);

      return {
        ...state,
        errors: action.payload,
      };
    case BilanActionType.DELETE_BILAN_SUCCESS:
      console.log("inside bilanReducer SUCCESS delete_" + action.payload);
      return {
        ...state,
        errors: "",
        success: true,
      };
    case BilanActionType.DELETE_BILAN_FAILED:
      console.log("inside bilanReducer FAILED DELETE_" + action.payload);
      return {
        ...state,
        errors: action.payload,
      };
    default:
      return state;
  }
};

export default bilanReducer;
