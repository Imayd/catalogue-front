import { ThemeActionType } from "./types";

const initialState = {
  themes: [],
  errors: "",
  success: false,
};

const themeReducer = (state = initialState, action) => {
  switch (action.type) {
    case ThemeActionType.CANCEL_ACTION:
      console.log("inside themeReducer ANNULER_ACTION");
      return {
        ...state,
        errors: "",
      };
    case ThemeActionType.GET_THEMES:
      return {
        ...state,
        themes: action.payload,
      };

    case ThemeActionType.ADD_THEME_SUCCESS:
      console.log("inside themeReducer SUCCESS Add_" + action.payload);
      window.location.reload();
      return {
        ...state,
        success: true,
        errors: "",
      };
    case ThemeActionType.ADD_THEME_FAILED:
      console.log("inside themeReducer FAILED Add_");
      console.log(action.payload);
      return {
        ...state,
        errors: action.payload,
      };
    case ThemeActionType.UPDATE_THEME_SUCCESS:
      console.log("inside themeReducer SUCCESS Update_");
      console.log(action.payload);
      window.location.reload();
      return {
        ...state,
        errors: "",
        success: true,
      };
    case ThemeActionType.UPDATE_THEME_FAILED:
      console.log("inside themeReducer FAILED Update_");
      console.log(action.payload);
      return {
        ...state,
        errors: action.payload,
      };
    case ThemeActionType.DELETE_THEME_SUCCESS:
      console.log("inside themeReducer SUCCESS delete_" + action.payload);
      return {
        ...state,
        errors: "",
        success: true,
      };
    case ThemeActionType.DELETE_THEME_FAILED:
      console.log("inside themeReducer FAILED DELETE_" + action.payload);
      return {
        ...state,
        errors: action.payload,
      };
    default:
      return state;
  }
};

export default themeReducer;
