import { MotifActionType } from "./types";

const initialState = {
  motifs: [],
  errors: "",
  success: false,
};

const MotifReducer = (state = initialState, action) => {
  switch (action.type) {
    case MotifActionType.ANNULER_ACTION_M:
      console.log("inside MotifReducer ANNULER_MOTIF_M");
      return {
        ...state,
        errors: "",
      };
    case MotifActionType.GET_MOTIFS:
      return {
        ...state,
        motifs: action.payload,
      };

    case MotifActionType.ADD_MOTIF_SUCCESS:
      console.log("inside MotifReducer SUCCESS Add_" + action.payload);
      window.location.reload();
      return {
        ...state,
        success: true,
        errors: "",
      };
    case MotifActionType.ADD_MOTIF_FAILED:
      console.log("inside MotifReducer FAILED Add_");
      console.log(action.payload);
      return {
        ...state,
        errors: action.payload,
      };
    case MotifActionType.UPDATE_MOTIF_SUCCESS:
      console.log("inside MotifReducer SUCCESS Update_");
      console.log(action.payload);
      window.location.reload();
      return {
        ...state,
        errors: "",
        success: true,
      };
    case MotifActionType.UPDATE_MOTIF_FAILED:
      console.log("inside MotifReducer FAILED Update_");
      console.log(action.payload);

      return {
        ...state,
        errors: action.payload,
      };
    case MotifActionType.DELETE_MOTIF_SUCCESS:
      console.log("inside MotifReducer SUCCESS delete_" + action.payload);
      return {
        ...state,
        errors: "",
        success: true,
      };
    case MotifActionType.DELETE_MOTIF_FAILED:
      console.log("inside MotifReducer FAILED DELETE_" + action.payload);
      return {
        ...state,
        errors: action.payload,
      };
    default:
      return state;
  }
};

export default MotifReducer;
