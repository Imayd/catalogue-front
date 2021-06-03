import { CarteActionType } from "./types";

const initialState = {
  cartes: [],
  errors: "",
  success: false,
};

const carteReducer = (state = initialState, action) => {
  switch (action.type) {
    case CarteActionType.ANNULER_ACTION_C:
      console.log("inside CarteReducer ANNULER_ACTION");
      return {
        ...state,
        errors: "",
      };
    case CarteActionType.GET_CARTES:
      return {
        ...state,
        cartes: action.payload,
      };

    case CarteActionType.ADD_CARTE_SUCCESS:
      console.log("inside CarteReducer SUCCESS Add_" + action.payload);
      window.location.reload();
      return {
        ...state,
        success: true,
        errors: "",
      };
    case CarteActionType.ADD_CARTE_FAILED:
      console.log("inside CarteReducer FAILED Add_");
      console.log(action.payload);
      return {
        ...state,
        errors: action.payload,
      };
    case CarteActionType.UPDATE_CARTE_SUCCESS:
      console.log("inside CarteReducer SUCCESS Update_");
      console.log(action.payload);
      window.location.reload();
      return {
        ...state,
        errors: "",
        success: true,
      };
    case CarteActionType.UPDATE_CARTE_FAILED:
      console.log("inside CarteReducer FAILED Update_");
      console.log(action.payload);

      return {
        ...state,
        errors: action.payload,
      };
    case CarteActionType.DELETE_CARTE_SUCCESS:
      console.log("inside CarteReducer SUCCESS delete_" + action.payload);
      return {
        ...state,
        errors: "",
        success: true,
      };
    case CarteActionType.DELETE_CARTE_FAILED:
      console.log("inside CarteReducer FAILED DELETE_" + action.payload);
      return {
        ...state,
        errors: action.payload,
      };
    default:
      return state;
  }
};

export default carteReducer;
