import { GrpStatutsActionType } from "./types";

const initialState = {
  grpsStatuts: [],
  errors: "",
  success: false,
};

const grpStatutsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GrpStatutsActionType.ANNULER_ACTION_GS:
      console.log("inside GrpStatutsReducer ANNULER_ACTION_GS");
      return {
        ...state,
        errors: "",
      };
    case GrpStatutsActionType.GET_GRPS_STATUTS:
      return {
        ...state,
        grpsStatuts: action.payload,
      };

    case GrpStatutsActionType.ADD_GRP_STATUTS_SUCCESS:
      console.log("inside GrpStatutsReducer SUCCESS Add_" + action.payload);
      window.location.reload();
      return {
        ...state,
        success: true,
        errors: "",
      };
    case GrpStatutsActionType.ADD_GRP_STATUTS_FAILED:
      console.log("inside GrpStatutsReducer FAILED Add_");
      console.log(action.payload);
      return {
        ...state,
        errors: action.payload,
      };
    case GrpStatutsActionType.UPDATE_GRP_STATUTS_SUCCESS:
      console.log("inside GrpStatutsReducer SUCCESS Update_");
      console.log(action.payload);
      window.location.reload();
      return {
        ...state,
        errors: "",
        success: true,
      };
    case GrpStatutsActionType.UPDATE_GRP_STATUTS_FAILED:
      console.log("inside GrpStatutsReducer FAILED Update_");
      console.log(action.payload);

      return {
        ...state,
        errors: action.payload,
      };
    case GrpStatutsActionType.DELETE_GRP_STATUTS_SUCCESS:
      console.log("inside GrpStatutsReducer SUCCESS delete_" + action.payload);
      return {
        ...state,
        errors: "",
        success: true,
      };
    case GrpStatutsActionType.DELETE_GRP_STATUTS_FAILED:
      console.log("inside GrpStatutsReducer FAILED DELETE_" + action.payload);
      return {
        ...state,
        errors: action.payload,
      };
    default:
      return state;
  }
};

export default grpStatutsReducer;
