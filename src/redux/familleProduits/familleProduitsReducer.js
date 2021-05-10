import { FamilleProduitsActionType } from "./actions/types";

const initialState = {
  familleProduits: [],
  errors: "",
  success: false,
};

const familleProduitsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FamilleProduitsActionType.ANNULER_ACTION:
      console.log("inside familleProduitsReducer ANNULER_ACTION");
      return {
        ...state,
        errors: "",
      };
    case FamilleProduitsActionType.GET_FAMILLES_PRODUITS:
      return {
        ...state,
        familleProduits: action.payload,
      };

    case FamilleProduitsActionType.ADD_FAMILLE_PRODUITS_SUCCESS:
      console.log(
        "inside familleProduitsReducer SUCCESS Add_" + action.payload
      );
      return {
        ...state,
        success: true,
        errors: "",
      };
    case FamilleProduitsActionType.ADD_FAMILLE_PRODUITS_FAILED:
      console.log("inside familleProduitsReducer FAILED Add_");
      console.log(action.payload);
      return {
        ...state,
        errors: action.payload,
      };
    case FamilleProduitsActionType.UPDATE_FAMILLE_PRODUITS_SUCCESS:
      console.log("inside familleProduitsReducer SUCCESS Update_");
      console.log(action.payload);
      return {
        ...state,
        errors: "",
        success: true,
      };
    case FamilleProduitsActionType.UPDATE_FAMILLE_PRODUITS_FAILED:
      console.log("inside familleProduitsReducer FAILED Update_");
      console.log(action.payload);

      return {
        ...state,
        errors: action.payload,
      };
    case FamilleProduitsActionType.DELETE_FAMILLE_PRODUITS_SUCCESS:
      console.log(
        "inside familleProduitsReducer SUCCESS delete_" + action.payload
      );
      return {
        ...state,
        errors: "",
        success: true,
      };
    case FamilleProduitsActionType.DELETE_FAMILLE_PRODUITS_FAILED:
      console.log(
        "inside familleProduitsReducer FAILED DELETE_" + action.payload
      );
      return {
        ...state,
        errors: action.payload,
      };
    default:
      return state;
  }
};

export default familleProduitsReducer;
