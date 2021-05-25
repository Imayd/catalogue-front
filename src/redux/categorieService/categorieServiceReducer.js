import { CategorieServiceActionType } from "./types";

const initialState = {
  categoriesService: [],
  errors: "",
  success: false,
};

const categorieServiceReducer = (state = initialState, action) => {
  switch (action.type) {
    case CategorieServiceActionType.ANNULER_ACTION_CS:
      console.log("inside categorieServiceReducer ANNULER_ACTION_CS");
      return {
        ...state,
        errors: "",
      };
    case CategorieServiceActionType.GET_CATEGORIES_SERVICE:
      return {
        ...state,
        categoriesService: action.payload,
      };

    case CategorieServiceActionType.ADD_CATEGORIE_SERVICE_SUCCESS:
      console.log(
        "inside CategorieServiceReducer SUCCESS Add_" + action.payload
      );
      //window.location.reload();
      return {
        ...state,
        success: true,
        errors: "",
      };
    case CategorieServiceActionType.ADD_CATEGORIE_SERVICE_FAILED:
      console.log("inside CategorieServiceReducer FAILED Add_");
      console.log(action.payload);
      return {
        ...state,
        errors: action.payload,
      };
    case CategorieServiceActionType.UPDATE_CATEGORIE_SERVICE_SUCCESS:
      console.log("inside CategorieServiceReducer SUCCESS Update_");
      console.log(action.payload);
      //window.location.reload();
      return {
        ...state,
        errors: "",
        success: true,
      };
    case CategorieServiceActionType.UPDATE_CATEGORIE_SERVICE_FAILED:
      console.log("inside CategorieServiceReducer FAILED Update_");
      console.log(action.payload);

      return {
        ...state,
        errors: action.payload,
      };
    case CategorieServiceActionType.DELETE_CATEGORIE_SERVICE_SUCCESS:
      console.log(
        "inside CategorieServiceReducer SUCCESS delete_" + action.payload
      );
      return {
        ...state,
        errors: "",
        success: true,
      };
    case CategorieServiceActionType.DELETE_CATEGORIE_SERVICE_FAILED:
      console.log(
        "inside CategorieServiceReducer FAILED DELETE_" + action.payload
      );
      return {
        ...state,
        errors: action.payload,
      };
    default:
      return state;
  }
};

export default categorieServiceReducer;
